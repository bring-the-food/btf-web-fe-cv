"use client";

import Image from "next/image";
import React from "react";
import Search from "../Search";
import Food from "../Food";
import Topper from "../Topper";

const filter = ["All", "Combos", "Food", "Soup", "Sides", "Drinks"];

const Menu = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const [active, setActive] = React.useState("Combos");

  return (
    <div className="relative">
      <div className="start clamp-[pt,4,6,@sm,@lg] clamp-[pb,3.5,5,@sm,@lg]">
        <Image
          className="clamp-[w,10,16,@sm,@lg]"
          src="/images/logo_placeholder.png"
          alt="Placeholder logo"
          width={40}
          height={40}
          priority
        />

        <h6 className="clamp-[ml,3,5,@sm,@lg] clamp-[mr,2,4,@sm,@lg] font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal">
          Mola Foods
        </h6>

        <p className="text-[#F52222] font-medium clamp-[text,0.5rem,xs,@sm,@lg] bg-[#EDDCDC66] rounded-full clamp-[py,1,2,@sm,@lg] clamp-[px,1.5,4,@sm,@lg]">
          Closed
        </p>
      </div>

      <div className="clamp-[pt,3,5,@sm,@lg]">
        <div className="md:flex md:justify-between md:items-center md:space-x-4">
          <Search value={searchValue} setValue={setSearchValue} />

          <div className="start space-x-3 overflow-x-auto no-scrollbar pt-2 pb-3 mt-2 clamp-[mr,-6,-8,@sm,@lg] clamp-[pr,4,5,@sm,@lg]">
            {filter.map((item) => (
              <button
                className={`cursor-pointer clamp-[text,sm,base,@sm,@lg] clamp-[py,1.5,2,@sm,@lg] clamp-[px,2,3,@sm,@lg] whitespace-nowrap ${
                  active === item
                    ? "bg-[#FFF0C7] text-[#59201A] rounded-[4px]"
                    : "text-[#98A2B3]"
                }`}
                key={item}
                onClick={() => setActive(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="clamp-[mt,4,8,@sm,@lg] grid md:grid-cols-2 clamp-[gap,4,8,@sm,@lg]">
          <Food />
          <Food />
          <Food />
          <Food />
        </div>
      </div>

      <Topper />
    </div>
  );
};

export default Menu;
