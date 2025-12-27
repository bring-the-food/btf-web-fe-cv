/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "sonner";

const updateTel = async (orderId: string, payload: { telephone: string }) => {
  try {
    const response = await axios.put(
      `/api/orders/updateOrderTel?orderId=${orderId}`,
      payload
    );
    return { data: response.data, status: response.status };
  } catch (error: any) {
    toast.error(error.response.data?.message);
    throw { data: error.response.data, status: error.response.status };
  }
};

const rateRider = async (
  userId: string,
  payload: { text: string; rating: number }
) => {
  try {
    const response = await axios.post(
      `/api/orders/rateRider?userId=${userId}`,
      payload
    );
    return { data: response.data, status: response.status };
  } catch (error: any) {
    toast.error(error.response.data?.message);
    throw { data: error.response.data, status: error.response.status };
  }
};

const rateVendor = async (
  storeId: string,
  payload: { text: string; rating: number }
) => {
  try {
    const response = await axios.post(
      `/api/orders/rateVendor?storeId=${storeId}`,
      payload
    );
    return { data: response.data, status: response.status };
  } catch (error: any) {
    toast.error(error.response.data?.message);
    throw { data: error.response.data, status: error.response.status };
  }
};

const cancelOrder = async (orderId: string) => {
  try {
    const response = await axios.delete(
      `/api/orders/cancelOrder?orderId=${orderId}`
    );
    return { data: response.data, status: response.status };
  } catch (error: any) {
    toast.error(error.response.data?.message);
    throw { data: error.response.data, status: error.response.status };
  }
};

const regeneratePayment = async (orderId: string, amount: number) => {
  try {
    const response = await axios.post(`/api/orders/regeneratePayment`, {
      orderId,
      amount,
    });
    return { data: response.data, status: response.status };
  } catch (error: any) {
    toast.error(error.response.data?.message || "Failed to regenerate payment");
    throw { data: error.response.data, status: error.response.status };
  }
};

export const orderFunc = {
  updateTel,
  rateRider,
  cancelOrder,
  rateVendor,
  regeneratePayment,
};
