/* eslint-disable @typescript-eslint/no-explicit-any */
import Food, { FoodSkeleton } from "./Food";
import Icon from "./Icon";
// import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "./ui/pagination";

const FoodList = ({
  data,
  isLoading,
  setCart,
  cart,
  storeId,
  editPackIndex,
  setEditPackIndex,
  onActionsComplete,
}: {
  data: any;
  isLoading: boolean;
  setCart?: any;
  cart: any;
  storeId: string;
  editPackIndex?: number | null;
  setEditPackIndex?: any;
  onActionsComplete: () => void;
}) => {
  return (
    <div>
      <div className="start space-x-2 bg-[#FEF3ED4D] border border-[#FFCBC2] shadow-[0px_1px_3px_0px_#00000014] py-3 px-4 rounded-[6px] tracking-normal my-5">
        <Icon icon="c_info" size={18} />

        <p className="text-xs font-medium leading-5 text-[#1D2939]">
          Imagine a “pack” as a container for one person&apos;s meal or a
          takeaway. Select a food item to start a pack. Note combos come with
          packs already.
        </p>
      </div>

      <div className="clamp-[mt,4,8,@sm,@lg] grid md:grid-cols-2 clamp-[gap,4,8,@sm,@lg]">
        {isLoading ? (
          <>
            <FoodSkeleton />
            <FoodSkeleton />
          </>
        ) : (
          data?.length > 0 ?
          data?.map((item: any, index: number) => {
            return (
              <Food
                storeId={storeId}
                key={index}
                data={item}
                setCart={setCart}
                type={item?.category?.id ? "pack" : "combo"}
                cart={cart}
                editPackIndex={editPackIndex}
                setEditPackIndex={setEditPackIndex}
                onActionsComplete={onActionsComplete}
              />
            );
          }) : <p className="text-center col-span-2 mt-8 md:mt-14 font-medium">No Food Items</p>
        )}
      </div>

      {/* <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
};

export default FoodList;
