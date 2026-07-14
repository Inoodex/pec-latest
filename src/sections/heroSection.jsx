"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ConsultBookingModal from "@/components/consultBookingModal";

const SLIDE_CHANGE_INTERVAL = 5000;

const getSortOrder = (slide, fallback) => {
    const sortOrder = Number(slide?.sort_order);
    return Number.isNaN(sortOrder) ? fallback : sortOrder;
};

const HeroAnimation = ({ hero_sliders }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const sortedSlides = useMemo(
        () =>
            (Array.isArray(hero_sliders) ? hero_sliders : [])
                .map((slide, index) => ({ slide, index }))
                .sort(
                    (a, b) =>
                        getSortOrder(a.slide, a.index) -
                        getSortOrder(b.slide, b.index),
                )
                .map(({ slide }) => slide),
        [hero_sliders],
    );
    const displaySlideIndex = sortedSlides.length
        ? currentSlideIndex % sortedSlides.length
        : 0;

    const baseSlide = sortedSlides[0] || {};
    const activeTextSlide = sortedSlides[displaySlideIndex] || baseSlide;
    const { floating_images, button_text } = baseSlide;
    const { title, subtitle } = activeTextSlide;
    const logos = floating_images || [];

    useEffect(() => {
        if (sortedSlides.length <= 1) return;

        const slideTimer = setInterval(() => {
            setCurrentSlideIndex((prev) => (prev + 1) % sortedSlides.length);
        }, SLIDE_CHANGE_INTERVAL);

        return () => clearInterval(slideTimer);
    }, [sortedSlides.length]);

    return (
        <section className="px-4 overflow-hidden lg:h-200 py-10 md:py-20 lg:py-0 bg-[url(/images/hero-background.webp)] xl:bg-left bg-left bg-no-repeat relative bg-cover flex items-center">
            <div className="absolute inset-0 bg-black/40"></div>

            <section className="relative flex flex-col-reverse lg:items-center lg:flex-row max-w-7xl mx-auto justify-between gap-10 w-full z-10">
                {/* Left column – wheel + stand + logos */}
                <section className="relative w-full lg:w-6/12 h-[400px] md:h-[500px] lg:h-[700px] xl:h-[750px] 2xl:h-[800px]">

                    {/* Stand – behind everything (z-0), bottom-anchored */}
                    <div className="absolute z-0 left-1/2 -translate-x-1/2 bottom-0 w-[340px] md:w-[480px] lg:w-[580px] 2xl:w-[620px] opacity-80 lg:opacity-100">
                        <Image
                            src={"/images/bg-stand.webp"}
                            width={840}
                            height={500}
                            alt={"bg-stand"}
                            className="brightness-[0.6] w-full"
                        />
                    </div>

                    {/* Wheel – in front of stand (z-10), center-anchored */}
                    <div className="absolute z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 top-[50%] md:top-[47%] lg:top-[52%] xl:top-[54%] 2xl:top-[54%] w-[360px] md:w-[480px] lg:w-[600px] 2xl:w-[640px] animate-spin-slow opacity-80 lg:opacity-100">
                        <Image
                            src={"/images/london-wheel.png"}
                            width={800}
                            height={800}
                            alt={"london-wheel"}
                        />
                    </div>

                    {/* Logos – on top of wheel (z-20), same center as wheel */}
                    <div className="absolute z-20 left-1/2 -translate-x-1/2 -translate-y-1/2 top-[50%] md:top-[47%] lg:top-[52%] xl:top-[54%] 2xl:top-[54%] w-[360px] md:w-[480px] lg:w-[600px] 2xl:w-[640px] aspect-square flex items-center justify-center animate-spin-slow hover:[animation-play-state:paused] group">
                        {logos.map((logo, index) => {
                            const rotationAngle =
                                (index * 360) / logos.length;
                            return (
                                <div
                                    key={index}
                                    className="absolute"
                                    style={{
                                        transform: `rotate(${rotationAngle}deg) translateY(var(--logo-radius)) rotate(-${rotationAngle}deg)`,
                                    }}
                                >
                                    <div className="animate-spin-reverse bg-white rounded-md flex items-center justify-center w-16 h-12 md:w-20 md:h-14 lg:w-24 lg:h-16 shadow-lg group-hover:[animation-play-state:paused] p-1">
                                        <Image
                                            src={
                                                process.env
                                                    .NEXT_PUBLIC_SITE_URL +
                                                logo
                                            }
                                            width={80}
                                            height={40}
                                            alt={`Logo ${index}`}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Right column – text + CTA */}
                <section className="z-10 text-center w-full lg:w-6/12 lg:text-left mt-20 lg:mt-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={
                                activeTextSlide.id ||
                                activeTextSlide.sort_order ||
                                displaySlideIndex
                            }
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -18 }}
                            transition={{ duration: 0.45, ease: "easeInOut" }}
                        >
                            <div>
                                <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight lg:leading-[1.2]">
                                    {title}
                                </h1>
                                <div className="flex justify-center lg:justify-start">
                                    <Image
                                        src={"/images/line.gif"}
                                        height={100}
                                        width={200}
                                        alt={"line.gif"}
                                        className="w-37.5 lg:w-75"
                                    />
                                </div>
                            </div>
                            <p className="text-white text-lg md:text-xl mt-5 max-w-md mx-auto lg:mx-0">
                                {subtitle}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="lg:mt-8 mt-0 flex justify-center lg:justify-start"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-brand-primary text-white px-6 py-3 mt-5 lg:mt-0 rounded-full cursor-pointer hover:scale-105 duration-300 hover:bg-brand-accent hover:text-white"
                        >
                            {button_text || "Get Appointment"}
                        </button>
                    </motion.div>
                </section>
            </section>

            <ConsultBookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default HeroAnimation;