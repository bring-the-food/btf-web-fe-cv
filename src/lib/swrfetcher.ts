export const swrfetcher = (url: string) => fetch(url).then((r) => r.json());
