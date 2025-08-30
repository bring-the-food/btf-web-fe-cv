"use client";

import Icon from "@/components/Icon";
import MFooter from "@/components/MFooter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    // clamp-[px,5,12]
    <main className="bg-[#FFC247] w-full">
      <Navbar />

      <div className="clamp-[my,5rem,6rem]">
        <div className="container_fluid">
          <h4 className="font-caprasimo clamp-[text,2.7rem,5.5rem] text-center clamp-[leading,3.6rem,6.72rem]">
            Life Begins <br /> After Eating
          </h4>

          <p className="clamp-[mt,2,3] text-center clamp-[text,xs,xl] lg:leading-[19.84px] tracking-[0.32px]">
            With food comes hope. Let&apos;s bring it to you!
          </p>

          <div className="clamp-[gap,4,6] clamp-[mt,8,9] grid md:grid-cols-2 w-fit mx-auto">
            <Button className="!clamp-[py,1.125rem,1.375rem,@sm,lg] !clamp-[px,1rem,1.25rem,@sm,lg] clamp-[text,base,lg] font-medium">
              <Icon
                icon="playstore"
                h={18.999780654907227}
                w={17.305557250976562}
              />
              Download on Google Play
            </Button>
            <Button className="!clamp-[py,1.125rem,1.375rem,@sm,lg] !clamp-[px,1rem,1.25rem,@sm,lg] clamp-[text,base,lg] font-medium">
              <Icon
                icon="iphone"
                h={18.999780654907227}
                w={17.305557250976562}
              />
              Download on App Store
            </Button>
          </div>
        </div>

        <div className="bg-[url('/images/mobile_phone.png')] sm:h-[350px] md:h-[400px] h-[600px] xl:h-[650px] max-w-[1560px] xl:mx-auto bg-[50%_8.5%] bg-cover" />

        <div className="bg-[#FFF9E9]">
          <div className="container_fluid clamp-[py,5.625rem,8.5rem] ">
            <h4 className="font-caprasimo clamp-[text,2rem,4rem] text-center clamp-[leading,2.5rem,4.64rem]">
              Give and Get <br /> What You Love
            </h4>

            <div>
              <div className="space-y-10 lg:space-y-0 lg:space-x-10 clamp-[mt,12,20] col-center lg:!flex-row lg:!justify-between">
                <Pallet
                  icon="store"
                  desc="Focus on making delicious food. We handle the rest!"
                  title="Vendors"
                />
                <Pallet
                  icon="order"
                  desc="No more “is there turkey?” Enjoy seamless ordering!"
                  title="Consumers"
                />
                <Pallet
                  icon="bike"
                  desc="Own a bike or bikes? Earn more delivering food!"
                  title="Riders"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFE7B0]">
          <div className="container_fluid clamp-[py,4.625rem,7.75rem] grid lg:grid-cols-2 gap-y-20 lg:gap-x-10 xl:gap-x-[148px]">
            <div>
              <h5 className="font-caprasimo clamp-[text,2rem,4rem] clamp-[leading,2.5rem,4.64rem] text-center lg:text-left">
                Good Food. <br /> Great Vibes.
              </h5>
              <p className="clamp-[mt,2,3] clamp-[leading,1.2rem,1.44rem] clamp-[text,sm,lg] text-center lg:text-left">
                We partner with brands and people you&apos;ll <br /> love to
                bring authentic flavours home.
              </p>

              <div className="grid grid-cols-2 clamp-[gap,3,6] clamp-[mt,7,9]">
                <Pallet2 icon="brand" title="Great Brand Selection" />
                <Pallet2 icon="quick" title="Quick & Reliable Delivery" />
                <Pallet2 icon="tracking" title="Real-Time Order Tracking" />
                <Pallet2 icon="fav" title="Easy In-App Ordering" />
              </div>
            </div>
            <div className="grid grid-cols-2 clamp-[gap,3,6] items-stretch ">
              <Image
                className="row-span-2 object-cover rounded lg:rounded-[24px] w-full"
                src="/images/Image.png"
                alt="Bring this food logo"
                width={282}
                height={609.75}
              />
              <Image
                className="object-cover rounded lg:rounded-[24px] w-full"
                src="/images/Image-1.png"
                alt="Bring this food logo"
                width={282}
                height={292.8800048828125}
                priority
              />
              <Image
                className="object-cover rounded lg:rounded-[24px] w-full"
                src="/images/Image-2.png"
                alt="Bring this food logo"
                width={282}
                height={292.8800048828125}
                priority
              />
            </div>
          </div>
        </div>

        <div className="bg-[#310909]">
          <div className="container_fluid clamp-[py,4.625rem,7.75rem] col-center">
            <Icon
              icon="ordder_online"
              size={48}
              className="clamp-[size,2rem,3rem]"
            />
            <h5 className="font-caprasimo text-[#FCF3D9] clamp-[text,1.5rem,2rem] clamp-[leading,1.8rem,2.32rem] tracking-[0.32px] text-center clamp-[mt,4,5]">
              Order Online
            </h5>
            <p className="clamp-[mt,1,2] text-[#FCF3D9] clamp-[leading,1rem,1.44rem] clamp-[text,sm,lg] tracking-[0.36px] text-center lg:text-left">
              Get your favorites delivered fast.
            </p>

            <Button className="bg-[#FCF3D9] hover:bg-[#fdeec6] text-[#310909] clamp-[mt,7,9] clamp-[leading,1rem,1.44rem] clamp-[text,base,lg] tracking-[0.36px] font-semibold !clamp-[py,4,6] !clamp-[px,5rem,6.25rem]">
              Order Now
            </Button>
          </div>
        </div>
      </div>

      <MFooter />
    </main>
  );
}

const Pallet = ({
  icon,
  desc,
  title,
}: {
  title: string;
  icon: string;
  desc: string;
}) => {
  return (
    <div>
      <div className="bg-[#310909] rounded-full col-center clamp-[pt,7,8] clamp-[pb,5,6] clamp-[px,1.3rem,2.6875rem] clamp-[size,14rem,18rem]">
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
      <h5 className="font-caprasimo lg:leading-[37.12px] tracking-[0.32px] clamp-[text,1.5rem,2rem] clamp-[mt,6,8] text-center">
        {title}
      </h5>
    </div>
  );
};

const Pallet2 = ({ icon, title }: { title: string; icon: string }) => {
  return (
    <div className="bg-[#FCF3D9] rounded-[12px] clamp-[py,4,6] clamp-[px,1,6]">
      <div className="bg-[#310909] rounded-full center clamp-[size,8,12] mx-auto">
        <Icon icon={icon} size={24} />
      </div>

      <h6 className="font-caprasimo clamp-[text,sm,lg] clamp-[leading,5,6] tracking-[0.2px] text-center clamp-[mt,2,3] px-1 sm:px-16 lg:px-4">
        {title}
      </h6>
    </div>
  );
};
