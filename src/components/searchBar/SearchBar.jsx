"use client";
import { BadgeAlert, CalendarDays, Languages, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SearchBar = () => {
  let [searchValue, setSearchValue] = useState("");
  let [showDropDown, setShowDropDown] = useState(false);
  let [loading, setLoading] = useState(false); // State to manage loading
  let [results, setResults] = useState([]); // Store the fetched results
  let [isFirstRender, setIsFirstRender] = useState(true); // To track first render
  let [debouncedValue, setDebouncedValue] = useState(searchValue); // For debouncing

  // Debouncing logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500); // Delay of 500ms (can be adjusted)

    // Cleanup function to clear the timeout if the user is still typing
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // API call effect (won't run on the first render)

  useEffect(() => {
    if (isFirstRender || debouncedValue === "") {
      setIsFirstRender(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
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

        const queryString = `${titleFilter}${
          tagFilter ? `&${tagFilter}` : ""
        }&pagination[page]=1&pagination[pageSize]=5&fields[0]=title&fields[1]=author&fields[2]=description&fields[3]=language&fields[4]=updatedAt&fields[5]=publishedAt&populate[baseImg][fields]=url&populate[tags][fields]=Tag`;

        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:1337"
          }/api/courses?${queryString}`
        );

        if (response.ok) {
          const data = await response.json();
          setResults(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [debouncedValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);

    // Show dropdown only when input is not empty
    if (e.target.value.trim() !== "") {
      setShowDropDown(true);
    } else {
      setShowDropDown(false); // Hide dropdown if input is empty
    }
  };

  // Hide dropdown on blur
  const handleBlur = () => {
    setTimeout(() => {
      setShowDropDown(false);
    }, 200); // Delay to allow click on dropdown items
  };

  // Handle pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchValue.trim() !== "") {
        // Redirect with page refresh
        window.location.href = `/courses/search?searchValue=${encodeURIComponent(
          searchValue
        )}`;
      }
    }
  };

  return (
    <div className="relative flex-1 flex items-center bg-white rounded-2xl pl-2">
      <Search width="22" height="22" stroke="gray" strokeWidth="2" />
      {/* Input field */}
      <input
        id="search"
        type="text"
        placeholder="Search for courses (use '#' as a prefix to use tags like- #bestseller )"
        value={searchValue}
        onChange={handleSearch}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown} // Add event listener for Enter key
        onFocus={() => setShowDropDown(true)} // Show dropdown when input is focused
        className="w-full py-2 pr-4 pl-2 rounded-2xl text-sm outline-none text-black"
      />
      {/* DropDown */}
      {showDropDown && (
        <div className="absolute bg-[#f7f9fa] w-full top-[120%] left-0 z-10 h-fit py-4 px-5 flex flex-col gap-y-3 shadow-2xl rounded-lg">
          {loading ? (
            // Loading skeleton
            <div className="flex flex-col gap-y-4">
              <div className="h-14 bg-gray-200 rounded animate-pulse" />
              <div className="h-14 bg-gray-200 rounded animate-pulse" />
              <div className="h-14 bg-gray-200 rounded animate-pulse" />
              <div className="h-14 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : results.length > 0 ? (
            // Render results
            results.map((el, index) => (
              <Link
                key={el.id}
                href={`/courses/${el.id}`}
                onClick={() => {
                  setShowDropDown(false);
                }}
                className="transition-all duration-300"
              >
                <div
                  key={index}
                  className="h-fit bg-white shadow-lg rounded-xl p-2 flex lg:flex-row flex-col"
                >
                  <div className="relative min-[1400px]:h-28 lg:min-h-28 min-h-28 min-[1400px]:w-2/12 lg:w-4/12 w-full">
                    <Image
                      src={
                        el.attributes.baseImg?.data?.attributes?.url?.includes(
                          "amazonaws"
                        )
                          ? el.attributes.baseImg.data.attributes.url
                          : `http:localhost:1337${el.attributes.baseImg?.data?.attributes?.url}`
                      }
                      alt={
                        el.attributes.baseImg?.data?.attributes
                          ?.alternativeText || "baseImg for the course"
                      }
                      layout="fill"
                      objectFit="cover"
                      priority={true}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="min-[1400px]:w-10/12 lg:w-8/12 w-full flex flex-col justify-evenly px-4">
                    <h3 className="line-clamp-1 lg:text-xl text-lg  font-bold">
                      {el.attributes.title}
                    </h3>
                    <p className="line-clamp-1 lg:text-sm text-xs text-[#2d2f31]">
                      {el.attributes.description}
                    </p>
                    <div className="lg:text-xs text-[10px]">
                      <div className="flex justify-between flex-wrap items-center">
                        <p className="">
                          Created By{" "}
                          <span className="text-purple-400 font-semibold">
                            {el.attributes.author}
                          </span>
                        </p>
                        <p className="flex items-center gap-x-3">
                          <Languages width={18} />
                          Language -{" "}
                          <span className="text-purple-400 font-semibold">
                            {el.attributes.language}
                          </span>
                        </p>
                        <p className="flex items-center gap-x-3">
                          <CalendarDays width={18} />
                          Created On{" "}
                          <span className="text-purple-400 font-semibold">
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
                          <span className="text-purple-400 font-semibold">
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
                    <div className="flex flex-wrap gap-x-4 text-xs gap-y-2">
                      {el.attributes.tags.data.map((el, index) => {
                        return (
                          <p
                            key={el.id}
                            className="lg:text-xs text-[10px] bg-gradient-to-r from-blue-500 to-green-400 rounded-full py-1 px-2 text-white"
                          >
                            {el.attributes.Tag}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
