import Image from "next/image";
import React from "react";

type SearchProps = {
  value: string;
  setValue: (value: string) => void;
};

const Search = ({ value, setValue }: SearchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Searching for:", value);
    }
  };

  return (
    <div className="start max-w-[32rem] w-full space-x-2.5 border-[0.5px] border-[#E9EAEB] focus-within:border-[#FFC247] transition-colors clamp-[py,3,4,@sm,@lg] clamp-[px,4,5,@sm,@lg] clamp-[rounded,0.5rem,0.625rem,@sm,@lg]">
      <Image
        className="clamp-[w,0.75rem,1rem,@sm,@lg]"
        src="/svg/search.svg"
        alt="search"
        width={12}
        height={12}
      />

      <input
        type="text"
        className="text-[#414651] font-Geist clamp-[text,sm,base,@sm,@lg] leading-[140%] focus:outline-none w-full caret-[#FFC247] !min-w-[280px]"
        placeholder="Search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {value && (
        <button className="cursor-pointer" onClick={() => setValue("")}>
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
