"use client";
import { motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function BlogHero({ blogDetails }) {
    return (
        <section className="relative h-[65vh] min-h-125 w-full">
            <Image
                src={
                    process.env.NEXT_PUBLIC_SITE_URL +
                    blogDetails?.data?.featured_image
                }
                alt={
                    blogDetails?.data?.featured_image_alt ||
                    "image source failed"
                }
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-[#0f172a]/95" />

            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center">
                <div className="max-w-4xl text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex mt-20 items-center gap-2 text-sm text-gray-200">
                            <CalendarDays size={16} />
                            {blogDetails?.data?.published_at}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            {blogDetails?.data?.title}
                        </h1>

                        <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-3xl">
                            {blogDetails?.data?.excerpt}
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                                <Image
                                    src={
                                        process.env.NEXT_PUBLIC_SITE_URL +
                                        blogDetails?.data?.featured_image
                                    }
                                    alt={
                                        blogDetails?.data?.featured_image_alt ||
                                        "image source failed"
                                    }
                                    width={60}
                                    height={60}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div>
                                <h4 className="font-semibold text-lg">
                                    {blogDetails?.data?.author.name}
                                </h4>
                                <p className="text-gray-300 text-sm">
                                    Travel & Education Consultant
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
