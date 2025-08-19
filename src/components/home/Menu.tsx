"use client";

import Image from "next/image";
import React from "react";
import Search from "../Search";
import Food from "../Food";

const filter = ["All", "Combos", "Food", "Soup", "Sides", "Drinks"];

const Menu = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const [active, setActive] = React.useState("Combos");

  return (
    <div>
      <div className="start pt-4 pb-3.5">
        <Image
          src="/images/logo_placeholder.png"
          alt="Placeholder logo"
          width={40}
          height={40}
          priority
        />

        <h6 className="ml-3 mr-2">Mola Foods</h6>

        <p className="text-[#F52222] font-medium text-[8px] bg-[#EDDCDC66] rounded-full py-1 px-2">
          Closed
        </p>
      </div>

      <div className="pt-3">
        <Search value={searchValue} setValue={setSearchValue} />

        <div className="start space-x-3 overflow-x-auto no-scrollbar pt-2 pb-3 mt-2 -mr-4 px-4">
          {filter.map((item) => (
            <button
              className={`px-2 py-1.5 cursor-pointer text-sm whitespace-nowrap ${
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

        <div className="mt-4 space-y-4">
          <Food />
          <Food />
          <Food />
          <Food />
        </div>
      </div>
    </div>
  );
};

export default Menu;
