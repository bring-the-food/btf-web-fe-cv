/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DialogC } from "@/components/Dialog";
import Icon from "@/components/Icon";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { koboToNaira } from "@/lib/formatCurrency";
import moment from "moment";
import React from "react";
import { orderFunc } from "./functions/order";
import LoadingButton from "./LoadingButton";
import { mutate } from "swr";
import { cn } from "@/lib/utils";

const TrackOrder = ({ data }: { data: any }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handlePhoneInput = async () => {
    try {
      setLoading(true);
      await orderFunc.updateTel(data?.order?.id, { telephone: phoneNumber });
      mutate(`/api/orders/getOrder?orderId=${data?.order?.id}`);
      setLoading(false);
      setOpenModal(false);
    } catch {
      setLoading(false);
    }
  };

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

  return (
    <div>
      <div className="between">
        <div>
          <h6 className="text-[#1D2939] font-semibold clamp-[mt,5,8,@sm,@lg] clamp-[text,base,lg,@sm,@lg] capitalize">
            {data?.order?.customer?.name}
          </h6>
          <p className="text-[#475467] clamp-[text,xs,sm,@sm,@lg] font-inter mt-2">
            Your order will be delivered shortly
          </p>
        </div>

        <div>
          <p
            className={cn(
              data?.order?.status === "ongoing" &&
                "text-[#B54708] bg-[#FFFAEB] border-[#FEDF89]",
              data?.order?.status === "complete"
                ? "text-[#027A48] bg-[#A6F4C51A] border-[#A6F4C5]"
                : "text-[#B42318] bg-[#FEF3F2] borer-[#FECDCA]",
              "capitalize border rounded-full px-2 font-medium text-[10px] leading-[18px]"
            )}
          >
            {data?.order?.status === "ongoing"
              ? "pending"
              : data?.order?.status === "complete"
              ? "successful"
              : data?.order?.status}
          </p>
        </div>
      </div>
      <h5 className="text-[#59201A] font-semibold clamp-[text,sm,base,@sm,@lg] clamp-[my,6,9,@sm,@lg]">
        Order ID. {data?.order?.slug}
      </h5>
      <div className="bg-[#EEF6F3] clamp-[p,4,5,@sm,@lg] rounded-[8] between space-x-[15px]">
        <div>
          <h6 className="text-[#344054] clamp-[text,sm,base,@sm,@lg] font-semibold start">
            <span>Rider confirmation code</span>
            <Icon
              icon="Info icon"
              className="clamp-[ml,1.5,2.5,@sm,@lg] clamp-[size,0.875rem,1rem,@sm,@lg]"
            />
          </h6>
          <p className="text-[#475467] clamp-[text,xs,sm,@sm,@lg] clamp-[mt,1,2,@sm,@lg]">
            Rider will request for this code from you upon arrival please ensure
            it you have it ready.
          </p>
        </div>

        {data?.order?.confirmationCode && (
          <p className="font-medium text-[#1D2939] clamp-[text,sm,base,@sm,@lg] space-x-1.5 md:space-x-2.5">
            <span className="clamp-[p,3.5,4,@sm,@lg] bg-white rounded-[2px] ">
              {data?.order?.confirmationCode[0]}
            </span>
            <span className="clamp-[p,3.5,4,@sm,@lg] bg-white rounded-[2px] ">
              {data?.order?.confirmationCode[1]}
            </span>
            <span className="clamp-[p,3.5,4,@sm,@lg] bg-white rounded-[2px] ">
              {data?.order?.confirmationCode[2]}
            </span>
          </p>
        )}
      </div>
      {/* Delivery details */}
      <div className="clamp-[my,6,8,@sm,@lg]">
        <h5 className="text-[#1D2939] font-semibold clamp-[text,base,lg,@sm,@lg]">
          Delivery details
        </h5>

        <div className="start space-x-2 clamp-[mt,5,6,@sm,@lg]">
          <Icon icon="marker2" size={20} className="clamp-[size,4,5,@sm,@lg]" />

          <p className="text-[#1D2939] clamp-[text,sm,base,@sm,@lg] leading-normal">
            {data?.order?.delivery?.location?.description +
              (data?.order?.delivery?.location?.description ? ", " : "") +
              data?.order?.delivery?.location?.street +
              ", " +
              data?.order?.delivery?.location?.city}
          </p>
        </div>

        <div className="between space-x-2 clamp-[mt,5,6,@sm,@lg]">
          <div className="start space-x-2">
            <Icon
              icon="message"
              size={20}
              className="clamp-[size,4,5,@sm,@lg]"
            />

            <p className="text-[#1D2939] font-medium clamp-[text,sm,base,@sm,@lg] leading-5">
              This number will be called upon rider&apos;s arrival;{" "}
              {data?.order?.delivery?.telephone}
            </p>
          </div>

          <Button
            onClick={() => setOpenModal(true)}
            className="rounded-full bg-[#FFF0C7] hover:bg-[#fae9ba] clamp-[py,1.5,2.5,@sm,@lg] clamp-[px,2.5,3.5,@sm,@lg] text-[#59201A] clamp-[text,xs,sm,@sm,@lg]"
          >
            UPDATE
          </Button>
        </div>
      </div>
      {/* Order tracking */}
      <div className="clamp-[my,6,8,@sm,@lg]">
        <h5 className="text-[#1D2939] font-semibold clamp-[text,base,lg,@sm,@lg]">
          Order Tracking
        </h5>

        <div className="clamp-[mt,6,8,@sm,@lg]">
          <Timeline timelineData={timelineData} />
        </div>
      </div>
      {/* Order details */}
      <div className="clamp-[my,6,8,@sm,@lg]">
        <div className="between">
          <div>
            <h5 className="text-[#1D2939] font-semibold clamp-[text,base,lg,@sm,@lg]">
              Order Details
            </h5>
            <p className="text-[#475467] clamp-[text,xs,sm,@sm,@lg] clamp-[mt,2,2.5,@sm,@lg]">
              {data?.order?.store?.name}
            </p>
          </div>

          {data?.order?.rider?.telephone && (
            <a href={`tel:${data?.order?.rider?.telephone}`}>
              <Button className="rounded-full bg-[#FFF0C7] hover:bg-[#fae9ba] clamp-[py,1.5,2.5,@sm,@lg] clamp-[px,2.5,3.5,@sm,@lg] text-[#59201A] clamp-[text,xs,sm,@sm,@lg]">
                CALL RIDER
              </Button>
            </a>
          )}
        </div>

        <div className="clamp-[mt,4,6,@sm,@lg] space-y-4 md:space-y-5">
          {data?.order?.packs.map((pack: any, packIndex: number) => {
            const totalPrice = pack.reduce(
              (sum: number, item: any) => sum + item.price.amount,
              0
            );

            const desc = pack
              .map((item: any) => `${item.name} (${item.count} x)`)
              .join(", ");

            return (
              <Pallet
                key={packIndex}
                name={`Pack ${packIndex + 1}`}
                desc={desc}
                price={totalPrice}
              />
            );
          })}
          {data?.order?.combos?.map((c: any, i: string) => (
            <Pallet
              key={i}
              name={c?.name}
              desc={`${c?.count}x`}
              price={c?.price?.amount}
            />
          ))}
        </div>
      </div>

      <DialogC open={openModal} setOpen={setOpenModal}>
        <div className="grid gap-4 text-[#1D2939] mt-4 text-center px-4">
          <h3 className="font-semibold leading-normal text-[20px]">
            Update phone number
          </h3>
          <p className="text-[#475467] text-sm leading-5 font-normal">
            This is the number riders will call to reach you during delivery.
          </p>

          <div className="grid gap-3 mt-5 mb-6">
            <Label
              htmlFor="phone"
              className="text-sm leading-5 font-semibold text-[#1E2024]"
            >
              Phone number<span className="text-[#F6211A]">*</span>
            </Label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+234 XXXXXXXXXX"
              className="text-[#1E2024] text-sm leading-5 font-normal tracking-[12%] !px-3 !py-4 !rounded-xl h-auto"
            />
          </div>

          <LoadingButton
            isLoading={loading}
            onClick={handlePhoneInput}
            className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer rounded-xl text-[#59201A] text-sm font-semibold leading-5 py-[18px]"
          >
            Update
          </LoadingButton>
        </div>
      </DialogC>
    </div>
  );
};

const Pallet = ({
  name,
  price,
  desc,
}: {
  name: string;
  price: number;
  desc: string;
}) => {
  return (
    <div className="between space-x-[73px] md:space-x-[100px]">
      <div className="start-start">
        <Icon
          icon="star"
          size={12}
          className="clamp-[size,0.75rem,0.875rem,@sm,@lg]"
        />

        <div className="clamp-[ml,0.8125rem,1.0625rem,@sm,@lg]">
          <h6 className="clamp-[text,xs,sm,@sm,@lg] font-medium leading-normal text-[#1D2939]">
            {name}
          </h6>
          <p className="text-[#98A2B3] font-normal clamp-[text,xs,sm,@sm,@lg] leading-normal">
            {desc}
          </p>
        </div>
      </div>

      <p className="text-[#344054] font-medium clamp-[text,xs,sm,@sm,@lg] leading-normal">
        {koboToNaira(price)}
      </p>
    </div>
  );
};

export default TrackOrder;
