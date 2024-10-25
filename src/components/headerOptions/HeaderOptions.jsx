"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import User from "../user/User";
import { AlignJustify, X } from "lucide-react";
import keenagile from "@/assets/keenagile.svg";
import Image from "next/image";

export const HeaderOptions = () => {
  let [userId, setUserId] = useState();
  let [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setUserId(Cookies.get("userId"));
  }, []);
  Cookies.get("userId");

  return (
    <div>
      <div className="lg:flex hidden text-white items-center lg:gap-x-10 md:gap-x-8 gap-x-4 text-xs">
        <Link
          href="/courses"
          className="cursor-pointer hover:text-green-400  transition-all duration-300"
        >
          Courses
        </Link>
        {!userId ? (
          <>
            <Link
              href="/signin"
              className="cursor-pointer hover:text-green-400  transition-all duration-300"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/mylearnings"
              className="cursor-pointer hover:text-green-400  transition-all duration-300"
            >
              My Learnings
            </Link>
            <User />
          </>
        )}
      </div>
      {/* Small screen */}
      <div className="lg:hidden block s">
        <AlignJustify
          onClick={() => setShowOptions(true)}
          stroke="white"
          className="cursor-pointer"
        />
        {showOptions && (
          <div className="fixed top-0 z-50 right-0 bottom-0 w-full transition-all duration-500 bg-black/30 text-white backdrop-blur-md px-10 py-4">
            <div className="flex justify-between items-center">
              <Link href="/">
                <Image
                  src={keenagile}
                  width={100}
                  alt="Keenagile"
                  className="mt-2"
                />
              </Link>
              <X
                onClick={() => setShowOptions(false)}
                className=" ml-auto cursor-pointer"
                size={25}
              />
            </div>

            <div className="flex flex-col gap-y-7  mt-5">
              <div className="flex flex-col gap-y-3 text-xs">
                <Link
                  href="/"
                  onClick={() => setShowOptions(false)}
                  className="cursor-pointer hover:underline font-bold transition-all duration-300"
                >
                  Home
                </Link>
                <Link
                  href="/courses"
                  onClick={() => setShowOptions(false)}
                  className="cursor-pointer hover:underline font-bold transition-all duration-300"
                >
                  Courses
                </Link>
                {!userId ? (
                  <>
                    <Link
                      href="/signin"
                      onClick={() => setShowOptions(false)}
                      className="cursor-pointer hover:underline font-bold transition-all duration-300"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/mylearnings"
                      onClick={() => setShowOptions(false)}
                      className="cursor-pointer hover:underline font-bold transition-all duration-300"
                    >
                      My Learnings
                    </Link>
                  </>
                )}
              </div>
              <div className="">
                <User />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
