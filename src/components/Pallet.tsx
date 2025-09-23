import React from "react";
import Icon from "./Icon";
import { koboToNaira } from "@/lib/formatCurrency";

type PalletProps = {
  title: string;
  value: number;
  isTotal?: boolean;
};

const Pallet = ({ title, value, isTotal }: PalletProps) => {
  return (
    <div className="start-start clamp-[py,4,5,@sm,@lg]">
      <Icon
        icon={isTotal ? "receipt" : "stars"}
        size={20}
        className="clamp-[size,5,6,@sm,@lg]"
      />

      <div className="clamp-[ml,0.8125rem,1.0625rem,@sm,@lg]">
        <h6
          className={`clamp-[text,sm,base,@sm,@lg] leading-normal text-[#1D2939] ${
            isTotal && "font-semibold"
          }`}
        >
          {title}
        </h6>
      </div>

      <p
        className={`ml-auto end text-[#344054] clamp-[text,sm,base,@sm,@lg] leading-normal ${
          isTotal && "font-semibold"
        }`}
      >
        {koboToNaira(value ?? 0)}
      </p>
    </div>
  );
};

export default Pallet;
