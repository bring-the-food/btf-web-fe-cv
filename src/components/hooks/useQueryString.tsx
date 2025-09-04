/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const useQueryString = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (paramsToUpdate: any) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update each parameter in the paramsToUpdate object
      Object.entries(paramsToUpdate).forEach(([name, value]) => {
        params.set(name, String(value));
      });

      return params.toString();
    },
    [searchParams]
  );

  const getUpdatedUrl = (paramsToUpdate: any) => {
    return `${pathName}?${createQueryString(paramsToUpdate)}`;
  };

  return getUpdatedUrl;
};

export default useQueryString;
