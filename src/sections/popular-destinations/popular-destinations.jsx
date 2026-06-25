"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Button from "@/components/button";

export default function PopularDestinationsHero({ heroBlock }) {
    const { elements } = heroBlock || {};

    return (
        <section>
            {elements?.map((element) => (
                <section
                    key={element.id}
                    className="relative w-full h-[90vh] md:h-200 flex items-center justify-center text-white overflow-hidden"
                >
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={
                                element?.image_paths?.[0]
                                    ? `${process.env.NEXT_PUBLIC_SITE_URL}/storage/${element.image_paths[0]}`
                                    : "/placeholder-hero.webp"
                            }
                            alt={element.element_title || "Hero Image"}
                            fill
                            priority
                            className="object-cover object-center brightness-[0.65] transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-slate-950/20 to-slate-950/60 pointer-events-none" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6 md:space-y-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-linear-to-b from-white to-slate-200"
                        >
                            {element.element_title}
                        </motion.h1>

                        {element.element_body && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-slate-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl"
                                dangerouslySetInnerHTML={{
                                    __html: element.element_body,
                                }}
                            />
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="pt-2"
                        >
                            <Button url={"apply-now"}>
                                Get Free Assessment
                            </Button>
                        </motion.div>
                    </div>
                </section>
            ))}
        </section>
    );
}
