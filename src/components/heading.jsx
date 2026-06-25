"use client";
import { motion } from "motion/react";
import { containerVariants, cardVariants } from "@/animation/animation";

const Heading = ({
    title = "",
    highlight = "",
    subtitle = "",
    paragraph = "",
    color = true,
}) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="mb-5"
        >
            {subtitle && (
                <motion.p
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    className={`${color ? "text-brand-contrast bg-brand-primary" : "text-brand-primary"} uppercase bg-black/10 w-fit mx-auto px-4 py-2 rounded-full tracking-widest text-sm font-bold`}
                >
                    {subtitle}
                </motion.p>
            )}
            {title && (
                <motion.h1
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    className={`md:text-5xl ${color ? "text-white" : "text-brand-primary"} text-center text-4xl w-full lg:w-200 mx-auto font-semibold md:leading-15 leading-12 my-5`}
                >
                    {title}{" "}
                    {highlight && (
                        <span
                            className={`bg-brand-accent text-brand-contrast px-2 rounded-md`}
                        >
                            {highlight}
                        </span>
                    )}
                </motion.h1>
            )}
            {paragraph && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`
      prose 
      prose-lg 
      max-w-none 
      text-center
      w-full 
      px-6 
      lg:w-220 
      mx-auto 
      leading-relaxed
      ${color ? "prose-invert text-gray-400" : "text-gray-600"}
    `}
                    dangerouslySetInnerHTML={{
                        __html: paragraph,
                    }}
                />
            )}
        </motion.div>
    );
};

export default Heading;
