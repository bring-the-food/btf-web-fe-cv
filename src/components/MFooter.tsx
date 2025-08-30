import Image from "next/image";
import React from "react";
import Icon from "./Icon";

const MFooter = () => {
  return (
    <footer>
      <div className="container_fluid space-y-10 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:flex lg:flex-row lg:items-start lg:justify-between pb-[52px]">
        <div className="sm:col-span-3">
          <Image
            className="clamp-[w,4.8125rem,5.125rem,@sm,@lg]"
            src="/svg/logo.svg"
            alt="Bring this food logo"
            width={77}
            height={60}
          />

          <div className="space-y-3 font-caprasimo mt-7">
            <p className="font-caprasimo text-base leading-[21.12px] tracking-[0.32px] start text-[#310909] space-x-2">
              <Image src="/svg/call.svg" alt="call" width={20} height={20} />
              <span>09036908690</span>
            </p>
            <p className="font-caprasimo text-base leading-[21.12px] tracking-[0.32px] start text-[#310909] space-x-2">
              <Image src="/svg/mail.svg" alt="mail" width={20} height={20} />
              <span>info@bringthisfood.com</span>
            </p>
          </div>
        </div>
        <div>
          <h6 className="leading-[17.92px] tracking-[0.42px] text-sm font-medium">
            Main
          </h6>

          <ul className="mt-[22px] space-y-2.5">
            <Li label="About" />
            <Li label="Contact Us" />
            <Li label="Vendors" />
            <Li label="Riders" />
          </ul>
        </div>
        <div>
          <h6 className="leading-[17.92px] tracking-[0.42px] text-sm font-medium">
            Locations
          </h6>

          <ul className="mt-[22px] space-y-2.5">
            <Li label="OAU" />
            <Li label="Ile-Ife" />
            <Li label="Osogbo" commingSoon />
          </ul>
        </div>
        <div>
          <h6 className="leading-[17.92px] tracking-[0.42px] text-sm font-medium">
            Follow Us
          </h6>

          <div className="start space-x-2 mt-[22px] ">
            <div className="bg-[#310909] size-10 rounded-full center">
              <Icon icon="instagram_c" size={20} />
            </div>
            <div className="bg-[#310909] size-10 rounded-full center">
              <Icon icon="facebook_c" size={20} />
            </div>
            <div className="bg-[#310909] size-10 rounded-full center">
              <Icon icon="x_c" size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFE7B0]">
        <div className="container_fluid col-center sm:!flex-row sm:flex sm:!justify-between py-6 sm:py-3 text-xs sm:text-sm clamp-[leading,0.78rem,1.12rem] tracking-[0.42px] space-y-8 sm:space-y-0">
          <p>2025 © Bring This Food Logistics</p>
          <div className="end space-x-4">
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MFooter;

const Li = ({
  label,
  commingSoon,
}: {
  label: string;
  commingSoon?: boolean;
}) => {
  return (
    <li className="font-caprasimo text-base leading-[21.12px] tracking-[0.32px] text-[#310909]">
      {label}

      {commingSoon && (
        <span className="bg-[#FFE7B0] font-jakart font-medium text-[8px] rounded-full py-[7px] px-[5.5px] ml-2">
          Comming Soon
        </span>
      )}
    </li>
  );
};
