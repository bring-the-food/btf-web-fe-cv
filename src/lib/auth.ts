import { destroyCookie, parseCookies } from "nookies";

let logoutInProgress = false;
export const AUTH_STATE_CHANGED_EVENT = "btf:auth-state-changed";

export const logout = () => {
  destroyCookie(null, "userDetails", { path: "/" });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AUTH_STATE_CHANGED_EVENT));
  }
};

export const isAuthExpiredResponse = (
  status?: number,
  message?: string | null,
) => {
  if (status === 401) return true;
  if (status === 403) return true;

  return (
    typeof message === "string" &&
    message.toLowerCase().includes("session has expired")
  );
};

export const logoutIfSessionExpired = (
  status?: number,
  message?: string | null,
) => {
  if (!isAuthExpiredResponse(status, message) || logoutInProgress) {
    return false;
  }

  const { userDetails } = parseCookies();
  if (!userDetails) {
    return false;
  }

  logoutInProgress = true;
  logout();
  logoutInProgress = false;
  return true;
};
