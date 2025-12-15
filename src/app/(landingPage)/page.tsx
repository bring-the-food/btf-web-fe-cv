"use client";

import Dialog from "@/components/DialgC";
import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [underCModal, setUnderCModal] = React.useState(false);

  return (
    <>
      <div className="container_fluid">
        <h4 className="font-caprasimo clamp-[text,2.7rem,5.5rem] text-center clamp-[leading,3.6rem,6.72rem]">
          Life Begins <br /> After Eating
        </h4>

        <p className="clamp-[mt,2,3] text-center clamp-[text,xs,xl] lg:leading-[19.84px] tracking-[0.32px]">
          With food comes hope. Let&apos;s bring it to you!
        </p>

        <div className="clamp-[gap,4,6] clamp-[mt,8,9] grid md:grid-cols-2 w-fit mx-auto">
          <Button
            onClick={() => setUnderCModal(true)}
            className="clamp-[py,1.125rem,1.375rem,@sm,lg]! clamp-[px,1rem,1.25rem,@sm,lg]! clamp-[text,base,lg] font-medium"
          >
            <Icon
              icon="playstore"
              h={18.999780654907227}
              w={17.305557250976562}
            />
            Download on Google Play
          </Button>
          <Button
            onClick={() => setUnderCModal(true)}
            className="clamp-[py,1.125rem,1.375rem,@sm,lg]! clamp-[px,1rem,1.25rem,@sm,lg]! clamp-[text,base,lg] font-medium"
          >
            <Icon icon="iphone" h={18.999780654907227} w={17.305557250976562} />
            Download on App Store
          </Button>
        </div>
      </div>

      <div className="bg-[url('/images/mobile_phone.png')] sm:h-[350px] md:h-[400px] clamp-[h,12.5rem,25rem]  xl:h-[650px] max-w-[1560px] xl:mx-auto bg-position-[50%_0.5%]  sm:bg-position-[50%_8.5%] bg-cover" />

      <div className="bg-[#FFF9E9]">
        <div className="container_fluid clamp-[py,5.625rem,8.5rem] ">
          <h4 className="font-caprasimo clamp-[text,2rem,4rem] text-center clamp-[leading,2.5rem,4.64rem]">
            Give and Get <br /> What You Love
          </h4>

          <div>
            <div className="space-y-10 lg:space-y-0 lg:space-x-10 clamp-[mt,12,20] col-center lg:flex-row! lg:justify-between!">
              <Pallet
                icon="store"
                desc="Focus on making delicious food. We handle the rest!"
                title="Vendors"
                header="Set Up, Sell More, Stress Less"
                descD="Grow with every order and reach more customers."
                setUnderCModal={setUnderCModal}
              />
              <Pallet
                icon="order"
                desc="No more “is there turkey?” Enjoy seamless ordering!"
                title="Consumers"
                header="Get your Food and Groceries ASAP"
                descD="Your order is only few clicks away!"
                setUnderCModal={setUnderCModal}
              />
              <Pallet
                icon="bike"
                desc="Own a bike or bikes? Earn more delivering food!"
                title="Riders"
                header="Earn More by Delivering Food"
                descD="Deliver steady and earn while at it"
                setUnderCModal={setUnderCModal}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFE7B0]">
        <div className="container_fluid clamp-[py,4.625rem,7.75rem] grid lg:grid-cols-2 gap-y-20 lg:gap-x-10 xl:gap-x-[148px]">
          <div>
            <h2 className="font-caprasimo clamp-[text,2rem,4rem] clamp-[leading,2.5rem,4.64rem] text-center lg:text-left">
              Good Food. <br /> Great Vibes.
            </h2>
            <p className="clamp-[mt,2,3] clamp-[leading,1.2rem,1.44rem] clamp-[text,sm,lg] text-center lg:text-left">
              We partner with brands and people you&apos;ll <br /> love to bring
              authentic flavours home.
            </p>

            <div className="grid grid-cols-2 clamp-[gap,3,6] clamp-[mt,7,9]">
              <Pallet2
                icon="brand"
                title={
                  <span>
                    Great Brand <br /> Selection
                  </span>
                }
              />
              <Pallet2
                icon="quick"
                title={
                  <span>
                    Quick & Reliable <br /> Delivery
                  </span>
                }
              />
              <Pallet2
                icon="tracking"
                title={
                  <span>
                    Real-Time Order <br /> Tracking
                  </span>
                }
              />
              <Pallet2
                icon="fav"
                title={
                  <span>
                    Easy In-App <br /> Ordering
                  </span>
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 clamp-[gap,3,6] items-stretch ">
            <Image
              className="row-span-2 object-cover rounded lg:rounded-3xl w-full"
              src="/images/Image.png"
              alt=""
              width={282}
              height={609.75}
            />
            <Image
              className="object-cover rounded lg:rounded-3xl w-full"
              src="/images/Image-1.png"
              alt=""
              width={282}
              height={292.8800048828125}
              priority
            />
            <Image
              className="object-cover rounded lg:rounded-3xl w-full"
              src="/images/Image-2.png"
              alt=""
              width={282}
              height={292.8800048828125}
              priority
            />
          </div>
        </div>
      </div>

      <Dialog
        header={"Applications are under construction"}
        desc={"Thank you for wanting to join the movement!"}
        open={underCModal}
        setOpen={setUnderCModal}
        showCloseButton={false}
      />
    </>
  );
}

const Pallet = ({
  icon,
  desc,
  title,
  header,
  descD,
  setUnderCModal,
}: {
  title: string;
  icon: string;
  desc: string;
  header: string;
  descD: string;
  setUnderCModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <Dialog
        trigger={
          <button className="rounded-full">
            <div className="bg-[#310909] hover:bg-[#200606] transition-colors rounded-full col-center clamp-[pt,7,8] clamp-[pb,5,6] clamp-[px,1.3rem,2.6875rem] clamp-[size,14rem,18rem]">
              <div className="bg-[#FFE7B0] clamp-[size,4rem,6.5rem] rounded-full center">
                <Icon
                  icon={icon}
                  size={46.117645263671875}
                  className="clamp-[size,1.625rem,2.875rem]"
                />
              </div>

              <p className="text-[#FFF9E9] clamp-[text,sm,base] leading-normal font-medium clamp-[mt,5,6] clamp-[mb,6,7] text-center">
                {desc}
              </p>

              <Icon icon="share_light" size={24} className="clamp-[size,5,6]" />
            </div>
          </button>
        }
        header={header}
        desc={descD}
        isDownload
        downloadRes={setUnderCModal}
        showCloseButton={false}
      />
      <h5 className="font-caprasimo lg:leading-[37.12px] tracking-[0.32px] clamp-[text,1.5rem,2rem] clamp-[mt,6,8] text-center">
        {title}
      </h5>
    </div>
  );
};

const Pallet2 = ({ icon, title }: { title: React.ReactNode; icon: string }) => {
  return (
    <div className="bg-[#FCF3D9] rounded-[12px] clamp-[py,4,6] clamp-[px,1,6]">
      <div className="bg-[#310909] rounded-full center clamp-[size,8,12] mx-auto">
        <Icon icon={icon} size={24} />
      </div>

      <h6 className="font-caprasimo clamp-[text,sm,lg] clamp-[leading,5,6] tracking-[0.2px] text-center clamp-[mt,2,3] px-1 ">
        {title}
      </h6>
    </div>
  );
};
