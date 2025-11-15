/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DialogC } from "@/components/Dialog";
import { DrawerC } from "@/components/Drawer";
import { cartFunc } from "@/components/functions/cart";
import Icon from "@/components/Icon";
import LoadingButton from "@/components/LoadingButton";
import OrderSummary from "@/components/OrderSummary";
import TimeUntil from "@/components/TimeUntil";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePaymentListener } from "@/hookes/usePaymentListener";
import { koboToNaira } from "@/lib/formatCurrency";
import { swrfetcher } from "@/lib/swrfetcher";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import React from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { oau, offCampus } from "../../../../../data/locations";

const Checkout = ({ params }: { params: Promise<{ storeSlug: string }> }) => {
  const router = useRouter();

  const { storeSlug } = React.use(params);

  const { userDetails } = parseCookies();
  const userParsed = userDetails && JSON?.parse(userDetails);

  const [openModal, setOpenModal] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [location, setLocation] = React.useState({
    city: "",
    street: "",
    description: "",
  });
  const [isSuccess, setIsSuccess] = React.useState("false");
  const [loading, setLoading] = React.useState(false);
  const [checoutResponse, setChecoutResponse] = React.useState<any>(null);

  const { data, isLoading: profileLoading } = useSWR(
    `/api/profile?storeSlug=${storeSlug}`,
    swrfetcher
  );
  const vendor = data?.data;

  const { data: cartData, isLoading } = useSWR(
    vendor ? `/api/cart/getCarts?storeId=${vendor?.store?.id}` : null,
    swrfetcher
  );

  React.useEffect(() => {
    if (Object.keys(cartData?.data?.cart ?? {}).length === 0) {
      router.push(`/store/${storeSlug}?page=orders`);
    }
  }, [cartData?.data?.cart, router, storeSlug]);

  const handlePhoneInput = () => {
    setOpenModal(false);
  };

  React.useEffect(() => {
    if (userParsed?.telephone) {
      setPhoneNumber(userParsed?.telephone);
    }
  }, [userParsed?.telephone]);

  const handlePayment = async () => {
    setLoading(true);

    await cartFunc
      .checkout(vendor?.store?.id, {
        delivery: {
          location: location,
          telephone: phoneNumber,
          message: "",
        },
        payment: {
          method: "single-transfer",
        },
      })
      .then((res) => {
        if (window) {
          window.scrollTo(0, 0);
          // setMakePayment
          setChecoutResponse(res?.data);
          setIsSuccess("make_payment");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const accessToken = userParsed?.tokens?.tokens?.access;

  const { transaction, error } = usePaymentListener(accessToken, () => {
    setIsSuccess("true");
  });
  console.log("🚀 ~ Checkout ~ error:", error);
  console.log("🚀 ~ Checkout ~ transaction:", transaction);

  return (
    <div className="col-start-center clamp-[px,5,12,@sm,@lg] clamp-[py,10,20,@sm,@lg] w-full">
      <Image
        className="clamp-[mb,3.5,8,@sm,@lg] clamp-[w,3.8125rem,8rem,@sm,@lg]"
        src="/svg/logo.svg"
        alt="Bring this food logo"
        width={61}
        height={48}
        priority
      />

      {isSuccess === "false" && (
        <>
          <div className="w-full">
            <div className="clamp-[my,1.3125rem,1.5625rem,@sm,@lg] center w-full">
              <button
                className="mr-auto hover:bg-gray-100 p-1 rounded"
                onClick={() => router.back()}
              >
                <Icon icon="left" size={16} />
              </button>

              <h4 className="text-[#1D2939] font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal text-center mr-auto clamp-[ml,0,-8,@sm,@lg]">
                Checkout
              </h4>
            </div>
            {profileLoading || isLoading ? (
              <div className="mx-auto">
                <Loader2Icon className="animate-spin clamp-[size,8,14,@sm,@lg] clamp-[mt,20,32,@sm,@lg] mx-auto" />
              </div>
            ) : (
              <>
                <div className="space-y-5 md:space-y-8">
                  <div className="border border-[#F2F4F7] rounded-xl clamp-[p,3.5,5,@sm,@lg] clamp-[pb,4,6,@sm,@lg]">
                    <div className="between">
                      <div className="start">
                        <Image
                          className="clamp-[size,10,16,@sm,@lg] rounded-full object-center"
                          src={
                            vendor?.store?.picture?.url ??
                            "/images/logo_placeholder.png"
                          }
                          alt={vendor?.store?.name ?? "placeholder logo"}
                          width={40}
                          height={40}
                          priority
                        />

                        <div className="clamp-[ml,2,4,@sm,@lg]">
                          <h6 className="font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal">
                            {vendor?.store?.name}
                          </h6>
                          <p className="clamp-[text,xs,sm,@sm,@lg] leading-normal start clamp-[mt,1,2,@sm,@lg] space-x-1">
                            <span className="text-[#98A2B3]">
                              {cartData?.data?.cart?.summary?.items?.count} item
                              {cartData?.data?.cart?.summary?.items?.count <= 1
                                ? ""
                                : "s"}
                            </span>
                            <span className="text-[#98A2B3]">
                              |{" "}
                              {koboToNaira(
                                cartData?.data?.cart?.summary?.items?.price
                                  ?.amount ?? 0
                              )}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/*  */}
                      <Link href={`/store/${storeSlug}/?tab=My Cart`}>
                        <Button className="text-[#A46900] rounded-full clamp-[text,xs,sm,@sm,@lg] font-semibold bg-[#FFF9E9] hover:bg-[#fcf2d8] clamp-[py,15,2,@sm,@lg]! clamp-[px,2,4,@sm,@lg]! cursor-pointer space-x-0.5 h-auto">
                          <Icon
                            icon="right"
                            size={12}
                            className="clamp-[size,3,4,@sm,@lg]"
                          />
                          <span>Back to cart</span>
                        </Button>
                      </Link>
                    </div>

                    <div className="clamp-[mt,6,8,@sm,@lg] space-y-2">
                      <button
                        onClick={() => setOpenDrawer(true)}
                        className="clamp-[pt,3,5,@sm,@lg] clamp-[pb,4,6,@sm,@lg] start text-left w-full space-x-3"
                      >
                        <Icon icon="marker" size={20} />

                        <div>
                          <p className="text-[#1D2939] font-medium clamp-[text,sm,base,@sm,@lg]">
                            {location?.street ? (
                              <span>
                                {location.description && (
                                  <>{location.description}, </>
                                )}
                                {location.street && <>{location.street}, </>}
                                {location.city}
                              </span>
                            ) : (
                              "Choose Delivery Location"
                            )}
                          </p>
                          <p className="text-[#A46900] font-medium clamp-[text,0.625rem,xs,@sm,@lg] clamp-[mt,1,1.5,@sm,@lg]">
                            {location?.street
                              ? "Change Delivery Address"
                              : "Add Delivery Address"}
                          </p>
                        </div>
                      </button>
                      <button
                        onClick={() => setOpenModal(true)}
                        className="clamp-[pt,3,5,@sm,@lg] clamp-[pb,4,6,@sm,@lg] start text-left w-full space-x-3"
                      >
                        <Icon icon="message" size={20} />

                        <div>
                          <p className="text-[#1D2939] font-medium clamp-[text,sm,base,@sm,@lg]">
                            {phoneNumber} will be called for pickup
                          </p>
                          <p className="text-[#A46900] font-medium clamp-[text,0.625rem,xs,@sm,@lg] clamp-[mt,1,1.5,@sm,@lg]">
                            Update Phone Number
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="text-[#1D2939]">
                    <h4 className="font-semibold clamp-[text,base,lg,@sm,@lg]">
                      Payment Summary
                    </h4>

                    <div className="mt-2">
                      <OrderSummary summary={cartData?.data?.cart?.summary} />
                    </div>
                  </div>

                  <div className="center">
                    <LoadingButton
                      isLoading={loading}
                      onClick={handlePayment}
                      className="text-[#59201A] hover:bg-[#fdb420] w-full max-w-sm bg-[#FFC247] rounded-xl clamp-[py,1.125rem,1.375rem,@sm,@lg]! clamp-[text,sm,base,@sm,@lg] font-semibold leading-5 clamp-[mt,4.4375rem,4.6875rem,@sm,@lg]"
                    >
                      Make Payment
                    </LoadingButton>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {isSuccess === "make_payment" && (
        <>
          <div className="w-full">
            <div className="clamp-[my,1.3125rem,1.5625rem,@sm,@lg] center w-full">
              <button
                className="mr-auto hover:bg-gray-100 p-1 rounded"
                onClick={() => router.back()}
              >
                <Icon icon="left" size={16} />
              </button>

              <h4 className="text-[#1D2939] font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal text-center mr-auto clamp-[ml,0,-8,@sm,@lg]">
                Checkout
              </h4>
            </div>
            {profileLoading || isLoading ? (
              <div className="mx-auto">
                <Loader2Icon className="animate-spin clamp-[size,8,14,@sm,@lg] clamp-[mt,20,32,@sm,@lg] mx-auto" />
              </div>
            ) : (
              <>
                <div className="clamp-[mt,8,12,@sm,@lg]">
                  <p className="font-medium text-center clamp-[text,sm,base,@sm,@lg] leading-[leading,1.125rem,1.375rem,@sm,@lg] text-[#344054]">
                    Account number expires in{" "}
                    <TimeUntil
                      targetTime={
                        checoutResponse?.data?.beneficiary?.expiryDate
                      }
                    />
                  </p>

                  <div className="min-w-[353px] max-w-[453px] mx-auto">
                    <div className="col-center center clamp-[mt,2.25rem,3rem,@sm,@lg] border border-[#F2F4F7] clamp-[px,4,6,@sm,@lg] clamp-[pt,5,7,@sm,@lg] clamp-[pb,8,10,@sm,@lg]">
                      <Icon
                        icon="bank"
                        size={26.666662216186523}
                        className="clamp-[w,1.6875rem,2.125rem,@sm,@lg]"
                      />

                      <h6 className="clamp-[text,sm,base,@sm,@lg] text-[#717680] clamp-[leading,1.25rem,1.5rem,@sm,@lg] clamp-[mt,0.25rem,0.5rem,@sm,@lg]">
                        Amount to send
                      </h6>

                      <p className="clamp-[mt,3,3.5,@sm,@lg] font-bold clamp-[text,1.5rem,2rem,@sm,@lg] text-[#414651]">
                        {koboToNaira(
                          checoutResponse?.data?.order?.summary?.bill?.amount ??
                            0
                        )}
                      </p>

                      <div className="clamp-[mt,10,12,@sm,@lg] w-full space-y-6 md:space-y-8">
                        {/* bank details */}
                        <p className="text-[#A4A7AE] clamp-[text,sm,base,@sm,@lg] clamp-[leading,5,6,@sm,@lg] between w-full space-x-4">
                          <span>Bank Name</span>{" "}
                          <span className="text-[#414651] font-medium">
                            {checoutResponse?.data?.beneficiary?.bank?.name}
                          </span>
                        </p>
                        <p className="text-[#A4A7AE] clamp-[text,sm,base,@sm,@lg] clamp-[leading,5,6,@sm,@lg] between w-full space-x-4">
                          <span>Account Name</span>{" "}
                          <span className="text-[#414651] font-medium">
                            {
                              checoutResponse?.data?.beneficiary?.bank?.account
                                ?.name
                            }
                          </span>
                        </p>
                        <p className="text-[#A4A7AE] clamp-[text,sm,base,@sm,@lg] clamp-[leading,5,6,@sm,@lg] between w-full space-x-4">
                          <span>Account Number</span>{" "}
                          <span className="end space-x-1 md:space-x-1.5">
                            <span className="text-[#414651] font-medium">
                              {
                                checoutResponse?.data?.beneficiary?.bank
                                  ?.account?.number
                              }
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  checoutResponse?.data?.beneficiary?.bank
                                    ?.account?.number
                                );
                                toast.info("Copied to clipboard");
                              }}
                            >
                              <Icon
                                icon="copyy"
                                size={10.5}
                                className="clamp-[w,0.6563rem,0.7813rem,@sm,@lg]"
                              />
                            </button>
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="start space-x-2 bg-[#F95B1E0A] border border-[#F95B1E24] py-4 px-5 rounded-[6px] tracking-normal clamp-[my,6,8,@sm,@lg]">
                      <Icon icon="proicons_info" w={20} h={24} />

                      <p className="clamp-[text,xs,sm,@sm,@lg] clamp-[leading,1.125rem,1.5rem,@sm,@lg] text-[#717680]">
                        Make a bank transfer into the account above and ensure
                        you transfer the exact amount above to avoid delay or
                        failed transaction
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {isSuccess === "true" && (
        <>
          <div className="w-full col-center py-[108px]">
            <Image
              className="clamp-[w,5rem,12rem,@sm,@lg] scale-125"
              src="/svg/success.svg"
              alt="success logo"
              width={80}
              height={80}
            />

            <h6 className="text-[#344054] clamp-[text,xl,3xl,@sm,@lg] leading-normal font-semibold">
              Payment Successful!
            </h6>
            <p className="text-[#717680] clamp-[text,base,xl,@sm,@lg] leading-6 clamp-[mt,1.5,3,@sm,@lg] text-center">
              Your payment of{" "}
              {koboToNaira(cartData?.data?.cart?.summary?.bill?.amount ?? 0)} is
              successful. You <br /> can proceed to track your order
            </p>

            <div className="center w-full">
              <Link
                href={`/store/${storeSlug}/?page=orders`}
                className="text-[#59201A] text-center hover:bg-[#fdb420] w-full max-w-sm bg-[#FFC247] rounded-xl clamp-[py,1.125rem,1.375rem,@sm,@lg]! clamp-[text,sm,base,@sm,@lg] font-semibold leading-5 clamp-[mt,4.4375rem,4.6875rem,@sm,@lg]"
              >
                Proceed to Order
              </Link>
            </div>
          </div>
        </>
      )}

      <DialogC open={openModal} setOpen={setOpenModal}>
        <div className="grid gap-4 text-[#1D2939] mt-4 text-center px-4">
          <h3 className="font-semibold leading-normal text-[20px]">
            Update phone number
          </h3>
          <p className="text-[#475467] text-sm leading-5 font-normal">
            This is the number riders will call to reach you during delivery.
          </p>

          <div className="grid gap-3 mt-5 mb-6">
            <Label
              htmlFor="phone"
              className="text-sm leading-5 font-semibold text-[#1E2024]"
            >
              Phone number<span className="text-[#F6211A]">*</span>
            </Label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+234 XXXXXXXXXX"
              className="text-[#1E2024] text-sm leading-5 font-normal tracking-[12%] px-3! py-4! rounded-xl! h-auto"
            />
          </div>

          <Button
            onClick={handlePhoneInput}
            className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer rounded-xl text-[#59201A] text-sm font-semibold leading-5 py-[18px]"
          >
            Update
          </Button>
        </div>
      </DialogC>

      <DrawerC
        open={openDrawer}
        setOpen={setOpenDrawer}
        className="overflow-y-auto"
      >
        <div className="grid gap-4 m-5 text-center px-4">
          <h3 className="font-semibold leading-normal text-[#1E2024] text-[20px]">
            Add Delivery Address
          </h3>
          <p className="text-[#616469] text-sm leading-5 font-normal">
            Let us know where you hang out. So we can deliver to you.
          </p>

          <div>
            <Accordion type="single" collapsible>
              <LocationAccordian
                label="OAU (On Campus)"
                desc="Obafemi Awolowo University"
                setLocation={setLocation}
                contents={oau.map((area: string) => (
                  <CCheckbox key={area} label={area} />
                ))}
              />
              <LocationAccordian
                label="Ile - Ife (Off Campus)"
                desc="Locations in Ile-Ife"
                setLocation={setLocation}
                contents={offCampus.map((area: string) => (
                  <CCheckbox key={area} label={area} />
                ))}
              />
              {location?.street && (
                <div className="border border-[#E6E8EC] rounded-xl py-[9px] px-3.5">
                  <div className="flex items-center gap-3">
                    <Checkbox checked />
                    <Label className="text-[#1E2024]! text-base">
                      {location?.street}
                    </Label>
                  </div>

                  <hr className="my-3 border-[#E9EAEB]" />

                  <textarea
                    className="w-full text-base leading-5 focus:outline-none"
                    placeholder="Add precise address (add extras like beside or after a popular place)"
                    rows={5}
                    value={location.description}
                    onChange={(event) =>
                      setLocation({
                        ...location,
                        description: event?.target?.value,
                      })
                    }
                  ></textarea>
                </div>
              )}
            </Accordion>
          </div>

          <Button
            onClick={() => setOpenDrawer(false)}
            className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer rounded-xl text-[#59201A] text-sm font-semibold leading-5 py-[18px]"
          >
            Save Location
          </Button>
        </div>
      </DrawerC>
    </div>
  );
};

export default Checkout;

const LocationAccordian = ({
  label,
  contents,
  desc,
  setLocation,
}: {
  label: string;
  contents: React.ReactNode;
  desc: string;
  setLocation: any;
}) => {
  return (
    <AccordionItem value={label} key={label} className="mb-3">
      <AccordionTrigger className="border border-[#E6E8EC] rounded-xl py-[9px] px-3.5">
        <span className="col-start">
          <span className="font-medium leading-6 text-[#1E2024] text-base">
            {label}
          </span>
          <span className="mt-1 text-sm text-[#616469]">{desc}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="text-[#616469] text-base border border-[#E6E8EC] px-3.5 py-3 overflow-y-auto max-h-[425px] space-y-5 mt-2">
        <RadioGroup
          onValueChange={(value) => {
            setLocation({
              city: label,
              street: value,
              description: "",
            });
          }}
        >
          {contents}
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
};

const CCheckbox = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-3">
      <RadioGroupItem value={label} id={label} />
      <Label htmlFor={label}>{label}</Label>
    </div>
  );
};
