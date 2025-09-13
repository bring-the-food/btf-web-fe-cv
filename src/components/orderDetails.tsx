"use client";

import { Pallet as Pallet2 } from "@/app/store/[storeSlug]/checkout/page";
import Icon from "@/components/Icon";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { DrawerC } from "./Drawer";
import { FrownFace, HappyFace, NeutralFace, SadFace, SmileFace } from "./Svgs";

const deliveryTimeLine = [
  {
    title: "Redhorn restaurant, Fashina",
    desc: "Sat, 14th Jun, 2025.",
    date: "06:59 AM",
    isCompleted: true,
  },
  {
    title: "Adereti , Damico, Ile-ife, Osun",
    desc: "Completed",
    date: "06:59 AM",
    isCompleted: true,
  },
];

const timelineData = [
  {
    title: "Order Received",
    desc: "Waiting for vendor to confirm your order",
    date: "06:59 AM",
    isCompleted: true,
  },
  {
    title: "Vendor Accepted Order",
    desc: "The vendor has confirm your order",
    date: "06:59 AM",
    isCompleted: true,
  },
  {
    title: "You Order has been Packed",
    desc: "Your order is ready to be picked",
    date: "06:59 AM",
    isCompleted: true,
  },
  {
    title: "Rider Accepted Order",
    desc: "Rider has picked your order",
    date: "06:59 AM",
    isCompleted: true,
  },
  {
    title: "Order in Transit",
    desc: "Your order is on it's way to you",
    date: "06:59 AM",
    isCompleted: true,
  },
  {
    title: "Order Complete",
    desc: "",
    date: "06:59 AM",
    isCompleted: true,
  },
];

const OrderDetails = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openRateDrawer, setOpenRateDrawer] = React.useState(false);

  return (
    <div>
      <div className="between">
        <div className="start clamp-[pt,4,6,@sm,@lg] clamp-[pb,3.5,5,@sm,@lg]">
          <Image
            className="clamp-[size,12,20,@sm,@lg] rounded-full object-center"
            src={"/images/logo_placeholder.png"}
            alt={"placeholder logo"}
            width={48}
            height={48}
            priority
          />

          <div className="clamp-[ml,3,5,@sm,@lg]">
            <h6 className="text-[#101828] font-semibold clamp-[text,base,xl,@sm,@lg] leading-none">
              Tejumade Olomola
            </h6>

            <p
              className={`clamp-[text,sm,base,@sm,@lg] clamp-[mt,1,2,@sm,@lg] text-[#667085]`}
            >
              Rider
            </p>
          </div>
        </div>

        <Button
          onClick={() => setOpenRateDrawer(true)}
          variant={"ghost"}
          className="clamp-[text,sm,base,@sm,@lg] font-semibold"
        >
          <span>Rate Rider</span>
        </Button>
      </div>

      <h5 className="text-[#59201A] font-semibold clamp-[text,sm,base,@sm,@lg] clamp-[my,8,10,@sm,@lg]">
        Order ID. BTF124Z
      </h5>

      {/* Order tracking */}
      <div className="clamp-[my,8,10,@sm,@lg]">
        <h5 className="text-[#1D2939] font-semibold clamp-[text,base,lg,@sm,@lg]">
          Delivery Timeline
        </h5>

        <div className="clamp-[mt,6,8,@sm,@lg]">
          <Timeline timelineData={deliveryTimeLine} />
        </div>
      </div>

      <Button
        onClick={() => setOpenDrawer(true)}
        className="text-[#A46900] w-full max-w-sm rounded-[8px] clamp-[text,sm,base,@sm,@lg] font-semibold bg-[#FFF9E9] hover:bg-[#fcf2d8] !clamp-[py,4,5,@sm,@lg] !clamp-[px,2,4,@sm,@lg] cursor-pointer space-x-[2px] h-auto"
      >
        <Icon icon="clock-fast-forward" className="size-[20px]" />
        View order timelime
      </Button>

      {/* Order details */}
      <div className="clamp-[my,8,10,@sm,@lg]">
        <div className="between">
          <h5 className="text-[#1D2939] font-semibold clamp-[text,base,lg,@sm,@lg]">
            Order Summary
          </h5>
        </div>

        <div className="clamp-[mt,3,4,@sm,@lg]">
          <Pallet2 title={"Sub-total (2 items)"} value={3600} />
          <Pallet2 title={"Service Fee"} value={2600} />
          <Pallet2 title={"Delivery Fee"} value={1800} />
          <Pallet2 title={"Total bill"} value={4267} isTotal />
        </div>
      </div>

      <Button
        variant={"outline"}
        className="text-[#D92D20] hover:text-[#D92D20] border border-[#D92D20] hover:bg-[#fbdddb]/20 font-inter clamp-[text,sm,base,@sm,@lg] font-semibold bg-transparent !clamp-[py,1.125rem,1.375rem,@sm,@lg] w-full max-w-sm h-auto rounded-[8px]"
      >
        Report an incident
      </Button>

      <DrawerC open={openDrawer} setOpen={setOpenDrawer}>
        <div className="p-5">
          <div className="grid gap-2">
            <h3 className="text-[#475467] text-base">Total Time</h3>
            <p className="text-[#101828] text-xl font-semibold">40 mins</p>
          </div>

          <div className="clamp-[mt,6,8,@sm,@lg]">
            <Timeline timelineData={timelineData} />
          </div>
        </div>
      </DrawerC>

      <DrawerC open={openRateDrawer} setOpen={setOpenRateDrawer}>
        <div className="p-5">
          <div className="grid gap-2 text-center">
            <h3 className="text-[#101828] text-xl font-semibold">
              Rate your rider
            </h3>
            <p className="text-[#475467] text-base mt-2">
              What do you think about your rider
            </p>
          </div>

          <div className="between max-w-[353] mx-auto clamp-[mt,6,8,@sm,@lg] px-[36.5px]">
            <SadFace />
            <FrownFace />
            <NeutralFace />
            <SmileFace />
            <HappyFace />
          </div>

          <div className="clamp-[mt,8,10,@sm,@lg] w-full col-center">
            <label
              className="text-[#101828] text-xl font-semibold"
              htmlFor="feedback"
            >
              Drop a feedback
            </label>

            <textarea
              placeholder="Is there anything you will like us to know about this rider? Drop a feedback here."
              id="feedback"
              rows={5}
              className="clamp-[py,3.5,4,@sm,@lg] clamp-[px,4,5,@sm,@lg] clamp-[mt,4,5,@sm,@lg] clamp-[text,sm,base,@sm,@lg] border border-[#D0D5DD] focus:outline-none rounded-[8px] min-w-[353]"
            ></textarea>

            <Button className="bg-[#FFC247] hover:bg-[#fcb526] rounded-[8px] w-full max-w-[353] clamp-[mt,5,6,@sm,@lg] !clamp-[py,1.125rem,1.375rem,@sm,@lg] h-auto text-[#59201A] clamp-[text,sm,base,@sm,@lg] font-semibold">
              Submit Feedback
            </Button>
          </div>
        </div>
      </DrawerC>
    </div>
  );
};

export default OrderDetails;
