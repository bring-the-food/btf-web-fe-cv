/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import Icon from "./Icon";
import { koboToNaira, nairaToKobo } from "@/lib/formatCurrency";
import { Button } from "./ui/button";
import useSWR from "swr";
import { swrfetcher } from "@/lib/swrfetcher";
import { Skeleton } from "./ui/skeleton";
import { walletFunc } from "./functions/wallet";
import { DrawerC } from "./Drawer";
import LoadingButton from "./LoadingButton";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import TimeUntil from "./TimeUntil";
import { toast } from "sonner";
import { usePaymentListener } from "@/hooks/usePaymentListener";
import { parseCookies } from "nookies";

const WalletBal = () => {
  const { userDetails } = parseCookies();
  const userParsed = userDetails && JSON?.parse(userDetails);

  const { data, mutate } = useSWR(
    userDetails ? `/api/wallet/getWallet` : null,
    swrfetcher,
  );

  const [loading, setLoading] = React.useState(false);
  const [isCheckingPayment] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [openAmountDrawer, setOpenAmountDrawer] = React.useState(false);
  const [openPaymentDrawer, setOpenPaymentDrawer] = React.useState(false);
  const [paymentDetails, setPaymentDetails] = React.useState<any>(null);

  const handleFundWallet = async () => {
    try {
      setLoading(true);
      const res = await walletFunc.fundWallet(nairaToKobo(amount));
      setPaymentDetails(res?.data);
      setLoading(false);
      setOpenAmountDrawer(false);
      setOpenPaymentDrawer(true);
    } catch {
      setLoading(false);
    }
  };

  const accessToken = userParsed?.tokens?.tokens?.access;
  const { error } = usePaymentListener(accessToken, () => {
    toast.success("Payment Successful");
    setOpenPaymentDrawer(false);
    setPaymentDetails(null);
    mutate();
  });

  const handleCheckPaymentStatus = async () => {
    setLoading(true);
    let paymentSuccessful = false;
    const transactionId = paymentDetails?.data?.transaction?.id;
    if (transactionId) {
      const res = await walletFunc.getTransaction(transactionId);

      if (res?.data?.data?.transaction?.payment?.status === "success") {
        toast.success("Payment Successful");
        setOpenPaymentDrawer(false);
        mutate();
        paymentSuccessful = true;
      } else if (res?.data?.data?.transaction?.payment?.status === "pending") {
        toast("Payment Pending");
      } else {
        toast.error("Payment Failed");
      }
    }
    // Only clear details if payment was successful
    if (paymentSuccessful) {
      setPaymentDetails(null);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAddMoneyClick = () => {
    // If we have payment details and they haven't expired, show them again.
    if (
      paymentDetails &&
      paymentDetails?.data?.beneficiary?.expiryDate &&
      new Date(paymentDetails.data.beneficiary.expiryDate) > new Date()
    ) {
      setOpenPaymentDrawer(true);
    } else {
      // Otherwise, start the flow to get a new account.
      // If there were expired details, clear them.
      if (paymentDetails) {
        setPaymentDetails(null);
      }
      setOpenAmountDrawer(true);
    }
  };

  return (
    <div className="between bg-[#FFF9E9] border border-[#FFDB93] rounded-xl clamp-[px,2.5,4,@sm,@lg] clamp-[py,2.5,3.5,@sm,@lg] clamp-[mb,5,6,@sm,@lg]">
      <div className="start space-x-1 sm:space-x-2 md:space-x-3">
        <div className="bg-[#FFC247] p-2 rounded-full ">
          <Icon
            icon="wallet"
            h={16}
            w={16}
            className="clamp-[size,1rem,1.5rem,@sm,@lg]"
          />
        </div>
        <div>
          <h6 className="clamp-[text,0.625rem,sm,@sm,@lg] font-medium text-[#49381D]">
            Wallet Balance
          </h6>
          {!data?.success ? (
            <Skeleton className="clamp-[mt,0.5,1,@sm,@lg] clamp-[h,5,8,@sm,@lg] clamp-[w,6.25rem,9.375rem,@sm,@lg] bg-[#59201a21] rounded-none" />
          ) : (
            <p className="clamp-[mt,0.5,1,@sm,@lg] text-[#59201A] font-semibold clamp-[text,sm,lg,@sm,@lg]">
              {koboToNaira(data?.data?.wallet?.balance?.amount ?? 0)}
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={handleAddMoneyClick}
        disabled={isCheckingPayment}
        className="bg-[#FFC247] hover:bg-[#ffb92c] font-medium clamp-[text,xs,base,@sm,@lg] text-[#59201A] px-2.5 sm:clamp-[px,3,4,@sm,@lg] clamp-[py,2,3,@sm,@lg] h-auto "
      >
        <Icon icon="add" size={14} className="clamp-[size,3.5,4,@sm,@lg]" />
        <span className="ml-1">Add Money</span>
      </Button>

      <DrawerC open={openAmountDrawer} setOpen={setOpenAmountDrawer}>
        <div className="p-5">
          <div className="grid gap-2 text-center">
            <h3 className="text-[#101828] text-xl font-semibold">
              Fund Wallet
            </h3>
          </div>

          <div className="clamp-[mt,5,7,@sm,@lg] w-full col-center">
            <div className="grid gap-3 mt-5 mb-6 w-full">
              <Label
                htmlFor="phone"
                className="text-sm leading-5 font-semibold text-[#1E2024]"
              >
                Amount
              </Label>
              <Input
                id="phone"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="+234 XXXXXXXXXX"
                className="text-[#1E2024] text-sm leading-5 font-normal tracking-[12%] px-3! py-4! rounded-xl! h-auto"
              />
            </div>

            <LoadingButton
              onClick={handleFundWallet}
              isLoading={loading}
              className="bg-[#FFC247] hover:bg-[#fcb526] rounded-xl w-full max-w-[353] clamp-[mt,5,6,@sm,@lg] clamp-[py,1.125rem,1.375rem,@sm,@lg]! h-auto text-[#59201A] clamp-[text,sm,base,@sm,@lg] font-semibold"
            >
              Continue
            </LoadingButton>
          </div>
        </div>
      </DrawerC>

      <DrawerC open={openPaymentDrawer} setOpen={setOpenPaymentDrawer}>
        <div className="p-5">
          <h4 className="text-[#1D2939] font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal text-center mr-auto clamp-[ml,0,-8,@sm,@lg]">
            Account Information
          </h4>

          <div className="clamp-[mt,5,7,@sm,@lg] w-full col-center">
            <p className="font-medium text-center clamp-[text,sm,base,@sm,@lg] leading-[leading,1.125rem,1.375rem,@sm,@lg] text-[#344054] clamp-[mt,8,10,@sm,@lg]">
              Account number expires in{" "}
              <TimeUntil
                targetTime={paymentDetails?.data?.beneficiary?.expiryDate}
              />
            </p>

            <div className="col-center center clamp-[mt,6,8,@sm,@lg] clamp-[pb,6,8,@sm,@lg] w-full">
              <p className="clamp-[mt,2,3,@sm,@lg] font-bold clamp-[text,1.5rem,2rem,@sm,@lg] text-[#414651]">
                {koboToNaira(
                  paymentDetails?.data?.transaction?.summary?.bill?.amount ?? 0,
                )}
              </p>

              <div className="clamp-[mt,6,8,@sm,@lg] w-full space-y-4 md:space-y-6">
                {/* bank details */}
                <p className="text-[#A4A7AE] clamp-[text,sm,base,@sm,@lg] clamp-[leading,5,6,@sm,@lg] between w-full space-x-4">
                  <span>Bank Name</span>{" "}
                  <span className="text-[#414651] font-medium">
                    {paymentDetails?.data?.beneficiary?.bank?.name}
                  </span>
                </p>
                <p className="text-[#A4A7AE] clamp-[text,sm,base,@sm,@lg] clamp-[leading,5,6,@sm,@lg] between w-full space-x-4">
                  <span>Account Name</span>{" "}
                  <span className="text-[#414651] font-medium">
                    {paymentDetails?.data?.beneficiary?.bank?.account?.name}
                  </span>
                </p>
                <p className="text-[#A4A7AE] clamp-[text,sm,base,@sm,@lg] clamp-[leading,5,6,@sm,@lg] between w-full space-x-4">
                  <span>Account Number</span>{" "}
                  <span className="end space-x-1 md:space-x-1.5">
                    <span className="text-[#414651] font-medium">
                      {paymentDetails?.data?.beneficiary?.bank?.account?.number}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          paymentDetails?.data?.beneficiary?.bank?.account
                            ?.number,
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

            <LoadingButton
              onClick={handleCheckPaymentStatus}
              isLoading={loading}
              className="bg-[#FFC247] hover:bg-[#fcb526] rounded-xl w-full max-w-[353] clamp-[mt,5,6,@sm,@lg] clamp-[py,1.125rem,1.375rem,@sm,@lg]! h-auto text-[#59201A] clamp-[text,sm,base,@sm,@lg] font-semibold"
            >
              I have made the payment
            </LoadingButton>
          </div>
        </div>
      </DrawerC>
    </div>
  );
};

export default WalletBal;
