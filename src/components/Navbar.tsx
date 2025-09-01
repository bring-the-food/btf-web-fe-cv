"use client";

import {
  Navbar as NavbarC,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["About", "Contact Us", "Vendors", "Riders"];

  return (
    <div>
      <nav>
        <div className="bg-[#FFE7B0] py-3 text-xs sm:text-sm clamp-[leading,0.78rem,1.12rem] tracking-[0.42px] text-center">
          <p>New: Get free delivery on your first order!</p>
        </div>

        <NavbarC onMenuOpenChange={setIsMenuOpen} className="pt-4">
          <NavbarContent className="between w-full sm:!hidden">
            <Image
              className="clamp-[w,3.8125rem,4.125rem] z-50"
              src="/svg/logo.svg"
              alt="Bring this food logo"
              width={77}
              height={60}
              priority
            />

            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="!text-[#310909] z-50"
              icon={(isOpen: boolean) => (isOpen ? <X /> : <Menu />)}
            />
          </NavbarContent>

          <div className="clamp-[pt,6,8] container_fluid hidden sm:block">
            <ul className="!hidden sm:!flex center space-x-10 text-[#310909] font-medium clamp-[text,base,lg,@sm,@lg] leading-[19.84px] tracking-[0.32px]">
              <li>
                <Link href={"/about"}>About</Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href={`https://wa.me/2349036908590?text=Hi%2C%20I%27ll%20like%20to%20inquire%20about%20Bring%20This%20Food`}
                >
                  Contact Us
                </Link>
              </li>
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
              <li>Vendors</li>
              <li>Riders</li>
            </ul>
          </div>

          <NavbarMenu className="bg-[#FFC247] h-full pt-20 space-y-10">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <p className="w-full">{item}</p>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </NavbarC>
      </nav>
    </div>
  );
};

export default Navbar;
