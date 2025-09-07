import Link from "next/link";
import Icon from "./Icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Topper = ({
  storeSlug,
  editPackIndex,
  onStartNewPack,
  totalItemsLabel = "Proceed to order",
  totalPriceLabel,
  isEditing,
  onEditing,
}: {
  storeSlug: string;
  editPackIndex?: number | null;
  onStartNewPack?: () => void;
  totalItemsLabel?: string;
  totalPriceLabel?: string | number;
  isEditing?: boolean;
  onEditing?: () => void;
}) => {
  return (
    <div className="fixed inset-x-0 clamp-[bottom,4,8,@sm,@lg] flex flex-col items-center pointer-events-none w-full z-50 gap-3 px-5">
      {/* indicator shown above the main topper when editing a pack */}
      {typeof editPackIndex === "number" && editPackIndex >= 0 && (
        <Tooltip>
          <div className="pointer-events-auto w-full max-w-xl bg-[#FFE6DD] text-[#F95B1E] rounded-[8px] between">
            {isEditing ? (
              <TooltipTrigger className="w-full ">
                <div className="between clamp-[px,2,4,@sm,@lg] w-full clamp-[py,1.125rem,1.375rem,@sm,lg]">
                  <p className="clamp-[text,xs,sm,@sm,@lg] leading-5 font-medium start">
                    <Icon
                      icon="info"
                      size={15.416666984558105}
                      className="mr-1"
                    />
                    You are now editing pack {editPackIndex + 1}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onEditing}
                      className="bg-[#FFFCFB] text-[#310909] rounded-full p-2 text-[10px] font-semibold hover:bg-[#fcf4f2] pointer-events-auto center"
                    >
                      <Icon icon="arrow-right" size={12} className="mr-1" />
                      Go to Cart
                    </button>
                  </div>
                </div>
              </TooltipTrigger>
            ) : (
              <div className="between clamp-[px,2,4,@sm,@lg] w-full clamp-[py,1.125rem,1.375rem,@sm,lg]">
                <p className="clamp-[text,xs,sm,@sm,@lg] leading-5 font-medium start">
                  <Icon
                    icon="info"
                    size={15.416666984558105}
                    className="mr-1"
                  />
                  You are now filling pack {editPackIndex + 1}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onStartNewPack}
                    className="bg-[#FFFCFB] text-[#310909] rounded-full p-2 text-[10px] font-semibold hover:bg-[#fcf4f2] pointer-events-auto center"
                  >
                    <Icon icon="c_plus" size={12} className="mr-1" />
                    Start new pack
                  </button>
                </div>
              </div>
            )}
          </div>

          <TooltipContent>
            <p>
              Imagine a “pack” as a container for one person&lsquo;s meal or a
              takeaway. Go to cart to manage your orders.
            </p>
          </TooltipContent>
        </Tooltip>
      )}

      <Link
        href={`/store/${storeSlug}/checkout`}
        className="cursor-pointer hover:bg-[#fdb420] transition-colors pointer-events-auto w-full max-w-xl mx-4 bg-[#FFC247] border border-[#E9EAEB] rounded-lg shadow-lg clamp-[px,4,5,@sm,@lg] clamp-[py,3,4,@sm,@lg] between gap-4"
      >
        <div className="clamp-[text,sm,base,@sm,@lg] text-[#59201A] font-semibold leading-5 font-jakart between w-full clamp-[px,4,5,@sm,@lg] clamp-[py,1.125rem,1.375rem,@sm,@lg]">
          <p>{totalItemsLabel}</p>
          <p>{totalPriceLabel}</p>
        </div>
      </Link>
    </div>
  );
};

export default Topper;
