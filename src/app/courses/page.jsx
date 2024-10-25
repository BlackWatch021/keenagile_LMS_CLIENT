"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Courses = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:1337"
          }/api/courses?populate=baseImg`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const jsonData = await response.json();
        if (response.ok) {
          console.log("response is ok", response.ok);
          setData(jsonData.data);
        } else {
          console.log("something went wrong");
          //
          //
          //
          //
          //handle this in future, handle loading state, no courses present state, state with data
          //
          //
          //
          //
        }
      } catch (error) {
        console.log("error", error.error.message);
      }
    };
    fetchData();
  }, []);

  // console.log(data[0]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-semibold mb-8">All Courses</h1>
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((course) => (
            <Link href={`/courses/${course.id}`}>
              <div
                key={course.id}
                className="shadow-xl rounded-lg overflow-hidden"
              >
                <Image
                  src={
                    course.attributes.baseImg.data.attributes.url.includes(
                      "amazonaws"
                    )
                      ? course.attributes.baseImg.data.attributes.url
                      : `${
                          process.env.NEXT_PUBLIC_PRODUCTION_URL ||
                          "http://localhost:1337"
                        }${course.attributes.baseImg.data.attributes.url}`
                  }
                  alt={
                    course.attributes.baseImg.data.attributes.alternativeText ||
                    course.attributes.title
                  }
                  width={750}
                  height={422}
                  className="w-full h-48 object-cover"
                />
                <div className="px-6 py-2">
                  <h3 className="lg:text-2xl text-xl text-[#2d2f31] font-semibold ">
                    {course.attributes.title}
                  </h3>
                  <p className="text-[#2d2f31] line-clamp-3 lg:text-sm text-xs my-2">
                    {course.attributes.description}
                  </p>
                  <div className="text-[#2d2f31] flex flex-wrap justify-between items-center lg:text-sm text-xs mb-4">
                    <p>
                      Created By-
                      <span className="text-purple-400 font-semibold">
                        {course.attributes.author}
                      </span>
                    </p>
                    <p>
                      Date Created:{" "}
                      <span className="text-purple-400 font-semibold">
                        {new Date(
                          course.attributes.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // loading skeleton
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="h-fit bg-white shadow-2xl rounded-xl p-4 flex flex-col gap-y-4">
            <div className="relative w-full h-36 bg-slate-500/30 rounded-md animate-pulse" />
            <div className="flex flex-col justify-end gap-y-3">
              <div className="w-1/2 h-5 bg-slate-500/40 rounded-md animate-pulse" />
              <div className="w-/12 h-3 bg-slate-300/50 rounded-md animate-pulse" />
              <div className="w-/12 h-3 bg-slate-300/50 rounded-md animate-pulse" />
            </div>
          </div>
          <div className="h-fit bg-white shadow-2xl rounded-xl p-4 flex flex-col gap-y-4">
            <div className="relative w-full h-36 bg-slate-500/30 rounded-md animate-pulse" />
            <div className="flex flex-col justify-end gap-y-3">
              <div className="w-1/2 h-5 bg-slate-500/40 rounded-md animate-pulse" />
              <div className="w-/12 h-3 bg-slate-300/50 rounded-md animate-pulse" />
              <div className="w-/12 h-3 bg-slate-300/50 rounded-md animate-pulse" />
            </div>
          </div>
          <div className="h-fit bg-white shadow-2xl rounded-xl p-4 flex flex-col gap-y-4">
            <div className="relative w-full h-36 bg-slate-500/30 rounded-md animate-pulse" />
            <div className="flex flex-col justify-end gap-y-3">
              <div className="w-1/2 h-5 bg-slate-500/40 rounded-md animate-pulse" />
              <div className="w-/12 h-3 bg-slate-300/50 rounded-md animate-pulse" />
              <div className="w-/12 h-3 bg-slate-300/50 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
