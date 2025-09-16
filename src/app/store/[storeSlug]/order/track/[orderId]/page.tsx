"use client";

import Back from "@/components/Back";
import Loader from "@/components/Loader";
import OrderDetails from "@/components/orderDetails";
import TrackOrder from "@/components/TrackOrder";
import { swrfetcher } from "@/lib/swrfetcher";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const Page = ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = React.use(params);

  const { data, isLoading } = useSWR(
    `/api/orders/getOrder?orderId=${orderId}`,
    swrfetcher
  );

  const searchParams = useSearchParams();

  const urlstatus = searchParams.get("status");

  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    if (urlstatus) {
      setStatus(urlstatus);
    }
  }, [urlstatus]);

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
          <Back />

          <h4 className="text-[#1D2939] font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal text-center mr-auto clamp-[ml,0,-8,@sm,@lg]">
            Order Tracking
          </h4>
        </div>

        <Loader state={isLoading}>
          {status !== "IsCompleted" && <TrackOrder data={data?.data} />}
          {status === "IsCompleted" && <OrderDetails />}
        </Loader>
      </div>
    </div>
  );
};

export default Page;
