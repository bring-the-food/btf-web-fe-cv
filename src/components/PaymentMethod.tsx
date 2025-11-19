"use client"

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
import Icon from "./Icon";
import { koboToNaira } from "@/lib/formatCurrency";
import { swrfetcher } from "@/lib/swrfetcher";
import useSWR from "swr";

const PaymentMethod = ({
  setPaymentMethod,
}: {
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useSWR(`/api/wallet/getWallet`, swrfetcher);

  return (
    <RadioGroup
      defaultValue="One Time Transfer"
      onValueChange={setPaymentMethod}
    >
      <GroupItem label="One Time Transfer" icon="coins" />
      <GroupItem
        label="Wallet Payment"
        icon="wallet-pay"
        amount={data?.data?.wallet?.balance?.amount}
      />
    </RadioGroup>
  );
};

const GroupItem = ({
  label,
  icon,
  amount,
}: {
  label: string;
  icon: string;
  amount?: number;
}) => {
  return (
    <div className="between clamp-[py,1.0625rem,1.375rem,@sm,@lg]">
      <div className="start space-x-2 md:space-x-3">
        <Icon
          icon={icon}
          size={16}
          className="clamp-[size,1rem,1.2rem,@sm,@lg]"
        />
        <div>
          <Label
            htmlFor={label}
            className="clamp-[text,sm,base,@sm,@lg] font-medium text-[#1D2939]"
          >
            {label}
          </Label>
          {amount && (
            <p className="font-medium clamp-[text,xs,sm,@sm,@lg] text-[#98A2B3] clamp-[mt,1,2,@sm,@lg]">
              {koboToNaira(amount ?? 0)}
            </p>
          )}
        </div>
      </div>

      <RadioGroupItem value={label} id={label} />
    </div>
  );
};

export default PaymentMethod;
