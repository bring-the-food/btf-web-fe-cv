"use client";

import Image from "next/image";
import React from "react";
import Icon from "./Icon";
import Link from "next/link";
import Dialog from "@/components/DialgC";

const Li = ({
  label,
  href,
  comingSoon,
  isVendor,
  isRider,
  setUnderCModal,
}: {
  label: string;
  comingSoon?: boolean;
  href?: string;
  isVendor?: boolean;
  isRider?: boolean;
  setUnderCModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    if (setUnderCModal) {
      setUnderCModal(true);
    }
  };

  if (isRider) {
    return (
      <li>
        <Dialog
          trigger={<button className="font-caprasimo text-base leading-[21.12px] tracking-[0.32px] text-[#310909]">Riders</button>}
          header="Earn More by Delivering Food"
          desc="Own a bike or bikes? Earn more delivering food!"
          isDownload
          downloadRes={handleClick}
          showCloseButton={false}
        />
      </li>
    );
  }

  if (isVendor) {
    return (
      <li>
        <Dialog
          trigger={<button className="font-caprasimo text-base leading-[21.12px] tracking-[0.32px] text-[#310909]">Vendors</button>}
          header="Set Up, Sell More, Stress Less"
          desc="Focus on making delicious food. We handle the rest!"
          isDownload
          downloadRes={handleClick}
          showCloseButton={false}
        />
      </li>
    );
  }

  return (
    <li className="font-caprasimo text-base leading-[21.12px] tracking-[0.32px] text-[#310909]">
      {href ? <Link href={href}>{label}</Link> : label}

      {comingSoon && (
        <span className="bg-[#FFE7B0] font-jakart font-medium clamp-[text,0.5rem,0.625rem,@sm,@lg] rounded-full py-[7px] clamp-[px,0.3438rem,0.5313rem,@sm,@lg] ml-2">
          Coming Soon
        </span>
      )}
    </li>
  );
};

const MFooter = () => {
  const [underCModal, setUnderCModal] = React.useState(false);

  return (
    <footer>
      <div className="container_fluid space-y-10 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:flex lg:flex-row lg:items-start lg:justify-between pt-20 pb-[52px]">
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
              <a
                href="https://wa.me/2349036908590"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
              >
                09036908690
              </a>
            </p>
            <p className="font-caprasimo text-base leading-[21.12px] tracking-[0.32px] start text-[#310909] space-x-2">
              <Image src="/svg/mail.svg" alt="mail" width={20} height={20} />
              <a
                href="mailto:info@bringthisfood.com"
                className="font-semibold hover:underline"
              >
                info@bringthisfood.com
              </a>
            </p>
            <p className="font-caprasimo text-base leading-[21.12px] tracking-[0.32px] start text-[#310909] space-x-2">
              <Image
                src="/svg/location.svg"
                alt="mail"
                width={20}
                height={20}
              />
              <span className="font-semibold">
                House 16, Ede Road, Ile-ife.
              </span>
            </p>
          </div>
        </div>
        <div>
          <h6 className="leading-[17.92px] tracking-[0.42px] text-sm font-medium">
            Main
          </h6>

          <ul className="mt-[22px] space-y-2.5">
            <Li label="About" href={"/about"} />
            <Li
              label="Order Now"
              href={`https://wa.me/2349036908590?text=Hi%2C%20I%27ll%20like%20to%20inquire%20about%20Bring%20This%20Food`}
            />
            <Li label="Vendors" isVendor setUnderCModal={setUnderCModal} />
            <Li label="Riders" isRider setUnderCModal={setUnderCModal} />
          </ul>
        </div>
        <div>
          <h6 className="leading-[17.92px] tracking-[0.42px] text-sm font-medium">
            Locations
          </h6>

          <ul className="mt-[22px] space-y-2.5">
            <Li label="OAU" />
            <Li label="Ile-Ife" />
            <Li label="Osogbo" comingSoon />
          </ul>
        </div>
        <div>
          <h6 className="leading-[17.92px] tracking-[0.42px] text-sm font-medium">
            Follow Us
          </h6>

          <div className="start space-x-2 mt-[22px] ">
            <a href="#" aria-label="Instagram">
              <div className="bg-[#310909] size-10 rounded-full center">
                <Icon icon="instagram_c" size={20} />
              </div>
            </a>
            <a href="#" aria-label="Facebook">
              <div className="bg-[#310909] size-10 rounded-full center">
                <Icon icon="facebook_c" size={20} />
              </div>
            </a>
            <a href="#" aria-label="X">
              <div className="bg-[#310909] size-10 rounded-full center">
                <Icon icon="x_c" size={20} />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#FFE7B0]">
        <div className="container_fluid col-center sm:flex-row! sm:flex sm:justify-between! py-6 sm:py-3 text-xs sm:text-sm clamp-[leading,0.78rem,1.12rem] tracking-[0.42px] space-y-8 sm:space-y-0">
          <p>2025 © Bring This Food Logistics</p>
          <div className="end space-x-4">
            <Link className="hover:underline" href={"/terms-of-use"}>
              Terms of Use
            </Link>
            <Link className="hover:underline" href={"/privacy-policy"}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <Dialog
        header={"Applications are under construction"}
        desc={"Thank you for wanting to join the movement!"}
        open={underCModal}
        setOpen={setUnderCModal}
        showCloseButton={false}
      />
    </footer>
  );
};

export default MFooter;

