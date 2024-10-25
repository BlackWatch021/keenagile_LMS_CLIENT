"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import CourseCard from "@/components/mylearningCourseCards/courseCard";
import { useRouter } from "next/navigation";

const MyLearningPage = () => {
  const router = useRouter();
  const userid = Cookies.get("userId");
  const [myLearnings, setMyLearnings] = useState([]); // User's learning progress data
  const [courses, setCourses] = useState([]); // Course details
  const [viewCompleted, setViewCompleted] = useState(false); // For toggling between Learning and Completed
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paginationData, setPaginationData] = useState(null); // Holds pagination info
  const [lastSeenArticles, setLastSeenArticles] = useState(null);

  const [page, setPage] = useState(1); // Pagination state
  const pageSize = 5; // Limit the number of courses per page

  useEffect(() => {
    const fetchCourseCompletion = async () => {
      setLoading(true);
      try {
        const userAuthenticateTest = await fetch(
          "/api/articleAuthentication/",
          {
            method: "GET",
            cache: "no-store",
          }
        );
        if (!userAuthenticateTest.ok) {
          localStorage.setItem("redirectTo", "/mylearnings");
          router.push("/signin");
        }

        const response = await fetch(`/api/fetchCourseCompletion/${userid}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch course completion data");
        }

        const data = await response.json();
        const userCourses = data.data;
        setMyLearnings(userCourses);

        // Extract courseIds from the user's learning data
        const courseIds = userCourses.map(
          (course) => course.attributes.courseid
        );

        // Fetch last-seen articles for the user
        const lastSeenResponse = await fetch(
          `/api/lastseenarticle/${userid}/`,
          { method: "GET", cache: "no-store" }
        );
        const lastSeenData = await lastSeenResponse.json();
        setLastSeenArticles(lastSeenData.data);

        // Fetch course details using the courseIds and the full query string
        let queryString = courseIds
          .map((id, index) => `filters[id][$in][${index}]=${id}`)
          .join("&");

        const courseResponse = await fetch(
          `${
            process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:1337"
          }/api/courses?${queryString}&fields[0]=title&fields[1]=author&fields[2]=language&fields[3]=updatedAt&fields[4]=publishedAt&populate[tags][fields]=tag&populate[baseImg][fields]=url&populate[baseImg][fields]=alternativeText&populate[section][populate][article][fields]=title`
        );

        if (!courseResponse.ok) {
          throw new Error("Failed to fetch courses data");
        }

        const courseData = await courseResponse.json();
        // console.log({ courseData });
        setCourses(courseData.data);
        setPaginationData(courseData.meta.pagination); // Set pagination metadata
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseCompletion();
  }, [userid, page]); // Added `page` to re-fetch data when the page changes

  // Toggle between Learning and Completed
  const toggleView = () => {
    setViewCompleted(!viewCompleted);
  };

  // Separate courses into "Learning" and "Completed" with details

  const filterCourses = (isCompleted) => {
    return courses
      .map((course) => {
        // Find the user's learning data related to this course
        const courseLearnings = myLearnings.filter(
          (learning) =>
            Number(learning.attributes.courseid) === Number(course.id)
        );

        if (courseLearnings.length > 0) {
          const sections = course.attributes.section || [];
          let totalArticles = 0;
          let latestArticleId = null;

          // Calculate the total number of articles in this course
          sections.forEach((section) => {
            totalArticles += section.article.length;
          });

          // Calculate the number of completed articles for this course
          const completedArticles = courseLearnings.length;

          // Find the latest article ID from lastSeenArticles
          const lastSeen = lastSeenArticles.find(
            (article) =>
              Number(article.attributes.courseid) === Number(course.id)
          );

          // Set latestArticleId if a match is found in lastSeenArticles
          if (lastSeen) {
            latestArticleId = Number(lastSeen.attributes.articleid);
          }

          // Calculate progress
          const progress = (completedArticles / totalArticles) * 100;

          // Filter based on whether we want completed or in-progress courses
          if (
            (isCompleted && progress === 100) ||
            (!isCompleted && progress < 100)
          ) {
            return {
              ...course.attributes,
              progress: progress.toFixed(2), // Round progress to 2 decimal places
              completedArticles,
              totalArticles,
              courseId: course.id, // Include courseId
              latestArticleId, // Include latest article ID from lastSeenArticles
            };
          }
        }

        return null; // Exclude courses that don't match the criteria
      })
      .filter(Boolean); // Remove null values
  };

  // Get learning and completed courses
  const learningCourses = filterCourses(false);
  const completedCourses = filterCourses(true);

  // const handlePagination = (direction) => {
  //   if (direction === "prev" && paginationData.page > 1) {
  //     setPage(page - 1);
  //   } else if (
  //     direction === "next" &&
  //     paginationData.page < paginationData.pageCount
  //   ) {
  //     setPage(page + 1);
  //   }
  // };

  return loading ? (
    <div className="mt-10 xl:px-[13rem] lg:px-[10rem] px-10 flex flex-col gap-y-4">
      <div className="h-fit bg-white shadow-2xl rounded-xl p-4 flex">
        <div className="relative md:w-2/12 w-4/12 h-32 bg-slate-500/30 rounded-md animate-pulse"></div>
        <div className="md:w-10/12 w-8/12 flex flex-col justify-end gap-y-3 px-4">
          <div className="w-1/2 h-6 bg-slate-500/50 rounded-md animate-pulse" />
          <div className="w-10/12 h-4 bg-slate-300/50 rounded-md animate-pulse" />
          <div className="w-10/12 h-4 bg-slate-300/50 rounded-md animate-pulse" />
          <div className="w-10/12 h-4 bg-slate-300/50 rounded-md animate-pulse" />
        </div>
      </div>
      <div className="h-fit bg-white shadow-2xl rounded-xl p-4 flex">
        <div className="relative md:w-2/12 w-4/12 h-32 bg-slate-500/30 rounded-md animate-pulse"></div>
        <div className="md:w-10/12 w-8/12 flex flex-col justify-end gap-y-3 px-4">
          <div className="w-1/2 h-6 bg-slate-500/50 rounded-md animate-pulse" />
          <div className="w-10/12 h-4 bg-slate-300/50 rounded-md animate-pulse" />
          <div className="w-10/12 h-4 bg-slate-300/50 rounded-md animate-pulse" />
          <div className="w-10/12 h-4 bg-slate-300/50 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  ) : error ? (
    <p>{error}</p>
  ) : (
    // <div className="mt-10 px-[16rem] flex flex-col gap-y-10">
    <div className="mt-10 px-4 md:px-10 lg:px-[13rem] flex flex-col gap-y-10">
      {/* Slider Button for toggling Learning and Completed */}
      <div className="flex">
        <div
          className="flex bg-gray-200 text-sm py-2 px-2 rounded-md gap-x-3 "
          onClick={toggleView}
        >
          <p
            className={`px-2 py-1 text-slate-400 ${
              !viewCompleted && "bg-gray-500 text-white rounded-md"
            } transition-all duration-200 cursor-pointer md:text-md text-sm `}
          >
            Learning
          </p>
          <p
            className={`px-2 py-1 text-slate-400 ${
              viewCompleted && "bg-gray-500 text-white rounded-md"
            } transition-all duration-200 cursor-pointer md:text-md text-sm`}
          >
            Completed
          </p>
        </div>
      </div>

      {/* Conditionally render either Learning or Completed courses */}
      {viewCompleted ? (
        <div className="flex gap-x-8 gap-y-4 flex-wrap justify-center">
          {completedCourses.length === 0 ? (
            <p>No completed courses</p>
          ) : (
            completedCourses.map((el, index) => {
              return <CourseCard el={el} key={index} isCompleted={true} />;
            })
          )}
        </div>
      ) : (
        <div className="flex gap-x-8 gap-y-4 flex-wrap justify-center">
          {learningCourses.length === 0 ? (
            <p>No ongoing courses</p>
          ) : (
            learningCourses.map((el, index) => {
              return <CourseCard el={el} key={index} isCompleted={false} />;
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MyLearningPage;
