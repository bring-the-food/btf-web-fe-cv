/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "sonner";

const SendOTP = async (phoneNumber: string) => {
  const data = JSON.stringify({
    telephone: phoneNumber,
    reason: "guest",
  });

  try {
    const response = await axios.post("/api/otp/send", data);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    toast.error(error.response.data?.message);
    throw { data: error.response.data, status: error.response.status };
  }
};

const VerifyOTP = async (phoneNumber: string, code: string) => {
  const data = JSON.stringify({
    telephone: phoneNumber,
    code,
  });

  try {
    const response = await axios.post("/api/otp/verify", data);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    toast.error(error.response.data?.message);
    throw { data: error.response.data, status: error.response.status };
  }
};

export const homeFunc = {
  SendOTP,
  VerifyOTP,
};
