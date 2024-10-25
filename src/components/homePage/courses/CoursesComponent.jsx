"use client";
import { useEffect, useState } from "react";
import CategoryCourseCarousel from "@/components/CategoryCourseCarousel/CategoryCourseCarousel";
import { SmallCourse } from "@/components/loadingPlaceholder/SmallCourse";

const Courses = () => {
  let [category, setCategory] = useState();
  let [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    const fectchdata = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:1337"
          }/api/categories?pagination[page]=1&pagination[pageSize]=6`
        );

        if (response.ok) {
          const data = await response.json();
          setCategory(data.data);
          setSelectedCategory(data.data[0].id);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    fectchdata();
  }, []);

  // console.log({ category });
  // console.log({ selectedCategory });

  return (
    <section className="mx-auto px-4 lg:py-16 md:py-10 py-10 my-12">
      <h2 className="md:text-4xl text-2xl font-bold font-serif">
        All the skills you need in one place
      </h2>
      <p className="text-sm text-slate-500 mt-3">
        From critical skills to technical topics, We supports your professional
        development.
      </p>
      {category ? (
        <div className="mt-5">
          <div className="flex border-b-2 border-slate-300/60 ">
            {category.map((el, index) => {
              return (
                <div
                  key={index}
                  className={`lg:px-10 py-3 px-7 font-bold text-slate-500 md:text-sm text-xs cursor-pointer ${
                    el.id === selectedCategory
                      ? "text-white rounded-t-md bg-black font-extrabold"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(el.id)}
                >
                  {el.attributes.category}
                </div>
              );
            })}
          </div>
          <CategoryCourseCarousel id={selectedCategory} />
        </div>
      ) : (
        <SmallCourse />
      )}
    </section>
  );
};

export default Courses;
