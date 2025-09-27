import React from "react";

type FaceProps = {
  children: React.ReactNode;
  strokeColor?: string;
  active?: boolean;
  onClick?: () => void;
  width?: number;
  height?: number;
  className?: string;
};
const FaceButton = ({
  children,
  strokeColor,
  active,
  onClick,
  width = 41,
  height = 40,
  className = "",
}: FaceProps) => {
  const color = active ? "#FDB022" : strokeColor ?? "#98A2B3";
  const svg = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
        width,
        height,
        stroke: color,
      })
    : children;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer transition-colors duration-200 p-0 m-0 bg-transparent border-0 ${className}`}
      aria-pressed={active ? "true" : "false"}
    >
      {svg}
    </button>
  );
};

export const SadFace = ({
  strokeColor,
  active,
  onClick,
}: {
  strokeColor?: string;
  active: boolean;
  onClick?: () => void;
}) => (
  <FaceButton strokeColor={strokeColor} active={active} onClick={onClick}>
    <svg
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-200 hover:[&>path]:stroke-[#FDB022]"
    >
      <path
        d="M27.1663 26.6666C27.1663 26.6666 24.6663 23.3333 20.4997 23.3333C16.333 23.3333 13.833 26.6666 13.833 26.6666M28.833 15.3999C28.1747 16.2082 27.2747 16.6666 26.333 16.6666C25.3913 16.6666 24.5163 16.2082 23.833 15.3999M17.1663 15.3999C16.508 16.2082 15.608 16.6666 14.6663 16.6666C13.7247 16.6666 12.8497 16.2082 12.1663 15.3999M37.1663 19.9999C37.1663 29.2047 29.7044 36.6666 20.4997 36.6666C11.2949 36.6666 3.83301 29.2047 3.83301 19.9999C3.83301 10.7952 11.2949 3.33325 20.4997 3.33325C29.7044 3.33325 37.1663 10.7952 37.1663 19.9999Z"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </FaceButton>
);

export const NeutralFace = ({
  strokeColor,
  active,
  onClick,
}: {
  strokeColor?: string;
  active: boolean;
  onClick?: () => void;
}) => (
  <FaceButton strokeColor={strokeColor} active={active} onClick={onClick}>
    <svg
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-200 hover:[&>path]:stroke-[#FDB022]"
    >
      <path
        d="M13.833 24.9999H27.1663M25.4997 14.9999H25.5163M15.4997 14.9999H15.5163M37.1663 19.9999C37.1663 29.2047 29.7044 36.6666 20.4997 36.6666C11.2949 36.6666 3.83301 29.2047 3.83301 19.9999C3.83301 10.7952 11.2949 3.33325 20.4997 3.33325C29.7044 3.33325 37.1663 10.7952 37.1663 19.9999ZM26.333 14.9999C26.333 15.4602 25.9599 15.8333 25.4997 15.8333C25.0394 15.8333 24.6663 15.4602 24.6663 14.9999C24.6663 14.5397 25.0394 14.1666 25.4997 14.1666C25.9599 14.1666 26.333 14.5397 26.333 14.9999ZM16.333 14.9999C16.333 15.4602 15.9599 15.8333 15.4997 15.8333C15.0394 15.8333 14.6663 15.4602 14.6663 14.9999C14.6663 14.5397 15.0394 14.1666 15.4997 14.1666C15.9599 14.1666 16.333 14.5397 16.333 14.9999Z"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </FaceButton>
);

export const SmileFace = ({
  strokeColor,
  active,
  onClick,
}: {
  strokeColor?: string;
  active: boolean;
  onClick?: () => void;
}) => (
  <FaceButton strokeColor={strokeColor} active={active} onClick={onClick}>
    <svg
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-200 hover:[&>path]:stroke-[#FDB022]"
    >
      <path
        d="M13.833 23.3333C13.833 23.3333 16.333 26.6666 20.4997 26.6666C24.6663 26.6666 27.1663 23.3333 27.1663 23.3333M25.4997 14.9999H25.5163M15.4997 14.9999H15.5163M37.1663 19.9999C37.1663 29.2047 29.7044 36.6666 20.4997 36.6666C11.2949 36.6666 3.83301 29.2047 3.83301 19.9999C3.83301 10.7952 11.2949 3.33325 20.4997 3.33325C29.7044 3.33325 37.1663 10.7952 37.1663 19.9999ZM26.333 14.9999C26.333 15.4602 25.9599 15.8333 25.4997 15.8333C25.0394 15.8333 24.6663 15.4602 24.6663 14.9999C24.6663 14.5397 25.0394 14.1666 25.4997 14.1666C25.9599 14.1666 26.333 14.5397 26.333 14.9999ZM16.333 14.9999C16.333 15.4602 15.9599 15.8333 15.4997 15.8333C15.0394 15.8333 14.6663 15.4602 14.6663 14.9999C14.6663 14.5397 15.0394 14.1666 15.4997 14.1666C15.9599 14.1666 16.333 14.5397 16.333 14.9999Z"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </FaceButton>
);

export const FrownFace = ({
  strokeColor,
  active,
  onClick,
}: {
  strokeColor?: string;
  active: boolean;
  onClick?: () => void;
}) => (
  <FaceButton strokeColor={strokeColor} active={active} onClick={onClick}>
    <svg
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-200 hover:[&>path]:stroke-[#FDB022]"
    >
      <path
        d="M27.1663 26.6666C27.1663 26.6666 24.6663 23.3333 20.4997 23.3333C16.333 23.3333 13.833 26.6666 13.833 26.6666M25.4997 14.9999H25.5163M15.4997 14.9999H15.5163M37.1663 19.9999C37.1663 29.2047 29.7044 36.6666 20.4997 36.6666C11.2949 36.6666 3.83301 29.2047 3.83301 19.9999C3.83301 10.7952 11.2949 3.33325 20.4997 3.33325C29.7044 3.33325 37.1663 10.7952 37.1663 19.9999ZM26.333 14.9999C26.333 15.4602 25.9599 15.8333 25.4997 15.8333C25.0394 15.8333 24.6663 15.4602 24.6663 14.9999C24.6663 14.5397 25.0394 14.1666 25.4997 14.1666C25.9599 14.1666 26.333 14.5397 26.333 14.9999ZM16.333 14.9999C16.333 15.4602 15.9599 15.8333 15.4997 15.8333C15.0394 15.8333 14.6663 15.4602 14.6663 14.9999C14.6663 14.5397 15.0394 14.1666 15.4997 14.1666C15.9599 14.1666 16.333 14.5397 16.333 14.9999Z"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </FaceButton>
);

export const HappyFace = ({
  strokeColor,
  active,
  onClick,
}: {
  strokeColor?: string;
  active: boolean;
  onClick?: () => void;
}) => (
  <FaceButton strokeColor={strokeColor} active={active} onClick={onClick}>
    <svg
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-200 hover:[&>path]:stroke-[#FDB022]"
    >
      <path
        d="M25.4997 14.9999H25.5163M15.4997 14.9999H15.5163M37.1663 19.9999C37.1663 29.2047 29.7044 36.6666 20.4997 36.6666C11.2949 36.6666 3.83301 29.2047 3.83301 19.9999C3.83301 10.7952 11.2949 3.33325 20.4997 3.33325C29.7044 3.33325 37.1663 10.7952 37.1663 19.9999ZM26.333 14.9999C26.333 15.4602 25.9599 15.8333 25.4997 15.8333C25.0394 15.8333 24.6663 15.4602 24.6663 14.9999C24.6663 14.5397 25.0394 14.1666 25.4997 14.1666C25.9599 14.1666 26.333 14.5397 26.333 14.9999ZM16.333 14.9999C16.333 15.4602 15.9599 15.8333 15.4997 15.8333C15.0394 15.8333 14.6663 15.4602 14.6663 14.9999C14.6663 14.5397 15.0394 14.1666 15.4997 14.1666C15.9599 14.1666 16.333 14.5397 16.333 14.9999ZM20.4997 29.1666C24.6672 29.1666 27.9997 26.1116 27.9997 23.3333H12.9997C12.9997 26.1116 16.3322 29.1666 20.4997 29.1666Z"
        className="transition-colors duration-200"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </FaceButton>
);
