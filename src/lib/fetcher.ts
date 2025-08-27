/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export async function fetchData(url: string, method: string, data?: any) {
  let response;

  if (method === "GET") {
    return await axios
      .get(url)
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
      .post(url, data)
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

export const swrfetcher = (url: string) => fetch(url).then((r) => r.json());
