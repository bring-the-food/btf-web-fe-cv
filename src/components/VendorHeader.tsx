/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const VendorHeader = ({
  vendor,
  storeSlug,
}: {
  vendor: any;
  storeSlug: string;
}) => {
  return (
    <div className="between">
      <div className="start clamp-[pt,4,6,@sm,@lg] clamp-[pb,3.5,5,@sm,@lg]">
        <Image
          className="clamp-[size,10,16,@sm,@lg] rounded-full object-cover"
          src={vendor?.store?.picture?.url ?? "/images/logo_placeholder.png"}
          alt={vendor?.store?.name ?? "placeholder logo"}
          width={40}
          height={40}
          priority
        />

        <h6 className="clamp-[ml,3,5,@sm,@lg] clamp-[mr,2,4,@sm,@lg] font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal">
          {vendor?.store?.name}
        </h6>

        <p
          className={`font-medium clamp-[text,0.5rem,xs,@sm,@lg] rounded-full clamp-[py,1,2,@sm,@lg] clamp-[px,1.5,4,@sm,@lg] ${
            vendor?.store?.open
              ? "text-[#057F3E] bg-[#057F3E0D]"
              : "text-[#F52222] bg-[#EDDCDC66]"
          }`}
        >
          {vendor?.store?.open ? "Open" : "Closed"}
        </p>
      </div>

      <Link href={`/store/${storeSlug}/profile`}>
        <Button className="text-[#A46900] rounded-full clamp-[text,xs,sm,@sm,@lg] font-semibold bg-[#FFF9E9] hover:bg-[#fcf2d8] clamp-[py,1.5,2,@sm,@lg]! clamp-[px,2,4,@sm,@lg]! cursor-pointer space-x-0.5 h-auto">
          <span>View Profile</span>
        </Button>
      </Link>
    </div>
  );
};

export default VendorHeader;
