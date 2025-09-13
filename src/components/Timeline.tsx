import { cn } from "@/lib/utils";
import React from "react";

const Timeline = ({
  timelineData,
}: {
  timelineData: {
    title: string;
    desc: string;
    date: string;
    isCompleted?: boolean;
  }[];
}) => {
  return (
    <div className="">
      {timelineData?.map((timeline, index) => {
        return (
          <Pallet
            key={index}
            title={timeline.title}
            desc={timeline.desc}
            date={timeline.date}
            isFirst={index === 0}
            isCompleted={timeline?.isCompleted ?? false}
          />
        );
      })}
    </div>
  );
};

const Pallet = ({
  title,
  desc,
  date,
  isFirst,
  isCompleted,
}: {
  title: string;
  desc: string;
  date: string;
  isFirst: boolean;
  isCompleted: boolean;
}) => {
  return (
    <div className={cn(!isFirst ? "mt-12" : "", "start-start space-x-2")}>
      <p className="text-[#475467] clamp-[text,0.625rem,0.75rem,@sm,@lg] w-[54px]">
        {isCompleted ? date : ""}
      </p>

      <div
        className={cn(
          !isFirst
            ? "relative before:absolute before:border-2 before:h-[65px] before:bottom-3"
            : "",
          isCompleted
            ? "border-[#FFC247] before:border-[#FFC247]"
            : "border-[#D0D5DD] before:border-[#D0D5DD]",
          "border-[6px] size-4 rounded-full"
        )}
      />

      <div>
        <h6 className="text-[#1D2939] clamp-[text,sm,base,@sm,@lg] font-medium leading-none">
          {title}
        </h6>
        <p className="clamp-[mt,2,3,@sm,@lg] text-[#98A2B3] font-inter clamp-[text,xs,sm,@sm,@lg] leading-none">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Timeline;
