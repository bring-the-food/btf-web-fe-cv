/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DialogC } from "@/components/Dialog";
import { DrawerC } from "@/components/Drawer";
import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { parseCookies } from "nookies";
import { swrfetcher } from "@/lib/swrfetcher";
import useSWR from "swr";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { oau, offCampus } from "../../../../../data/locations";
import { koboToNaira } from "@/lib/formatCurrency";
import { Loader2Icon } from "lucide-react";
import { cartFunc } from "@/components/functions/cart";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LoadingButton from "@/components/LoadingButton";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // const [areaType, setAreaType] = React.useState("oau")

  const { data, isLoading: profileLoading } = useSWR(
    `/api/profile?storeSlug=${storeSlug}`,
    swrfetcher
  );
  const vendor = data?.data;

  const { data: cartData, isLoading } = useSWR(
    vendor ? `/api/cart/getCarts?storeId=${vendor?.store?.id}` : null,
    swrfetcher
  );

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
          method: "wallet",
        },
      })
      .then(() => {
        if (window) {
          window.scrollTo(0, 0);
          setIsSuccess(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

      {!isSuccess ? (
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
                <div className="border border-[#F2F4F7] rounded-[8px] clamp-[p,3.5,5,@sm,@lg] clamp-[pb,4,6,@sm,@lg]">
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
                      <Button className="text-[#A46900] rounded-full clamp-[text,xs,sm,@sm,@lg] font-semibold bg-[#FFF9E9] hover:bg-[#fcf2d8] !clamp-[py,1.5,2,@sm,@lg] !clamp-[px,2,4,@sm,@lg] cursor-pointer space-x-[2px] h-auto">
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
                    <Pallet
                      title={`Sub-total (${
                        cartData?.data?.cart?.summary?.items?.count
                      } item${
                        cartData?.data?.cart?.summary?.items?.count <= 1
                          ? ""
                          : "s"
                      })`}
                      value={
                        cartData?.data?.cart?.summary?.items?.price?.amount
                      }
                    />
                    <Pallet
                      title={`Packs (${
                        cartData?.data?.cart?.summary?.packs?.count
                      } item${
                        cartData?.data?.cart?.summary?.packs?.count <= 1
                          ? ""
                          : "s"
                      })`}
                      value={
                        cartData?.data?.cart?.summary?.packs?.price?.amount
                      }
                    />
                    <Pallet
                      title="Delivery Fee"
                      value={0}
                      // value={cartData?.data?.cart?.summary?.items?.price?.amount}
                    />
                    <Pallet
                      title="Service Charge"
                      value={10000}
                      // value={cartData?.data?.cart?.summary?.items?.price?.amount}
                    />
                    <Pallet
                      title="Total bill"
                      value={cartData?.data?.cart?.summary?.bill?.amount}
                      isTotal
                    />
                  </div>
                </div>

                <div className="center">
                  <LoadingButton
                    isLoading={loading}
                    onClick={handlePayment}
                    className="text-[#59201A] hover:bg-[#fdb420] w-full max-w-sm bg-[#FFC247] rounded-[8px] !clamp-[py,1.125rem,1.375rem,@sm,@lg] clamp-[text,sm,base,@sm,@lg] font-semibold leading-5 clamp-[mt,4.4375rem,4.6875rem,@sm,@lg]"
                  >
                    Make Payment
                  </LoadingButton>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
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
          <p className="text-[#717680] clamp-[text,base,xl,@sm,@lg] leading-[24px] clamp-[mt,1.5,3,@sm,@lg] text-center">
            Your payment of{" "}
            {koboToNaira(cartData?.data?.cart?.summary?.bill?.amount ?? 0)} is
            successful. You <br /> can proceed to track your order
          </p>

          <div className="center w-full">
            <Link
              href={`/store/${storeSlug}/?page=orders`}
              className="text-[#59201A] text-center hover:bg-[#fdb420] w-full max-w-sm bg-[#FFC247] rounded-[8px] !clamp-[py,1.125rem,1.375rem,@sm,@lg] clamp-[text,sm,base,@sm,@lg] font-semibold leading-5 clamp-[mt,4.4375rem,4.6875rem,@sm,@lg]"
            >
              Proceed to Order
            </Link>
          </div>
        </div>
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
              className="text-[#1E2024] text-sm leading-5 font-normal tracking-[12%] !px-3 !py-4 !rounded-[8px] h-auto"
            />
          </div>

          <Button
            onClick={handlePhoneInput}
            className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer rounded-[8px] text-[#59201A] text-sm font-semibold leading-5 py-[18px]"
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
                <div className="border border-[#E6E8EC] rounded-[8px] py-[9px] px-3.5">
                  <div className="flex items-center gap-3">
                    <Checkbox checked />
                    <Label className="!text-[#1E2024] text-base">
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
            className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer rounded-[8px] text-[#59201A] text-sm font-semibold leading-5 py-[18px]"
          >
            Save Location
          </Button>
        </div>
      </DrawerC>
    </div>
  );
};

export default Checkout;

type PalletProps = {
  title: string;
  value: number;
  isTotal?: boolean;
};

export const Pallet = ({ title, value, isTotal }: PalletProps) => {
  return (
    <div className="start-start clamp-[py,4,5,@sm,@lg]">
      <Icon
        icon={isTotal ? "receipt" : "stars"}
        size={20}
        className="clamp-[size,5,6,@sm,@lg]"
      />

      <div className="clamp-[ml,0.8125rem,1.0625rem,@sm,@lg]">
        <h6
          className={`clamp-[text,sm,base,@sm,@lg] leading-normal text-[#1D2939] ${
            isTotal && "font-semibold"
          }`}
        >
          {title}
        </h6>
      </div>

      <p
        className={`ml-auto end text-[#344054] clamp-[text,sm,base,@sm,@lg] leading-normal ${
          isTotal && "font-semibold"
        }`}
      >
        {koboToNaira(value ?? 0)}
      </p>
    </div>
  );
};

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
      <AccordionTrigger className="border border-[#E6E8EC] rounded-[8px] py-[9px] px-3.5">
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
