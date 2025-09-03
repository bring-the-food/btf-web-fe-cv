/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { toast } from "sonner";

export type CartState = {
  combos: Record<string, { count: number }>;
  packs: Array<Record<string, { count: number }>>;
};

type SetCart = React.Dispatch<React.SetStateAction<CartState>>;

/**
 * Update combo count by delta (positive to add, negative to remove/decrease).
 * Removes the combo key when count <= 0.
 */
function updateComboCount(setCart: SetCart, comboId: string, delta: number) {
  setCart((prev) => {
    const combos = { ...prev.combos };
    const current = combos[comboId]?.count ?? 0;
    const next = Math.max(0, current + delta);

    if (next <= 0) {
      delete combos[comboId];
    } else {
      combos[comboId] = { count: next };
    }

    return { ...prev, combos };
  });
}

/**
 * Set combo to an absolute count. If count <= 0 the combo is removed.
 */
function setComboCount(setCart: SetCart, comboId: string, count: number) {
  setCart((prev) => {
    const combos = { ...prev.combos };
    if (count <= 0) {
      delete combos[comboId];
    } else {
      combos[comboId] = { count };
    }
    return { ...prev, combos };
  });
}

/**
 * Update an item inside a pack (identified by packIndex) by delta.
 * If the item count goes to 0 it is removed from the pack object.
 * If the packIndex is missing nothing happens.
 */
function updatePackItem(
  setCart: SetCart,
  packIndex: number,
  itemId: string,
  delta: number
) {
  setCart((prev) => {
    if (packIndex < 0 || packIndex >= prev.packs.length) return prev;

    const packs = prev.packs.map((p) => ({ ...p })); // shallow clone packs and pack objects
    const pack = { ...packs[packIndex] };
    const current = pack[itemId]?.count ?? 0;
    const next = Math.max(0, current + delta);

    if (next <= 0) {
      delete pack[itemId];
    } else {
      pack[itemId] = { count: next };
    }

    packs[packIndex] = pack;
    return { ...prev, packs };
  });
}

/**
 * Set absolute count for an item inside a pack. If count <= 0 remove the item.
 */
function setPackItemCount(
  setCart: SetCart,
  packIndex: number,
  itemId: string,
  count: number
) {
  setCart((prev) => {
    if (packIndex < 0 || packIndex >= prev.packs.length) return prev;

    const packs = prev.packs.map((p) => ({ ...p }));
    const pack = { ...packs[packIndex] };

    if (count <= 0) {
      delete pack[itemId];
    } else {
      pack[itemId] = { count };
    }

    packs[packIndex] = pack;
    return { ...prev, packs };
  });
}

/**
 * Add a new pack (object with itemId -> {count}) to packs
 */
function addPack(setCart: SetCart, pack: Record<string, { count: number }>) {
  setCart((prev) => ({ ...prev, packs: [...prev.packs, { ...pack }] }));
}

/**
 * Remove entire pack by index
 */
function removePack(setCart: SetCart, packIndex: number) {
  setCart((prev) => {
    if (packIndex < 0 || packIndex >= prev.packs.length) return prev;
    const packs = prev.packs
      .slice(0, packIndex)
      .concat(prev.packs.slice(packIndex + 1));
    return { ...prev, packs };
  });
}

/**
 * Helpers (optional) - get counts without touching state
 */
function getComboCount(state: CartState, comboId: string) {
  return state.combos[comboId]?.count ?? 0;
}
function getPackItemCount(state: CartState, packIndex: number, itemId: string) {
  const pack = state.packs[packIndex];
  return pack?.[itemId]?.count ?? 0;
}

const addToCart = async (storeId: string, payload: any) => {
  try {
    const response = await axios.put(
      `/api/cart/updateCarts?storeId=${storeId}`,
      payload
    );
    return { data: response.data, status: response.status };
  } catch (error: any) {
    toast.error(error.response.data?.message);
    throw { data: error.response.data, status: error.response.status };
  }
};

export const cartFunc = {
  addToCart,
  updateComboCount,
  setComboCount,
  updatePackItem,
  setPackItemCount,
  addPack,
  removePack,
  getComboCount,
  getPackItemCount,
};
