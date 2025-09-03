/* eslint-disable @typescript-eslint/no-explicit-any */
import Food, { FoodSkeleton } from "./Food";

const FoodList = ({
  data,
  isLoading,
  setCart,
  cart,
  storeId,
}: {
  data: any;
  isLoading: boolean;
  setCart?: any;
  cart: any;
  storeId: string;
}) => {
  return (
    <div className="clamp-[mt,4,8,@sm,@lg] grid md:grid-cols-2 clamp-[gap,4,8,@sm,@lg]">
      {isLoading ? (
        <>
          <FoodSkeleton />
          <FoodSkeleton />
        </>
      ) : (
        data?.map((item: any, index: number) => {
          return (
            <Food
              storeId={storeId}
              key={index}
              data={item}
              setCart={setCart}
              type={item?.category?.id ? "pack" : "combo"}
              cart={cart}
            />
          );
        })
      )}
    </div>
  );
};

export default FoodList;
