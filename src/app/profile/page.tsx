"use client";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const router = useRouter();

  return (
    <div className="col-start-center clamp-[px,5,12,@sm,@lg] clamp-[py,10,20,@sm,@lg] w-full">
      <Image
        className="clamp-[mb,3.5,8,@sm,@lg] clamp-[w,3.8125rem,8rem,@sm,@lg]"
        src="/svg/logo.svg"
        alt="Bring this food logo"
        width={61}
        height={48}
        priority
      />

      <div className="w-full">
        <div className="clamp-[my,1.3125rem,1.5625rem,@sm,@lg] center w-full">
          <button
            className="mr-auto hover:bg-gray-100 p-1 rounded"
            onClick={() => router.back()}
          >
            <Icon icon="left" size={16} />
          </button>

          <h4 className="text-[#1D2939] font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal text-center mr-auto clamp-[ml,0,-8,@sm,@lg]">
            Vendor Profile
          </h4>
        </div>

        <div className="space-y-5 md:space-y-8 clamp-[mt,6,8,@sm,@lg]">
          <div className="clamp-[pt,3.5,5,@sm,@lg] between">
            <div className="start">
              <Image
                className="clamp-[w,10,16,@sm,@lg]"
                src="/images/logo_placeholder.png"
                alt="Placeholder logo"
                width={40}
                height={40}
                priority
              />

              <div className="clamp-[ml,2,4,@sm,@lg]">
                <h6 className="font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal">
                  Mola Foods
                </h6>
              </div>
            </div>

            <Link href={`/?tab=cart`}>
              <Button className="text-[#A46900] rounded-full clamp-[text,xs,sm,@sm,@lg] font-semibold bg-[#FFF9E9] hover:bg-[#fcf2d8] !clamp-[py,1.5,2,@sm,@lg] !clamp-[px,2,4,@sm,@lg] cursor-pointer space-x-[2px] h-auto">
                <span>Refer Vendor</span>
                <Icon
                  icon="share"
                  size={12}
                  className="clamp-[size,3,4,@sm,@lg]"
                />
              </Button>
            </Link>
          </div>

          <div className="clamp-[mt,2,3,@sm,@lg] space-y-2">
            <div className="start space-x-2">
              <Icon
                icon="marker2"
                size={20}
                className="clamp-[size,4,5,@sm,@lg]"
              />

              <p className="text-[#344054] clamp-[text,sm,base,@sm,@lg] leading-normal">
                Fashina bus stop, ibadan road, Ile-ife 200113, Osun, Nigeria.
              </p>
            </div>

            <div className="clamp-[py-2,3,@sm,@lg] start space-x-5 clamp-[mt,4,6,@sm,@lg]">
              <p className="col-start clamp-[text,xs,sm,@sm,@lg] font-medium">
                <span className="text-[#98A2B3] ">Average Meal Price</span>
                <span className="text-[#1D2939] mt-1">N5000</span>
              </p>
              <div className="bg-[#F2F4F7] clamp-[h,5,6,@sm,@lg] w-px" />
              <p className="col-start clamp-[text,xs,sm,@sm,@lg] font-medium">
                <span className="text-[#98A2B3] ">Delivery Fee</span>
                <span className="text-[#1D2939] mt-1">N600 - N1500</span>
              </p>
              <div className="bg-[#F2F4F7] clamp-[h,5,6,@sm,@lg] w-px" />
              <p className="col-start clamp-[text,xs,sm,@sm,@lg] font-medium">
                <span className="text-[#98A2B3] ">Expect In</span>
                <span className="text-[#1D2939] mt-1">20 - 40 min</span>
              </p>
            </div>
          </div>

          <div className="text-[#1D2939]">
            <h4 className="font-semibold clamp-[text,base,lg,@sm,@lg]">
              Opening hours
            </h4>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 clamp-[gap,4,6,@sm,@lg]">
              <Pallet title="Monday" value={"9:00 am - 09:00 pm"} />
              <Pallet title="Tuesday" value={"9:00 am - 09:00 pm"} />
              <Pallet title="Wednesday" value={"9:00 am - 09:00 pm"} />
              <Pallet title="Thursday" value={"9:00 am - 09:00 pm"} />
              <Pallet title="Friday" value={"9:00 am - 09:00 pm"} />
              <Pallet title="Saturday" value={"9:00 am - 09:00 pm"} />
              <Pallet title="Sunday" value={"Closed"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

type PalletProps = {
  title: string;
  value: string;
};

const Pallet = ({ title, value }: PalletProps) => {
  return (
    <div className="col-start">
      <h6
        className={`clamp-[text,sm,base,@sm,@lg] leading-medium text-[#1D2939] font-semibold`}
      >
        {title}
      </h6>

      <p
        className={`mt-1 text-[#475467] clamp-[text,sm,base,@sm,@lg] leading-normal`}
      >
        {value}
      </p>
    </div>
  );
};
