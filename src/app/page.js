import { Inter } from "next/font/google";
import HeroSection from "@/components/homePage/heroSection/HeroSection";
import Introduction from "@/components/homePage/introduction/Introduction";
import Courses from "@/components/homePage/courses/CoursesComponent";

export default function Home() {
  return (
    <div className="px-4 md:px-10 lg:px-44">
      {/* Hero section */}
      <HeroSection />

      {/* Courses section */}
      <Courses />
      {/* Introduction section */}
      <Introduction />
    </div>
  );
}
