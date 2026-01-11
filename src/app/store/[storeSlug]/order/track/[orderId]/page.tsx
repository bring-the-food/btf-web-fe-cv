/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Back from "@/components/Back";
import { DialogC } from "@/components/Dialog";
import { DrawerC } from "@/components/Drawer";
import { orderFunc } from "@/components/functions/order";
import { walletFunc } from "@/components/functions/wallet";
import Icon from "@/components/Icon";
import Loader from "@/components/Loader";
import LoadingButton from "@/components/LoadingButton";
import OrderDetails from "@/components/orderDetails";
import TimeUntil from "@/components/TimeUntil";
import TrackOrder from "@/components/TrackOrder";
import { koboToNaira } from "@/lib/formatCurrency";
import { swrfetcher } from "@/lib/swrfetcher";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import useSWR from "swr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

const Page = ({
  params,
}: {
  params: Promise<{ orderId: string; storeSlug: string }>;
}) => {
  const router = useRouter();

  const { orderId } = React.use(params);
  const { storeSlug } = React.use(params);

  const { data, isLoading, mutate } = useSWR(
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
  const [openPaymentModal, setOpenPaymentModal] = React.useState(false);
  const [checkoutResponse, setChecoutResponse] = React.useState(null as any);

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

  const handleCheckPaymentStatus = async () => {
    setLoading(true);

    // Try to locate a transaction id from possible locations on the order
    const transactionId = checkoutResponse?.data?.transaction?.id || null;

    // If there's no transaction id, revalidate the order and inspect its payment status
    if (!transactionId) {
      try {
        const newOrderData = await mutate();
        const paymentStatus =
          newOrderData?.data?.order?.payment?.status ??
          data?.data?.order?.payment?.status;

        if (paymentStatus?.toLowerCase() === "success") {
          toast.success("Payment Successful");
          setChecoutResponse(null as any);
          setOpenPaymentModal(false);
        } else if (paymentStatus?.toLowerCase() === "pending") {
          toast("Payment Pending");
        } else {
          toast.error("Payment Failed");
        }
      } finally {
        setLoading(false);
      }

      return;
    }

    try {
      const res = await walletFunc.getTransaction(transactionId);

      if (res?.data?.data?.transaction?.payment?.status === "success") {
        toast.success("Payment Successful");
        // Refresh order data
        setChecoutResponse(null as any);
        setOpenPaymentModal(false);
        mutate();
      } else if (res?.data?.data?.transaction?.payment?.status === "pending") {
        toast("Payment Pending");
      } else {
        toast.error("Payment Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    await orderFunc
      .regeneratePayment(
        data?.data?.order?.id,
        data?.data?.order?.summary?.bill?.amount
      )
      .then((res) => {
        setChecoutResponse(res?.data);
        setOpenPaymentModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
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

          <div className="space-x-4 end">
            {(data?.data?.order?.payment?.status?.toLowerCase() === "pending" ||
              data?.data?.order?.payment?.status?.toLowerCase() ===
                "uninitialized" ||
              data?.data?.order?.payment?.status?.toLowerCase() ===
                "failed") && (
              <div className="hidden md:flex space-x-4">
                {data?.data?.order?.payment?.bank || checkoutResponse ? (
                  <LoadingButton
                    isLoading={loading}
                    onClick={() => setOpenPaymentModal(true)}
                    className={"clamp-[text,0.625rem,xs,@sm,@lg]"}
                    size={"sm"}
                  >
                    View Payment
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    isLoading={loading}
                    onClick={handlePayment}
                    className={"clamp-[text,0.625rem,xs,@sm,@lg]"}
                    size={"sm"}
                  >
                    Regenerate Payment
                  </LoadingButton>
                )}
              </div>
            )}

            {status !== "IsCompleted" && (
              <div className="hidden md:flex">
                <LoadingButton
                  isLoading={loading}
                  onClick={() => setOpenCancelModal(true)}
                  className={"clamp-[text,0.625rem,xs,@sm,@lg]"}
                  size={"sm"}
                >
                  Cancel Order
                </LoadingButton>
              </div>
            )}

            {/* Mobile Actions Menu */}
            {(status !== "IsCompleted" ||
              data?.data?.order?.payment?.status?.toLowerCase() === "pending" ||
              data?.data?.order?.payment?.status?.toLowerCase() ===
                "uninitialized" ||
              data?.data?.order?.payment?.status?.toLowerCase() ===
                "failed") && (
              <div className="md:hidden flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full border border-[#E9EAEB] hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC247] focus:ring-offset-2">
                      <MoreVertical className="w-4 h-4 text-[#475467]" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[180px] p-1.5 bg-white border border-[#E9EAEB] shadow-lg rounded-xl"
                  >
                    {(data?.data?.order?.payment?.status?.toLowerCase() ===
                      "pending" ||
                      data?.data?.order?.payment?.status?.toLowerCase() ===
                        "uninitialized" ||
                      data?.data?.order?.payment?.status?.toLowerCase() ===
                        "failed") && (
                      <DropdownMenuItem
                        disabled={loading}
                        onClick={() =>
                          data?.data?.order?.payment?.bank || checkoutResponse
                            ? setOpenPaymentModal(true)
                            : handlePayment()
                        }
                        className="cursor-pointer px-3 py-2.5 text-sm font-medium text-[#344054] rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                      >
                        {data?.data?.order?.payment?.bank || checkoutResponse
                          ? "View Payment"
                          : "Regenerate Payment"}
                      </DropdownMenuItem>
                    )}

                    {status !== "IsCompleted" && (
                      <DropdownMenuItem
                        disabled={loading}
                        onClick={() => setOpenCancelModal(true)}
                        className="cursor-pointer px-3 py-2.5 text-sm font-medium text-[#D92D20] hover:bg-[#FFF1F0] focus:bg-[#FFF1F0] focus:text-[#D92D20] rounded-lg transition-colors flex items-center mt-1"
                      >
                        Cancel Order
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
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

        <PaymentModal
          open={openPaymentModal}
          setOpen={setOpenPaymentModal}
          paymentData={checkoutResponse ? checkoutResponse.data : data?.data}
          handleCheckPaymentStatus={handleCheckPaymentStatus}
          loading={loading}
        />
      </div>
    </div>
  );
};

const PaymentModal = ({
  open,
  setOpen,
  paymentData,
  handleCheckPaymentStatus,
  loading,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paymentData: any;
  handleCheckPaymentStatus: () => Promise<void>;
  loading: boolean;
}) => {
  const data = paymentData;

  return (
    <DrawerC open={open} setOpen={setOpen}>
      <div className="p-5">
        <h4 className="text-[#1D2939] font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal text-center mr-auto clamp-[ml,0,-8,@sm,@lg]">
          Account Information
        </h4>

        <div className="clamp-[mt,5,7,@sm,@lg] w-full col-center">
          {data?.beneficiary?.expiryDate && (
            <p className="font-medium text-center clamp-[text,sm,base,@sm,@lg] leading-[leading,1.125rem,1.375rem,@sm,@lg] text-[#344054] clamp-[mt,8,10,@sm,@lg]">
              Account number expires in{" "}
              <TimeUntil targetTime={data?.beneficiary?.expiryDate} />
            </p>
          )}

          <div className="col-center center clamp-[mt,2.25rem,3rem,@sm,@lg] clamp-[pb,8,10,@sm,@lg] w-full">
            <p className="clamp-[mt,3,3.5,@sm,@lg] font-bold clamp-[text,1.5rem,2rem,@sm,@lg] text-[#414651]">
              {koboToNaira(
                data?.transaction?.summary?.bill?.amount ??
                  data?.order?.summary?.bill?.amount ??
                  0
              )}
            </p>

            <div className="clamp-[mt,10,12,@sm,@lg] w-full space-y-6 md:space-y-8">
              {/* bank details */}
              <p className="text-[#A4A7AE] clamp-[text,sm,base,@sm,@lg] clamp-[leading,5,6,@sm,@lg] between w-full space-x-4">
                <span>Bank Name</span>{" "}
                <span className="text-[#414651] font-medium">
                  {data?.beneficiary?.bank?.name ??
                    data?.order?.payment?.bank?.name}
                </span>
              </p>
              <p className="text-[#A4A7AE] clamp-[text,sm,base,@sm,@lg] clamp-[leading,5,6,@sm,@lg] between w-full space-x-4">
                <span>Account Name</span>{" "}
                <span className="text-[#414651] font-medium">
                  {data?.beneficiary?.bank?.account?.name ??
                    data?.order?.payment?.bank?.account?.name}
                </span>
              </p>
              <p className="text-[#A4A7AE] clamp-[text,sm,base,@sm,@lg] clamp-[leading,5,6,@sm,@lg] between w-full space-x-4">
                <span>Account Number</span>{" "}
                <span className="end space-x-1 md:space-x-1.5">
                  <span className="text-[#414651] font-medium">
                    {data?.beneficiary?.bank?.account?.number ??
                      data?.order?.payment?.bank?.account?.number}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        data?.beneficiary?.bank?.account?.number ??
                          data?.order?.payment?.bank?.account?.number
                      );
                      toast("Copied to clipboard");
                    }}
                  >
                    <Icon
                      icon="copyy"
                      size={10.5}
                      className="clamp-[w,0.6563rem,0.7813rem,@sm,@lg]"
                    />
                  </button>
                </span>
              </p>
            </div>
          </div>

          <div className="w-full max-w-[353px] mt-4 space-y-3">
            <LoadingButton
              onClick={handleCheckPaymentStatus}
              isLoading={loading}
              className="bg-[#FFC247] hover:bg-[#fcb526] rounded-xl w-full max-w-[353] clamp-[mt,5,6,@sm,@lg] clamp-[py,1.125rem,1.375rem,@sm,@lg]! h-auto text-[#59201A] clamp-[text,sm,base,@sm,@lg] font-semibold"
            >
              I have made the payment
            </LoadingButton>
          </div>
        </div>
      </div>
    </DrawerC>
  );
};

export default Page;
