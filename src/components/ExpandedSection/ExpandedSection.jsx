import SubHeading from "@/components/subHeading/SubHeading";
import { ChevronDown } from "lucide-react";

const ExpandedSection = ({ data }) => {
  return (
    <div>
      <SubHeading title="Course Content" />
      <div className="">
        {data.map((el, index) => {
          return (
            <details
              key={index}
              className="mb-2 ml-3 border-b-2 border-purple-200 transition-all duration-300"
            >
              <summary className="flex items-center justify-between cursor-pointer py-2 text-sm">
                <span>
                  <span className="first-letter:uppercase text-[#2d2f31]/80">
                    {index + 1} - {el.title}
                  </span>
                </span>
                <div>
                  <ChevronDown size={25} className="text-[#2d2f31]/50" />
                </div>
              </summary>

              {/* Inner articles */}
              <div className="pb-2">
                {el.article.map((articles, index) => {
                  return (
                    <p
                      key={index}
                      className="ml-5 pl-3 text-xs border-l-2 border-purple-200 py-2"
                    >
                      <span className="first-letter:uppercase text-[#2d2f31]/70">
                        {articles.title}
                      </span>
                    </p>
                  );
                })}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandedSection;
