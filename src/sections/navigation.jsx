"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import QuickLink from "@/components/quickList";

const Navigation = ({ textSlides }) => {
    const [isPaused, setIsPaused] = useState(false);
    return (
        <section className="bg-foreground overflow-hidden">
            <div className="relative flex overflow-hidden py-3 border-y border-black/5">
                <motion.div
                    className="flex gap-12 flex-nowrap w-fit cursor-pointer"
                    animate={
                        isPaused ? { x: undefined } : { x: ["0%", "-50%"] }
                    }
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
                    <div className="flex flex-nowrap gap-2">
                        {[1, 2].map((partner, idx) => (
                            <QuickLink
                                key={idx}
                                partner={partner}
                                blocks={textSlides.blocks}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Navigation;
