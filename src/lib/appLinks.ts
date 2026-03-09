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

/**
 * Handle redirection to the app with a fallback to the store
 */
export const handleAppRedirection = (
  platform: "ios" | "android" | "desktop",
  route: string,
  params: Record<string, string | number | undefined> = {},
) => {
  if (platform === "desktop") {
    // For desktop, we can just open the store page or a web fallback
    window.open(APP_LINKS.STORES.GOOGLE_PLAY, "_blank");
    return;
  }

  const deepLink = constructDeepLink(route, params);
  const storeLink =
    platform === "ios"
      ? APP_LINKS.STORES.APPLE_APP_STORE
      : APP_LINKS.STORES.GOOGLE_PLAY;

  // Attempt to open deep link
  window.location.href = deepLink;

  // Fallback to store after a short delay if the app didn't open
  setTimeout(() => {
    window.location.href = storeLink;
  }, 2500);
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
