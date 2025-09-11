/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import VendorHeader from "../VendorHeader";
import Loader from "../Loader";

const Orders = ({
  storeSlug,
  vendor,
  isVendorLoading,
}: {
  storeSlug: string;
  vendor: any;
  isVendorLoading: boolean;
}) => {
  return (
    <Loader state={isVendorLoading}>
      <VendorHeader vendor={vendor} storeSlug={storeSlug} />

      <EmptyOrder />
    </Loader>
  );
};

const EmptyOrder = () => {
  return (
    <div className="col-center clamp-[py,6.25rem,8.125rem,@sm,@lg] clamp-[mt,4.5rem,6.375rem,@sm,@lg]">
      <Image
        src="/images/order_placeholder.png"
        alt="order Placeholder"
        className="clamp-[w,7.9063rem,11.375rem,@sm,@lg]"
        width={126.54631805419922}
        height={126.4830551147461}
        priority
      />

      <p className="text-center clamp-[text,sm,base,@sm,@lg] font-medium clamp-[mt,3,6,@sm,@lg] text-[#98A2B3]">
        You currently don&apos;t have <br />
        any active orders.
      </p>

      <Button className="bg-[#FFC247] text-[#59201A] cursor-pointer w-full max-w-sm rounded-[8px] clamp-[text,sm,base,@sm,@lg] font-semibold leading-5 !clamp-[py,1.125rem,1.375rem,@sm,@lg] clamp-[mt,4,8,@sm,@lg] hover:bg-[#FFC247]/90">
        Start a new order
      </Button>
    </div>
  );
};

export default Orders;
