import { BadgeAlert, CalendarDays, Languages, Signature } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ el, index, isCompleted }) => {
  return (
    <Link
      href={`courses/${el.courseId}/article/${el.latestArticleId}`}
      target="_blank"
      className="max-w-[30%] md:min-w-[430px] min-w-[250px]"
    >
      <div
        key={index}
        // className="min-h-48 bg-white shadow-2xl rounded-xl py-3 px-2 flex flex-col gap-y-3"
        className="min-h-48 bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.4)] rounded-xl py-4 px-3 flex flex-col gap-y-3 hover:bg-[#2d2f31]/9 text-[#2d2f31] transition-all duration-500
        "
      >
        {/* <div className="relative w-4/12 h-48 "> */}
        <div className="relative w-full h-36 ">
          <Image
            src={
              el.baseImg.data.attributes.url.includes("amazonaws")
                ? el.baseImg.data.attributes.url
                : `http:localhost:1337${el.baseImg.data.attributes.url}`
            }
            alt={
              el.baseImg.data.attributes.alternativeText ||
              "baseImg for the course"
            }
            className="rounded-xl"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
        {/* <div className="w-10/12 flex flex-col  gap-y-2 px-4"> */}
        <div className="w-full flex flex-col  gap-y-2 px-2">
          <h3 className="line-clamp-1 text-xl font-bold">{el.title}</h3>
          <div className="text-xs">
            <div className="flex flex-wrap justify-between items-center">
              <p className="flex items-center gap-x-3">
                <Signature width={18} />
                Created By
                <span className="text-purple-400 font-extrabold underline">
                  {el.author}
                </span>
              </p>
              <p className="flex items-center gap-x-3">
                <Languages width={18} />
                Language -{" "}
                <span className="text-purple-400 font-extrabold">
                  {el.language}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <p className="flex items-center gap-x-3">
                <CalendarDays width={18} />
                Created On{" "}
                <span className="text-purple-400 font-extrabold">
                  {new Date(el.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                  })}
                </span>
              </p>
              <p className="flex items-center gap-x-3">
                <BadgeAlert width={18} />
                Last updated{" "}
                <span className="text-purple-400 font-extrabold">
                  {new Date(el.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 text-xs gap-y-2">
            {el.tags.data.slice(0, 3).map((el, index) => {
              return (
                <p
                  key={el.id}
                  className="py-1 px-3 bg-gradient-to-r from-blue-500 to-green-400 rounded-full text-white font-semibold"
                >
                  {el.attributes.Tag}
                </p>
              );
            })}
          </div>
          <div>
            <p className="text-xs">
              Progress -{" "}
              <span className="text-purple-400 font-extrabold">
                {Math.round(el.progress)}%
              </span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-[6px] dark:bg-black/30">
              <div
                className={`${
                  isCompleted ? "bg-green-400" : "bg-blue-600"
                } h-[6px] rounded-full`}
                style={{ width: `${el.progress}%` }}
              ></div>
            </div>
          </div>
          {/* <div>{el.progress}</div> */}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
