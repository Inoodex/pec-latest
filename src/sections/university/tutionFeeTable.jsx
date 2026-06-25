"use client";

import { motion } from "motion/react";
import {
    GraduationCap,
    PoundSterling,
    Clock,
    ClipboardList,
    Languages,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { useState } from "react";

const courses = [
    {
        name: "MRes Public Health",
        fee: "£19,500",
        duration: "1-year program",
        requirements: [
            "Equivalent qualification in a relevant subject (e.g., Public Health, Health and Social Care, or other related subject)",
            "3-5 years of experience",
        ],
        english: [
            { label: "IELTS", value: "6.5/6" },
            { label: "PTE", value: "65/59" },
            { label: "OIETC", value: "7/6" },
            { label: "TOEFL", value: "79/21" },
        ],
    },
    {
        name: "MRes International Relations",
        fee: "£19,500",
        duration: "1-year program",
        requirements: ["Students from any background can apply"],
        english: [
            { label: "IELTS", value: "6.5/6" },
            { label: "PTE", value: "65/59" },
            { label: "OIETC", value: "7/6" },
            { label: "TOEFL", value: "79/21" },
        ],
    },
    {
        name: "MRes Business Management",
        fee: "£19,500",
        duration: "1-year program",
        requirements: ["Equivalent qualification"],
        english: [
            { label: "IELTS", value: "6.5/6" },
            { label: "PTE", value: "65/59" },
            { label: "OIETC", value: "7/6" },
            { label: "TOEFL", value: "79/21" },
        ],
    },
    {
        name: "MRes Artificial Intelligence",
        fee: "£19,500",
        duration: "1-year program",
        requirements: ["3 years of relevant work experience"],
        english: [
            { label: "IELTS", value: "6.5/6" },
            { label: "PTE", value: "65/59" },
            { label: "OIETC", value: "7/6" },
            { label: "TOEFL", value: "79/21" },
        ],
    },
];

const colHeaders = [
    { label: "Course", icon: GraduationCap },
    { label: "Tuition Fee", icon: PoundSterling },
    { label: "Duration", icon: Clock },
    { label: "Requirements", icon: ClipboardList },
    { label: "English Requirements", icon: Languages },
];

function MobileCard({ course, index }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.08,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-4 text-left"
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0d6db7]/10 flex items-center justify-center shrink-0">
                        <GraduationCap size={17} className="text-[#0d6db7]" />
                    </div>
                    <div>
                        <p className="text-[14px] font-bold text-[#1a5c38] leading-tight">
                            {course.name}
                        </p>
                        <p className="text-[12px] text-gray-400 mt-0.5">
                            {course.fee} · {course.duration}
                        </p>
                    </div>
                </div>
                {open ? (
                    <ChevronUp size={16} className="text-gray-400 shrink-0" />
                ) : (
                    <ChevronDown size={16} className="text-gray-400 shrink-0" />
                )}
            </button>

            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-gray-100 px-4 py-4 space-y-4"
                >
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <ClipboardList size={12} /> Requirements
                        </p>
                        <ul className="space-y-1.5">
                            {course.requirements.map((r, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-[13px] text-gray-600"
                                >
                                    <CheckCircle2
                                        size={13}
                                        className="text-[#1a5c38] shrink-0 mt-0.5"
                                    />
                                    {r}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {course.english && course.english.length > 0 && (
                        <div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Languages size={12} /> English Requirements
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                {course.english.map((e) => (
                                    <div
                                        key={e.label}
                                        className="bg-[#f4f7f4] rounded-xl px-3 py-2"
                                    >
                                        <p className="text-[11px] font-bold text-[#1a5c38]">
                                            {e.label}
                                        </p>
                                        <p className="text-[15px] font-extrabold text-gray-900">
                                            {e.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}

const parseResearchPrograms = (block) => {
    if (!block?.elements || block.elements.length === 0) return null;

    const allCourses = [];
    for (const el of block.elements) {
        const body = el.element_body || "";
        const trMatches = body.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
        const parsedRows = [];

        if (trMatches.length > 0) {
            for (const tr of trMatches) {
                if (tr.toLowerCase().includes("<th")) {
                    continue;
                }
                const tdMatches = tr.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
                if (tdMatches && tdMatches.length >= 3) {
                    const name = tdMatches[0]
                        .replace(/<[^>]*>/g, "")
                        .replace(/&nbsp;/g, " ")
                        .trim();
                    if (!name) continue;

                    const fee =
                        tdMatches[1]
                            .replace(/<[^>]*>/g, "")
                            .replace(/&nbsp;/g, " ")
                            .trim() || "Contact Us";
                    const duration =
                        tdMatches[2]
                            .replace(/<[^>]*>/g, "")
                            .replace(/&nbsp;/g, " ")
                            .trim() || "Variable";

                    let requirements = [];
                    if (tdMatches[3]) {
                        const reqCell = tdMatches[3];
                        const liMatches = reqCell.match(
                            /<li[^>]*>([\s\S]*?)<\/li>/gi,
                        );
                        if (liMatches && liMatches.length > 0) {
                            requirements = liMatches
                                .map((li) =>
                                    li
                                        .replace(/<[^>]*>/g, "")
                                        .replace(/&nbsp;/g, " ")
                                        .trim(),
                                )
                                .filter(Boolean);
                        } else {
                            const text = reqCell
                                .replace(/<[^>]*>/g, "")
                                .replace(/&nbsp;/g, " ")
                                .trim();
                            if (text) {
                                requirements = [text];
                            }
                        }
                    }

                    let english = [];
                    if (tdMatches[4]) {
                        const engCell = tdMatches[4];
                        const liMatches = engCell.match(
                            /<li[^>]*>([\s\S]*?)<\/li>/gi,
                        );
                        if (liMatches && liMatches.length > 0) {
                            english = liMatches
                                .map((li) => {
                                    const rawText = li
                                        .replace(/<[^>]*>/g, "")
                                        .replace(/&nbsp;/g, " ")
                                        .trim();
                                    const colonIndex = rawText.indexOf(":");
                                    if (colonIndex !== -1) {
                                        return {
                                            label: rawText
                                                .substring(0, colonIndex)
                                                .trim(),
                                            value: rawText
                                                .substring(colonIndex + 1)
                                                .trim(),
                                        };
                                    }
                                    const spaceIndex = rawText.search(/\s/);
                                    if (spaceIndex !== -1) {
                                        return {
                                            label: rawText
                                                .substring(0, spaceIndex)
                                                .trim(),
                                            value: rawText
                                                .substring(spaceIndex + 1)
                                                .trim(),
                                        };
                                    }
                                    return { label: rawText, value: "" };
                                })
                                .filter((e) => e.label);
                        } else {
                            const text = engCell
                                .replace(/<[^>]*>/g, "")
                                .replace(/&nbsp;/g, " ")
                                .trim();
                            if (text) {
                                english = [
                                    { label: "Requirements", value: text },
                                ];
                            }
                        }
                    }

                    parsedRows.push({
                        name,
                        fee,
                        duration,
                        requirements:
                            requirements.length > 0
                                ? requirements
                                : ["Contact Us"],
                        english: english.length > 0 ? english : [],
                    });
                }
            }
        }

        if (parsedRows.length === 0) {
            const cleanText = body
                .replace(/<[^>]*>/g, " ")
                .replace(/&nbsp;/g, " ")
                .trim();
            if (cleanText) {
                parsedRows.push({
                    name: el.element_title || "Research Program",
                    fee: "Contact Us",
                    duration: "Variable",
                    requirements: [cleanText],
                    english: [],
                });
            }
        }

        allCourses.push(...parsedRows);
    }
    return allCourses;
};

export default function TutionFeesTable({ researchBlock }) {
    const parsedCourses = researchBlock
        ? parseResearchPrograms(researchBlock)
        : null;
    const activeCourses =
        parsedCourses && parsedCourses.length > 0 ? parsedCourses : courses;
    const tableTitle =
        researchBlock?.section_title || "MRes (Master of Research)";

    return (
        <div className="bg-gray-100 px-3 sm:px-6 py-10 ">
            <div className="max-w-7xl mx-auto">
                <div className="rounded-t-2xl bg-foreground px-6 py-4 text-center">
                    <h1 className="text-white text-[18px] sm:text-[22px] font-extrabold tracking-tight flex items-center justify-center gap-2">
                        <GraduationCap size={22} className="opacity-90" />
                        {tableTitle}
                    </h1>
                </div>

                <div className="hidden md:block overflow-x-auto rounded-b-2xl ">
                    <table className="w-full border-collapse bg-white tablelayout-fixed">
                        <colgroup>
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "30%" }} />
                            <col style={{ width: "20%" }} />
                        </colgroup>
                        <thead>
                            <tr className="bg-brand-primary">
                                {colHeaders.map(({ label, icon: Icon }) => (
                                    <th
                                        key={label}
                                        className="text-white text-[13px] md:text-base font-bold px-4 py-3 text-left border-r border-brand-accent last:border-r-0"
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <Icon
                                                size={16}
                                                className="opacity-80"
                                            />
                                            {label}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {activeCourses.map((course, i) => (
                                <motion.tr
                                    key={course.name}
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.1 + i * 0.08,
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="border-b border-gray-100 last:border-b-0 hover:bg-[#f7faf7] transition-colors"
                                >
                                    <td className="px-4 py-5 border-r border-gray-100 align-top">
                                        <p className="text-[13px] md:text-base font-bold text-gray-800 leading-tight">
                                            {course.name}
                                        </p>
                                    </td>
                                    <td className="px-4 py-5 border-r border-gray-100 align-top">
                                        <p className="text-[13px] md:text-sm text-gray-600 font-semibold">
                                            {course.fee}
                                        </p>
                                    </td>
                                    <td className="px-4 py-5 border-r border-gray-100 align-top">
                                        <span className="inline-flex items-center gap-1 text-[12px] md:text-sm text-gray-600">
                                            {course.duration}
                                        </span>
                                    </td>
                                    <td className="px-4 py-5 border-r border-gray-100 align-top">
                                        <ul className="space-y-1.5">
                                            {course.requirements.map((r, j) => (
                                                <li
                                                    key={j}
                                                    className="flex items-start gap-2 text-[12px] md:text-sm text-gray-600 leading-snug"
                                                >
                                                    <CheckCircle2
                                                        size={16}
                                                        className="text-[#1a5c38] shrink-0 mt-0.5"
                                                    />
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-4 py-5 align-top">
                                        <ul className="space-y-1">
                                            {course.english.map((e) => (
                                                <li
                                                    key={e.label}
                                                    className="flex items-center gap-1.5 text-[12px] md:text-sm text-gray-600"
                                                >
                                                    <span className="w-10.5 font-bold text-[#0d6db7] text-[11px]">
                                                        {e.label}:
                                                    </span>
                                                    <span className="font-semibold text-gray-800">
                                                        {e.value}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="md:hidden space-y-3 mt-1">
                    {activeCourses.map((course, i) => (
                        <MobileCard
                            key={course.name}
                            course={course}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
