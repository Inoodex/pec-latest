"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import AirTicketBookingModal from "@/components/airTicketBookingModal";

const variants = {
    enter: (direction) => ({
        x: direction > 0 ? "100%" : "-100%",
        scale: 3,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        scale: 1,
        opacity: 1,
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? "100%" : "-100%",
        scale: 0.5,
        opacity: 0,
    }),
};

export default function SmoothSlider({ data }) {
    const images =
        data?.elements?.map((el, idx) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/storage/${el.image_paths?.[idx]}`,
        })) || [];

    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = Math.abs(page % (images.length || 1));

    const paginate = useCallback(
        (newDirection) => {
            setPage([page + newDirection, newDirection]);
        },
        [page],
    );

    useEffect(() => {
        if (images.length === 0) return;
        const timer = setInterval(() => paginate(1), 6000);
        return () => clearInterval(timer);
    }, [paginate, images]);

    const content = data?.elements?.[0] || {};

    return (
        <section className="">
            <main className="relative w-full min-h-170 sm:min-h-180 lg:min-h-190 overflow-hidden bg-neutral-950">
                <div className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-4 sm:px-6 lg:px-12">
                    <div className="relative mx-auto w-full max-w-xl lg:max-w-2xl rounded-2xl bg-white/5 p-4 text-center backdrop-blur-[1px] sm:p-5 md:mx-0 md:left-18 md:text-left lg:ml-28">
                        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                            {content.element_title ||
                                "Explore The World With PECEDU Global"}
                        </h1>
                        <div
                            className="my-4 text-base text-white sm:my-5 sm:text-lg"
                            dangerouslySetInnerHTML={{
                                __html:
                                    content.element_body ||
                                    "From dream vacations to study abroad journeys, PEC Edu Global helps you explore the world with confidence, comfort, and expert guidance.",
                            }}
                        />
                        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <AirTicketBookingModal />
                        </div>
                    </div>
                </div>
                <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="popLayout"
                >
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: {
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                mass: 0.8,
                            },
                            scale: {
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            },
                            opacity: { duration: 0.4 },
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={images[imageIndex]?.url || "/placeholder.jpg"}
                            fill
                            className="w-full h-full object-cover opacity-50 select-none"
                            alt="Slider visual"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60" />
                    </motion.div>
                </AnimatePresence>

                <nav className="absolute inset-0 z-20 flex items-center justify-between px-0 md:px-4 pointer-events-none">
                    <button
                        className="pointer-events-auto group md:p-3 p-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft
                            className="text-white/70 group-hover:text-white transition-colors"
                            size={32}
                        />
                    </button>
                    <button
                        className="pointer-events-auto group md:p-3 p-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight
                            className="text-white/70 group-hover:text-white transition-colors"
                            size={32}
                        />
                    </button>
                </nav>

                <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center items-end gap-3 h-1">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() =>
                                setPage([i, i > imageIndex ? 1 : -1])
                            }
                            className="relative h-full bg-white/20 rounded-full overflow-hidden transition-all duration-500"
                            style={{
                                width: imageIndex === i ? "60px" : "30px",
                            }}
                        >
                            {imageIndex === i && (
                                <motion.div
                                    layoutId="activeProgress"
                                    className="absolute inset-0 bg-white"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: 0 }}
                                    transition={{
                                        duration: 6,
                                        ease: "linear",
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </main>
        </section>
    );
}
