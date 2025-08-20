"use client";

import { DialogC } from "@/components/Dialog";
import Menu from "@/components/home/Menu";
import Orders from "@/components/home/Orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [openModal, setOpenModal] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [process, setProcess] = React.useState("phoneInput");

  const handlePhoneInput = () => {
    setProcess("otpInput");
  };

  const handleVerfyPhone = () => {
    setOpenModal(false);
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

      <div className="w-full">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="menu">
            <Menu />
          </TabsContent>
          <TabsContent value="orders">
            <Orders />
          </TabsContent>
        </Tabs>
      </div>

      <DialogC open={openModal} setOpen={setOpenModal} hasNoClose={process === "phoneInput"}>
        {process === "phoneInput" ? (
          <>
            <div className="bg-white w-fit rounded-full -mt-16 clamp-[px,0.875rem,1.125rem,@sm,@lg] clamp-[py,5,6,@sm,@lg] mx-auto">
              <Image
                className="clamp-[w,3.8125rem,5rem,@sm,@lg]"
                src="/svg/logo.svg"
                alt="Bring this food logo"
                width={61}
                height={48}
                priority
              />
            </div>
            <div className="grid gap-4 text-[#1D2939] -mt-4 text-center px-4">
              <h3 className="font-semibold leading-normal text-[28px]">
                Let&apos;s take your order!
              </h3>
              <p className="text-[#475467] text-sm leading-5 font-normal">
                Provide your phone number to patronize “Vendor Name”
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
                Continue
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-4 text-[#1D2939] mt-4 text-center px-4">
              <h3 className="font-semibold leading-normal text-[28px]">
                Verify your number
              </h3>
              <p className="text-[#475467] text-sm leading-5 font-normal">
                Enter 4-digit code sent via SMS and on Whatsapp to {phoneNumber}
                .
              </p>

              <div className="grid gap-3 mt-5 mb-6">
                <InputOTP maxLength={4} containerClassName="between px-6">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerfyPhone}
                className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer rounded-[8px] text-[#59201A] text-sm font-semibold leading-5 py-[18px]"
              >
                Verify phone number
              </Button>
            </div>
          </>
        )}
      </DialogC>
    </div>
  );
}
