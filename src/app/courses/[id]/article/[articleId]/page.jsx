"use client";

import ExpandableSectionMenu from "@/components/ExpandableSectionMenu/ExpandableSectionMenu";
import { useEffect, useState } from "react";
import "./articleStyle.css";

import renderArticle from "@/utils/renderArticle";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const page = ({ params }) => {
  const router = useRouter();
  const { id, articleId } = params;
  let [loading, setLoading] = useState(true);
  let [sections, setSections] = useState(null);
  let [article, setArticle] = useState(null);
  let [error, setError] = useState();
  let [showArticlesMenu, setShowArticlesMenu] = useState(false);
  const [completedArticles, setCompletedArticles] = useState([]);

  const userid = Cookies.get("userId");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userAuthenticateTest = await fetch(
          "/api/articleAuthentication/",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        // http://localhost:3000/3/article/5
        if (!userAuthenticateTest.ok) {
          localStorage.setItem(
            "redirectTo",
            `/courses/${id}/article/${articleId}`
          );
          router.push("/signin");
        }

        // Fetch course data
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:1337"
          }/api/courses/${id}?populate[section][populate]=article`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          console.log("error fetching data, api status", response.ok);
          return;
        }

        const parsedData = await response.json();
        const courseData = parsedData?.data;
        setSections(courseData.attributes.section);

        // Fetch course progress data (to track completed articles)
        // const progressResponse = await fetch(
        //   `http://localhost:1337/api/course-progresses?filters[userid]=${userid}&filters[courseid]=${id}`,
        //   { cache: "no-store" }
        // );

        const progressResponse = await fetch(
          `/api/fetchCourseCompletion/${userid}/courseid/${id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          const completedArticles = progressData?.data?.map(
            (entry) => entry.attributes.articleid
          );
          setCompletedArticles(completedArticles || []);
        } else {
          console.log("Error fetching course progress data");
        }

        // Extract article based on articleId
        let foundArticle = null;
        courseData?.attributes?.section?.forEach((section) => {
          section.article?.forEach((article) => {
            if (article.id === parseInt(articleId)) {
              foundArticle = article;
            }
          });
        });

        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError("Article not found");
        }

        //set last seen article by user for a particular course
        let responseSetLastSeenArticle = await fetch(
          `/api/lastseenarticle/${userid}/course/${id}/article/${articleId}`
        );
        if (!responseSetLastSeenArticle.ok) {
          console.log("error fetching data, api status", response.ok);
          return;
        }
        let getuserlastseenarticle = await responseSetLastSeenArticle.json();
        //
        //
      } catch (err) {
        console.log({ err });
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCompleteArticle = async () => {
    // already marked as completed
    if (completedArticles.includes(articleId)) {
      console.log("This article is already marked as complete.");
      return;
    }

    try {
      // If the article is not completed or is not present in completedARticles array, create a new course completion record

      const createResponse = await fetch(
        `/api/fetchCourseCompletion/createCourseCompletion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            userid,
            courseid: id,
            articleid: articleId, // Create a new record with the first course and article
          }),
        }
      );

      if (!createResponse.ok) {
        throw new Error("Failed to create new course completion data");
      }

      const createdData = await createResponse.json();
      console.log("New course completion created:", createdData);
      // Update the completedArticles state
      setCompletedArticles((prev) => [...prev, articleId]);
    } catch (error) {
      console.error("Error completing article:", error);
    }
  };

  return loading ? (
    <div className="flex gap-4 min-h-[540px]">
      <div className="hidden lg:block border-r-2 w-3/12 py-10 px-10 bg-gray-100">
        {/*expandable section  */}
        <div className="flex flex-col gap-y-3 animate-pulse">
          <div className="h-3 bg-slate-500/70 rounded-md w-1/2"></div>
          <div className="h-2 bg-slate-400/50 rounded-md w-full"></div>
          <div className="h-2 bg-slate-400/50 rounded-md w-full"></div>
          <div className="h-2 bg-slate-400/50 rounded-md w-full"></div>
        </div>
        <br></br>
        <br></br>
        <div className="flex flex-col gap-y-3 animate-pulse">
          <div className="h-3 bg-slate-500/50 rounded-md w-1/2"></div>
          <div className="h-2 bg-slate-400/50 rounded-md w-full"></div>
          <div className="h-2 bg-slate-400/50 rounded-md w-full"></div>
          <div className="h-2 bg-slate-400/50 rounded-md w-full"></div>
        </div>
      </div>
      <div className=" max-w-full prose lg:w-9/12 w-full py-10 px-10  mb-20">
        <div className="flex flex-col gap-y-3 animate-pulse">
          <div className="h-6 bg-slate-500/50 rounded-md lg:w-1/2 w-2/3 "></div>
          <div className="h-4 bg-slate-400/50 rounded-md lg:w-10/12 w-full"></div>
          <div className="h-4 bg-slate-400/50 rounded-md lg:w-10/12 w-full"></div>
          <div className="h-4 bg-slate-400/50 rounded-md lg:w-10/12 w-full"></div>
          <div className="h-4 bg-slate-400/50 rounded-md lg:w-10/12 w-full"></div>
          <div className="h-4 bg-slate-400/50 rounded-md lg:w-10/12 w-full"></div>
        </div>
      </div>
    </div>
  ) : sections ? (
    <>
      <div
        onClick={() => setShowArticlesMenu(!showArticlesMenu)}
        className="sticky w-full top-0 block lg:hidden z-50 py-3 cursor-pointer px-6 text-sm text-purple-400 font-extrabold border-b-2 border-bg-gray-100 backdrop-blur "
      >
        {showArticlesMenu ? `< Close menu` : `> Article Menu`}
      </div>
      <div className="flex gap-4 min-h-[540px] relative">
        <div className="lg:block hidden border-r-2 w-3/12 py-10 px-10 bg-gray-100">
          <ExpandableSectionMenu
            sections={sections}
            id={id}
            articleId={articleId}
            completedArticles={completedArticles}
          />
        </div>
        {/* article menu for small screen(responsive layout) */}
        {showArticlesMenu && (
          <div className="block lg:hidden z-40 absolute border-r-2 w-full h-full py-10 px-10 backdrop-blur-xl bg-black/10 transition-all duration-500">
            <ExpandableSectionMenu
              sections={sections}
              id={id}
              articleId={articleId}
              completedArticles={completedArticles}
            />
          </div>
        )}

        {article ? (
          <div className="flex-grow max-w-full prose w-9/12 py-10 px-10  mb-20">
            <div className="article-container">
              {renderArticle(article.content)}
            </div>
            <button
              onClick={handleCompleteArticle}
              className={`flex justify-center mx-auto mt-20 items-center gap-2  text-[14pt] relative font-medium transition-all  rounded-md py-2.5 px-8 uppercase text-white  ${
                completedArticles.includes(articleId)
                  ? "bg-green-400/50 cursor-not-allowed"
                  : "bg-green-400 hover:bg-green-500 cursor-pointer"
              }`}
              disabled={completedArticles.includes(articleId)}
            >
              {completedArticles.includes(articleId)
                ? "Completed"
                : "Mark Completed"}
            </button>
          </div>
        ) : (
          <div>Oops... the article you were looking for isn't available</div>
        )}
      </div>
    </>
  ) : (
    <div>Something is not right here, please go back or check your URL</div>
  );
};

export default page;
