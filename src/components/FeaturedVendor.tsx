/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import Icon from "./Icon";
import { swrfetcher } from "@/lib/swrfetcher";
import useSWR from "swr";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

type DialogProps = {
  trigger?: React.ReactNode;
  header: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const FeaturedVendor = ({ trigger, header, open, setOpen }: DialogProps) => {
  const { data, isLoading } = useSWR(
    `/api/home/getFeaturedVendors`,
    swrfetcher
  );

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

          {isLoading ? (
            <div className="mx-auto">
              <Loader2Icon className="animate-spin clamp-[size,8,14,@sm,@lg] clamp-[my,20,32,@sm,@lg] mx-auto" />
            </div>
          ) : (
            <div className="mt-4 lg:mt-8 space-y-3 lg:space-y-6 overflow-y-auto lg:pr-7 flex-grow">
              {data?.data?.map((vendor: any, index: number) => {
                return (
                  <Link
                    key={index}
                    href={`/store/${vendor?.slug}`}
                    className="block"
                  >
                    <button className="start w-full hover:bg-gray-50 bg-white border border-[#E4E7EC] px-3 py-6 lg:px-4 lg:py-7 rounded-[8px] lg:rounded-[16px] space-x-1.5 lg:space-x-3">
                      <Image
                        src={
                          vendor?.picture?.url ?? "/images/food_placeholder.png"
                        }
                        width={60}
                        height={60}
                        alt={vendor?.name?.at(0)}
                        className="rounded-full object-cover size-8 lg:!size-12 bg-gray-300 overflow-hidden text-center center font-bold lg:text-2xl"
                      />

                      <p className="text-[#310909] text-base lg:text-[28px] font-semibold lg:not-only:leading-[50.4px] tracking-[0.32px]">
                        {vendor?.name}
                      </p>

                      {vendor?.category && (
                        <p className="bg-[#FFE7B0] rounded-full border border-[#FFF0C7] py-1 px-2 lg:py-1.5 lg:px-4 text-[8px] lg:text-xs font-semibold leading-normal hidden sm:inline-block">
                          {vendor?.category}
                        </p>
                      )}

                      <Icon
                        icon="c_right"
                        size={32}
                        className="!size-5 lg:size-[28px] ml-auto"
                      />
                    </button>
                  </Link>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeaturedVendor;
