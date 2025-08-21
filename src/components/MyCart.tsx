import React from "react";
import Icon from "./Icon";
import { Button } from "./ui/button";

const MyCart = () => {
  return (
    <div className="clamp-[mt,4,8,@sm,@lg] space-y-6 md:space-y-8">
      <CartContent title="Combos" />
      <CartContent title="Pack 1" hasEdit />

      <Button className="text-[#59201A] rounded-full clamp-[text,xs,sm,@sm,@lg] font-medium bg-[#FFF9E9] hover:bg-[#fcf2d8] !clamp-[py,3,4,@sm,@lg] !clamp-[px,4,6,@sm,@lg] cursor-pointer space-x-[2.5px] h-auto">
        <Icon
          icon="add"
          size={10}
          className="clamp-[size,0.625rem,0.75rem,@sm,@lg]"
        />
        <span>Start new pack</span>
      </Button>
    </div>
  );
};

export default MyCart;

type CartContentProps = {
  title: string;
  hasEdit?: boolean;
};

const CartContent = ({ title, hasEdit }: CartContentProps) => {
  return (
    <div>
      <div className="between">
        <h5 className="text-black font-medium clamp-[text,sm,base,@sm,@lg] leading-normal">
          {title}
        </h5>
        <div className="end space-x-2 md:space-x-3">
          {hasEdit && (
            <div className="rounded-full bg-[#F2F4F7] clamp-[p,1.5,2,@sm,@lg] w-fit">
              <Icon
                icon="edit"
                size={16}
                className="clamp-[size,1rem,1.1875rem,@sm,@lg]"
              />
            </div>
          )}
          <div className="rounded-full bg-[#2E896F14] clamp-[p,1.5,2,@sm,@lg] w-fit">
            <Icon
              icon="duplicate"
              size={16}
              className="clamp-[size,1rem,1.1875rem,@sm,@lg]"
            />
          </div>
          <div className="rounded-full bg-[#FD88880D] clamp-[p,1.5,2,@sm,@lg] w-fit">
            <Icon
              icon="trash"
              size={16}
              className="clamp-[size,1rem,1.1875rem,@sm,@lg]"
            />
          </div>
        </div>
      </div>

      <div className="clamp-[mt,5,9,@sm,@lg] space-y-4 md:space-y-6">
        <Pallet />
        <Pallet />
        <Pallet />
      </div>
    </div>
  );
};

const Pallet = () => {
  return (
    <div className="start-start">
      <Icon
        icon="star"
        size={12}
        className="clamp-[size,0.75rem,0.875rem,@sm,@lg]"
      />

      <div className="clamp-[ml,0.8125rem,1.0625rem,@sm,@lg]">
        <h6 className="clamp-[text,xs,sm,@sm,@lg] font-medium leading-normal text-[#1D2939]">
          Fried Rice Combo
        </h6>
        <p className="text-[#98A2B3] font-normal clamp-[text,xs,sm,@sm,@lg] leading-normal">
          N5,400
        </p>
      </div>

      <div className="ml-auto end space-x-3 md:space-x-4 bg-[#F2F4F7] rounded-full clamp-[py,0.375rem,0.625rem,@sm,@lg] clamp-[px,0.75rem,1rem,@sm,@lg]">
        <Icon
          icon="minus"
          w={10}
          h={12}
          className="clamp-[w,0.625rem,0.875rem,@sm,@lg] clamp-[h,0.75rem,1rem,@sm,@lg]"
        />
        <p className="text-[#344054] font-medium clamp-[text,xs,sm,@sm,@lg] leading-normal">
          1
        </p>
        <Icon
          icon="plus"
          w={10}
          h={10}
          className="clamp-[size,0.625rem,0.875rem,@sm,@lg]"
        />
      </div>
    </div>
  );
};
