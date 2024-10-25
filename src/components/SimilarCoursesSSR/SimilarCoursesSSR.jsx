import { BadgeAlert, CalendarDays, Languages, Signature } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SimilarCoursesSSR = async ({ id, courseId }) => {
  let courses;

  try {
    const response = await fetch(
      `${
        process.env.PRODUCTION_URL || "http://localhost:1337"
      }/api/categories/${id}?populate[courses][fields]=title&populate[courses][fields]=author&populate[courses][fields]=language&populate[courses][populate][baseImg][fields]=url&populate[courses][populate][baseImg][fields]=alternativeText&populate[courses][populate][tags][fields]=tag&populate[courses][fields]=publishedAt&populate[courses][fields]=updatedAt&pagination[page]=1&pagination[pageSize]=5
`,
      { cache: "no-store" } // No caching for fresh data
    );
    if (response.ok) {
      const data = await response.json();
      courses = data.data.attributes.courses.data;
    }
  } catch (error) {
    console.log({ error });
  }

  //   console.log({ courses });

  return (
    <div className="px-3 flex flex-col gap-y-6">
      {courses ? (
        courses.map((el, index) => {
          if (el.id === Number(courseId)) {
            return <></>;
          }
          return (
            <Link
              href={`courses/${el.attributes.courseId}/article/${el.attributes.latestArticleId}`}
              target="_blank"
              className="max-w-[100%] md:min-w-[430px] min-w-[250px]"
            >
              <div
                key={index}
                // className="min-h-48 bg-white shadow-2xl rounded-xl py-3 px-2 flex flex-col gap-y-3"
                className="xl:min-h-44 min-auto bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.4)] rounded-xl py-4 px-3 flex xl:flex-row flex-col xl:gap-x-4 gap-y-3 hover:bg-[#2d2f31]/9 text-[#2d2f31] transition-all duration-500"
              >
                {/* <div className="relative w-4/12 h-48 "> */}
                <div className="relative w-full xl:h-40 h-36 ">
                  <Image
                    src={
                      el.attributes.baseImg.data.attributes.url.includes(
                        "amazonaws"
                      )
                        ? el.attributes.baseImg.data.attributes.url
                        : `http:localhost:1337${el.attributes.baseImg.data.attributes.url}`
                    }
                    alt={
                      el.attributes.baseImg.data.attributes.alternativeText ||
                      "baseImg for the course"
                    }
                    className="rounded-xl"
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                  />
                </div>
                {/* <div className="w-10/12 flex flex-col  gap-y-2 px-4"> */}
                <div className="w-full flex flex-col  gap-y-4 px-2">
                  <h3 className="line-clamp-1 text-xl font-bold">
                    {el.attributes.title}
                  </h3>
                  <div className="text-xs">
                    <div className="flex flex-wrap gap-x-10 items-center">
                      <p className="flex items-center gap-x-3">
                        <Signature width={18} />
                        Created By
                        <span className="text-purple-400 font-extrabold underline">
                          {el.attributes.author}
                        </span>
                      </p>
                      <p className="flex items-center gap-x-3">
                        <Languages width={18} />
                        Language -{" "}
                        <span className="text-purple-400 font-extrabold">
                          {el.attributes.language}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-10 items-center">
                      <p className="flex items-center gap-x-3">
                        <CalendarDays width={18} />
                        Created On{" "}
                        <span className="text-purple-400 font-extrabold">
                          {new Date(
                            el.attributes.publishedAt
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "numeric",
                          })}
                        </span>
                      </p>
                      <p className="flex items-center gap-x-3">
                        <BadgeAlert width={18} />
                        Last updated{" "}
                        <span className="text-purple-400 font-extrabold">
                          {new Date(el.attributes.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "numeric",
                            }
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-4 text-xs gap-y-2">
                    {el.attributes.tags.data.slice(0, 3).map((el, index) => {
                      return (
                        <p
                          key={el.attributes.id}
                          className="py-1 px-3 bg-gradient-to-r from-blue-500 to-green-400 rounded-full text-white font-semibold"
                        >
                          {el.attributes.Tag}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Link>
            // <Link href={`/courses/${el.id}`}>
            //   <div
            //     key={el.id}
            //     className="flex bg-white hover:bg-slate-100 gap-x-3 shadow-md cursor-pointer transition-all duration-500 py-2 px-2 rounded-md"
            //   >
            //     <div className="relative w-3/12 h-32">
            //       <Image
            //         src={
            //           el.attributes.baseImg.data.attributes.url.includes(
            //             "amazonaws"
            //           )
            //             ? el.attributes.baseImg.data.attributes.url
            //             : `${
            //                 process.env.NEXT_PUBLIC_PRODUCTION_URL ||
            //                 "http://localhost:1337"
            //               }${el.attributes.baseImg.data.attributes.url}`
            //         }
            //         alt={
            //           el.attributes.baseImg.data.attributes.alternativeText ||
            //           "baseImg for the course"
            //         }
            //         layout="fill"
            //         objectFit="cover"
            //         priority={true}
            //         className="rounded-md"
            //       />
            //     </div>
            //     <div className="w-9/12 flex flex-col justify-evenly px-3">
            //       <div className="flex justify-between">
            //         <h3 className="line-clamp-1 text-xl h-fit">
            //           {el.attributes.title}
            //         </h3>
            //       </div>
            //       <div className="w-9/12 flex text-xs gap-x-5">
            //         <p className="flex items-center gap-x-1 text-[#2d2f31]/80">
            //           <Languages width={12} />
            //           Language-
            //           <span className="text-purple-400 font-extrabold">
            //             {el.attributes.language}
            //           </span>
            //         </p>
            //         <p className="flex items-center gap-x-1 text-[#2d2f31]/80">
            //           <CalendarDays width={12} />
            //           Author
            //           <span className="text-purple-400 font-extrabold">
            //             {el.attributes.author}
            //           </span>
            //         </p>
            //       </div>
            //       <div className="w-9/12 flex text-xs gap-x-5">
            //         <p className="flex items-center gap-x-1 text-[#2d2f31]/80">
            //           <CalendarDays width={12} />
            //           Created On
            //           <span className="text-purple-400 font-extrabold">
            //             {new Date(el.attributes.publishedAt).toLocaleDateString(
            //               "en-US",
            //               {
            //                 year: "numeric",
            //                 month: "numeric",
            //               }
            //             )}
            //           </span>
            //         </p>
            //         <p className="flex items-center gap-x-1 text-[#2d2f31]/80">
            //           <BadgeAlert width={12} />
            //           Last updated
            //           <span className="text-purple-400 font-extrabold">
            //             {new Date(el.attributes.updatedAt).toLocaleDateString(
            //               "en-US",
            //               {
            //                 year: "numeric",
            //                 month: "numeric",
            //               }
            //             )}
            //           </span>
            //         </p>
            //       </div>
            //       <div className="flex flex-wrap gap-x-4 text-xs gap-y-2">
            //         {el.attributes.tags.data[0] &&
            //           el.attributes.tags.data.map((tags, index) => {
            //             return (
            //               <p
            //                 key={index}
            //                 className="py-1 px-2 bg-gradient-to-r from-blue-500 to-green-400 rounded-full text-white"
            //               >
            //                 {tags.attributes.Tag}
            //               </p>
            //             );
            //           })}
            //       </div>
            //     </div>
            //   </div>
            // </Link>
          );
        })
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default SimilarCoursesSSR;
