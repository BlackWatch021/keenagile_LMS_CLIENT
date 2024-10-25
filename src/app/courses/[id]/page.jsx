import { BadgeAlert, CalendarDays, Languages, NotebookPen } from "lucide-react";
import Image from "next/image";
import YouWillLearnNestedList from "@/components/youWillLearnNestiedList/YouWillLearnNestiedList";
import ExpandedSection from "@/components/ExpandedSection/ExpandedSection";
import SubHeading from "@/components/subHeading/SubHeading";
import Link from "next/link";
import SimilarCoursesSSR from "@/components/SimilarCoursesSSR/SimilarCoursesSSR";

const CourseOverview = async ({ params }) => {
  const { id } = params;

  const response = await fetch(
    `${
      process.env.PRODUCTION_URL || "http://localhost:1337"
    }/api/courses/${id}?populate[tags][fields]=tag&populate[courseCategory][fields]=category&populate[baseImg]=*&populate[section][populate][article][fields]=title`,
    { cache: "no-store" }
  );

  let courseData = null;

  if (response.ok) {
    courseData = await response.json();
  } else {
    console.log("Error fetching course data", response.status);
  }

  if (!courseData) {
    return <div>Oppssss......this course isn't available</div>;
  }

  return courseData ? (
    <div>
      {/* <div className="relative h-80 bg-[#2d2f31] px-4 md:px-10 lg:px-[13rem]  py-5 text-white flex gap-x-4 cursor-default"> */}
      <div className="relative xl:h-80 lg:h-auto bg-[#2d2f31] px-4 md:px-10 lg:px-[13rem]  py-5 text-white flex gap-x-4 cursor-default">
        <div className="xl:w-2/3 w-full  flex flex-col gap-y-3">
          <div>
            {/* Category */}
            {/* <p className="text-xs text-[#C0C4FC]"> */}
            <p className="text-xs text-purple-400 font-extrabold">
              {`>`}
              {
                courseData.data.attributes.courseCategory.data.attributes
                  .category
              }
            </p>
          </div>
          {/* Title */}
          <h2 className="text-3xl font-bold first-letter:uppercase">
            {courseData.data.attributes.title}
          </h2>
          {/* Description */}
          <div className="">
            <p className="text-sm line-clamp-3">
              {courseData.data.attributes.description}
            </p>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-x-4 text-xs gap-y-2">
            {courseData.data.attributes.tags.data.map((el, index) => {
              return (
                <p className="bg-gradient-to-r from-blue-500 to-green-400 rounded-full py-1 px-2  text-white">
                  {el.attributes.Tag}
                </p>
              );
            })}
          </div>
          {/* Author */}
          <p className="text-xs">
            Created By{" "}
            <span className="text-purple-400 font-extrabold underline">
              {courseData.data.attributes.author}
            </span>
          </p>
          {/* course author, language date, start button */}
          <div className="flex flex-col text-xs">
            <div className="flex flex-wrap gap-x-10">
              <p className="flex items-center gap-x-3">
                <Languages width={22} />
                Language
                <span className="text-purple-400 font-extrabold">
                  {courseData.data.attributes.language}
                </span>
              </p>
              <p className="flex items-center gap-x-3">
                <CalendarDays width={22} />
                Created On
                <span className="text-purple-400 font-extrabold">
                  {new Date(
                    courseData.data.attributes.publishedAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                  })}
                </span>
              </p>
              <p className="flex items-center gap-x-3">
                <BadgeAlert width={22} />
                Last updated
                <span className="text-purple-400 font-extrabold">
                  {new Date(
                    courseData.data.attributes.updatedAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden xl:block relative w-1/4 min-w-[300px] h-fit text-black rounded-b-md">
          {/* Test stickyness here  */}
          <div className="">
            <div className="relative h-52">
              <Image
                src={
                  courseData.data.attributes.baseImg.data.attributes.url.includes(
                    "amazonaws"
                  )
                    ? courseData.data.attributes.baseImg.data.attributes.url
                    : `${
                        process.env.PRODUCTION_URL || "http://localhost:1337"
                      }${
                        courseData.data.attributes.baseImg.data.attributes.url
                      }`
                }
                alt={
                  courseData.data.attributes.baseImg.data.attributes
                    .alternativeText || "baseImg for the course"
                }
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </div>
            <div className="px-3 py-3 relative shadow-xl bg-white border-[1px] border-[#9f9f9f]/60 rounded-b-md">
              <ExpandedSection data={courseData.data.attributes.section} />
            </div>
            <div className="mt-2">
              <Link
                href={`${id}/article/${courseData.data.attributes.section[0].article[0].id}`}
                className="flex justify-center  mx-auto items-center gap-2 cursor-pointer text-[14pt] relative font-medium transition-all  rounded-md py-2.5 px-8 uppercase text-white bg-purple-500 hover:bg-purple-400"
              >
                <NotebookPen />
                Start Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Lower part */}
      <div className="px-4 md:px-10 lg:px-[13rem]  min-h-96 pt-5 bg-[#f7f9fa] flex flex-col gap-y-5">
        <div className="xl:hidden block relative xl:w-2/3 w-full h-fit text-black rounded-md overflow-hidden">
          {/* Test stickyness here  */}
          <div className="">
            <div className="relative h-52">
              <Image
                src={
                  courseData.data.attributes.baseImg.data.attributes.url.includes(
                    "amazonaws"
                  )
                    ? courseData.data.attributes.baseImg.data.attributes.url
                    : `${
                        process.env.PRODUCTION_URL || "http://localhost:1337"
                      }${
                        courseData.data.attributes.baseImg.data.attributes.url
                      }`
                }
                alt={
                  courseData.data.attributes.baseImg.data.attributes
                    .alternativeText || "baseImg for the course"
                }
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </div>
            <div className="px-3 py-3 relative shadow-xl bg-white rounded-b-md">
              <ExpandedSection data={courseData.data.attributes.section} />
            </div>
            <div className="mt-2">
              <Link
                href={`${id}/article/${courseData.data.attributes.section[0].article[0].id}`}
                className="flex justify-center  mx-auto items-center gap-2 cursor-pointer text-[14pt] relative font-medium transition-all  rounded-md py-2.5 px-8 uppercase text-white xl:text-lg text-sm bg-purple-500 hover:bg-purple-400"
              >
                <NotebookPen />
                Start Now
              </Link>
            </div>
          </div>
        </div>
        {/* You will learn */}
        <div className="xl:w-2/3 w-full  flex flex-col gap-y-3  shadow-2xl">
          <div className="bg-white px-3 pb-3">
            <SubHeading title="You Will Learn" />
            <YouWillLearnNestedList
              data={courseData.data.attributes.youWillLearn}
            />
          </div>
        </div>
        {/* Similar courses */}
        <div className="xl:w-2/3 w-full bg-white shadow-2xl flex flex-col gap-y-5 pb-10 px-3">
          <SubHeading
            title={`Similar courses for "${courseData.data.attributes.courseCategory.data.attributes.category}"`}
          />
          <div className="">
            <SimilarCoursesSSR
              id={courseData.data.attributes.courseCategory.data.id}
              courseId={id}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>loading....</p>
  );
};

export default CourseOverview;
