import React from "react";

const Topper = () => {
  return (
    <div className="fixed inset-x-0 clamp-[bottom,4,8,@sm,@lg] flex justify-center pointer-events-none w-full z-50">
      <button className="cursor-pointer hover:bg-[#fdb420] transition-colors pointer-events-auto w-full max-w-xl mx-4 bg-[#FFC247] border border-[#E9EAEB] rounded-lg shadow-lg clamp-[px,4,5,@sm,@lg] clamp-[py,3,4,@sm,@lg] between gap-4">
        <div className="clamp-[text,sm,base,@sm,@lg] text-[#59201A] font-semibold leading-5 font-jakart between w-full clamp-[px,4,5,@sm,@lg] clamp-[py,1.125rem,1.375rem,@sm,@lg]">
          <p>Proceed to order 3 items</p>
          <p>N7,900</p>
        </div>
      </button>
    </div>
  );
};

export default Topper;
