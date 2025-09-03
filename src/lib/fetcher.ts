/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { cookies } from "next/headers";

export async function fetchData(url: string, method: string, data?: any) {
  let response;

  const cookieStore = await cookies();
  const userDetails = cookieStore.get("userDetails");

  const token = JSON.parse(userDetails?.value ?? "")?.tokens?.tokens?.access;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (method === "GET") {
    return await axios
      .get(url, config)
      .then((response) => {
        return {
          status: response.status || 200,
          data: response.data,
        };
      })
      .catch((err) => {
        return {
          status: err?.response?.status || 400,
          data: err.response.data || { status: err.response.status || 400 },
        };
      });
  } else if (method === "POST") {
    return await axios
      .post(url, data, config)
      .then((response) => {
        return {
          status: response?.status || 400,
          data: response?.data,
        };
      })
      .catch((err) => {
        return {
          status: err.response ? err.response.status : 500,
          data: err.response?.data || {
            status: err.response?.status || 500,
            message: err.message,
          },
        };
      });
  } else if (method === "PUT") {
    return await axios
      .put(url, data, config)
      .then((response) => {
        return {
          status: response?.status || 400,
          data: response?.data,
        };
      })
      .catch((err) => {
        return {
          status: err.response ? err.response.status : 500,
          data: err.response?.data || {
            status: err.response?.status || 500,
            message: err.message,
          },
        };
      });
  }

  return response;
}
