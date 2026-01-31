import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      <div className="md:flex md:justify-center md:space-x-20 lg:space-x-40 md:flex-row mx-auto max-w-5xl clamp-[mt,2.5,8,@sm,@lg] md:mt-16">
        <div className="">
          <h4 className="font-caprasimo text-[32px] leading-[44.8px] text-[#310909] text-center md:text-left">
            Get your Food and <br /> Groceries ASAP
          </h4>

          <p className="clamp-[mt,2,4,@sm,@lg] text-center text-[#310909] leading-[19.84px] text-base font-jakart tracking-[0.32px] md:text-left">
            Your order is only few clicks away!
          </p>
        </div>

        <div className="mt-20 md:mt-0">
          <div className="space-y-3 font-caprasimo">
            <p className="text-caprasimo text-base leading-[21.12px] tracking-[0.32px] center text-[#310909] space-x-2">
              <Image src="/svg/call.svg" alt="call" width={20} height={20} />
              <a
                href="https://wa.me/2349113727132"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
              >
                09113727132
              </a>
            </p>
            <p className="text-caprasimo text-base leading-[21.12px] tracking-[0.32px] center text-[#310909] space-x-2">
              <Image src="/svg/mail.svg" alt="mail" width={20} height={20} />
              <a
                href="mailto:info@bringthisfood.com"
                className="font-semibold hover:underline"
              >
                info@bringthisfood.com
              </a>
            </p>
          </div>

          <div className="clamp-[my,10,16,@sm,@lg] md:mt-10 md:mb-0">
            <h6 className="text-[#5E251E] clamp-[text,sm,base,@sm,@lg] leading-[17.92px] font-semibold tracking-[0.42px] font-jakart text-center">
              Follow Us
            </h6>
            <div className="center space-x-2 mt-5">
              <a href="#" aria-label="Instagram">
                <div className="bg-[#310909] size-10 rounded-full center">
                  <Image
                    src="/svg/instagram.svg"
                    alt="instagram"
                    width={20}
                    height={20}
                  />
                </div>
              </a>
              <a href="#" aria-label="Facebook">
                <div className="bg-[#310909] size-10 rounded-full center">
                  <Image
                    src="/svg/facebook.svg"
                    alt="facebook"
                    width={20}
                    height={20}
                  />
                </div>
              </a>
              <a href="#" aria-label="X">
                <div className="bg-[#310909] size-10 rounded-full center">
                  <Image src="/svg/x.svg" alt="x" width={20} height={20} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="space-y-5 md:space-y-8 clamp-[py,5,8,@sm,@lg] md:mt-12">
          <p className="text-[#310909] clamp-[text,sm,base,@sm,@lg] leading-[17.92px] tracking-[0.42px] font-jakart text-center">
            Powered by <Link href="/" className="hover:underline font-semibold ">Bringthisfood</Link>
          </p>
          <p className="text-[#310909] clamp-[text,sm,base,@sm,@lg] leading-[17.92px] tracking-[0.42px] font-jakart text-center">
            2025 © BringThisFood Logistics Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
