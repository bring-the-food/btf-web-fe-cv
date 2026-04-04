/**
 * This file serves as the single source of truth for all external app redirection links.
 * Update these URLs as they become available to automatically update all relevant buttons in the app.
 */

export const APP_LINKS = {
  // Base URI scheme for deep linking into the mobile app
  // Replace with the actual scheme once available (e.g., 'bringthisfood://')
  DEEP_LINK_SCHEME: "bringthisfood://",

  // Routes within the app
  ROUTES: {
    CHAT: "chat",
    ORDERS: "orders",
    PROFILE: "profile",
    REPORT: "report",
  },

  // App Store Links
  STORES: {
    GOOGLE_PLAY:
      "https://play.google.com/store/apps/details?id=com.btfcustomer.btf&pcampaignid=web_share",
    APPLE_APP_STORE: "https://apps.apple.com/ng/app/bringthisfood-consumer/id6756045001",
    IOS: {
      CONSUMER: "https://apps.apple.com/ng/app/bringthisfood-consumer/id6756045001",
      VENDOR: "https://apps.apple.com/ng/app/bringthisfood-vendor/id6754225661",
      RIDER: "https://apps.apple.com/ng/app/bringthisfood-rider/id6754207087",
    },
    ANDROID: {
      CONSUMER: "https://play.google.com/store/apps/details?id=com.btfcustomer.btf&pcampaignid=web_share",
      VENDOR: "https://play.google.com/store/apps/details?id=com.btf.vendor&pcampaignid=web_share",
      RIDER: "https://play.google.com/store/apps/details?id=com.btfRider.android&pcampaignid=web_share",
    },
  },
};

export type AppPlatform = "ios" | "android" | "desktop";
export type AppVariant = "consumer" | "vendor" | "rider";

export const getStoreLink = (
  platform: AppPlatform,
  appVariant: AppVariant = "consumer",
) => {
  const isIos = platform === "ios";

  if (appVariant === "vendor") {
    return isIos ? APP_LINKS.STORES.IOS.VENDOR : APP_LINKS.STORES.ANDROID.VENDOR;
  }

  if (appVariant === "rider") {
    return isIos ? APP_LINKS.STORES.IOS.RIDER : APP_LINKS.STORES.ANDROID.RIDER;
  }

  return isIos
    ? APP_LINKS.STORES.IOS.CONSUMER
    : APP_LINKS.STORES.ANDROID.CONSUMER;
};

/**
 * Handle redirection to the app with a fallback to the store
 */
export const handleAppRedirection = (
  platform: AppPlatform,
  route: string,
  _params: Record<string, string | number | undefined> = {},
) => {
  void _params;

  const appVariant =
    route === APP_LINKS.ROUTES.REPORT ||
    route === APP_LINKS.ROUTES.CHAT ||
    route === APP_LINKS.ROUTES.ORDERS ||
    route === APP_LINKS.ROUTES.PROFILE
      ? "consumer"
      : "consumer";

  const storeLink = getStoreLink(platform, appVariant);

  window.location.href = storeLink;
};

/**
 * Helper to construct a deep link with parameters
 */
export const constructDeepLink = (
  route: string,
  params: Record<string, string | number | undefined> = {},
) => {
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");

  return `${APP_LINKS.DEEP_LINK_SCHEME}${route}${queryString ? `?${queryString}` : ""}`;
};
