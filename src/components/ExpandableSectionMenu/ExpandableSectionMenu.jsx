"use client";

import { Check, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ExpandableSectionMenu = ({
  sections,
  id,
  articleId,
  completedArticles,
}) => {
  let [toExpand, setToExpand] = useState([]);

  const handleToggle = (sectionId) => {
    setToExpand((prevToExpand) =>
      prevToExpand.includes(sectionId)
        ? prevToExpand.filter((id) => id !== sectionId)
        : [...prevToExpand, sectionId]
    );
  };

  useEffect(() => {
    const allSections = sections.map((section) => section.id);
    setToExpand(allSections);
  }, [sections]);
  return (
    <div className="">
      {sections.map((el, index) => {
        return (
          <div key={index} className="mb-4  py-2 px-3 rounded-md text-xs">
            <div className="flex justify-between items-center text-[#2d2f31]">
              -{el.title}
              <ChevronUp
                onClick={() => handleToggle(el.id)}
                className={`cursor-pointer transition-all duration-200 ${
                  toExpand.includes(el.id) ? " " : "rotate-180"
                }`}
              />
            </div>
            {toExpand.includes(el.id) ? (
              <div className="ml-5 mb-3 pl-2 flex flex-col border-l-2 border-cyan-300 mt-2 gap-2">
                {el.article.map((article, index) => {
                  return (
                    <Link
                      key={index}
                      href={`/courses/${id}/article/${article.id}`}
                      className={`${
                        completedArticles.includes(article.id.toString()) &&
                        articleId == article.id
                          ? "text-purple-700 font-semibold italic"
                          : completedArticles.includes(article.id.toString())
                          ? "text-purple-700 hover:text-cyan-500"
                          : articleId == article.id
                          ? "text-cyan-500 font-semibold italic"
                          : "text-slate-400 hover:text-cyan-500"
                      } transition-all duration-300 flex items-start justify-between gap-x-3`}
                      scroll={false}
                    >
                      <p>{article.title}</p>
                      {completedArticles.includes(article.id.toString()) ? (
                        <p>
                          <Check
                            size={16}
                            strokeWidth={3.5}
                            className="text-purple-600 "
                          />
                        </p>
                      ) : (
                        ""
                      )}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExpandableSectionMenu;
