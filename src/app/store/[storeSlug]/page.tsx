"use client";

import { DialogC } from "@/components/Dialog";
import { homeFunc } from "@/components/functions/home";
import Menu from "@/components/home/Menu";
import Orders from "@/components/home/Orders";
import LoadingButton from "@/components/LoadingButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { swrfetcher } from "@/lib/swrfetcher";
import Image from "next/image";
import { parseCookies, setCookie } from "nookies";
import React, { use } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export default function Home({
  params,
}: {
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = use(params);

  const { userDetails } = parseCookies();

  const [openModal, setOpenModal] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [process, setProcess] = React.useState("phoneInput");
  const [loading, setLoading] = React.useState(false);

  const { data, isLoading } = useSWR(
    `/api/profile?storeSlug=${storeSlug}`,
    swrfetcher
  );
  const vendor = data?.data;

  React.useEffect(() => {
    if (userDetails) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  }, [userDetails]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value || "";
    let digits = raw.replace(/\D/g, "");

    if (digits.length > 10) {
      digits = digits.slice(0, 10);
    }

    if (digits.startsWith("0")) {
      digits = digits.slice(1);
    }

    setPhoneNumber(digits);
  };

  const handlePhoneInput = async () => {
    try {
      setLoading(true);

      const response = await homeFunc.SendOTP("+234" + phoneNumber);
      toast.success(response.data?.message);
      setLoading(false);
      console.log("OTP sent successfully:", response);
      setProcess("otpInput");
    } catch (error) {
      setLoading(false);
      console.log("Error >>>:", error);
    }
  };

  const handleVerfyPhone = async () => {
    try {
      setLoading(true);

      const response = await homeFunc.VerifyOTP("+234" + phoneNumber, otp);

      const details = {
        telephone: "+234" + phoneNumber,
        tokens: response.data?.data,
      };

      setCookie(null, "userDetails", JSON.stringify(details), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      setLoading(false);

      setOpenModal(false);
    } catch (error) {
      setLoading(false);
      console.log("Error >>>:", error);
    }
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
            <Menu
              storeSlug={storeSlug}
              vendor={vendor}
              isVendorLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="orders">
            <Orders
              storeSlug={storeSlug}
              vendor={vendor}
              isVendorLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>

      <DialogC open={openModal} hasNoClose={process === "phoneInput"}>
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
                Provide your phone number to patronize {vendor?.store?.name}
              </p>

              <div className="grid gap-3 mt-5 mb-6">
                <Label
                  htmlFor="phone"
                  className="text-sm leading-5 font-semibold text-[#1E2024]"
                >
                  Phone number<span className="text-[#F6211A]">*</span>
                </Label>

                <div className="start space-x-1 border text-sm leading-5 font-normal tracking-[12%] px-3 py-4 rounded-[8px]">
                  <span className="text-[#1E2024]">+234</span>
                  <input
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="XXXXXXXXXX"
                    className="w-full focus:outline-none"
                  />
                </div>
              </div>

              <LoadingButton
                isLoading={loading}
                onClick={handlePhoneInput}
                className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer rounded-[8px] text-[#59201A] text-sm font-semibold leading-5 py-[18px] "
              >
                Continue
              </LoadingButton>
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
                <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  maxLength={4}
                  containerClassName="between px-6"
                >
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

              <LoadingButton
                isLoading={loading}
                onClick={handleVerfyPhone}
                className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer rounded-[8px] text-[#59201A] text-sm font-semibold leading-5 py-[18px]"
              >
                Verify phone number
              </LoadingButton>
            </div>
          </>
        )}
      </DialogC>
    </div>
  );
}
