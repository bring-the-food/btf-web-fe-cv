/* eslint-disable @typescript-eslint/no-explicit-any */
import Food, { FoodSkeleton } from "./Food";

const FoodList = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  return (
      
        <div className="clamp-[mt,4,8,@sm,@lg] grid md:grid-cols-2 clamp-[gap,4,8,@sm,@lg]">
          {isLoading ? (
            <>
              <FoodSkeleton />
              <FoodSkeleton />
            </>
          ) : (
            data?.map((item: any, index: number) => {
              return <Food key={index} data={item} />;
            })
          )}
        </div>
  );
};

export default FoodList;
