import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const SendOTP = async (phoneNumber: string) => {
  const data = JSON.stringify({
    telephone: phoneNumber,
    reason: "guest",
  });

  try {
    const response = await axios.post("/api/otp/send", data);
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

const VerifyOTP = async (phoneNumber: string, code: string) => {
  const data = JSON.stringify({
    telephone: phoneNumber,
    code,
  });

  try {
    const response = await axios.post("/api/otp/verify", data);
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

export const homeFunc = {
  SendOTP,
  VerifyOTP,
};
