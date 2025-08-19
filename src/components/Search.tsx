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
    <div className="bg-[#FCFCFD] start space-x-2.5 border-[0.5px] border-[#E9EAEB] px-4 py-3 rounded-[8px]">
      <Image
        className=""
        src="/svg/search.svg"
        alt="search"
        width={12}
        height={12}
      />

      <input
        type="text"
        className="text-[#98A2B3] font-Geist text-sm leading-[140%] focus:outline-none w-full"
        placeholder="Search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
