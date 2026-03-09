import { destroyCookie } from "nookies";

export const logout = () => {
  destroyCookie(null, "userDetails", { path: "/" });
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
};
