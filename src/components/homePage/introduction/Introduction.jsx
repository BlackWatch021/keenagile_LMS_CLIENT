import Image from "next/image";
import Link from "next/link";
import book2 from "@/assets/book2.svg";
import analysis from "@/assets/analysis.svg";
import courses from "@/assets/courses.svg";
import developer from "@/assets/developer.svg";
import startup from "@/assets/startup.svg";
import success from "@/assets/success.svg";
import workplace from "@/assets/workplace.svg";
import girlonlaptop from "@/assets/girlonlaptop.png";

const Introduction = () => {
  return (
    <section className=" mt-16 mb-20">
      <div className="flex flex-col-reverse lg:flex-row items-center my-20">
        <div className="lg:w-1/2 w-2/3 flex justify-center items-center mt-4">
          <Image
            src={girlonlaptop}
            width="800"
            height="800"
            alt="image holder"
          />
        </div>
        <div className="lg:w-1/2 lg:px-0 px-4 flex flex-col lg:justify-center lg:items-start items-center">
          <div className="w-full text-center">
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold font-serif">
              Welcome to Our Learning Platform
            </h1>
            <p className="md:text-[16px] text-sm mt-4">
              We offer a comprehensive range of courses, from programming to
              personal development, all designed to help you achieve your goals.
              Explore our offerings and start your learning journey today!
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row-reverse lg:gap-x-4 items-center my-20">
        <div className="lg:w-1/2 lg:mt-0 w-1/2 flex justify-center items-center mt-10">
          <Image src={analysis} width="600" height="600" alt="image holder" />
        </div>
        <div className="lg:w-1/2 lg:px-0 px-4 flex flex-col lg:justify-center lg:items-start items-center">
          <div className="w-full text-center">
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold font-serif">
              Start Your Learning Journey Today
            </h1>
            <p className="md:text-[16px] text-sm mt-4 tracking-wide">
              Unlock your potential with our comprehensive courses. Whether
              you/'re looking to advance your career or explore a new passion,
              we have something for everyone. Join our community and get started
              on your path to success.
            </p>
            <div className="flex justify-center max-[767px]:items-center md:mt-10 mt-5 gap-x-10">
              <Link
                href="/signin"
                className="cursor-pointer relative font-medium -top-1 -left-1 hover:top-0 hover:left-0 transition-all bg-green-400 rounded-sm md:py-2.5 md:px-8 py-2.5 px-6 md:text-md text-sm uppercase text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:border-2 before:rounded-sm before:border-green-400 before:-z-10 before:transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="cursor-pointer relative font-medium -top-1 -left-1 hover:top-0 hover:left-0 transition-all bg-blue-400 rounded-sm md:py-2.5 md:px-8 py-2.5 px-6 md:text-md text-sm uppercase text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:border-2 before:rounded-sm before:border-blue-400 before:-z-10 before:transition-all"
              >
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
