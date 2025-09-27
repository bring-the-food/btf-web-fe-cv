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

export const orderFunc = { updateTel, rateRider };
