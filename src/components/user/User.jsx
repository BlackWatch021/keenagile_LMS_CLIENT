"use client";
import { UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Cookies from "js-cookie"; // Import js-cookie to manage cookies

const User = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const router = useRouter(); // Hook for navigation
  const [userId, setUserId] = useState();
  useEffect(() => {
    setUserId(Cookies.get("userId"));
  }, []);

  const handleLogout = async () => {
    // Delete access token cookie
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) {
        console.log("something went wrong, can't log out");
      }
      const data = await response.json();
      console.log({ data });
    } catch (error) {
      console.log({ error });
      throw new error(error);
    }
    setDropdownOpen(false);
    // router.push("/");
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return userId ? (
    <>
      <div className="lg:block hidden">
        <div className="relative">
          <div
            className="bg-white flex justify-center items-center rounded-full p-1 cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown on click
          >
            <UserRound stroke="rgb(31 41 55)" width={25} height={25} />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute z-50 right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout} // Logout option
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden flex flex-col text-xs">
        <button
          className="bg-red-500 rounded-xl font-light py-2"
          onClick={handleLogout} // Logout option
        >
          Logout
        </button>
      </div>
    </>
  ) : (
    <></>
  );
};

export default User;
