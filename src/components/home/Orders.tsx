/* eslint-disable @typescript-eslint/no-explicit-any */
import { koboToNaira } from "@/lib/formatCurrency";
import { swrfetcher } from "@/lib/swrfetcher";
import { cn } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import Icon from "../Icon";
import Loader from "../Loader";
import { Button } from "../ui/button";
import VendorHeader from "../VendorHeader";

const Orders = ({
  storeSlug,
  vendor,
  isVendorLoading,
}: {
  storeSlug: string;
  vendor: any;
  isVendorLoading: boolean;
}) => {
  const { data, isLoading } = useSWR(`/api/orders/getOrders`, swrfetcher);

  return (
    <Loader state={isVendorLoading || isLoading}>
      <VendorHeader vendor={vendor} storeSlug={storeSlug} />

      {data?.data?.length > 0 ? (
        <div className="clamp-[mt,4,8,@sm,@lg] grid md:grid-cols-2 clamp-[gap,4,8,@sm,@lg]">
          {data?.data?.map((order: any, index: number) => {
            return <OrderCard key={index} storeSlug={storeSlug} data={order} />;
          })}
        </div>
      ) : (
        <EmptyOrder storeSlug={storeSlug} />
      )}
    </Loader>
  );
};

const EmptyOrder = ({ storeSlug }: { storeSlug: string }) => {
  return (
    <div className="col-center clamp-[py,4.25rem,6.125rem,@sm,@lg] clamp-[mt,3.5rem,5.375rem,@sm,@lg]">
      <Image
        src="/images/order_placeholder.png"
        alt="order Placeholder"
        className="clamp-[w,7.9063rem,11.375rem,@sm,@lg]"
        width={126.54631805419922}
        height={126.4830551147461}
        priority
      />

      <p className="text-center clamp-[text,sm,base,@sm,@lg] font-medium clamp-[mt,3,6,@sm,@lg] text-[#98A2B3]">
        You currently don&apos;t have <br />
        any active orders.
      </p>

      <Link href={`/store/${storeSlug}?page=menu`} className="w-full center">
        <Button className="bg-[#FFC247] text-[#59201A] cursor-pointer w-full max-w-sm rounded-xl clamp-[text,sm,base,@sm,@lg] font-semibold leading-5 clamp-[py,1.125rem,1.375rem,@sm,@lg]! clamp-[mt,4,8,@sm,@lg] hover:bg-[#FFC247]/90">
          Start a new order
        </Button>
      </Link>
    </div>
  );
};

const OrderCard = ({ storeSlug, data }: { storeSlug: string; data: any }) => {
  const isRejected = data?.trackings?.some(
    (tracking: any) => tracking.type === "store-rejected",
  );
  const effectiveStatus = isRejected ? "rejected" : data?.status;

  const paymentStatus = data?.payment?.status;

  const isCompleted = effectiveStatus === "complete";

  return (
    <div className="border border-[#E4E7EC] rounded-xl p-3.5">
      <div className="between">
        <p className="inline-grid">
          <span className="text-[#1D2939] text-sm font-medium">
            {data?.store?.name}
          </span>
          <span className="text-[#98A2B3] text-xs mt-1 uppercase">
            {moment(data?.dateCreated).format("MMM D, h:mm A")}
          </span>
        </p>
        <p className="inline-grid text-right">
          <span className="text-[#1D2939] text-sm font-medium">
            {koboToNaira(data?.summary?.bill?.amount)}
          </span>
          <span className="text-[#98A2B3] text-xs mt-1">
            Order ID. {data?.slug}
          </span>
        </p>
      </div>

      <div className="between">
        <p className="inline-grid my-4">
          <span className="text-[#1D2939] text-xs">
            {data?.combos?.length > 0
              ? `${data?.combos?.[0]?.count}x ${data?.combos?.[0]?.name}`
              : `${data?.packs?.[0]?.[0]?.count}x ${data?.packs?.[0]?.[0]?.name}`}
          </span>
          {data?.summary?.items?.count > 1 && (
            <span className="text-[#98A2B3] text-[10px] mt-1">
              +{data?.summary?.items?.count - 1} more item(s)
            </span>
          )}
        </p>

        {/* status badge */}
        <div>
          <p
            className={cn(
              paymentStatus === "pending"
                ? "text-[#B54708] bg-[#FFFAEB] border-[#FEDF89]"
                : paymentStatus === "uninitialized"
                  ? "text-[#c7950a] bg-[#ffffeb] border-[#FEDF89]"
                  : paymentStatus === "success"
                    ? "text-[#027A48] bg-[#A6F4C51A] border-[#A6F4C5]"
                    : "text-[#B42318] bg-[#FEF3F2] borer-[#FECDCA]",
              "capitalize border rounded-full px-2 font-medium text-[10px] leading-[18px]",
            )}
          >
            {paymentStatus === "pending"
              ? "Payment Pending"
              : paymentStatus === "success"
                ? "Payment Successful"
                : paymentStatus === "uninitialized"
                  ? "Payment Uninitialized"
                  : paymentStatus === "failed"
                    ? "Payment Failed"
                    : paymentStatus}
          </p>
        </div>
      </div>

      <div className="w-full h-px border-t border-[#E4E7EC] border-dashed" />

      <div className="between space-x-2 mt-5 mb-4">
        {Array.from({ length: data?.trackings?.length }, (_, i) => {
          return (
            <div
              key={i}
              className={`h-[3px] w-full rounded-full ${
                isCompleted || i <= findLatestSuccess(data?.trackings)?.index
                  ? "bg-[#FFC247]"
                  : "bg-[#F2F4F7]"
              }`}
            />
          );
        })}
      </div>

      {effectiveStatus !== "ongoing" && effectiveStatus !== "uninitialized" ? (
        <div className="between">
          <p
            className={cn(
              effectiveStatus === "complete"
                ? "text-[#057F3E]"
                : "text-[#B42318]",
              "text-sm font-medium",
            )}
          >
            {effectiveStatus === "complete" ? "Completed" : "Rejected"}
          </p>

          {isCompleted && (
            <Link
              href={`/store/${storeSlug}/order/track/${data?.id}?status=IsCompleted`}
            >
              <Button
                variant={"ghost"}
                className="text-[#59201A] font-medium text-xs"
              >
                View Details
                <Icon icon="chevron-down" className="size-3.5 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="between gap-4">
          <p className=" text-sm font-medium space-x-1">
            <span className="text-[#1D2939]">
              {moment(
                findLatestSuccess(data?.trackings)?.tracking?.dateCreated,
              ).format("MMM D, h:mm A")}
            </span>{" "}
            {findLatestSuccess(data?.trackings)?.humanReadable && (
              <span className="">-</span>
            )}
            <span className="text-[#98A2B3]">
              {findLatestSuccess(data?.trackings)?.humanReadable}
            </span>
          </p>

          <Link
            href={`/store/${storeSlug}/order/track/${data?.id}`}
            className="shrink-0"
          >
            <Button
              variant={"ghost"}
              className="text-[#59201A] font-medium text-xs"
            >
              Track
              <Icon icon="chevron-down" className="size-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

function findLatestSuccess(
  trackings: {
    dateCreated?: string;
    type: string;
    status: string;
  }[],
) {
  const successfulTrackings = trackings
    .filter((t) => t.status === "success" && t.dateCreated)
    .map((tracking, index) => ({
      tracking,
      index,
      date: new Date(tracking.dateCreated as string),
    }));

  if (successfulTrackings.length === 0) {
    return { index: -1, tracking: null, humanReadable: null };
  }

  const latest = successfulTrackings.reduce((prev, current) =>
    current.date > prev.date ? current : prev,
  );

  const humanReadable = transformToHumanReadable(latest.tracking.type);

  return {
    index: latest.index,
    tracking: latest.tracking,
    humanReadable: humanReadable,
  };
}

function transformToHumanReadable(type: string): string {
  const typeMap: { [key: string]: string } = {
    "store-received": "Order received",
    "store-accepted": "Vendor accepted order",
    "store-packed": "Your order has been packed",
    "rider-accepted": "Rider accepted order",
    "rider-in-transit": "Order in transit",
    delivered: "Order Complete",
  };

  return typeMap[type] || type;
}

export default Orders;
