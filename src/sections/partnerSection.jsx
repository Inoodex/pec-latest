"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import Partner from "@/components/partner";
import Heading from "@/components/heading";

const PartnerSection = ({ partners = [] }) => {
  const [isPaused, setIsPaused] = useState(false);
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="md:py-20 py-10 bg-gray-100 overflow-hidden">
      <Heading
        subtitle="Trusted Partners"
        title="Some Top Ranked Global Universities We're Working with"
        highlight="Partners"
        color={false}
      />

      <div className="relative flex overflow-hidden py-3 mt-10 border-y border-black/5">
        <div className="absolute inset-y-0 left-0 w-40 lg:w-70 bg-linear-to-r from-gray-100 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 lg:w-70 bg-linear-to-l from-gray-100 to-transparent z-10" />

        <motion.div
          className="flex gap-12 flex-nowrap w-fit cursor-pointer"
          animate={isPaused ? { x: undefined } : { x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {doubledPartners.map((partner, idx) => (
            <Partner key={idx} partner={partner} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerSection;
