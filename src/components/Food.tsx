/* eslint-disable @typescript-eslint/no-explicit-any */
import { koboToNaira } from "@/lib/formatCurrency";
import Image from "next/image";
import React from "react";
import Icon from "./Icon";
import { Skeleton } from "./ui/skeleton";
import { cartFunc } from "./functions/cart";

export type dataProps = {
  data: {
    id: string;
    name: string;
    description: string;
    price: {
      amount: number;
    };
    picture: {
      url: string;
    };
  };
  setCart: any;
  type: string;
  cart: any;
  storeId: string;
  editPackIndex?: number | null;
  setEditPackIndex?: any;
  onActionsComplete: () => void;
  isAll: boolean;
};

const Food = ({
  data,
  type,
  isAll,
  cart,
  setCart,
  storeId,
  editPackIndex,
  setEditPackIndex,
  onActionsComplete,
}: dataProps) => {
  const [isAdd, setIsAdd] = React.useState(true);
  const [quantity, setQuantity] = React.useState(0);
  const [packIndex, setPackIndex] = React.useState<number | null>(null);

  // helper: total count for this item across all packs
  const getTotalPackItemCountFromCart = (c: any, itemId: string) => {
    const packs = c?.packs ?? [];
    return packs.reduce(
      (acc: number, p: any) => acc + (p?.[itemId]?.count ?? 0),
      0
    );
  };

  const findPackIndexContainingItem = (c: any, itemId: string) => {
    const packs = c?.packs ?? [];
    for (let i = 0; i < packs.length; i++) {
      if (packs[i] && Object.prototype.hasOwnProperty.call(packs[i], itemId)) {
        return i;
      }
    }
    return -1;
  };

  const findEmptyPackIndex = (c: any) => {
    const packs = c?.packs ?? [];
    for (let i = 0; i < packs.length; i++) {
      const p = packs[i] ?? {};
      if (Object.keys(p).length === 0) return i;
    }
    return -1;
  };

  // sync UI quantity / isAdd / packIndex from cart prop
  React.useEffect(() => {
    if (!cart) return;
    if (type === "combo") {
      const q = cart?.combos?.[data.id]?.count ?? 0;
      setQuantity(q);
      setIsAdd(q === 0);
      setPackIndex(null);
    } else {
      // if an editPackIndex is provided, show quantity only for that pack so packs don't mix
      if (typeof editPackIndex === "number" && editPackIndex >= 0) {
        const q = cart?.packs?.[editPackIndex]?.[data.id]?.count ?? 0;
        setQuantity(q);
        setIsAdd(q === 0);
        setPackIndex(editPackIndex);
      } else {
        const q = getTotalPackItemCountFromCart(cart, data.id);
        setQuantity(q);
        setIsAdd(q === 0);
        const idx = findPackIndexContainingItem(cart, data.id);
        setPackIndex(idx >= 0 ? idx : null);
      }
    }
  }, [cart, data.id, type, editPackIndex]);

  const handleAdd = async () => {
    const prev = cart;
    try {
      let newCart = { ...prev };

      if (type === "combo") {
        const current = prev.combos?.[data.id]?.count ?? 0;
        const next = Math.max(0, current + 1);
        const combos = { ...(prev.combos ?? {}) };
        if (next <= 0) {
          delete combos[data.id];
        } else {
          combos[data.id] = { count: next };
        }
        newCart = { ...prev, combos };
      } else {
        // prefer explicit editPackIndex if provided (target that pack)
        const targetIndex =
          typeof editPackIndex === "number" && editPackIndex >= 0
            ? editPackIndex
            : findEmptyPackIndex(prev);

        if (typeof editPackIndex === "number" && editPackIndex >= 0) {
          const packs = [...(prev.packs ?? [])].map((p: any) => ({ ...p }));
          const pack = { ...(packs[targetIndex] ?? {}) };
          const current = pack[data.id]?.count ?? 0;
          pack[data.id] = { count: current + 1 };
          packs[targetIndex] = pack;
          newCart = { ...prev, packs };
          setPackIndex(targetIndex);
        } else if (targetIndex >= 0) {
          const packs = [...(prev.packs ?? [])].map((p: any) => ({ ...p }));
          const pack = { ...(packs[targetIndex] ?? {}) };
          const current = pack[data.id]?.count ?? 0;
          pack[data.id] = { count: current + 1 };
          packs[targetIndex] = pack;
          newCart = { ...prev, packs };
          setPackIndex(targetIndex);
        } else {
          // create a new pack with this item (no empty pack found)
          const packs = [...(prev.packs ?? [])];
          const index = packs.length;
          packs.push({ [data.id]: { count: 1 } } as Record<
            string,
            { count: number }
          >);
          newCart = { ...prev, packs };
          setPackIndex(index);
          // if parent wants to record the new editing index keep it in sync
          setEditPackIndex?.(index);
        }
      }

      // optimistic UI
      setCart(newCart);

      // send to server
      await cartFunc.addToCart(storeId, newCart);
      onActionsComplete();

      // reflect resulting qty
      if (type === "combo") {
        const q = newCart?.combos?.[data.id]?.count ?? 0;
        setQuantity(q);
        setIsAdd(q === 0);
      } else {
        // prefer pack-specific count when editing a pack
        const q =
          typeof editPackIndex === "number" && editPackIndex >= 0
            ? newCart?.packs?.[editPackIndex]?.[data.id]?.count ?? 0
            : getTotalPackItemCountFromCart(newCart, data.id);
        setQuantity(q);
        setIsAdd(q === 0);
      }
    } catch (err) {
      console.error("Add to cart failed, reverting local state", err);
      // revert optimistic update
      setCart(prev);
    }
  };

  const handlePlusMinus = async (action: string) => {
    const delta = action === "plus" ? 1 : -1;
    const prev = cart;

    // optimistic local quantity update displayed immediately
    setQuantity((q) => {
      const next = Math.max(0, q + delta);
      if (next === 0) setIsAdd(true);
      return next;
    });

    try {
      let newCart = { ...prev };

      if (type === "combo") {
        const current = prev.combos?.[data.id]?.count ?? 0;
        const next = Math.max(0, current + delta);
        const combos = { ...(prev.combos ?? {}) };
        if (next <= 0) {
          delete combos[data.id];
        } else {
          combos[data.id] = { count: next };
        }
        newCart = { ...prev, combos };
      } else {
        // pack handling
        // try to find a pack that contains this item
        // prefer editPackIndex if provided
        let idx =
          typeof editPackIndex === "number" && editPackIndex >= 0
            ? editPackIndex
            : findPackIndexContainingItem(prev, data.id);
        if (idx === -1) idx = packIndex ?? -1;

        if (idx === -1) {
          // try to reuse an existing empty pack before creating a new one
          const emptyIndex = findEmptyPackIndex(prev);
          const targetEmpty =
            typeof editPackIndex === "number" && editPackIndex >= 0
              ? editPackIndex
              : emptyIndex;

          if (targetEmpty >= 0 && delta > 0) {
            const packs = (prev.packs ?? []).map((p: any) => ({ ...p }));
            const pack = { ...(packs[targetEmpty] ?? {}) };
            const current = pack[data.id]?.count ?? 0;
            pack[data.id] = { count: current + delta };
            packs[targetEmpty] = pack;
            newCart = { ...prev, packs };
            setPackIndex(targetEmpty);
            setEditPackIndex?.(targetEmpty);
          } else if (idx === -1 && delta > 0) {
            const packs = [...(prev.packs ?? [])];
            const index = packs.length;
            packs.push({ [data.id]: { count: 1 } } as Record<
              string,
              { count: number }
            >);
            newCart = { ...prev, packs };
            setPackIndex(index);
            setEditPackIndex?.(index);
          } else {
            // decrement with no pack -> nothing to do
            // revert displayed quantity
            setQuantity((q) => Math.max(0, q - delta * -1)); // revert change
            return;
          }
        } else {
          const packs = (prev.packs ?? []).map((p: any) => ({ ...p }));
          const pack = { ...(packs[idx] ?? {}) };
          const current = pack[data.id]?.count ?? 0;
          const next = Math.max(0, current + delta);
          if (next <= 0) {
            delete pack[data.id];
          } else {
            pack[data.id] = { count: next };
          }
          packs[idx] = pack;
          newCart = { ...prev, packs };
          setPackIndex(idx);
        }
      }

      // optimistic UI
      setCart(newCart);

      // send to server
      await cartFunc.addToCart(storeId, newCart);
      onActionsComplete();

      // update displayed quantity from resulting cart
      if (type === "combo") {
        const q = newCart?.combos?.[data.id]?.count ?? 0;
        setQuantity(q);
        setIsAdd(q === 0);
      } else {
        // prefer pack-specific count when editing a pack
        const q =
          typeof editPackIndex === "number" && editPackIndex >= 0
            ? newCart?.packs?.[editPackIndex]?.[data.id]?.count ?? 0
            : getTotalPackItemCountFromCart(newCart, data.id);
        setQuantity(q);
        setIsAdd(q === 0);
      }
    } catch (err) {
      console.error("Update cart failed, reverting local state", err);
      // revert optimistic update
      setCart(prev);

      // restore displayed quantity from prev
      if (type === "combo") {
        const q = prev?.combos?.[data.id]?.count ?? 0;
        setQuantity(q);
        setIsAdd(q === 0);
      } else {
        const q =
          typeof editPackIndex === "number" && editPackIndex >= 0
            ? prev?.packs?.[editPackIndex]?.[data.id]?.count ?? 0
            : getTotalPackItemCountFromCart(prev, data.id);
        setQuantity(q);
        setIsAdd(q === 0);
      }
    }
  };

  return (
    <div className="between space-x-[45px] clamp-[pb,2,3.5,@sm,@lg] border-b border-[#F2F4F7]">
      <div className="w-full">
        <div className="between space-x-5 w-full">
          <h5 className="clamp-[text,sm,base,@sm,@lg] font-jakart font-medium leading-5 text-[#1D2939]">
            {data?.name}
          </h5>

          {isAll && type === "combo" && (
            <div className="bg-[#FFC247] rounded-full text-[#59201A] clamp-[text,0.5rem,0.625rem,@sm,@lg] clamp-[px,2,3,@sm,@lg] clamp-[py,0.5,1,@sm,@lg] font-medium leading-3.5">
              Combo
            </div>
          )}
        </div>
        <p className="clamp-[mt,1,2,@sm,@lg] text-[#98A2B3] clamp-[text,xs,sm,@sm,@lg] leading-normal font-jakart !clamp-[pr,5,6,@sm,@lg]">
          {data?.description}
        </p>

        <p className="font-jakart font-semibold clamp-[text,sm,base,@sm,@lg] leading-5 text-[#1D2939] clamp-[mt,1.4375rem,2rem,@sm,@lg]">
          {koboToNaira(data?.price?.amount)}
        </p>
      </div>

      <div className="clamp-[max-w,7rem,10rem,@sm,@lg] w-full clamp-[h,7rem,10rem,@sm,@lg] clamp-[rounded,0.25rem,0.5rem,@sm,@lg] overflow-hidden clamp-[max-h,7rem,10rem,@sm,@lg] relative min-w-[112px]">
        <Image
          className="size-full object-cover object-center"
          src={data?.picture?.url ?? "/images/food_placeholder.png"}
          alt={data?.name ?? "food placeholder"}
          width={112}
          height={112}
        />

        {isAdd ? (
          <button
            onClick={handleAdd}
            className="bg-[#FFC247] hover:bg-[#ffc247e5] cursor-pointer transition-colors text-[#59201A] clamp-[text,sm,base,@sm,@lg] font-jakart font-medium leading-normal absolute bottom-0 z-50 w-full clamp-[py,0.4375rem,0.8125rem,@sm,@lg] center space-x-[6.5px]"
          >
            <span>Add</span>
            <Image
              src="/svg/add.svg"
              alt="add"
              width={7}
              height={7}
              className="clamp-[w,0.4375rem,0.8125rem,@sm,@lg]"
            />
          </button>
        ) : (
          <div className="bg-[#FFF0C7] cursor-pointer transition-colors text-[#59201A] clamp-[text,sm,base,@sm,@lg] font-jakart font-medium leading-normal absolute bottom-0 z-50 w-full clamp-[py,0.4375rem,0.8125rem,@sm,@lg] center space-x-6">
            <button
              className="hover:bg-[#f8e3a8]"
              onClick={() => handlePlusMinus("minus")}
            >
              <Icon icon="c_minus" size={16} />
            </button>
            <span>{quantity}</span>
            <button
              className="hover:bg-[#f8e3a8]"
              onClick={() => handlePlusMinus("plus")}
            >
              <Icon icon="c_plus" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Food;

export const FoodSkeleton = () => {
  return (
    <div className="between space-x-[45px] clamp-[pb,2,3.5,@sm,@lg] border-b border-[#F2F4F7]">
      <div>
        <Skeleton className="clamp-[h,5,4,@sm,@lg] w-[150px] bg-gray-200 rounded-none" />
        <Skeleton className="clamp-[mt,1,2,@sm,@lg] clamp-[h,5,4,@sm,@lg] w-[250px] bg-gray-200 rounded-none" />

        <Skeleton className="clamp-[mt,1.4375rem,2rem,@sm,@lg] clamp-[h,7,5,@sm,@lg] w-[100px] bg-gray-200 rounded-none" />
      </div>

      <div className="clamp-[max-w,7rem,10rem,@sm,@lg] w-full clamp-[h,7rem,10rem,@sm,@lg] clamp-[rounded,0.25rem,0.5rem,@sm,@lg] overflow-hidden clamp-[max-h,7rem,10rem,@sm,@lg] relative">
        <Skeleton className="clamp-[size,7rem,5rem,@sm,@lg] w-full h-full bg-gray-200" />
      </div>
    </div>
  );
};
