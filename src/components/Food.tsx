import Image from "next/image";
import React from "react";

const Food = () => {
  return (
    <div className="between space-x-[45px] clamp-[pb,2,3.5,@sm,@lg] border-b border-[#F2F4F7]">
      <div>
        <h5 className="clamp-[text,sm,base,@sm,@lg] font-jakart font-medium leading-5 text-[#1D2939]">
          Fried Rice Combo
        </h5>
        <p className="clamp-[mt,1,2,@sm,@lg] text-[#98A2B3] clamp-[text,xs,sm,@sm,@lg] leading-normal font-jakart !clamp-[pr,5,6,@sm,@lg]">
          Fried rice with sauce , sautéed to perfection with green pea, chicken
          and hot dog.
        </p>

        <p className="font-jakart font-semibold clamp-[text,sm,base,@sm,@lg] leading-5 text-[#1D2939] clamp-[mt,1.4375rem,2rem,@sm,@lg]">
          N5,000
        </p>
      </div>

      <div className="clamp-[max-w,7rem,10rem,@sm,@lg] w-full clamp-[h,7rem,10rem,@sm,@lg] clamp-[rounded,0.25rem,0.5rem,@sm,@lg] overflow-hidden clamp-[max-h,7rem,10rem,@sm,@lg] relative">
        <Image
          className="size-full object-cover"
          src="/images/food_placeholder.png"
          alt="food placeholder"
          width={112}
          height={112}
        />

        <button className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer transition-colors text-[#59201A] clamp-[text,sm,base,@sm,@lg] font-jakart font-medium leading-normal absolute bottom-0 z-50 w-full clamp-[py,0.4375rem,0.8125rem,@sm,@lg] center space-x-[6.5px]">
          <span>Add</span>
          <Image
            src="/svg/add.svg"
            alt="add"
            width={7}
            height={7}
            className="clamp-[w,0.4375rem,0.8125rem,@sm,@lg]"
          />
        </button>
      </div>
    </div>
  );
};

export default Food;
