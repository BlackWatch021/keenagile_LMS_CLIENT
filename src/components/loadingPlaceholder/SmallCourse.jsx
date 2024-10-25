import React from "react";

export const SmallCourse = () => {
  return (
    <div className="rounded-md w-1/2 overflow-hidden shadow-2xl animate-pulse">
      <div className="relative h-2/3 bg-gray-200"></div>
      <div className="px-3 py-5">
        <div className="bg-slate-400/80 w-1/2 h-8 rounded-md"></div>
        <div className="bg-slate-400/80 w-full h-5 rounded-md mt-2"></div>
        <div className="bg-slate-400/80 w-full h-5 rounded-md mt-2"></div>
      </div>
    </div>
  );
};
