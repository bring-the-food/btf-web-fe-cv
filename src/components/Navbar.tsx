"use client";

import Dialog from "@/components/DialgC";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [underCModal, setUnderCModal] = React.useState(false);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const MenuItems = ({ isDesktop }: { isDesktop?: boolean }) => {
    return (
      <>
        <li>
          <Link onClick={() => setIsMenuOpen(false)} href={"/about"}>
            About
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            href={`https://wa.me/2349036908590?text=Hi%2C%20I%27ll%20like%20to%20inquire%20about%20Bring%20This%20Food`}
          >
            Contact Us
          </Link>
        </li>
        {isDesktop && (
          <Link href={"/"}>
            <Image
              className="clamp-[w,4.8125rem,5.125rem,@sm,@lg]"
              src="/svg/logo.svg"
              alt="Bring this food logo"
              width={77}
              height={60}
              priority
            />
          </Link>
        )}

        <Dialog
          trigger={
            <li>
              <button className="">Vendors</button>
            </li>
          }
          header="Set Up, Sell More, Stress Less"
          desc="Focus on making delicious food. We handle the rest!"
          isDownload
          downloadRes={setUnderCModal}
          showCloseButton={false}
        />
        <Dialog
          trigger={
            <li>
              <button className="">Riders</button>
            </li>
          }
          header="Earn More by Delivering Food"
          desc="Own a bike or bikes? Earn more delivering food!"
          isDownload
          downloadRes={setUnderCModal}
          showCloseButton={false}
        />
        <Dialog
          header={"Applications are under construction"}
          desc={"Thank you for wanting to join the movement!"}
          open={underCModal}
          setOpen={setUnderCModal}
          showCloseButton={false}
        />
      </>
    );
  };

  return (
    <div>
      <nav>
        <div className="bg-[#FFE7B0] py-3 text-xs sm:text-sm clamp-[leading,0.78rem,1.12rem] tracking-[0.42px] text-center">
          <p>New: Get free delivery on your first order!</p>
        </div>

        <div className="relative">
          <div className="clamp-[pt,6,8] container_fluid hidden sm:block">
            <ul className="!hidden sm:!flex center space-x-10 text-[#310909] font-medium clamp-[text,base,lg,@sm,@lg] leading-[19.84px] tracking-[0.32px]">
              <MenuItems isDesktop />
            </ul>
          </div>

          <div className="between pt-4 container_fluid sm:!hidden">
            <Link href={"/"}>
              <Image
                className="clamp-[w,3.8125rem,4.125rem] z-50"
                src="/svg/logo.svg"
                alt="Bring this food logo"
                width={77}
                height={60}
                priority
              />
            </Link>

            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>

          <ul
            className={cn(
              isMenuOpen ? "min-h-[calc(100svh-101px)] pt-[36px] " : "h-0 ",
              "space-y-10 text-[#310909] font-medium clamp-[text,base,lg,@sm,@lg] overflow-hidden leading-[19.84px] tracking-[0.32px] absolute bg-[#FFC247] w-full container_fluid transition-all duration-500"
            )}
          >
            <MenuItems />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
