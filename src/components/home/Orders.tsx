/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import VendorHeader from "../VendorHeader";
import Loader from "../Loader";
import Icon from "../Icon";
import Link from "next/link";

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

      <div className="clamp-[mt,4,8,@sm,@lg] grid md:grid-cols-2 clamp-[gap,4,8,@sm,@lg]">
        <OrderCard storeSlug={storeSlug} />
        <OrderCard storeSlug={storeSlug} isCompleted />
      </div>

      {/* <EmptyOrder /> */}
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

const OrderCard = ({
  isCompleted,
  storeSlug,
}: {
  isCompleted?: boolean;
  storeSlug: string;
}) => {
  return (
    <div className="border border-[#E4E7EC] rounded-[8px] p-3.5">
      <div className="between">
        <p className="inline-grid">
          <span className="text-[#1D2939] text-sm font-medium">Mola Foods</span>
          <span className="text-[#98A2B3] text-xs mt-1">
            I4TH JUN, 2025. 12:02PM
          </span>
        </p>
        <p className="inline-grid text-right">
          <span className="text-[#1D2939] text-sm font-medium">N7,900</span>
          <span className="text-[#98A2B3] text-xs mt-1">Order ID. BTF124Z</span>
        </p>
      </div>

      <p className="inline-grid my-4">
        <span className="text-[#1D2939] text-xs">1 x Barbecue Fish</span>
        <span className="text-[#98A2B3] text-[10px] mt-1">+2 more item(s)</span>
      </p>

      <div className="w-full h-px border-t border-[#E4E7EC] border-dashed" />

      <div className="between space-x-2 mt-5 mb-4">
        <div className="h-[3px] w-full bg-[#FFC247] rounded-full" />
        <div className="h-[3px] w-full bg-[#FFC247] rounded-full" />
        <div className="h-[3px] w-full bg-[#FFC247] rounded-full" />
        {isCompleted ? (
          <>
            <div className="h-[3px] w-full bg-[#FFC247] rounded-full" />
            <div className="h-[3px] w-full bg-[#FFC247] rounded-full" />
            <div className="h-[3px] w-full bg-[#FFC247] rounded-full" />
          </>
        ) : (
          <>
            <div className="h-[3px] w-full bg-[#F2F4F7] rounded-full" />
            <div className="h-[3px] w-full bg-[#F2F4F7] rounded-full" />
            <div className="h-[3px] w-full bg-[#F2F4F7] rounded-full" />
          </>
        )}
      </div>

      {isCompleted ? (
        <div className="between">
          <p className=" text-sm font-medium text-[#057F3E]">Completed</p>

          <Link href={`/store/${storeSlug}/order/track/orderId?status=IsCompleted`}>
            <Button
              variant={"ghost"}
              className="text-[#59201A] font-medium text-xs"
            >
              View Details
              <Icon icon="chevron-down" className="size-[14px] ml-1" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="between">
          <p className=" text-sm font-medium">
            <span className="text-[#1D2939]">12:15PM -</span>{" "}
            <span className="text-[#98A2B3]">Rider accepted order</span>
          </p>

          <Link href={`/store/${storeSlug}/order/track/orderId`}>
            <Button
              variant={"ghost"}
              className="text-[#59201A] font-medium text-xs"
            >
              Track
              <Icon icon="chevron-down" className="size-[14px] ml-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
