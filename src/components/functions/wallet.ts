import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const fundWallet = async (amount: number) => {
  try {
    const response = await axios.post(`/api/wallet/fundWallet`, { amount });
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    toast.error(axiosError.response?.data?.message || "Something went wrong");
    throw {
      data: axiosError.response?.data,
      status: axiosError.response?.status,
    };
  }
};

const getTransaction = async (id: string) => {
  try {
    const response = await axios.get(
      `/api/wallet/getTransaction?transactionId=${id}`,
    );
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    toast.error(axiosError.response?.data?.message || "Something went wrong");
    throw {
      data: axiosError.response?.data,
      status: axiosError.response?.status,
    };
  }
};

export const walletFunc = { fundWallet, getTransaction };
