import React from "react";
import Food from "./Food";

const FoodList = () => {
  return (
    <div className="clamp-[mt,4,8,@sm,@lg] grid md:grid-cols-2 clamp-[gap,4,8,@sm,@lg]">
      <Food />
      <Food />
      <Food />
      <Food />
    </div>
  );
};

export default FoodList;
