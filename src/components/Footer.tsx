import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#FFF9E9] clamp-[px,5,12,@sm,@lg] clamp-[pt,10,20,@sm,@lg] clamp-[pb,2,4,@sm,@lg]">
      <Image
        src="/svg/logo.svg"
        alt="Bring this food logo"
        width={81}
        height={64}
        priority
        className="clamp-[w,5.0625rem,7.9375rem,@sm,@lg] mx-auto"
      />
      <div className="flex flex-col justify-between md:space-x-10 md:flex-row mx-auto max-w-[1024px] clamp-[mt,2.5,8,@sm,@lg] md:mt-16">
        <div className="">
          <h4 className="font-caprasimo text-[32px] leading-[44.8px] text-[#310909] text-center md:text-left">
            Get your Food and <br /> Groceries ASAP
          </h4>

          <p className="clamp-[mt,2,4,@sm,@lg] text-center text-[#310909] leading-[19.84px] text-base font-jakart tracking-[0.32px] md:text-left">
            Your order is only few clicks away!
          </p>
        </div>

        <div className="space-y-4 md:space-y-6 flex flex-col items-center clamp-[mt,6,10,@sm,@lg] clamp-[mb,10,16,@sm,@lg] md:my-0">
          <Button className="space-x-2.5 font-medium text-sm leading-normal text-[#FFF9E9] font-jakart py-3.5 px-[17px]">
            <Image
              src="/svg/playstore.svg"
              alt="playstore"
              width={17.305557250976562}
              height={18.999780654907227}
            />
            <span>Download on Google Play</span>
          </Button>
          <Button className="space-x-2.5 font-medium text-sm leading-normal text-[#FFF9E9] font-jakart py-3.5 px-[22px]">
            <Image
              src="/svg/iphone.svg"
              alt="iphone"
              width={17.305557250976562}
              height={18.999780654907227}
            />
            <span>Download on App Store</span>
          </Button>
        </div>

        <div>
          <div className="space-y-3 font-caprasimo">
            <p className="text-caprasimo text-base leading-[21.12px] tracking-[0.32px] center text-[#310909] space-x-2">
              <Image src="/svg/call.svg" alt="call" width={20} height={20} />
              <span>09036908690</span>
            </p>
            <p className="text-caprasimo text-base leading-[21.12px] tracking-[0.32px] center text-[#310909] space-x-2">
              <Image src="/svg/mail.svg" alt="mail" width={20} height={20} />
              <span>info@bringthisfood.com</span>
            </p>
          </div>

          <div className="clamp-[my,10,16,@sm,@lg] md:mt-10 md:mb-0">
            <h6 className="text-[#5E251E] clamp-[text,sm,base,@sm,@lg] leading-[17.92px] font-semibold tracking-[0.42px] font-jakart text-center">
              Follow Us
            </h6>
            <div className="center space-x-2 mt-5">
              <div className="bg-[#310909] size-10 rounded-full center">
                <Image
                  src="/svg/instagram.svg"
                  alt="instagram"
                  width={20}
                  height={20}
                />
              </div>
              <div className="bg-[#310909] size-10 rounded-full center">
                <Image
                  src="/svg/facebook.svg"
                  alt="facebook"
                  width={20}
                  height={20}
                />
              </div>
              <div className="bg-[#310909] size-10 rounded-full center">
                <Image src="/svg/x.svg" alt="x" width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="space-y-5 md:space-y-8 clamp-[py,5,8,@sm,@lg] md:mt-12">
          <p className="text-[#310909] clamp-[text,sm,base,@sm,@lg] leading-[17.92px] tracking-[0.42px] font-jakart text-center">
            Powered by <span className="font-semibold ">Bringthisfood</span>
          </p>
          <p className="text-[#310909] clamp-[text,sm,base,@sm,@lg] leading-[17.92px] tracking-[0.42px] font-jakart text-center">
            2025 © All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
