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
import { usePaymentListener } from "@/hooks/usePaymentListener";
import { parseCookies } from "nookies";

const Orders = ({
  storeSlug,
  vendor,
  isVendorLoading,
}: {
  storeSlug: string;
  vendor: any;
  isVendorLoading: boolean;
}) => {
  const { data, isLoading, mutate } = useSWR(
    `/api/orders/getOrders`,
    swrfetcher,
  );

  const { userDetails } = parseCookies();
  const userParsed = userDetails && JSON?.parse(userDetails);
  const accessToken = userParsed?.tokens?.tokens?.access;

  usePaymentListener(
    accessToken,
    () => {
      mutate();
    },
    () => {
      mutate();
    },
  );

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
            {(() => {
              const combos = data?.combos ?? {};
              const groceries = data?.groceries ?? {};
              const packs = data?.packs ?? [];

              const firstCombo = Array.isArray(combos)
                ? combos[0]
                : Object.values(combos)[0];
              if (firstCombo)
                return `${(firstCombo as any).count}x ${(firstCombo as any).name}`;

              const firstGrocery = Array.isArray(groceries)
                ? groceries[0]
                : Object.values(groceries)[0];
              if (firstGrocery)
                return `${(firstGrocery as any).count}x ${(firstGrocery as any).name}`;

              if (packs?.[0]?.[0]?.count)
                return `${packs[0][0].count}x ${packs[0][0].name}`;

              return "Order Items";
            })()}
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
        {Array.from({ length: 7 }, (_, i) => {
          const latestProgress = findLatestSuccess(data?.trackings);
          return (
            <div
              key={i}
              className={`h-[3px] w-full rounded-full ${
                isCompleted || i <= latestProgress.index
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
  const steps = [
    "customer-payment",
    "store-received",
    "store-accepted",
    "store-packed",
    "rider-accepted",
    "rider-in-transit",
    "delivered",
  ];

  let latestIndex = -1;
  let latestTracking = null;

  steps.forEach((stepType, index) => {
    const match = trackings.find(
      (t) => t.type === stepType && t.status === "success",
    );
    if (match) {
      latestIndex = index;
      latestTracking = match;
    }
  });

  if (latestIndex === -1 || !latestTracking) {
    return { index: -1, tracking: null, humanReadable: null };
  }

  const humanReadable = transformToHumanReadable((latestTracking as any).type);

  return {
    index: latestIndex,
    tracking: latestTracking as any,
    humanReadable: humanReadable,
  };
}

function transformToHumanReadable(type: string): string {
  const typeMap: { [key: string]: string } = {
    "customer-payment": "Payment Successful",
    "store-received": "Order Received",
    "store-accepted": "Vendor Accepted Order",
    "store-packed": "Your Order has been Packed",
    "rider-accepted": "Rider Accepted Order",
    "rider-in-transit": "Order in Transit",
    delivered: "Order Complete",
  };

  return typeMap[type] || type;
}

export default Orders;
