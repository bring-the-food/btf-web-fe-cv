import Image from "next/image";
import React from "react";

type IconProps = {
  w?: number;
  h?: number;
  icon: string;
  size?: number;
  className?: string;
  alt?: string;
};

const Icon = ({ w, h, icon, size, className, alt }: IconProps) => {
  return (
    <Image
      className={className}
      src={`/svg/${icon}.svg`}
      alt={alt ?? ""}
      width={size ?? w ?? 24}
      height={size ?? h ?? 24}
      aria-hidden={!alt}
    />
  );
};

export default Icon;
