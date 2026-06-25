"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    GraduationCap,
    HeartPulse,
    ShieldCheck,
    Plane,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import InsuranceProtectionModal from "@/components/insuranceProtectionModal";

const heroSlides = [
    {
        id: 1,
        title: "International Student Insurance",
        subtitle:
            "Affordable worldwide protection for international students studying abroad.",
        image: "/air-tickets/insurance/health-insurance.webp",
        icon: GraduationCap,
    },
    {
        id: 2,
        title: "Medical Travel Insurance",
        subtitle:
            "Secure medical coverage and emergency assistance during your international journey.",
        image: "/air-tickets/insurance/health-insurance-2.webp",
        icon: HeartPulse,
    },
    {
        id: 3,
        title: "Global Health Protection",
        subtitle:
            "Travel confidently with complete health and accident coverage worldwide.",
        image: "/air-tickets/insurance/student-insurance.webp",
        icon: ShieldCheck,
    },
    {
        id: 4,
        title: "Tourist & Holiday Insurance",
        subtitle:
            "Protect your trip against emergencies, delays, and unexpected travel situations.",
        image: "/air-tickets/insurance/student-insurance-2.webp",
        icon: Plane,
    },
    {
        id: 5,
        title: "Tourist & Holiday Insurance",
        subtitle:
            "Protect your trip against emergencies, delays, and unexpected travel situations.",
        image: "/air-tickets/insurance/student-insurance-2.webp",
        icon: Plane,
    },
    {
        id: 6,
        title: "Tourist & Holiday Insurance",
        subtitle:
            "Protect your trip against emergencies, delays, and unexpected travel situations.",
        image: "/air-tickets/insurance/health-insurance-2.webp",
        icon: Plane,
    },
];

const getInsuranceType = (title) => {
    if (title.toLowerCase().includes("student")) {
        return "Student Health Insurance";
    }

    if (title.toLowerCase().includes("travel")) {
        return "Travel Health Insurance";
    }

    return "Health Insurance";
};

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);
    const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);

    useEffect(() => {
        if (isInsuranceModalOpen) return;

        const timer = setInterval(() => {
            setCurrent((prev) =>
                prev === heroSlides.length - 1 ? 0 : prev + 1,
            );
        }, 6000);
        return () => clearInterval(timer);
    }, [isInsuranceModalOpen]);

    const nextSlide = () => {
        if (isInsuranceModalOpen) return;
        setCurrent(current === heroSlides.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        if (isInsuranceModalOpen) return;
        setCurrent(current === 0 ? heroSlides.length - 1 : current - 1);
    };

    return (
        <div className="relative w-full min-h-170 sm:min-h-180 lg:min-h-190 overflow-x-hidden bg-gray-900">
            <AnimatePresence>
                <motion.div
                    key={current}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={heroSlides[current].image}
                            alt={heroSlides[current].title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent" />
                    </div>

                    <div className="absolute inset-0 left-0 sm:left-20 md:left-40 flex items-center px-6 sm:px-8 md:px-20">
                        <div className="max-w-2xl text-white">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
                            >
                                <div className="p-2 sm:p-3 bg-brand-primary rounded-full">
                                    {React.createElement(
                                        heroSlides[current].icon,
                                        { size: 18 },
                                    )}
                                </div>
                                <span className="text-brand-contrast font-semibold tracking-wider uppercase text-xs sm:text-sm">
                                    Insurance Solutions
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4"
                            >
                                {heroSlides[current].title}
                            </motion.h1>

                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8"
                            >
                                {heroSlides[current].subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsInsuranceModalOpen(true)
                                    }
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-primary px-5 sm:px-6 py-2 sm:py-3 font-medium text-sm sm:text-base text-white transition-colors hover:bg-brand-accent"
                                >
                                    Get Protected Now
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <InsuranceProtectionModal
                hideTrigger
                open={isInsuranceModalOpen}
                onOpenChange={setIsInsuranceModalOpen}
                defaultInsuranceType={getInsuranceType(
                    heroSlides[current].title,
                )}
            />

            <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all z-10"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all z-10"
            >
                <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-3">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        disabled={isInsuranceModalOpen}
                        onClick={() => setCurrent(index)}
                        className={`h-2 transition-all rounded-full ${
                            current === index
                                ? "w-8 bg-brand-primary"
                                : "w-2 bg-white"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
