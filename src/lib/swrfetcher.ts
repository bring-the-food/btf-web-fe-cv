import { apiFetch } from "./http";

export const swrfetcher = (url: string) =>
  apiFetch(url).then((res) => {
    return res.json();
  });
