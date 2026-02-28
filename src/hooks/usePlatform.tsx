"use client";

import { useEffect, useState } from "react";

export type Platform = "ios" | "android" | "desktop";

export const usePlatform = () => {
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => {
    const userAgent =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigator.userAgent || navigator.vendor || (window as any).opera;

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setPlatform("ios");
    } else if (/android/i.test(userAgent)) {
      setPlatform("android");
    } else {
      setPlatform("desktop");
    }
  }, []);

  return platform;
};
