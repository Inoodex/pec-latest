"use client";
import Link from "next/link";

const AboutNavigation = () => {
  return (
    <section className="w-full flex justify-center">
      <section className="bg-linear-to-t from-[#086450ad] to-[#0d9c7de3] py-2.5 shadow-lg px-3 w-fit rounded-full flex gap-3 justify-center ">
        <Link
          href={"/blogs"}
          className="flex items-center group gap-2 bg-white px-1.5 pr-7 rounded-full py-1.5"
        >
          <p className="w-10 h-10 not-hover:bg-[#0d9c7de3] group-hover:bg-[#0d9c7de3] bg-[#0d9c7de3]/50 duration-200 rounded-full"></p>
          Blogs
        </Link>
        <Link
          href={"/universities"}
          className="flex items-center group gap-2 bg-white px-1.5 pr-7 rounded-full py-1.5"
        >
          <p className="w-10 h-10 group-hover:bg-[#0d9c7de3] bg-[#0d9c7de3]/50 duration-200 rounded-full"></p>
          Popular University
        </Link>
        <Link
          href={"/counselling"}
          className="flex items-center group gap-2 bg-white px-1.5 pr-7 rounded-full py-1.5"
        >
          <p className="w-10 h-10 group-hover:bg-[#0d9c7de3] bg-[#0d9c7de3]/50 duration-200 rounded-full"></p>
          Free Counselling
        </Link>
        <Link
          href={"/tools"}
          className="flex items-center group gap-2 bg-white px-1.5 pr-7 rounded-full py-1.5"
        >
          <p className="w-10 h-10 group-hover:bg-[#0d9c7de3] bg-[#0d9c7de3]/50 duration-200 rounded-full"></p>
          Popular Tools
        </Link>
        <Link
          href={"/mock-test"}
          className="flex items-center group gap-2 bg-white px-1.5 pr-7 rounded-full py-1.5"
        >
          <p className="w-10 h-10 group-hover:bg-[#0d9c7de3] bg-[#0d9c7de3]/50 duration-200 rounded-full"></p>
          Free Mock Test
        </Link>
      </section>
    </section>
  );
};

export default AboutNavigation;
