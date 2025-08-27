/* eslint-disable @typescript-eslint/no-explicit-any */
export function buildUrlWithParams(baseUrl: string, params: any) {
  const searchParams = Object.entries(params)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return searchParams ? `${baseUrl}?${searchParams}` : baseUrl;
}

export const filteredParams = (params: any) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined
    )
  );
