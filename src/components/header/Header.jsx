"use client";
import React from "react";
import keenagile from "@/assets/keenagile.svg";
import Image from "next/image";
import SearchBar from "../searchBar/SearchBar";
import { HeaderOptions } from "../headerOptions/HeaderOptions";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 flex lg:gap-12 md:gap-10 gap-4 items-center py-2 lg:px-14 md:px-10 px-4">
      <Link href="/" className="lg:block hidden">
        <Image src={keenagile} width={140} alt="Keenagile" className="mt-2" />
      </Link>
      <SearchBar />
      <HeaderOptions />
    </header>
  );
};

export default Header;
