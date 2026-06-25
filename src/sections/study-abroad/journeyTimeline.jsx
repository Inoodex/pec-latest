"use client";

import { motion } from "motion/react";
import {
    PlaneTakeoff,
    TextSelect,
    HeartHandshake,
    Zap,
    BookOpenText,
    Search,
} from "lucide-react";
import Heading from "@/components/heading";

const timelineSteps = [
    {
        icon: <TextSelect className="size-8" stroke="#FFF" />,
    },
    {
        icon: <Zap className="size-8" stroke="#FFF" />,
    },
    {
        icon: <Search className="size-8" stroke="#FFF" />,
    },
    {
        icon: <BookOpenText className="size-8" stroke="#FFF" />,
    },

    {
        icon: <HeartHandshake className="size-8" stroke="#FFF" />,
    },
    {
        icon: <PlaneTakeoff className="size-8" stroke="#FFF" />,
    },
];

const StudyAbroadTimeline = ({ timeline }) => {
    const { section_title, section_description } = timeline || {};
    const mergedTimeline =
        timeline?.elements?.map((item, index) => ({
            ...item,
            ...timelineSteps[index],
        })) || [];
    return (
        <section className="bg-foreground md:py-20 py-10 px-4 xl:px-0">
            <div className="max-w-5xl mx-auto space-y-16">
                <Heading
                    paragraph={section_description}
                    title={section_title}
                />

                <div className="relative pl-10 mt-10 md:pl-20 space-y-12">
                    <div className="border-l absolute bg-brand-accent left-5 h-[calc(100%-100px)] w-1" />
                    {mergedTimeline.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                            }}
                            className="relative flex items-start gap-6 md:gap-10"
                        >
                            <div
                                className={`absolute -left-8 md:-left-21 top-0 flex items-center justify-center size-7 p-1.5 md:size-13 rounded-full bg-brand-accent shadow-lg text-${step.color}-600 bg-${step.color}-50`}
                            >
                                {step.icon}
                                <div
                                    className={`absolute hidden md:flex bottom-2 left-15 items-center justify-center size-6 rounded-full bg-${step.color}-600 text-white font-black text-sm md:text-base`}
                                >
                                    {index + 1}
                                </div>
                            </div>

                            <div
                                className={`bg-white md:p-8 p-5 rounded-2xl shadow-sm border border-gray-100 flex-1 hover:shadow-lg transition-all duration-300 w-full`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1">
                                    <h3 className="md:text-2xl text-xl font-bold text-brand-primary">
                                        {step.element_title}
                                    </h3>
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: step.element_body,
                                    }}
                                    className={`text-base text-gray-700`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudyAbroadTimeline;
