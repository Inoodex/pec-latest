"use client";

import React from "react";
import StudyAbroadRequirements from "@/sections/study-abroad/studyAbroadRequirements";
import TuitionTable from "@/sections/study-abroad/tuitionTable";
import CostTable from "@/sections/study-abroad/costTable";
import Multipurpose from "@/components/multipurpose";
import Heading from "@/components/heading";
import Image from "next/image";
import { Check, X, ShieldCheck, AlertTriangle, Award, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import Button from "@/components/button";

// --- OVERVIEW COMPONENT ---
const PromotionalOverview = ({ reason }) => {
    if (!reason) return null;
    const { section_title, section_description, settings = {} } = reason;

    return (
        <div className="w-full flex items-start justify-center bg-foreground pt-32 pb-10 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl">
                <Heading
                    title={section_title}
                    color={true}
                    subtitle={settings?.subtitle}
                />
                <div className="flex flex-col md:flex-row items-center gap-8 mt-10">
                    <div
                        className="text-white md:w-7/12 w-full text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: section_description,
                        }}
                    />
                    <div className="md:w-5/12 w-full">
                        <Image
                            src={settings?.section_image || "/study_abroad/study-bg.webp"}
                            className="rounded-2xl shadow-2xl w-full h-auto"
                            alt={section_title || "Overview"}
                            height={800}
                            width={1200}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SCHOLARSHIP CARD COMPONENT ---
const ScholarshipCard = ({ feature, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="p-6 md:p-8 rounded-3xl w-full
                        bg-linear-to-br from-white to-gray-50
                        border border-gray-200
                        shadow-md hover:shadow-xl
                        transition-all duration-300
                        relative overflow-hidden"
        >
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
                {feature.element_title}
            </h3>
            <div className="w-16 h-1 bg-brand-primary rounded-full mb-6" />
            {feature.element_body && (
                <div
                    className="text-slate-700 leading-relaxed text-md space-y-2
                               [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
                               [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4
                               [&_li]:text-slate-600 [&_strong]:text-slate-900"
                    dangerouslySetInnerHTML={{ __html: feature.element_body }}
                />
            )}
        </motion.div>
    );
};

// --- SCHOLARSHIP COMPONENT ---
const PromotionalScholarships = ({ scholar }) => {
    if (!scholar) return null;
    const { section_title, section_description, elements = [] } = scholar;

    return (
        <section className="bg-foreground md:py-20 py-10 px-4 2xl:px-0">
            <div className="max-w-7xl mx-auto">
                <Heading
                    title={section_title || "Scholarship Opportunities"}
                    paragraph={section_description}
                    color={true}
                />

                {elements.length > 0 && (
                    <div className="grid gap-6 grid-cols-1">
                        {elements.map((feature, index) => (
                            <ScholarshipCard key={index} feature={feature} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function PromotionalSection({ studyAbroad }) {
    const { blocks, academicBlock, englishBlock, mark, englishScores, tuition, cost, scholar, jobs } = studyAbroad || {};

    return (
        <section className="overflow-x-hidden">
            <PromotionalOverview reason={blocks?.[0]} />
            {(academicBlock || englishBlock) && (
                <StudyAbroadRequirements
                    academicBlock={academicBlock}
                    englishBlock={englishBlock}
                    mark={mark}
                    englishScores={englishScores}
                />
            )}
            {tuition && <TuitionTable tuition={tuition} />}
            {cost && <CostTable cost={cost} countryName={studyAbroad?.countryName} />}
            <PromotionalScholarships scholar={scholar} />
            {jobs && <Multipurpose data={jobs} />}
        </section>
    );
}
