/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "sonner";

const fundWallet = async (amount: number) => {
  try {
    const response = await axios.post(`/api/wallet/fundWallet`, { amount });
    return { data: response.data, status: response.status };
  } catch (error: any) {
    toast.error(error.response.data?.message);
    throw { data: error.response.data, status: error.response.status };
  }
};

const getTransaction = async (id: string) => {
  try {
    const response = await axios.get(
      `/api/wallet/getTransaction?transactionId=${id}`
    );
    return { data: response.data, status: response.status };
  } catch (error: any) {
    toast.error(error.response.data?.message);
    throw { data: error.response.data, status: error.response.status };
  }
};

export const walletFunc = { fundWallet, getTransaction };
