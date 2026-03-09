import { parseCookies } from "nookies";
import { logout } from "./auth";

export const swrfetcher = (url: string) =>
  fetch(url).then((res) => {
    if (res.status === 401) {
      const { userDetails } = parseCookies();
      if (userDetails) {
        logout();
      }
    }
    return res.json();
  });
