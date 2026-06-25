"use client";
import { motion } from "motion/react";
import { BsStarFill } from "react-icons/bs";

const sparkOneVariants = {
  animate: {
    scale: [0.5, 0.75, 1, 0.5, 0],
    y: [-100, -50, 0, 25, 50],
    opacity: [0, 1, 1, 1, 0],
  },
};

const sparkTwoVariants = {
  animate: {
    scale: [0.5, 1, 1, 0.5, 0],
    y: [-100, -50, 0, 25, 50],
    x: [-50, -25, -12, 0, 12],
    rotate: [-10, -5, 0, 5, 10],
    opacity: [0, 1, 1, 1, 0],
  },
};

const sparkThreeVariants = {
  animate: {
    scale: [0.5, 1, 1, 0.5, 0],
    y: [-100, -50, 0, 25, 50],
    x: [50, 25, 12, 0, -12],
    rotate: [10, 5, 0, -5, -10],
    opacity: [0, 1, 1, 1, 0],
  },
};

const transition = (delay) => ({
  duration: 1,
  ease: "linear",
  repeat: Infinity,
  delay,
  times: [0, 0.25, 0.5, 0.75, 1],
});

export default function Loading() {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 w-full h-full"
          variants={sparkOneVariants}
          animate="animate"
          transition={transition(0)}
        >
          <BsStarFill size={30} />
        </motion.div>

        <motion.div
          className="absolute inset-0 w-full h-full"
          variants={sparkTwoVariants}
          animate="animate"
          transition={transition(0.3)}
          style={{ opacity: 0 }}
        >
          <BsStarFill size={30} />
        </motion.div>

        <motion.div
          className="absolute inset-0 w-full h-full"
          variants={sparkThreeVariants}
          animate="animate"
          transition={transition(0.6)}
          style={{ opacity: 0 }}
        >
          <BsStarFill size={30} />
        </motion.div>
      </div>
    </section>
  );
}
