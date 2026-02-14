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
  },

  // App Store Links
  STORES: {
    GOOGLE_PLAY:
      "https://play.google.com/store/apps/details?id=com.bringthisfood", // Placeholder
    APPLE_APP_STORE: "https://apps.apple.com/app/bringthisfood", // Placeholder
  },
};

/**
 * Helper to construct a deep link with parameters
 */
export const constructDeepLink = (
  route: string,
  params: Record<string, string | number | undefined> = {},
) => {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");

  return `${APP_LINKS.DEEP_LINK_SCHEME}${route}${queryString ? `?${queryString}` : ""}`;
};
