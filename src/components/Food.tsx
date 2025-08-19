import Image from "next/image";
import React from "react";

const Food = () => {
  return (
    <div className="between space-x-[45px] pb-2 border-b border-[#F2F4F7]">
      <div>
        <h5 className="text-sm font-jakart font-medium leading-5 text-[#1D2939]">
          Fried Rice Combo
        </h5>
        <p className="mt-1 text-[#98A2B3] text-xs leading-[100%] font-jakart !pr-5">
          Fried rice with sauce , sautéed to perfection with green pea, chicken
          and hot dog.
        </p>

        <p className="font-jakart font-semibold text-sm leading-5 text-[#1D2939] mt-[23px]">
          N5,000
        </p>
      </div>

      <div className="max-w-[112px] w-full h-[112px] rounded-[4px] overflow-hidden max-h-[112px] relative">
        <Image
          className="size-full object-cover"
          src="/images/food_placeholder.png"
          alt="food placeholder"
          width={112}
          height={112}
        />

        <button className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer transition-colors text-[#59201A] text-sm font-jakart font-medium leading-[100%] absolute bottom-0 z-50 w-full py-[7px] center space-x-[6.5px]">
          <span>Add</span>
          <Image src="/svg/add.svg" alt="add" width={7} height={7} />
        </button>
      </div>
    </div>
  );
};

export default Food;
