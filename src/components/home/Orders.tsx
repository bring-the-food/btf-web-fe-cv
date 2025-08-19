import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Orders = () => {
  return (
    <div>
      <div className="col-center py-[100px] mt-[72px]">
        <Image
          src="/images/order_placeholder.png"
          alt="order Placeholder"
          width={126.54631805419922}
          height={126.4830551147461}
          priority
        />
      
        <p className="text-center text-sm font-medium mt-3 text-[#98A2B3]">
          You currently don&apos;t have <br />
          any active orders.
        </p>
      
        <Button className="bg-[#FFC247] text-[#59201A] cursor-pointer w-full rounded-[8px] text-sm font-semibold leading-5 py-[18px] mt-4 hover:bg-[#FFC247]/90">
          Start a new order
        </Button>
      </div>
    </div>
  );
};

export default Orders;
