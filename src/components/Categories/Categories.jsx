import Link from "next/link";
import React from "react";

const Categories = ({ data }) => {
  console.log({ data });
  return (
    <div className="flex gap-x-8 gap-y-3 flex-wrap pt-4 text-sm">
      {data.map((el, index) => {
        return (
          <>
            <Link
              href={el.url ? el.url : ""}
              key={index}
              className="border-2 border-black/60 rounded-full py-2 px-4 hover:bg-black/80 hover:text-white hover:border-cyan-400 hover:border-2 transition-all duration-200"
            >
              {" "}
              {el}
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default Categories;
