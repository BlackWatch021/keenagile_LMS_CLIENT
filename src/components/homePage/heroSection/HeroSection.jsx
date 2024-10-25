"use client";
import BigCourseCarousel from "@/components/loadingPlaceholder/BigCourseCarousel";
import {
  BadgeAlert,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Languages,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection = () => {
  let [courseData, setCourseData] = useState();
  let [currentSlide, setCurrentSlide] = useState(0);
  let [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // const fetchData = async () => {
    // const response = await fetch(
    //   `${
    //     process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:1337"
    //   }/api/featuredcourses?populate[courses][fields][0]=id&populate[courses][fields][1]=title&populate[courses][fields][2]=description&populate[courses][fields][3]=language&populate[courses][fields][4]=author&populate[courses][fields][5]=publishedAt&populate[courses][fields][6]=updatedAt&populate[courses][populate][category][fields][0]=id&populate[courses][populate][courseCategory][fields]=category&populate[courses][populate]=baseImg`,
    //   { cache: "no-store" } // Disable caching for real-time SSR
    // );
    const fetchData = async () => {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:1337"
        }/api/featuredcourses?populate[courses][fields][0]=id&populate[courses][fields][1]=title&populate[courses][fields][2]=description&populate[courses][fields][3]=language&populate[courses][fields][4]=author&populate[courses][fields][5]=publishedAt&populate[courses][fields][6]=updatedAt&populate[courses][populate][category][fields][0]=id&populate[courses][populate][courseCategory][fields]=category&populate[courses][populate][tags][fields]=tag&populate[courses][populate]=baseImg`,
        { cache: "no-store" } // Disable caching for real-time SSR
      );

      if (response.ok) {
        const responseData = await response.json();
        setCourseData(responseData.data[0].attributes.courses);
      } else {
        // Optionally log the error or handle it in some other way
        console.log("Error fetching course data", response.status);
      }
    };
    fetchData();
  }, []);

  const startAutoSlide = () => {
    clearInterval(intervalId); // Clear any existing interval to avoid overlapping
    const newIntervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % courseData.data.length);
    }, 7000);
    setIntervalId(newIntervalId);
  };

  const handleSliderChange = (direction) => {
    clearInterval(intervalId);
    if (direction === "next") {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % courseData.data.length);
    } else {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? courseData.data.length - 1 : prevSlide - 1
      );
    }
    // startAutoSlide();
  };

  // Auto-slide effect when the component mounts
  useEffect(() => {
    if (courseData) {
      // startAutoSlide(); // Start auto-slide when data is available
    }
    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [courseData]);

  return (
    <section>
      <div className="my-6">
        <h3 className="xl:text-sm text-xs">
          Welcome to <span className="text-green-500">Black Watch!</span> Ready
          to begin your next learning adventure...
        </h3>
      </div>
      <div className="xl:h-[400px] min-h-[400px] relative overflow-hidden">
        {courseData ? (
          <div
            className={` relative w-full h-full flex  transition-all duration-700 ease-in-out`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {courseData.data.map((el, index) => {
              return (
                <div key={el.id} className="w-full min-w-full flex">
                  <Link
                    href={`courses/${el.id}`}
                    className="h-full flex xl:flex-row flex-col gap-y-4 xl:bg-transparent bg-slate-200/70"
                  >
                    <div className="relative md:min-h-56 h-36 xl:w-1/3 xl:h-full 2xl:w-1/2 w-full aspect-[16/9]">
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
                          el.attributes.baseImg.data.attributes
                            .alternativeText || "course's base image"
                        }
                        fill={true}
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                      />{" "}
                      <div className="absolute w-full h-full bg-black/50" />
                    </div>
                    <div className=" 2xl:w-1/2 xl:w-2/3 w-full bottom-0 mb-2 flex xl:px-10 px-4 justify-between items-end">
                      <div className="flex flex-col min-h-56 gap-y-5 w-full">
                        <h2 className="xl:text-3xl md:text-2xl text-xl font-bold font-serif first-letter:uppercase">
                          {el.attributes.title}
                        </h2>
                        {/* course description */}
                        <div className="">
                          <p className="md:text-sm text-xs md:line-clamp-7 line-clamp-3 text-slate-500 pr-4">
                            {el.attributes.description}
                          </p>
                        </div>
                        {/* Author and tags */}
                        <div className="flex flex-wrap gap-y-4 items-center gap-x-5">
                          <p className="text-xs text-slate-500">
                            Created By{" "}
                            <span className="text-purple-600 font-semibold">
                              {el.attributes.author}
                            </span>
                          </p>
                          {/* tags */}
                          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white">
                            {el.attributes.tags.data.slice(0, 5).map((el) => (
                              <p
                                key={el.id}
                                // className=" animate-colorChange py-1 px-2 rounded-md"
                                className=" py-1 px-3 bg-gradient-to-r from-blue-500 to-green-400 rounded-full text-white font-semibold"
                              >
                                {el.attributes.Tag}
                              </p>
                            ))}
                          </div>
                        </div>
                        {/* course author, language date, start button */}
                        <div className="flex w-full text-xs">
                          <div className="flex flex-wrap gap-x-3 items-center gap-y-1 justify-between">
                            <p className="flex items-center gap-x-2 text-slate-500">
                              <Languages width={22} />
                              Language
                              <span className="text-purple-600 font-semibold">
                                {el.attributes.language}
                              </span>
                            </p>
                            <p className="flex items-center gap-x-2 text-slate-500">
                              <CalendarDays width={22} />
                              Created On{" "}
                              <span className="text-purple-600 font-semibold">
                                {new Date(
                                  el.attributes.publishedAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "numeric",
                                })}
                              </span>
                            </p>
                            <p className="flex items-center gap-x-2 text-slate-500">
                              <BadgeAlert width={22} />
                              Last updated{" "}
                              <span className="text-purple-600 font-semibold">
                                {new Date(
                                  el.attributes.updatedAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "numeric",
                                })}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div> </div>
                    </div>
                    {/* </Link> */}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          // Skeleton loading
          <BigCourseCarousel />
        )}
        {/* CAROUSEL BUTTONS */}
        <div className="flex">
          <ChevronLeft
            className="text-slate-200 hover:text-white transition-all duration-300 absolute top-0 bottom-0 left-0 my-auto z-10 bg-slate-500/50 hover:bg-slate-500/90 rounded-full ml-2 pr-1 "
            size={50}
            onClick={() => handleSliderChange("prev")}
          />
        </div>
        <div>
          <ChevronRight
            className="text-slate-200 hover:text-white transition-all duration-300 absolute top-0 bottom-0 right-0 my-auto z-10 bg-slate-500/50 hover:bg-slate-500/90 rounded-full mr-2 pl-1"
            size={50}
            onClick={() => handleSliderChange("next")}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
//
//
//
//
//
//
//
//
//
//
//
//
// "use client";
// import BigCourseCarousel from "@/components/loadingPlaceholder/BigCourseCarousel";
// import {
//   BadgeAlert,
//   CalendarDays,
//   ChevronLeft,
//   ChevronRight,
//   Languages,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const HeroSection = () => {
//   let [courseData, setCourseData] = useState();
//   let [currentSlide, setCurrentSlide] = useState(0);
//   let [intervalId, setIntervalId] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(
//         `${
//           process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:1337"
//         }/api/featuredcourses?populate[courses][fields][0]=id&populate[courses][fields][1]=title&populate[courses][fields][2]=description&populate[courses][fields][3]=language&populate[courses][fields][4]=author&populate[courses][fields][5]=publishedAt&populate[courses][fields][6]=updatedAt&populate[courses][populate][category][fields][0]=id&populate[courses][populate][courseCategory][fields]=category&populate[courses][populate]=baseImg`,
//         { cache: "no-store" } // Disable caching for real-time SSR
//       );

//       if (response.ok) {
//         const responseData = await response.json();
//         setCourseData(responseData.data[0].attributes.courses);
//       } else {
//         // Optionally log the error or handle it in some other way
//         console.log("Error fetching course data", response.status);
//       }
//     };
//     fetchData();
//   }, []);

//   const startAutoSlide = () => {
//     clearInterval(intervalId); // Clear any existing interval to avoid overlapping
//     const newIntervalId = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % courseData.data.length);
//     }, 7000);
//     setIntervalId(newIntervalId);
//   };

//   const handleSliderChange = (direction) => {
//     clearInterval(intervalId);
//     if (direction === "next") {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % courseData.data.length);
//     } else {
//       setCurrentSlide((prevSlide) =>
//         prevSlide === 0 ? courseData.data.length - 1 : prevSlide - 1
//       );
//     }
//     startAutoSlide();
//   };

//   // Auto-slide effect when the component mounts
//   useEffect(() => {
//     if (courseData) {
//       // startAutoSlide(); // Start auto-slide when data is available
//     }
//     return () => clearInterval(intervalId); // Clean up the interval on component unmount
//   }, [courseData]);

//   return (
//     <section>
//       <div className="my-12">
//         <h3 className="text-sm">
//           Welcome to <span className="text-green-500">Black Watch!</span> Ready
//           to begin your next learning adventure...
//         </h3>
//       </div>
//       <div className="h-[400px] relative overflow-hidden">
//         {courseData ? (
//           <div
//             className={` relative w-full h-full flex  transition-all duration-700 ease-in-out`}
//             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//           >
//             {courseData.data.map((el, index) => {
//               return (
//                 <div
//                   key={el.id}
//                   className=" relative w-full min-w-full flex-shrink-0"
//                 >
//                   <Link href={`courses/${el.id}`}>
//                     <Image
//                       src={
//                         el.attributes.baseImg.data.attributes.url.includes(
//                           "amazonaws"
//                         )
//                           ? el.attributes.baseImg.data.attributes.url
//                           : `${
//                               process.env.NEXT_PUBLIC_PRODUCTION_URL ||
//                               "http://localhost:1337"
//                             }${el.attributes.baseImg.data.attributes.url}`
//                       }
//                       alt={
//                         el.attributes.baseImg.data.attributes.alternativeText ||
//                         "course's base image"
//                       }
//                       layout="fill"
//                       objectFit="cover"
//                       priority={true}
//                     />

//                     <div className="absolute w-full h-full bg-black/50" />

//                     <div className="absolute bottom-0 mb-10 text-white flex px-20 justify-between items-end">
//                       <div className="flex flex-col gap-y-5 w-2/3">
//                         <h2 className="text-4xl font-bold font-serif first-letter:uppercase">
//                           {el.attributes.title}
//                         </h2>
//                         {/* course description */}
//                         <div className="">
//                           <p className="text-sm line-clamp-2">
//                             {el.attributes.description}
//                           </p>
//                         </div>
//                         {/* Author */}
//                         <p className="text-xs">
//                           Created By{" "}
//                           <span className="text-green-400 underline">
//                             {el.attributes.author}
//                           </span>
//                         </p>
//                         {/* course author, language date, start button */}
//                         <div className="flex flex-col gap-y-10 w-full text-xs">
//                           <div className="flex gap-x-20">
//                             <p className="flex items-center gap-x-3">
//                               <Languages width={22} />
//                               Language -{" "}
//                               <span className="text-green-400">
//                                 {el.attributes.language}
//                               </span>
//                             </p>
//                             <p className="flex items-center gap-x-3">
//                               <CalendarDays width={22} />
//                               Created On{" "}
//                               <span className="text-green-400">
//                                 {new Date(
//                                   el.attributes.publishedAt
//                                 ).toLocaleDateString("en-US", {
//                                   year: "numeric",
//                                   month: "numeric",
//                                 })}
//                               </span>
//                             </p>
//                             <p className="flex items-center gap-x-3">
//                               <BadgeAlert width={22} />
//                               Last updated{" "}
//                               <span className="text-green-400">
//                                 {new Date(
//                                   el.attributes.updatedAt
//                                 ).toLocaleDateString("en-US", {
//                                   year: "numeric",
//                                   month: "numeric",
//                                 })}
//                               </span>
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                       <div> </div>
//                     </div>
//                   </Link>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           // Skeleton loading
//           <BigCourseCarousel />
//         )}
//         {/* CAROUSEL BUTTONS */}
//         <div className="flex">
//           <ChevronLeft
//             className="text-slate-400 hover:text-white transition-all duration-300 absolute top-0 bottom-0 left-0 my-auto z-10 bg-slate-500/50 hover:bg-slate-500/90 rounded-full ml-2 pr-1 "
//             size={50}
//             onClick={() => handleSliderChange("prev")}
//           />
//         </div>
//         <div>
//           <ChevronRight
//             className="text-slate-400 hover:text-white transition-all duration-300 absolute top-0 bottom-0 right-0 my-auto z-10 bg-slate-500/50 hover:bg-slate-500/90 rounded-full mr-2 pl-1"
//             size={50}
//             onClick={() => handleSliderChange("next")}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
