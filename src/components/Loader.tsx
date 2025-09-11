import { Loader2Icon } from "lucide-react";
import React from "react";

const Loader = ({
  state,
  children,
}: {
  state: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      {state ? (
        <div className="mx-auto">
          <Loader2Icon className="animate-spin clamp-[size,8,14,@sm,@lg] clamp-[mt,20,32,@sm,@lg] mx-auto" />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loader;
