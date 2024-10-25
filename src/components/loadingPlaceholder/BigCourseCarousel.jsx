import React from "react";

const BigCourseCarousel = () => {
  return (
    <div className="relative h-[400px] bg-gray-200 animate-pulse">
      <div className="absolute bottom-0 w-full flex justify-between gap-x-10 mb-10 px-20">
        <div className="w-2/3 flex flex-col gap-y-3">
          <div className="h-8  bg-slate-400/80 rounded-md" />
          <div className="h-4  bg-slate-400/80 rounded-md" />
          <div className="h-4  bg-slate-400/80 rounded-md" />
        </div>
        <div className="w-1/3 min-h-full flex justify-center items-center ">
          <div className="h-8 w-1/2 bg-slate-400/80 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default BigCourseCarousel;
