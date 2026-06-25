"use client";
import Button from "@/components/button";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import { cardVariants, containerVariants } from "@/animation/animation";

export default function AboutHero({ heroData }) {
    const { section_title, settings, elements } = heroData[0];
    const { element_title, element_body, link_url } = elements[0];
    return (
        <div>
            <section className="bg-foreground">
                <section className="max-w-7xl overflow-x-hidden mx-auto md:py-20 md:pt-40 pt-30 px-4 xl:px-10 2xl:px-0 py-10 text-white flex flex-col lg:flex-row gap-5 items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        className="lg:w-7/12 lg:pr-10"
                    >
                        <motion.p
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            className="text-brand-muted mb-5 tracking-widest text-sm md:text-base uppercase bg-white/20 w-fit px-3 py-1 rounded-full"
                        >
                            {section_title}
                        </motion.p>
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            className="text-lg text-brand-secondary prose max-w-none prose-p:my-0"
                            dangerouslySetInnerHTML={{
                                __html: element_body,
                            }}
                        />
                        <motion.div
                            initial={{
                                x: -150,
                                opacity: 0,
                            }}
                            whileInView={{
                                x: 3,
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                        >
                            <Button url={"study-abroad"}>Discover More</Button>
                        </motion.div>
                    </motion.div>
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
                            duration: 0.5,
                        }}
                        className="lg:w-5/12 overflow-hidden rounded-3xl h-150 border-3 border-brand-accent "
                    >
                        <Image
                            src={settings.section_image}
                            alt="about company"
                            className="h-full object-cover"
                            height={1000}
                            width={1000}
                        />
                    </motion.div>
                </section>
            </section>
        </div>
    );
}
