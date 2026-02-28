import { cn } from "@/lib/utils";
import React from "react";

const Timeline = ({
  timelineData,
}: {
  timelineData: {
    title: string;
    desc: string | React.ReactNode;
    date: string;
    isCompleted?: boolean;
  }[];
}) => {
  return (
    <div className="flex flex-col">
      {timelineData?.map((timeline, index) => {
        return (
          <Pallet
            key={index}
            title={timeline.title}
            desc={timeline.desc}
            date={timeline.date}
            isLast={index === timelineData.length - 1}
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
  isLast,
  isCompleted,
}: {
  title: string;
  desc: string | React.ReactNode;
  date: string;
  isLast: boolean;
  isCompleted: boolean;
}) => {
  return (
    <div className="flex items-stretch space-x-2">
      {/* Date Column */}
      <p className="text-[#475467] clamp-[text,0.625rem,0.75rem,@sm,@lg] w-[85px] leading-4 flex-none">
        {isCompleted ? date : ""}
      </p>

      {/* Timeline Node & Line Column */}
      <div className="flex flex-col items-center flex-none">
        <div
          className={cn(
            "size-4 rounded-full border-[6px] flex-none z-10",
            isCompleted ? "border-[#FFC247]" : "border-[#D0D5DD]",
          )}
        />
        {!isLast && (
          <div
            className={cn(
              "w-0.5 flex-1",
              isCompleted ? "bg-[#FFC247]" : "bg-[#D0D5DD]",
            )}
          />
        )}
      </div>

      {/* Content Column */}
      <div className={cn(!isLast ? "pb-12" : "")}>
        <h6 className="text-[#1D2939] clamp-[text,sm,base,@sm,@lg] font-medium leading-4">
          {title}
        </h6>
        <p className="mt-1 text-[#98A2B3] font-inter clamp-[text,xs,sm,@sm,@lg] leading-normal">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Timeline;
