"use client";

import { DialogC } from "@/components/Dialog";
import Icon from "@/components/Icon";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { koboToNaira } from "@/lib/formatCurrency";
import React from "react";

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
  },
  {
    title: "Rider Accepted Order",
    desc: "Rider has picked your order",
    date: "06:59 AM",
  },
  {
    title: "Order in Transit",
    desc: "Your order is on it's way to you",
    date: "06:59 AM",
  },
  {
    title: "Order Complete",
    desc: "",
    date: "06:59 AM",
  },
];

const TrackOrder = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handlePhoneInput = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <h6 className="text-[#1D2939] font-semibold clamp-[mt,5,8,@sm,@lg] clamp-[text,base,lg,@sm,@lg]">
        Mikun Sarafadeen
      </h6>
      <p className="text-[#475467] clamp-[text,xs,sm,@sm,@lg] font-inter mt-2">
        Your order will be delivered shortly
      </p>
      <h5 className="text-[#59201A] font-semibold clamp-[text,sm,base,@sm,@lg] clamp-[my,6,9,@sm,@lg]">
        Order ID. BTF124Z
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

        <div>
          <p className="font-medium text-[#1D2939] clamp-[text,sm,base,@sm,@lg] space-x-1.5 md:space-x-2.5">
            <span className="clamp-[p,3.5,4,@sm,@lg] bg-white rounded-[2px] ">
              0
            </span>
            <span className="clamp-[p,3.5,4,@sm,@lg] bg-white rounded-[2px] ">
              0
            </span>
            <span className="clamp-[p,3.5,4,@sm,@lg] bg-white rounded-[2px] ">
              1
            </span>
          </p>
        </div>
      </div>
      {/* Delivery details */}
      <div className="clamp-[my,6,8,@sm,@lg]">
        <h5 className="text-[#1D2939] font-semibold clamp-[text,base,lg,@sm,@lg]">
          Delivery details
        </h5>

        <div className="start space-x-2 clamp-[mt,5,6,@sm,@lg]">
          <Icon icon="marker2" size={20} className="clamp-[size,4,5,@sm,@lg]" />

          <p className="text-[#1D2939] clamp-[text,sm,base,@sm,@lg] leading-normal">
            Adereti , Damico, Ile-ife, Osun, Nigeria
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
              This number will be called upon rider&apos;s arrival; 070123456789
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
              Yummy Flavour
            </p>
          </div>

          <Button className="rounded-full bg-[#FFF0C7] hover:bg-[#fae9ba] clamp-[py,1.5,2.5,@sm,@lg] clamp-[px,2.5,3.5,@sm,@lg] text-[#59201A] clamp-[text,xs,sm,@sm,@lg]">
            CALL RIDER
          </Button>
        </div>

        <div className="clamp-[mt,4,6,@sm,@lg] space-y-4 md:space-y-5">
          <Pallet
            name={"Pack 1"}
            desc="Amala Wrap (2 x), Egusi Soup (1 x) , Complimentary Coke (1 x)."
            price={3600}
          />
          <Pallet name={"Amala Combo"} desc="1x" price={2600} />
          <Pallet name={"Jollof Rice Combo"} desc="1x" price={1800} />
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
              className="text-[#1E2024] text-sm leading-5 font-normal tracking-[12%] !px-3 !py-4 !rounded-[8px] h-auto"
            />
          </div>

          <Button
            onClick={handlePhoneInput}
            className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer rounded-[8px] text-[#59201A] text-sm font-semibold leading-5 py-[18px]"
          >
            Update
          </Button>
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
