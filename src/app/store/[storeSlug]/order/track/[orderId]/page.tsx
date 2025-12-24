"use client";

import Back from "@/components/Back";
import { DialogC } from "@/components/Dialog";
import { orderFunc } from "@/components/functions/order";
import Loader from "@/components/Loader";
import LoadingButton from "@/components/LoadingButton";
import OrderDetails from "@/components/orderDetails";
import TrackOrder from "@/components/TrackOrder";
import { swrfetcher } from "@/lib/swrfetcher";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const Page = ({
  params,
}: {
  params: Promise<{ orderId: string; storeSlug: string }>;
}) => {
  const router = useRouter();

  const { orderId } = React.use(params);
  const { storeSlug } = React.use(params);

  const { data, isLoading } = useSWR(
    `/api/orders/getOrder?orderId=${orderId}`,
    swrfetcher
  );

  const { data: vendorData } = useSWR(
    `/api/profile?storeSlug=${storeSlug}`,
    swrfetcher
  );
  const vendor = vendorData?.data;

  const searchParams = useSearchParams();

  const urlstatus = searchParams.get("status");

  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [openCancelModal, setOpenCancelModal] = React.useState(false);

  React.useEffect(() => {
    if (urlstatus) {
      setStatus(urlstatus);
    }
  }, [urlstatus]);

  const handleCancelOrder = async () => {
    try {
      setLoading(true);
      await orderFunc.cancelOrder(data?.data?.order?.id);
      setOpenCancelModal(false);
      router.push(`/store/${storeSlug}/?page=orders`);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

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

          {status !== "IsCompleted" && (
            <LoadingButton
              isLoading={loading}
              onClick={() => setOpenCancelModal(true)}
              className={"clamp-[text,0.625rem,xs,@sm,@lg]"}
              size={"sm"}
            >
              Cancel Order
            </LoadingButton>
          )}
        </div>

        <Loader state={isLoading}>
          {status !== "IsCompleted" && <TrackOrder data={data?.data} />}
          {status === "IsCompleted" && (
            <OrderDetails
              category={vendor?.store?.category}
              data={data?.data}
            />
          )}
        </Loader>

        <DialogC open={openCancelModal} setOpen={setOpenCancelModal}>
          <div className="grid gap-4 text-[#1D2939] mt-4 text-center px-4">
            <h3 className="font-semibold leading-normal text-[20px]">
              Cancel Order
            </h3>
            <p className="text-[#475467] text-sm leading-5 font-normal">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>

            <div className="grid gap-3 mt-5 mb-2 md:grid-cols-2">
              <button
                onClick={() => setOpenCancelModal(false)}
                className="rounded-lg border border-[#E9EAEB] py-3 text-sm font-semibold text-[#344054]"
              >
                Keep Order
              </button>

              <LoadingButton
                isLoading={loading}
                onClick={handleCancelOrder}
                className="bg-red-700 hover:bg-red-800 cursor-pointer rounded-lg text-white text-sm font-semibold py-3"
              >
                Yes, Cancel Order
              </LoadingButton>
            </div>
          </div>
        </DialogC>
      </div>
    </div>
  );
};

export default Page;
