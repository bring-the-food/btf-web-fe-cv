import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import Icon from "./Icon";

type DialogProps = {
  trigger?: React.ReactNode;
  header: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const vendors = [
  { name: "Mola Foods", cat: "Groceries" },
  { name: "Iya Sara", cat: "Food" },
  { name: "Yummy Flavour", cat: "Food" },
  { name: "Iya Maryam", cat: "Food" },
  { name: "Leeyah's Kitchen", cat: "Food" },
  { name: "Ongbona Kitchen", cat: "Food" },
];

const FeaturedVendor = ({ trigger, header, open, setOpen }: DialogProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className="bg-[#FFF9E9] md:p-12 w-full sm:max-w-[420px] lg:max-w-[756px] max-h-[min(90vh,1122px)] flex flex-col"
        >
          <DialogTitle className="hidden"></DialogTitle>
          <h5 className="font-caprasimo text-2xl lg:text-5xl leading-9 lg:leading-[89.6px] tracking-[0.6px] text-left w-full">
            {header}
          </h5>

          <div className="mt-4 lg:mt-8 space-y-3 lg:space-y-6 overflow-y-auto lg:pr-7 flex-grow">
            {vendors?.map((vendor, index) => {
              return (
                <button
                  key={index}
                  className="start w-full hover:bg-gray-50 bg-white border border-[#E4E7EC] px-3 py-6 lg:px-4 lg:py-7 rounded-[8px] lg:rounded-[16px] space-x-1.5 lg:space-x-3"
                >
                  <Image
                    src="/images/food_placeholder.png"
                    width={60}
                    height={60}
                    alt="food placeholder"
                    className="rounded-full object-cover size-8 lg:!size-12"
                  />

                  <p className="text-[#310909] text-base lg:text-[28px] font-semibold lg:not-only:leading-[50.4px] tracking-[0.32px]">
                    {vendor?.name}
                  </p>

                  <p className="bg-[#FFE7B0] rounded-full border border-[#FFF0C7] py-1 px-2 lg:py-1.5 lg:px-4 text-[8px] lg:text-xs font-semibold leading-normal hidden sm:inline-block">
                    {vendor?.cat}
                  </p>

                  <Icon
                    icon="c_right"
                    size={32}
                    className="!size-5 lg:size-[28px] ml-auto"
                  />
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeaturedVendor;
