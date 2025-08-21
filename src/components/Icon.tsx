import Image from "next/image";
import React from "react";

type IconProps = {
  w?: number;
  h?: number;
  icon: string;
  size?: number;
  className?: string;
};

const Icon = ({ w, h, icon, size, className }: IconProps) => {
  return (
    <Image
      className={className}
      src={`/svg/${icon}.svg`}
      alt="Placeholder logo"
      width={size ?? w ?? 24}
      height={size ?? h ?? 24}
    />
  );
};

export default Icon;
