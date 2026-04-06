import axios from "axios";
import { logoutIfSessionExpired } from "./auth";
import { PLATFORM_CLIENT_TYPE } from "./platform-client";

const http = axios.create({
  headers: {
    "x-platform-client-type": PLATFORM_CLIENT_TYPE,
  },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    logoutIfSessionExpired(
      error?.response?.status,
      error?.response?.data?.message,
    );

    return Promise.reject(error);
  },
);

export default http;

export async function apiFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
) {
  const headers = new Headers(init.headers);
  headers.set("x-platform-client-type", PLATFORM_CLIENT_TYPE);

  const response = await fetch(input, {
    ...init,
    headers,
  });

  let message: string | null = null;
  if (response.status === 401 || response.status === 403) {
    try {
      const clonedResponse = response.clone();
      const data = await clonedResponse.json();
      message =
        typeof data?.message === "string"
          ? data.message
          : typeof data?.error === "string"
            ? data.error
            : null;
    } catch {
      message = null;
    }

    logoutIfSessionExpired(response.status, message);
  }

  return response;
}
