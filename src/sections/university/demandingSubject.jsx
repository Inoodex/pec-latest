"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Megaphone,
    Calculator,
    HeartPulse,
    Rocket,
    Scale,
    Cpu,
    Stethoscope,
    Building2,
    Globe,
    Microscope,
    FlaskConical,
} from "lucide-react";

const courses = [
    {
        icon: Megaphone,
        title: "BA (Hons) Business and Marketing Management",
        description:
            "This course is placed 6th in the UK for Business and Management courses (The Guardian University Guide 2025). The BA prepares students for dynamic careers in marketing and management.",
        level: "Undergraduate",
    },
    {
        icon: Calculator,
        title: "BA (Hons) Business and Accounting",
        description:
            "Placed 6th in the UK for Business and Management courses (The Guardian University Guide 2025). The course combines financial expertise with business acumen.",
        level: "Undergraduate",
    },
    {
        icon: HeartPulse,
        title: "BNurs (Hons) Children's Nursing",
        description:
            "Ranked 21st in the UK for Children's Nursing (The Guardian University Guide rankings, 2025) and recognised by the Nursing and Midwifery Council.",
        level: "Undergraduate",
    },
    {
        icon: Rocket,
        title: "BEng (Hons) Aerospace Engineering",
        description:
            "The course is accredited by the Institution of Mechanical Engineers (IMechE) and currently under review for re-accreditation. Students gain hands-on experience.",
        level: "Undergraduate",
    },
    {
        icon: Scale,
        title: "LLB (Hons) Law",
        description:
            "A qualifying law degree recognised by the Solicitors Regulation Authority. Prepares students for a career in legal practice with strong mooting and advocacy training.",
        level: "Undergraduate",
    },
    {
        icon: Cpu,
        title: "BSc (Hons) Computer Science",
        description:
            "Covers AI, cybersecurity, software engineering and data science. Students work on real-world projects with industry partners throughout the course.",
        level: "Undergraduate",
    },
    {
        icon: Stethoscope,
        title: "BSc (Hons) Paramedic Science",
        description:
            "Approved by the Health and Care Professions Council (HCPC). Combines academic learning with practical placements across the West Midlands ambulance service.",
        level: "Undergraduate",
    },
    {
        icon: Building2,
        title: "MSc Construction Project Management",
        description:
            "Designed for construction professionals looking to advance their careers. Covers procurement, contract law, BIM, and sustainable construction practices.",
        level: "Postgraduate",
    },
    {
        icon: Globe,
        title: "MA International Relations",
        description:
            "Explores global politics, diplomacy, and international organisations. Ideal for students aiming for careers in policy, NGOs, or international business.",
        level: "Postgraduate",
    },
    {
        icon: Microscope,
        title: "BSc (Hons) Biomedical Science",
        description:
            "Accredited by the Institute of Biomedical Science (IBMS). Includes laboratory placements and covers haematology, microbiology, and clinical biochemistry.",
        level: "Undergraduate",
    },
    {
        icon: FlaskConical,
        title: "MSc Pharmaceutical Sciences",
        description:
            "Focuses on drug development, formulation, and regulation. Ideal for pharmacy graduates seeking to specialise in research and development.",
        level: "Postgraduate",
    },
    {
        icon: TrendingUp,
        title: "MBA Master of Business Administration",
        description:
            "A globally recognised qualification that develops leadership, strategy, and entrepreneurial skills for senior management roles across all industries.",
        level: "Postgraduate",
    },
];

const CARDS_PER_VIEW = { sm: 1, md: 2, lg: 3 };

const levelColors = {
    Undergraduate: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Postgraduate: "bg-blue-50 text-blue-700 border border-blue-200",
};

export default function DemandingSubject() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const total = courses.length;
    const [perPage, setPerPage] = useState(3);

    const totalPages = Math.ceil(total / perPage);
    const pageIndex = Math.floor(current / perPage);

    const go = (dir) => {
        setDirection(dir);
        setCurrent((prev) => {
            const next = prev + dir * perPage;
            if (next < 0) return (totalPages - 1) * perPage;
            if (next >= total) return 0;
            return next;
        });
    };

    const visibleCourses = courses.slice(current, current + perPage);
    while (visibleCourses.length < perPage) {
        visibleCourses.push(
            courses[visibleCourses.length - current] ?? courses[0],
        );
    }

    return (
        <section className="bg-foreground px-4 md:py-20 py-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-accent border border-brand-accent rounded-full px-3 py-1 mb-3">
                            <TrendingUp size={12} /> Popular courses
                        </span>
                        <h2 className="text-[32px] sm:text-[42px] font-black text-[#1a5c38] leading-tight">
                            Most Demanding
                            <br />
                            Subjects
                        </h2>
                    </motion.div>

                    {/* Nav arrows — top right on desktop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2 }}
                        className="hidden sm:flex items-center gap-3"
                    >
                        <button
                            onClick={() => go(-1)}
                            className="w-10 h-10 rounded-full bg-[#1a5c38] text-white flex items-center justify-center hover:bg-[#154d2f] transition-colors"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <span className="text-[14px] font-semibold text-gray-500 min-w-10 text-center">
                            {pageIndex + 1}/{totalPages}
                        </span>
                        <button
                            onClick={() => go(1)}
                            className="w-10 h-10 rounded-full bg-[#1a5c38] text-white flex items-center justify-center hover:bg-[#154d2f] transition-colors"
                            aria-label="Next"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </motion.div>
                </div>

                <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            initial={{ opacity: 0, x: direction * 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction * -60 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                            {courses
                                .slice(current, current + 3)
                                .map((course, i) => {
                                    const Icon = course.icon;
                                    return (
                                        <motion.div
                                            key={course.title}
                                            initial={{ opacity: 0, y: 24 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: i * 0.08,
                                                duration: 0.4,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            whileHover={{
                                                y: -4,
                                                transition: { duration: 0.2 },
                                            }}
                                            className="group bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:border-[#1a5c38]/30 hover:shadow-md transition-all"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-[#e6f7f0] flex items-center justify-center group-hover:bg-[#1a5c38] transition-colors">
                                                <Icon
                                                    size={26}
                                                    className="text-[#1a5c38] group-hover:text-white transition-colors"
                                                />
                                            </div>

                                            <h3 className="text-[15px] font-bold text-gray-900 leading-snug">
                                                {course.title}
                                            </h3>

                                            <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3 flex-1">
                                                {course.description}
                                            </p>

                                            <span
                                                className={`self-start text-[12px] font-bold px-3 py-1 rounded-full ${levelColors[course.level]}`}
                                            >
                                                {course.level}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="sm:hidden flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => go(-1)}
                        className="w-10 h-10 rounded-full bg-[#1a5c38] text-white flex items-center justify-center hover:bg-[#154d2f] transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-[14px] font-semibold text-gray-500">
                        {pageIndex + 1}/{totalPages}
                    </span>
                    <button
                        onClick={() => go(1)}
                        className="w-10 h-10 rounded-full bg-[#1a5c38] text-white flex items-center justify-center hover:bg-[#154d2f] transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > pageIndex ? 1 : -1);
                                setCurrent(i * 3);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${i === pageIndex ? "w-6 bg-[#1a5c38]" : "w-2 bg-gray-300"}`}
                            aria-label={`Page ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
