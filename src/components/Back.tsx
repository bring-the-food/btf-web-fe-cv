"use client"

import { useRouter } from "next/navigation";
import React from "react";
import Icon from "./Icon";

const Back = () => {
  const router = useRouter();

  return (
    <button
      className="mr-auto hover:bg-gray-100 p-1 rounded"
      onClick={() => router.back()}
    >
      <Icon icon="left" size={16} />
    </button>
  );
};

export default Back;
