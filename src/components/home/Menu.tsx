/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { swrfetcher } from "@/lib/swrfetcher";
import { useRouter, useSearchParams } from "next/navigation";
import useQueryString from "../hooks/useQueryString";
import { cartFunc } from "../functions/cart";
import { Loader2Icon } from "lucide-react";
import { buildUrlWithParams } from "@/lib/urlParamBuilder";

const Menu = ({
  storeSlug,
  vendor,
  isVendorLoading,
}: {
  storeSlug: string;
  vendor: any;
  isVendorLoading: boolean;
}) => {
  const getUpdatedUrl = useQueryString();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab");
  const search = searchParams.get("search");
  // const lastkey = searchParams.get("lastkey");

  const [searchValue, setSearchValue] = React.useState("");
  const [active, setActive] = React.useState("All");
  const [url, setUrl] = React.useState("getAllItems");
  const [categoryId, setCategoryId] = React.useState("getAllItems");
  const [cart, setCart] = React.useState<{
    combos: Record<string, { count: number }>;
    packs: Array<Record<string, { count: number }>>;
  }>({
    combos: {},
    packs: [],
  });
  const [editPackIndex, setEditPackIndex] = React.useState<number | null>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cart?.packs?.length > 0) {
      setEditPackIndex(cart?.packs?.length - 1);
    } else {
      setEditPackIndex(null);
    }
  }, [cart]);

  const { data: menuCategoriesData, isLoading: menuCartLoading } = useSWR(
    vendor ? `/api/home/getCats?storeId=${vendor?.store?.id}` : null,
    swrfetcher
  );

  const { data: cartData } = useSWR(
    vendor ? `/api/cart/getCarts?storeId=${vendor?.store?.id}` : null,
    swrfetcher
  );

  const { data: getItemsData, isLoading } = useSWR(
    vendor
      ? buildUrlWithParams(`/api/home/${url}`, {
          storeId: vendor?.store?.id,
          keyword: search,
          // pageSize: 3,
          // lastEvaluatedKey: ''
        })
      : null,
    swrfetcher
  );

  const { data: menuCatItemsData, isLoading: menuCatItemIsLoading } = useSWR(
    vendor && categoryId && categoryId !== "getAllItems"
      ? buildUrlWithParams(`/api/home/getCatItems`, {
          storeId: vendor?.store?.id,
          categoryId: categoryId,
          keyword: search,
          // pageSize: 3,
          // lastEvaluatedKey: "",
        })
      : null,
    swrfetcher
  );

  React.useEffect(() => {
    if (search) setSearchValue(search);
  }, [search]);

  const mappedCats = React.useMemo(() => {
    return (
      menuCategoriesData?.data?.map((cat: any) => ({
        id: cat?.id,
        label: cat?.name,
      })) ?? []
    );
  }, [menuCategoriesData?.data]);

  React.useEffect(() => {
    if (tab && mappedCats.length > 0) {
      const categoryTab = mappedCats.find((cat: any) => cat.label === tab);
      if (categoryTab) {
        setActive(tab);
        setCategoryId(categoryTab.id);
      } else if (tab === "Combos") {
        setActive("Combos");
        setUrl("getComboItems");
      } else if (tab === "My Cart") {
        setActive("My Cart");
      }
    }
  }, [tab, mappedCats]);

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

  React.useEffect(() => {
    if (!cartData) return;

    const payload = cartData?.data ?? cartData;
    const cartObj = payload?.cart ?? payload;

    const combos: Record<string, { count: number }> = {};
    if (Array.isArray(cartObj?.combos)) {
      cartObj.combos.forEach((c: any) => {
        if (c?.id) combos[c.id] = { count: Number(c.count ?? 0) };
      });
    } else if (cartObj?.combos && typeof cartObj.combos === "object") {
      Object.entries(cartObj.combos).forEach(([k, v]: any) => {
        combos[k] = { count: Number(v?.count ?? v ?? 0) };
      });
    }

    const packs: Array<Record<string, { count: number }>> = Array.isArray(
      cartObj?.packs
    )
      ? cartObj.packs.map((p: any) => {
          if (Array.isArray(p)) {
            const obj: Record<string, { count: number }> = {};
            p.forEach((it: any) => {
              if (it?.id) obj[it.id] = { count: Number(it.count ?? 0) };
            });
            return obj;
          }
          if (p && typeof p === "object") {
            const obj: Record<string, { count: number }> = {};
            Object.entries(p).forEach(([k, v]: any) => {
              obj[k] = { count: Number(v?.count ?? v ?? 0) };
            });
            return obj;
          }
          return {};
        })
      : [];

    setCart({ combos, packs });
  }, [cartData, setCart]);

  const filter = [
    {
      id: "All",
      label: "All",
    },
    {
      id: "Combos",
      label: "Combos",
    },
    ...mappedCats,
  ];

  const menuCatItemsWithCategory = menuCatItemsData?.data?.map((it: any) => ({
    ...it,
    category: { ...(it?.category ?? {}), id: categoryId },
  }));

  return (
    <>
      {isVendorLoading || menuCartLoading ? (
        <div className="mx-auto">
          <Loader2Icon className="animate-spin clamp-[size,8,14,@sm,@lg] clamp-[mt,20,32,@sm,@lg] mx-auto" />
        </div>
      ) : (
        <div className="relative">
          <div className="between">
            <div className="start clamp-[pt,4,6,@sm,@lg] clamp-[pb,3.5,5,@sm,@lg]">
              <Image
                className="clamp-[size,10,16,@sm,@lg] rounded-full object-center"
                src={
                  vendor?.store?.picture?.url ?? "/images/logo_placeholder.png"
                }
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

            <Link href={`/store/${storeSlug}/profile`}>
              <Button className="text-[#A46900] rounded-full clamp-[text,xs,sm,@sm,@lg] font-semibold bg-[#FFF9E9] hover:bg-[#fcf2d8] !clamp-[py,1.5,2,@sm,@lg] !clamp-[px,2,4,@sm,@lg] cursor-pointer space-x-[2px] h-auto">
                <span>View Profile</span>
              </Button>
            </Link>
          </div>

          <div className="clamp-[pt,3,5,@sm,@lg]">
            <div className="md:flex md:justify-between md:items-center md:space-x-4">
              <Search value={searchValue} setValue={setSearchValue} />

              <div className="start md:space-x-4">
                <button
                  className={`cursor-pointer clamp-[text,sm,base,@sm,@lg] clamp-[py,1.5,2,@sm,@lg] clamp-[px,2,3,@sm,@lg] whitespace-nowrap ${
                    active === "My Cart"
                      ? "bg-[#FFF0C7] text-[#59201A] rounded-[4px]"
                      : "text-[#98A2B3]"
                  }`}
                  onClick={() => {
                    setActive("My Cart");
                    router.push(
                      getUpdatedUrl({
                        tab: "My Cart",
                      })
                    );
                  }}
                >
                  My Cart
                </button>

                <div className="clamp-[h,5,6,@sm,@lg] clamp-[w,0.0625rem,0.5,@sm,@lg] bg-[#F2F4F7]" />

                <div className="start space-x-3 overflow-x-auto no-scrollbar pt-2 pb-3 mt-2 clamp-[mr,-6,-8,@sm,@lg] clamp-[pr,4,5,@sm,@lg]">
                  {filter.map((item) => {
                    return (
                      <div key={item?.id} className="start">
                        <button
                          className={`cursor-pointer clamp-[text,sm,base,@sm,@lg] clamp-[py,1.5,2,@sm,@lg] clamp-[px,2,3,@sm,@lg] whitespace-nowrap ${
                            active === item.label
                              ? "bg-[#FFF0C7] text-[#59201A] rounded-[4px]"
                              : "text-[#98A2B3]"
                          }`}
                          onClick={() => {
                            setActive(item.label);
                            if (item.id !== "All" && item.id !== "Combos") {
                              setCategoryId(item.id);
                            } else if (item.id === "Combos") {
                              setUrl("getComboItems");
                            }
                            router.push(
                              getUpdatedUrl({
                                tab: item.label,
                              })
                            );
                          }}
                        >
                          {item.label}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {active === "My Cart" ? (
              <MyCart
                storeId={vendor?.store?.id}
                setCart={setCart}
                cart={cart}
                onNewPack={(index: number) => {
                  setActive("All");
                  setEditPackIndex(index);
                  setIsEditing(false);
                }}
                onEditPack={(index: number) => {
                  setActive("All");
                  setEditPackIndex(index);
                  setIsEditing(true);
                }}
              />
            ) : (
              <FoodList
                storeId={vendor?.store?.id}
                setCart={setCart}
                cart={cart}
                editPackIndex={editPackIndex}
                setEditPackIndex={setEditPackIndex}
                data={
                  active === "All" || active === "Combos"
                    ? getItemsData?.data
                    : menuCatItemsWithCategory
                }
                isLoading={
                  active === "All" || active === "Combos"
                    ? isLoading
                    : menuCatItemIsLoading
                }
              />
            )}
          </div>

          <Topper
            isEditing={isEditing}
            onEditing={() => {
              setActive("My Cart");
              router.push(
                getUpdatedUrl({
                  tab: "My Cart",
                })
              );
            }}
            storeSlug={storeSlug}
            editPackIndex={editPackIndex}
            onStartNewPack={async () => {
              const prev = cart ?? { combos: {}, packs: [] };
              const newIndex = (prev.packs ?? []).length;
              const newPacks = [
                ...(prev.packs ?? []),
                {} as Record<string, { count: number }>,
              ];
              const newCart = { ...prev, packs: newPacks };

              setCart(newCart);
              setActive("All");
              setEditPackIndex(newIndex);
              setIsEditing(false);

              try {
                await cartFunc.addToCart(vendor?.store?.id, newCart);
              } catch (err) {
                console.error("Start new pack (topper) failed, reverting", err);
                setCart(prev);
                setEditPackIndex(null);
              }
            }}
            totalItemsLabel={`Proceed to order ${
              /* compute total items if desired */ ""
            }`}
            totalPriceLabel={/* compute total price if desired */ "—"}
          />
        </div>
      )}
    </>
  );
};

export default Menu;
