import React from "react";
import { Button } from "./ui/button";

const Topper = () => {
  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center pointer-events-none w-full z-50">
      <div className="pointer-events-auto w-full max-w-3xl mx-4 bg-white border border-[#E9EAEB] rounded-lg shadow-lg px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="clamp-[text,sm,base,@sm,@lg] text-[#414651] font-Geist">
            Ready to proceed? Review your selections and place your order.
          </p>
        </div>

        <Button aria-label="Proceed to order">Proceed to order</Button>
      </div>
    </div>
  );
};

export default Topper;
