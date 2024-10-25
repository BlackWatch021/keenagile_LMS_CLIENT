import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { SmallCourse } from "../loadingPlaceholder/SmallCourse";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const CategoryCourseCarousel = ({ id }) => {
  const [showCategoryCourses, setShowCategoryCourses] = useState(null);
  const carouselRef = useRef(null); // Reference to the carousel container

  useEffect(() => {
    setShowCategoryCourses(null);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:1337"
          }/api/categories/${id}?populate[courses][fields]=title&populate[courses][fields]=language&populate[courses][fields]=author&populate[courses][populate][baseImg][fields][0]=url&populate[courses][populate][baseImg][fields][1]=alternativeText` // Add your API endpoint
        );

        if (response.ok) {
          const data = await response.json();
          setShowCategoryCourses(data.data.attributes.courses.data);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    fetchData();
  }, [id]);

  const handleSliderChange = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 400; // Define how much to scroll per click

    if (direction === "next") {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth", // Smooth scrolling effect
      });
    } else {
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  };

  return (
    <div className="relative lg:h-[550px] md:h-[400px] h-[300px] lg:py-10 py-4 px-4 bg-slate-300/40">
      <div
        ref={carouselRef}
        className="flex gap-x-8 h-full py-3 px-4 overflow-x-hidden" // Horizontal scroll with hidden scrollbar and smooth scrolling
      >
        {showCategoryCourses ? (
          showCategoryCourses.map((el, index) => (
            <Link
              href={`courses/${el.id}`}
              key={index}
              className="rounded-md min-w-[350px] overflow-hidden flex flex-col bg-white hover:shadow-lg hover:shadow-white hover:bg-[#2d2f31] text-[#2d2f31] hover:text-white transition-all duration-500"
            >
              <div className="relative lg:h-2/3 md:h-[60%] h-[55%] ">
                <Image
                  src={
                    el.attributes.baseImg.data.attributes.url.includes(
                      "amazonaws"
                    )
                      ? el.attributes.baseImg.data.attributes.url
                      : `${
                          process.env.NEXT_PUBLIC_PRODUCTION_URL ||
                          "http://localhost:1337"
                        }${el.attributes.baseImg.data.attributes.url}`
                  }
                  alt={
                    el.attributes.baseImg.data.attributes.alternativeText ||
                    "course's base image"
                  }
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                />
              </div>
              <div className="px-3 flex-grow flex flex-col justify-center gap-y-2">
                <h3 className="md:text-2xl text-xl  font-serif first-letter:uppercase font-extrabold line-clamp-1">
                  {el.attributes.title}
                </h3>
                <p className="md:text-sm text-xs line-clamp-1">
                  Created By{" "}
                  <span className="text-purple-400 font-semibold">
                    {el.attributes.author}
                  </span>
                </p>
                <p className="md:text-sm text-xs line-clamp-1">
                  Language{" "}
                  <span className="text-purple-400 font-semibold">
                    {el.attributes.language}
                  </span>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <SmallCourse />
        )}
      </div>

      {showCategoryCourses && (
        <>
          {/* Left button */}
          <ChevronLeft
            className="absolute top-0 bottom-0 left-0 my-auto flex justify-center items-center transition-all duration-300 z-20 cursor-pointer text-white/70 hover:text-white bg-black/60 hover:bg-black/70 rounded-full ml-1 pr-1"
            // size={window.innerWidth >= 1024 ? 50 : 30}
            onClick={() => handleSliderChange("prev")}
          />
          {/* Right button */}
          <ChevronRight
            className="absolute top-0 bottom-0 right-0 my-auto flex justify-center transition-all duration-300 items-cente z-20 cursor-pointer text-white/70 hover:text-white bg-black/60 hover:bg-black/70 rounded-full mr-1 pl-1"
            size={50}
            onClick={() => handleSliderChange("next")}
          />
        </>
      )}
    </div>
  );
};

export default CategoryCourseCarousel;
