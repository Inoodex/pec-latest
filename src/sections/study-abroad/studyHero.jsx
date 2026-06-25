"use client";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import Button from "@/components/button";

const StudyHero = ({ studyAbroad }) => {
  const { section_title, section_description, settings } =
    studyAbroad?.blocks?.[0] || {};
  return (
    <section className="bg-gray-100">
      <section className="max-w-7xl mx-auto lg:pt-40 pt-30 lg:py-20 lg:px-6">
        <div className="text-center overflow-hidden relative w-full bg-white lg:p-2 shadow lg:rounded-4xl">
          <div className="md:w-140 lg:w-120 h-70 w-90 lg:h-120 lg:blur-[100px] blur-[70px] z-10 bg-linear-150 from-foreground to-orange-500 absolute -bottom-20 -translate-x-1/2 left-1/2 rotate-20" />
          <div className="absolute top-1/2 -translate-1/2 left-1/2 z-10 w-full">
            <div className="flex flex-col items-center justify-center">
              <motion.h1
                initial={{
                  y: 100,
                  opacity: 0,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                }}
                className="lg:text-7xl text-3xl px-10 xl:px-40 font-semibold mb-5 text-white"
              >
                {section_title}
              </motion.h1>
              <motion.div
                className="text-gray-100 md:mb-5 px-5 lg:px-60 md:text-lg text-sm font-light"
                dangerouslySetInnerHTML={{ __html: section_description }}
              />
              <motion.div
                initial={{
                  x: 100,
                  opacity: 0,
                }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                }}
              >
                <Button url={"apply-now"}>{`Let's`} Begin</Button>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{
              y: -300,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="w-full h-80 md:h-100 xl:h-160"
          >
            <Image
              src={settings?.section_image || "/study_abroad/study-bg.webp"}
              alt="study abroad"
              className="h-full w-full object-cover brightness-75 lg:rounded-[26px]"
              height={1000}
              width={1400}
            />
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default StudyHero;
