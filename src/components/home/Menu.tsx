"use client";

import Image from "next/image";
import React from "react";
import Search from "../Search";
import Topper from "../Topper";
import FoodList from "../FoodList";
import MyCart from "../MyCart";
import Link from "next/link";
import { Button } from "../ui/button";
import useSWR from "swr";
import { swrfetcher } from "@/lib/fetcher";

const filter = ["All", "Combos", "Food", "Soup", "Sides", "Drinks"];

const Menu = ({ storeSlug }: { storeSlug: string }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [active, setActive] = React.useState("All");
  const [url, setUrl] = React.useState("getAllItems");

  const { data } = useSWR(`/api/profile?storeSlug=${storeSlug}`, swrfetcher);
  const vendor = data?.data;

  React.useEffect(() => {
    switch (active) {
      case "All":
        setUrl("getAllItems");
        return;
      case "Combos":
        setUrl("getComboItems");
        return;
      default:
        break;
    }
  }, [active]);

  const { data: getItemsData, isLoading } = useSWR(
    `/api/home/${url}?storeId=${vendor?.store?.id}`,
    swrfetcher
  );

  return (
    <div className="relative">
      <div className="between">
        <div className="start clamp-[pt,4,6,@sm,@lg] clamp-[pb,3.5,5,@sm,@lg]">
          <Image
            className="clamp-[size,10,16,@sm,@lg] rounded-full object-center"
            src={vendor?.store?.picture?.url ?? "/images/logo_placeholder.png"}
            alt={vendor?.store?.name ?? "placeholder logo"}
            width={40}
            height={40}
            priority
          />

          <h6 className="clamp-[ml,3,5,@sm,@lg] clamp-[mr,2,4,@sm,@lg] font-semibold clamp-[text,sm,lg,@sm,@lg] leading-normal">
            {vendor?.store?.name}
          </h6>

          <p
            className={`font-medium clamp-[text,0.5rem,xs,@sm,@lg] rounded-full clamp-[py,1,2,@sm,@lg] clamp-[px,1.5,4,@sm,@lg] ${
              vendor?.store?.active
                ? "text-[#057F3E] bg-[#057F3E0D]"
                : "text-[#F52222] bg-[#EDDCDC66]"
            }`}
          >
            {vendor?.store?.active ? "Open" : "Closed"}
          </p>
        </div>

        <Link href={`/${storeSlug}/profile`}>
          <Button className="text-[#A46900] rounded-full clamp-[text,xs,sm,@sm,@lg] font-semibold bg-[#FFF9E9] hover:bg-[#fcf2d8] !clamp-[py,1.5,2,@sm,@lg] !clamp-[px,2,4,@sm,@lg] cursor-pointer space-x-[2px] h-auto">
            <span>View Profile</span>
          </Button>
        </Link>
      </div>

      <div className="clamp-[pt,3,5,@sm,@lg]">
        <div className="md:flex md:justify-between md:items-center md:space-x-4">
          <Search value={searchValue} setValue={setSearchValue} />

          <button
            className={`cursor-pointer clamp-[text,sm,base,@sm,@lg] clamp-[py,1.5,2,@sm,@lg] clamp-[px,2,3,@sm,@lg] whitespace-nowrap ${
              active === "My Cart"
                ? "bg-[#FFF0C7] text-[#59201A] rounded-[4px]"
                : "text-[#98A2B3]"
            }`}
            onClick={() => setActive("My Cart")}
          >
            My Cart
          </button>

          <div className="clamp-[h,5,6,@sm,@lg] clamp-[w,0.0625rem,0.5,@sm,@lg] bg-[#F2F4F7]" />

          <div className="start space-x-3 overflow-x-auto no-scrollbar pt-2 pb-3 mt-2 clamp-[mr,-6,-8,@sm,@lg] clamp-[pr,4,5,@sm,@lg]">
            {filter.map((item) => {
              return (
                <div key={item} className="start">
                  <button
                    className={`cursor-pointer clamp-[text,sm,base,@sm,@lg] clamp-[py,1.5,2,@sm,@lg] clamp-[px,2,3,@sm,@lg] whitespace-nowrap ${
                      active === item
                        ? "bg-[#FFF0C7] text-[#59201A] rounded-[4px]"
                        : "text-[#98A2B3]"
                    }`}
                    // key={item}
                    onClick={() => setActive(item)}
                  >
                    {item}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {active === "My Cart" ? (
          <MyCart />
        ) : (
          <FoodList data={getItemsData?.data} isLoading={isLoading} />
        )}
      </div>

      <Topper />
    </div>
  );
};

export default Menu;
