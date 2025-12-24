/* eslint-disable @typescript-eslint/no-explicit-any */
import { koboToNaira } from "@/lib/formatCurrency";
import { swrfetcher } from "@/lib/swrfetcher";
import React from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { cartFunc } from "./functions/cart";
import Icon from "./Icon";
import { Button } from "./ui/button";

const MyCart = ({
  storeId,
  setCart,
  cart,
  onNewPack,
  onEditPack,
  onActionsComplete,
  category,
}: {
  storeSlug: string;
  storeId: string;
  setCart?: any;
  cart?: {
    combos: Record<string, { count: number }>;
    packs: Array<Record<string, { count: number }>>;
  };
  category?: string;
  onNewPack?: (index: number) => void;
  onEditPack?: (index: number) => void;
  onActionsComplete: () => void;
}) => {
  const { data, mutate } = useSWR(
    `/api/cart/getCarts?storeId=${storeId}`,
    swrfetcher
  );

  const comboItems = data?.data?.cart?.combos;
  const packItems = data?.data?.cart?.packs;

  const handleStartNewPack = async () => {
    if (!setCart) return;
    const prev = cart ?? { combos: {}, packs: [] };
    const newPacks = [
      ...(prev.packs ?? []),
      {} as Record<string, { count: number }>,
    ];
    const newCart = { ...prev, packs: newPacks };
    setCart(newCart);

    const newIndex = (prev.packs ?? []).length;
    onNewPack?.(newIndex);

    try {
      await cartFunc.addToCart(storeId, newCart);
    } catch (err) {
      console.error("Start new pack failed, reverting", err);
      setCart(prev);
    }
  };

  const handleDuplicatePack = async (index: number) => {
    if (!setCart) return;
    const prev = cart ?? { combos: {}, packs: [] };
    const packs = [...(prev.packs ?? [])].map((p) => ({ ...p }));
    const packToCopy = packs[index] ? { ...(packs[index] as any) } : {};
    const newPacks = [
      ...packs.slice(0, index + 1),
      packToCopy,
      ...packs.slice(index + 1),
    ];
    const newCart = { ...prev, packs: newPacks };
    setCart(newCart);

    try {
      await cartFunc.addToCart(storeId, newCart);
      mutate();
      onActionsComplete();
    } catch (err) {
      console.error("Duplicate pack failed, reverting", err);
      setCart(prev);
    }
  };

  const handleDeletePack = async (index: number | string) => {
    if (!setCart) return;
    let newCart;
    const prev = cart ?? { combos: {}, packs: [] };

    if (index === "combo") {
      newCart = { ...prev, combos: {} };
      setCart(newCart);
    } else {
      const newPacks = (prev.packs ?? []).filter((_, i) => i !== index);
      newCart = { ...prev, packs: newPacks };
      setCart(newCart);
    }

    try {
      await cartFunc.addToCart(storeId, newCart);
      mutate();
      onActionsComplete();
    } catch (err) {
      console.error("Delete pack failed, reverting", err);
      toast.error("Delete pack failed, reverting");
      setCart(prev);
    }
  };

  const handleChangePackItem = async (
    packIndex: number,
    itemId: string,
    delta: number
  ) => {
    if (!setCart) return;
    const prev = cart ?? { combos: {}, packs: [] };
    if (packIndex < 0 || packIndex >= (prev.packs ?? []).length) return;
    const packs = (prev.packs ?? []).map((p) => ({ ...p }));
    const pack = { ...(packs[packIndex] ?? {}) };
    const current = pack[itemId]?.count ?? 0;
    const next = Math.max(0, current + delta);
    if (next <= 0) {
      delete pack[itemId];
    } else {
      pack[itemId] = { count: next };
    }
    packs[packIndex] = pack;
    const newCart = { ...prev, packs };
    setCart(newCart);

    try {
      await cartFunc.addToCart(storeId, newCart);
      mutate();
      onActionsComplete();
    } catch (err) {
      console.error("Update pack item failed, reverting", err);
      setCart(prev);
    }
  };

  const handleChangeComboItem = async (itemId: string, delta: number) => {
    if (!setCart) return;
    const prev = cart ?? { combos: {}, packs: [] };
    const combos = { ...(prev.combos ?? {}) };
    const current = combos[itemId]?.count ?? 0;
    const next = Math.max(0, current + delta);
    if (next <= 0) {
      delete combos[itemId];
    } else {
      combos[itemId] = { count: next };
    }
    const newCart = { ...prev, combos };
    setCart(newCart);

    try {
      await cartFunc.addToCart(storeId, newCart);
      mutate();
      onActionsComplete();
    } catch (err) {
      console.error("Update combo failed, reverting", err);
      setCart(prev);
    }
  };

  return (
    <div className="clamp-[mt,4,8,@sm,@lg] space-y-6 md:space-y-8">
      {comboItems?.length > 0 && (
        <CartContent
          title="Combos"
          data={comboItems}
          onItemMinus={(id: string) => handleChangeComboItem(id, -1)}
          onItemPlus={(id: string) => handleChangeComboItem(id, 1)}
          hasNoDuplicate
          onDelete={() => handleDeletePack("combo")}
        />
      )}

      {Array.isArray(packItems) &&
        packItems.length > 0 &&
        packItems.map((pack: any, idx: number) => (
          <CartContent
            key={idx}
            title={`${category === "food" ? `Pack ${idx + 1}` : "Groceries"}`}
            hasEdit={category === "food"}
            data={pack}
            onEdit={() => onEditPack?.(idx)}
            onDuplicate={() => handleDuplicatePack(idx)}
            hasNoDuplicate={category !== "food"}
            onDelete={() => handleDeletePack(idx)}
            onItemMinus={(id: string) => handleChangePackItem(idx, id, -1)}
            onItemPlus={(id: string) => handleChangePackItem(idx, id, 1)}
          />
        ))}

      {(comboItems?.length === 0 && packItems?.length === 0) ||
        (!comboItems && !packItems ? (
          <div className="col-center my-20">
            <Icon icon="emptyCart" size={160} />

            <p className="text-center mt-4 clamp-[text,sm,lg,@sm,@lg]">
              Your cart is empty
            </p>

            <Button
              onClick={handleStartNewPack}
              className="text-[#59201A] hover:bg-[#fdb420] w-full max-w-sm bg-[#FFC247] rounded-xl clamp-[py,1.125rem,1.375rem,@sm,@lg]! clamp-[text,sm,base,@sm,@lg] font-semibold leading-5 clamp-[mt,2.5rem,3.125rem,@sm,@lg]"
            >
              Add items to cart
            </Button>
          </div>
        ) : (
          <div>
            {category !== "groceries" ? (
              <Button
                onClick={handleStartNewPack}
                className="text-[#59201A] rounded-full clamp-[text,xs,sm,@sm,@lg] font-medium bg-[#FFF9E9] hover:bg-[#fcf2d8] clamp-[py,3,4,@sm,@lg]! clamp-[px,4,6,@sm,@lg]! cursor-pointer space-x-[2.5px] h-auto"
              >
                <Icon
                  icon="add"
                  size={10}
                  className="clamp-[size,0.625rem,0.75rem,@sm,@lg]"
                />
                <span>Start new pack</span>
              </Button>
            ) : (
              <>
                {/* <Button
                  onClick={() => {
                    router.push(`/store/${storeSlug}?tab=All`);
                  }}
                  className="text-[#59201A] rounded-full clamp-[text,xs,sm,@sm,@lg] font-medium bg-[#FFF9E9] hover:bg-[#fcf2d8] clamp-[py,3,4,@sm,@lg]! clamp-[px,4,6,@sm,@lg]! cursor-pointer space-x-[2.5px] h-auto"
                >
                  <Icon
                    icon="add"
                    size={10}
                    className="clamp-[size,0.625rem,0.75rem,@sm,@lg]"
                  />
                  <span>Browse items</span>
                </Button> */}
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default MyCart;

type CartContentProps = {
  title: string;
  hasEdit?: boolean;
  data?: any;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onItemMinus?: (id: string) => void;
  onItemPlus?: (id: string) => void;
  hasNoDuplicate?: boolean;
};

const CartContent = ({
  title,
  hasEdit,
  data,
  onEdit,
  onDuplicate,
  onDelete,
  onItemMinus,
  onItemPlus,
  hasNoDuplicate,
}: CartContentProps) => {
  const items: any[] = React.useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) {
      return data.map((it) => (Array.isArray(it) ? it[0] : it));
    }
    if (typeof data === "object") {
      return Object.entries(data).map(([id, v]: any) => {
        if (v && typeof v === "object" && (v.name || v.price || v.count)) {
          return { id, ...(v as object) };
        }
        return { id, ...(v || {}) };
      });
    }
    return [];
  }, [data]);

  return (
    <div>
      <div className="between">
        <h5 className="text-black font-medium clamp-[text,sm,base,@sm,@lg] leading-normal">
          {title}
        </h5>
        <div className="end space-x-2 md:space-x-3">
          {hasEdit && (
            <button
              onClick={onEdit}
              className="rounded-full bg-[#F2F4F7] clamp-[p,1.5,2,@sm,@lg] w-fit"
              aria-label={`Edit ${title}`}
            >
              <Icon
                icon="edit"
                size={16}
                className="clamp-[size,1rem,1.1875rem,@sm,@lg]"
              />
            </button>
          )}
          {!hasNoDuplicate && (
            <button
              onClick={onDuplicate}
              className="rounded-full bg-[#2E896F14] clamp-[p,1.5,2,@sm,@lg] w-fit"
              aria-label={`Duplicate ${title}`}
            >
              <Icon
                icon="duplicate"
                size={16}
                className="clamp-[size,1rem,1.1875rem,@sm,@lg]"
              />
            </button>
          )}
          <button
            onClick={onDelete}
            className="rounded-full bg-[#FD88880D] clamp-[p,1.5,2,@sm,@lg] w-fit"
            aria-label={`Delete ${title}`}
          >
            <Icon
              icon="trash"
              size={16}
              className="clamp-[size,1rem,1.1875rem,@sm,@lg]"
            />
          </button>
        </div>
      </div>

      <div className="clamp-[mt,5,9,@sm,@lg] space-y-4 md:space-y-6">
        {items.map((item: any, index: number) => {
          return (
            <Pallet
              key={item?.id ?? index}
              name={item?.name ?? item?.id ?? "Item"}
              price={item?.price?.amount ?? item?.price ?? 0}
              count={Number(item?.count ?? 0)}
              onMinus={() => onItemMinus?.(item?.id)}
              onPlus={() => onItemPlus?.(item?.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

const Pallet = ({
  name,
  price,
  count,
  onMinus,
  onPlus,
}: {
  name: string;
  price: number;
  count: number;
  onMinus?: () => void;
  onPlus?: () => void;
}) => {
  return (
    <div className="start-start">
      <Icon
        icon="star"
        size={12}
        className="clamp-[size,0.75rem,0.875rem,@sm,@lg]"
      />

      <div className="clamp-[ml,0.8125rem,1.0625rem,@sm,@lg]">
        <h6 className="clamp-[text,xs,sm,@sm,@lg] font-medium leading-normal text-[#1D2939]">
          {name}
        </h6>
        <p className="text-[#98A2B3] font-normal clamp-[text,xs,sm,@sm,@lg] leading-normal">
          {koboToNaira(price)}
        </p>
      </div>

      <div className="ml-auto end space-x-3 md:space-x-4 bg-[#F2F4F7] rounded-full clamp-[py,0.375rem,0.625rem,@sm,@lg] clamp-[px,0.75rem,1rem,@sm,@lg]">
        <button onClick={onMinus} aria-label="minus">
          <Icon
            icon="minus"
            w={10}
            h={12}
            className="clamp-[w,0.625rem,0.875rem,@sm,@lg] clamp-[h,0.75rem,1rem,@sm,@lg]"
          />
        </button>
        <p className="text-[#344054] font-medium clamp-[text,xs,sm,@sm,@lg] leading-normal">
          {count}
        </p>
        <button onClick={onPlus} aria-label="plus">
          <Icon
            icon="plus"
            w={10}
            h={10}
            className="clamp-[size,0.625rem,0.875rem,@sm,@lg]"
          />
        </button>
      </div>
    </div>
  );
};
