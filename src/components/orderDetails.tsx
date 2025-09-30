/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Icon from "@/components/Icon";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { DrawerC } from "./Drawer";
import OrderSummary from "./OrderSummary";
import { FrownFace, HappyFace, NeutralFace, SadFace, SmileFace } from "./Svgs";
import { orderFunc } from "./functions/order";
import LoadingButton from "./LoadingButton";

const OrderDetails = ({ data }: { data: any }) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [openRateDrawer, setOpenRateDrawer] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const timelineData = [
    {
      title: "Order Received",
      desc: "Waiting for vendor to confirm your order",
      date: moment(data?.order?.trackings?.[0]?.dateCreated).format("lll"),
      isCompleted: data?.order?.trackings?.[0]?.status === "success",
    },
    {
      title: "Vendor Accepted Order",
      desc: "The vendor has confirm your order",
      date: moment(data?.order?.trackings?.[1]?.dateCreated).format("lll"),
      isCompleted: data?.order?.trackings?.[1]?.status === "success",
    },
    {
      title: "You Order has been Packed",
      desc: "Your order is ready to be picked",
      date: moment(data?.order?.trackings?.[2]?.dateCreated).format("lll"),
      isCompleted: data?.order?.trackings?.[2]?.status === "success",
    },
    {
      title: "Rider Accepted Order",
      desc: "Rider has picked your order",
      date: moment(data?.order?.trackings?.[3]?.dateCreated).format("lll"),
      isCompleted: data?.order?.trackings?.[3]?.status === "success",
    },
    {
      title: "Order in Transit",
      desc: "Your order is on it's way to you",
      date: moment(data?.order?.trackings?.[4]?.dateCreated).format("lll"),
      isCompleted: data?.order?.trackings?.[4]?.status === "success",
    },
    {
      title: "Order Complete",
      desc: "",
      date: moment(data?.order?.trackings?.[5]?.dateCreated).format("lll"),
      isCompleted: data?.order?.trackings?.[5]?.status === "success",
    },
  ];

  const timelines = data?.order?.timelines;
  const deliveryTimeLine = [
    {
      title:
        timelines?.[0]?.location?.description +
        (timelines?.[0]?.location?.description ? ", " : "") +
        timelines?.[0]?.location?.street +
        ", " +
        timelines?.[0]?.location?.city,
      desc: moment(timelines?.[0]?.dateCreated).format("ddd, Do MMM, YYYY"),
      date: moment(timelines?.[0]?.dateCreated).format("LT"),
      isCompleted: timelines?.[0]?.status === "success",
    },
    {
      title:
        timelines?.[1]?.location?.description +
        (timelines?.[1]?.location?.description ? ", " : "") +
        timelines?.[1]?.location?.street +
        ", " +
        timelines?.[1]?.location?.city,
      desc: moment(timelines?.[1]?.dateCreated).format("ddd, Do MMM, YYYY"),
      date: moment(timelines?.[1]?.dateCreated).format("LT"),
      isCompleted: timelines?.[1]?.status === "success",
    },
  ];

  const handleRateRider = async () => {
    try {
      setLoading(true);
      await orderFunc.rateRider(data?.order?.rider?.id, {
        text: review,
        rating: rating as number,
      });
      setLoading(false);
      setOpenRateDrawer(false);
    } catch {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {data?.order?.rider && (
        <div className="between">
          <div className="start clamp-[pt,4,6,@sm,@lg] clamp-[pb,3.5,5,@sm,@lg]">
            <Image
              className="clamp-[size,12,20,@sm,@lg] rounded-full object-center"
              src={
                data?.order?.rider?.picture.url ??
                "/images/logo_placeholder.png"
              }
              alt={data?.order?.rider?.name ?? "placeholder logo"}
              width={48}
              height={48}
              priority
            />

            <div className="clamp-[ml,3,5,@sm,@lg]">
              <h6 className="text-[#101828] font-semibold clamp-[text,base,xl,@sm,@lg] leading-none">
                {data?.order?.rider?.name}
              </h6>

              <p
                className={`clamp-[text,sm,base,@sm,@lg] clamp-[mt,1,2,@sm,@lg] text-[#667085] capitalize`}
              >
                {data?.order?.rider?.role?.main?.toLowerCase()}
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
      )}

      <h5 className="text-[#59201A] font-semibold clamp-[text,sm,base,@sm,@lg] clamp-[my,8,10,@sm,@lg]">
        Order ID. {data?.order?.slug}
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
          <OrderSummary summary={data?.order?.summary} />
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
            <SadFace active={rating === 1} onClick={() => setRating(1)} />
            <FrownFace active={rating === 2} onClick={() => setRating(2)} />
            <NeutralFace active={rating === 3} onClick={() => setRating(3)} />
            <SmileFace active={rating === 4} onClick={() => setRating(4)} />
            <HappyFace active={rating === 5} onClick={() => setRating(5)} />
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
              value={review}
              onChange={(e) => setReview(e?.target?.value)}
            />

            <LoadingButton
              onClick={handleRateRider}
              isLoading={loading}
              className="bg-[#FFC247] hover:bg-[#fcb526] rounded-[8px] w-full max-w-[353] clamp-[mt,5,6,@sm,@lg] !clamp-[py,1.125rem,1.375rem,@sm,@lg] h-auto text-[#59201A] clamp-[text,sm,base,@sm,@lg] font-semibold"
            >
              Submit Feedback
            </LoadingButton>
          </div>
        </div>
      </DrawerC>
    </div>
  );
};

export default OrderDetails;
