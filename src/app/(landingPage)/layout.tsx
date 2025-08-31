"use client";

import FeaturedVendor from "@/components/FeaturedVendor";
import Icon from "@/components/Icon";
import MFooter from "@/components/MFooter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [featuredVendorModal, setFeaturedVendorModal] = React.useState(false);

  return (
    <main className="bg-[#FFC247] w-full">
      <Navbar />

      <div className="clamp-[mt,5rem,6rem]">
        {children}

        <div className="bg-[#310909]">
          <div className="container_fluid clamp-[py,4.625rem,7.75rem] col-center">
            <Icon
              icon="ordder_online"
              size={48}
              className="clamp-[size,2rem,3rem]"
            />
            <h5 className="font-caprasimo text-[#FCF3D9] clamp-[text,1.5rem,2rem] clamp-[leading,1.8rem,2.32rem] tracking-[0.32px] text-center clamp-[mt,4,5]">
              Order Online
            </h5>
            <p className="clamp-[mt,1,2] text-[#FCF3D9] clamp-[leading,1rem,1.44rem] clamp-[text,sm,lg] tracking-[0.36px] text-center lg:text-left">
              Get your favorites delivered fast.
            </p>

            <FeaturedVendor
              trigger={
                <Button className="bg-[#FCF3D9] hover:bg-[#fdeec6] text-[#310909] clamp-[mt,7,9] clamp-[leading,1rem,1.44rem] clamp-[text,base,lg] tracking-[0.36px] font-semibold !clamp-[py,4,6] !clamp-[px,5rem,6.25rem]">
                  Order Now
                </Button>
              }
              open={featuredVendorModal}
              setOpen={setFeaturedVendorModal}
              header="Featured Vendor"
            />
          </div>
        </div>

        <MFooter />
      </div>
    </main>
  );
}
