/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import useQueryString from "./hooks/useQueryString";
import { useRouter } from "next/navigation";

type SearchProps = {
  value: string;
  setValue: (value: string) => void;
};

const DEBOUNCE_MS = 400;

const Search = ({ value, setValue }: SearchProps) => {
  const router = useRouter();
  const getUpdatedUrl = useQueryString();
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const pushSearch = React.useCallback(
    (term: string) => {
      const newUrl = getUpdatedUrl({ search: term });
      router.push(newUrl);
    },
    [getUpdatedUrl, router],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setValue(term);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      pushSearch(term);
    }, DEBOUNCE_MS);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      // Flush immediately on Enter — cancel any pending debounce
      if (debounceRef.current) clearTimeout(debounceRef.current);
      pushSearch(e.target.value);
    }
  };

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setValue("");
    pushSearch("");
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="start max-w-sm w-full space-x-2.5 border-[0.5px] border-[#E9EAEB] focus-within:border-[#FFC247] transition-colors clamp-[py,3,4,@sm,@lg] clamp-[px,4,5,@sm,@lg] clamp-[rounded,0.5rem,0.625rem,@sm,@lg]">
      <Image
        className="clamp-[w,0.75rem,1rem,@sm,@lg]"
        src="/svg/search.svg"
        alt="search"
        width={12}
        height={12}
      />

      <input
        type="text"
        className="text-[#414651] font-Geist clamp-[text,sm,base,@sm,@lg] leading-[140%] focus:outline-none w-full caret-[#FFC247] min-w-[280px]!"
        placeholder="Search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {value && (
        <button className="cursor-pointer" onClick={handleClear}>
          <Image
            className="clamp-[w,0.8125rem,1rem,@sm,@lg]"
            src="/svg/cancel.svg"
            alt="cancel"
            width={13.333333969116211}
            height={13.333333969116211}
          />
        </button>
      )}
    </div>
  );
};

export default Search;
