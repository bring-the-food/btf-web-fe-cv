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

const Checkout = () => {
  const router = useRouter();

  const [openModal, setOpenModal] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handlePhoneInput = () => {
    setOpenModal(false);
  };

  const handlePayment = () => {
    window.scrollTo(0, 0);
    setIsSuccess(true);
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

          <div className="space-y-5 md:space-y-8">
            <div className="border border-[#F2F4F7] rounded-[8px] clamp-[p,3.5,5,@sm,@lg] clamp-[pb,4,6,@sm,@lg]">
              <div className="between">
                <div className="start">
                  <Image
                    className="clamp-[w,10,16,@sm,@lg]"
                    src="/images/logo_placeholder.png"
                    alt="Placeholder logo"
                    width={40}
                    height={40}
                    priority
                  />

                  <div className="clamp-[ml,2,4,@sm,@lg]">
                    <h6 className="font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal">
                      Mola Foods
                    </h6>
                    <p className="clamp-[text,xs,sm,@sm,@lg] leading-normal start clamp-[mt,1,2,@sm,@lg] space-x-1">
                      <span className="text-[#98A2B3]">5 items</span>
                      <span className="text-[#98A2B3]">| N7,900</span>
                    </p>
                  </div>
                </div>

                {/* /${storeSlug} */}
                <Link href={`/?tab=cart`}>
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
                      Choose Delivery Location
                    </p>
                    <p className="text-[#A46900] font-medium clamp-[text,0.625rem,xs,@sm,@lg] clamp-[mt,1,1.5,@sm,@lg]">
                      Add Delivery Address
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
                      07012345678 will be called for pickup
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
                <Pallet title="Sub-total (5 items)" value={7900} />
                <Pallet title="Packs (1 item)" value={300} />
                <Pallet title="Delivery Fee" value={800} />
                <Pallet title="Total bill" value={9000} isTotal />
              </div>
            </div>

            <div className="center">
              <Button
                onClick={handlePayment}
                className="text-[#59201A] hover:bg-[#fdb420] w-full max-w-sm bg-[#FFC247] rounded-[8px] !clamp-[py,1.125rem,1.375rem,@sm,@lg] clamp-[text,sm,base,@sm,@lg] font-semibold leading-5 clamp-[mt,4.4375rem,4.6875rem,@sm,@lg]"
              >
                Make Payment
              </Button>
            </div>
          </div>
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
            Your payment of N7,200 is successful. You <br /> can proceed to
            track your order
          </p>

          <div className="center w-full">
            <Link
              href={`/?tab=orders`}
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

      <DrawerC open={openDrawer} setOpen={setOpenDrawer}>
        <div className="grid gap-4 m-5 text-center px-4">
          <h3 className="font-semibold leading-normal text-[#1E2024] text-[20px]">
            Add Delivery Address
          </h3>
          <p className="text-[#616469] text-sm leading-5 font-normal">
            Let us know where you hang out. So we can deliver to you.
          </p>

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

const Pallet = ({ title, value, isTotal }: PalletProps) => {
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
        N{value}
      </p>
    </div>
  );
};
