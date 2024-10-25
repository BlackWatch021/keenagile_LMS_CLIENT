"use client";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const SearchPage = () => {
  const query = useSearchParams();
  const searchValue = query.get("searchValue");
  let [results, setResults] = useState("");
  let [loading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  let [paginationData, setPaginationData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        // Use a regex to extract tags
        const tagPattern = /#\w+/g;
        const tags = searchValue.match(tagPattern) || []; // Extract tags (e.g., #best)

        // Remove tags and clean up any extra spaces in the title
        const title = searchValue
          .replace(tagPattern, "") // Remove tags (e.g., #best)
          .replace(/\s+/g, " ") // Replace multiple spaces with a single space
          .trim(); // Trim leading and trailing spaces

        // Construct query parameters
        const titleFilter = title
          ? `filters[title][$containsi]=${encodeURIComponent(title)}`
          : ""; // Search the entire title phrase

        const tagFilter =
          tags.length > 0
            ? tags
                .map(
                  (tag) =>
                    `filters[tags][Tag][$containsi]=${encodeURIComponent(
                      tag.substring(1)
                    )}`
                )
                .join("&")
            : "";

        // Construct the API endpoint
        const endpoint = `${
          process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:1337"
        }/api/courses?${titleFilter}${
          tagFilter ? `&${tagFilter}` : ""
        }&pagination[page]=${page}&pagination[pageSize]=5&fields[0]=title&fields[1]=author&fields[2]=description&fields[3]=language&fields[4]=updatedAt&fields[5]=publishedAt&populate[baseImg][fields]=url&populate[tags][fields]=tag`;

        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setResults(data.data); // Assuming the results are in `data.data`
          setPaginationData(data.meta.pagination);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    if (searchValue) {
      fetchData();
    }
  }, [searchValue, page]); // Add searchValue as a dependency to re-trigger the effect when the search value changes

  const handlePagination = (value) => {
    if (value === "prev") {
      if (paginationData.page > 1) {
        setPage(page - 1);
      }
    } else {
      if (paginationData.page < paginationData.pageCount) {
        setPage(page + 1);
      }
    }
  };

  console.log({ results });

  return (
    // <div className="px-52 py-5 bg-[#f7f9fa]">
    <div className="px-4 md:px-10 lg:px-[13rem] py-5 bg-[#f7f9fa]">
      <Suspense fallback={<p>Loading search results...</p>}>
        <h3 className="mb-5">
          Search Results for{" "}
          <span className="italic font-bold">"{searchValue}"</span>
        </h3>
        {loading ? (
          <div className="flex flex-col gap-y-4">
            <div className="h-fit bg-white shadow-2xl rounded-xl p-4 flex">
              <div className="relative w-2/12 h-32 bg-slate-500/30 rounded-md animate-pulse"></div>
              <div className="w-10/12 flex flex-col justify-end gap-y-3 px-4">
                <div className="w-1/2 h-6 bg-slate-500/50 rounded-md animate-pulse" />
                <div className="w-10/12 h-4 bg-slate-300/50 rounded-md animate-pulse" />
                <div className="w-10/12 h-4 bg-slate-300/50 rounded-md animate-pulse" />
                <div className="w-10/12 h-4 bg-slate-300/50 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="flex flex-col gap-y-4">
            {results.map((el, index) => (
              <Link
                key={el.id}
                href={`/courses/${el.id}`}
                className="transition-all duration-300 lg:h-auto h-fit "
                target="_blank"
              >
                <div
                  key={index}
                  className="lg:h-40 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] rounded-xl p-2 flex lg:flex-row flex-col gap-y-3"
                >
                  <div className="relative lg:w-[30%] lg:min-w-[250px] md:w-full lg:h-auto h-[200px]">
                    <Image
                      src={
                        el.attributes.baseImg.data.attributes.url.includes(
                          "amazonaws"
                        )
                          ? el.attributes.baseImg.data.attributes.url
                          : `http://localhost:1337${el.attributes.baseImg.data.attributes.url}`
                      }
                      alt={
                        el.attributes.baseImg.data.attributes.alternativeText ||
                        "baseImg for the course"
                      }
                      layout="fill"
                      objectFit="cover"
                      priority={true}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="w-10/12 flex flex-col gap-y-2 px-4">
                    <h3 className="line-clamp-1 text-[#2d2f31]/70 text-xl font-bold">
                      {el.attributes.title}
                    </h3>
                    <p className="line-clamp-2 text-xs text-[#2d2f31]/60">
                      {el.attributes.description}
                    </p>
                    <div className="text-xs">{/* Details */}</div>
                    <div className="flex flex-wrap gap-x-4 text-xs gap-y-2">
                      {el.attributes.tags.data.map((tag, index) => (
                        <p
                          key={tag.id}
                          className="bg-gradient-to-r from-blue-500 to-green-400 rounded-full py-1 px-2  text-white"
                        >
                          {tag.attributes.Tag}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {/* Pagination */}
            <div className="mt-10 flex mx-auto items-center gap-x-3">
              <button
                className={`bg-slate-400 p-1 rounded-md ${
                  paginationData.page == 1 && "opacity-30"
                }`}
                onClick={() => handlePagination("prev")}
                disabled={paginationData.page == 1}
              >
                <ChevronsLeft className="text-white" />
              </button>
              <p className="text-xs text-slate-400">
                Page {paginationData.page} of {paginationData.pageCount}
              </p>
              <button
                className={`bg-slate-400 p-1 rounded-md ${
                  paginationData.page == paginationData.pageCount &&
                  "opacity-30"
                }`}
                onClick={() => handlePagination("next")}
                disabled={paginationData.page == paginationData.pageCount}
              >
                <ChevronsRight className="text-white" />
              </button>
            </div>
          </div>
        ) : (
          <p>
            No course found for{" "}
            <span className="italic font-bold">"{searchValue}"</span>
          </p>
        )}
      </Suspense>
    </div>
  );
};

const SearchPageReturn = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default SearchPageReturn;
// export default SearchPage;
