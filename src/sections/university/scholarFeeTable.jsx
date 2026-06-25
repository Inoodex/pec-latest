"use client";

import { motion } from "motion/react";
import { Calculator } from "lucide-react";
import Heading from "@/components/heading";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

const defaultTuitionRates = [
    { fee: "£15,995", label: "(UG)" },
    { fee: "£16,950", label: "(PG)" },
    { fee: "£19,500", label: "(MRes)" }
];
const defaultScholarship = "£2,000";
const defaultDeposit = "£8,000";
const defaultDepositNote = "50% Off Tuition Fees (MRes)";

const parseScholarshipBlock = (block) => {
    if (!block?.elements || block.elements.length === 0) return null;

    for (const el of block.elements) {
        const body = el.element_body || "";
        const trMatches = body.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];

        for (const tr of trMatches) {
            if (tr.toLowerCase().includes("<th")) {
                continue;
            }
            const tdMatches = tr.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
            if (tdMatches && tdMatches.length >= 3) {
                const tuitionCell = tdMatches[0];
                const pMatches = tuitionCell.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
                const tuitionRates = [];

                for (const p of pMatches) {
                    const cleanP = p.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
                    if (cleanP) {
                        const match = cleanP.match(/(£[\d,]+)\s*(\(.*\)|.*)?/i);
                        if (match) {
                            tuitionRates.push({
                                fee: match[1],
                                label: match[2] ? match[2].trim() : ""
                            });
                        } else {
                            tuitionRates.push({
                                fee: cleanP,
                                label: ""
                            });
                        }
                    }
                }

                const scholarshipCell = tdMatches[1];
                const scholarshipText = scholarshipCell.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

                const depositCell = tdMatches[2];
                const dpMatches = depositCell.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
                let depositFee = "";
                let depositNote = "";

                if (dpMatches.length > 0) {
                    depositFee = dpMatches[0].replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
                    if (dpMatches[1]) {
                        depositNote = dpMatches[1].replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
                    }
                } else {
                    depositFee = depositCell.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
                }

                if (tuitionRates.length > 0 || scholarshipText || depositFee) {
                    return {
                        tuitionRates,
                        scholarship: scholarshipText || "Contact Us",
                        deposit: depositFee || "Contact Us",
                        depositNote
                    };
                }
            }
        }
        
        // Fallback for simple elements/plain text
        const cleanText = body.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim();
        if (cleanText) {
            const tuitionMatch = cleanText.match(/(?:tuition|fees)[:\s]*(£[\d,]+(?:[\s\S]*?\(.*?\))?)/i);
            const scholarshipMatch = cleanText.match(/(?:scholarship)[:\s]*(£[\d,]+)/i);
            const depositMatch = cleanText.match(/(?:deposit|initial)[:\s]*(£[\d,]+)/i);

            const tuitionRates = [];
            if (tuitionMatch) {
                tuitionRates.push({ fee: tuitionMatch[1], label: "" });
            } else {
                tuitionRates.push({ fee: cleanText.substring(0, 30), label: "" });
            }

            return {
                tuitionRates,
                scholarship: scholarshipMatch ? scholarshipMatch[1] : "Contact Us",
                deposit: depositMatch ? depositMatch[1] : "Contact Us",
                depositNote: ""
            };
        }
    }
    return null;
};

export default function ScholarFeeTable({ scholarBlock }) {
    const parsedData = scholarBlock ? parseScholarshipBlock(scholarBlock) : null;
    const tuitionRates = parsedData?.tuitionRates || defaultTuitionRates;
    const scholarship = parsedData?.scholarship || defaultScholarship;
    const deposit = parsedData?.deposit || defaultDeposit;
    const depositNote = parsedData?.depositNote || defaultDepositNote;

    let headingTitle = "Fees And";
    let headingHighlight = "Scholarship";
    let headingSubtitle = scholarBlock?.settings?.subtitle || "Scholarship fees";

    if (scholarBlock?.section_title) {
        const titleWords = scholarBlock.section_title.split(" ");
        if (titleWords.length > 1) {
            headingHighlight = titleWords.pop();
            headingTitle = titleWords.join(" ");
        } else {
            headingTitle = scholarBlock.section_title;
            headingHighlight = "";
        }
    }

    return (
        <section className="bg-foreground px-4 md:py-20 py-10">
            <div className="max-w-7xl mx-auto">
                <Heading
                    title={headingTitle}
                    highlight={headingHighlight}
                    subtitle={headingSubtitle}
                />

                <motion.div
                    {...fadeUp(0.1)}
                    className="hidden md:block border border-brand-accent mt-10 bg-brand-primary rounded-lg overflow-hidden w-full"
                >
                    <table className="w-full border-collapse text-[14px] sm:text-[15px]">
                        <tbody>
                            <tr className="border-b border-brand-accent bg-brand-accent">
                                <td className="w-[34%] px-5 py-4 border-r text-2xl border-brand-accent align-top">
                                    <span className="text-brand-contrast">
                                        Tuition:
                                    </span>
                                </td>
                                <td className="w-[33%] px-5 py-4 border-r text-2xl text-brand-contrast border-brand-accent text-center align-middle">
                                    Scholarship:
                                </td>
                                <td className="w-[33%] px-5 py-4 text-center align-middle text-2xl text-brand-contrast">
                                    Initial Deposit:
                                </td>
                            </tr>

                            <tr className="border-b border-brand-accent">
                                <td
                                    className="px-5 py-5 border-r border-brand-accent align-top"
                                    rowSpan={2}
                                >
                                    <div className="space-y-1">
                                        {tuitionRates.map((rate, idx) => (
                                            <p key={idx} className="text-[22px] sm:text-[26px] font-black text-brand-contrast leading-tight">
                                                {rate.fee}
                                                {rate.label && (
                                                    <span className="text-[11px] font-semibold text-gray-300 ml-0.5">
                                                        {rate.label}
                                                    </span>
                                                )}
                                            </p>
                                        ))}
                                    </div>
                                </td>

                                <td className="px-5 py-5 border-r text-center align-middle border-b border-brand-accent">
                                    <p className="text-[26px] sm:text-[30px] font-black text-brand-contrast">
                                        {scholarship}
                                    </p>
                                </td>

                                <td className="px-5 py-5 text-center align-middle border-b border-brand-accent">
                                    <p className="text-[26px] sm:text-[30px] font-black text-brand-contrast">
                                        {deposit}
                                    </p>
                                    {depositNote && (
                                        <p className="text-[11px] text-brand-contrast mt-1">
                                            {depositNote}
                                        </p>
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <td className="px-5 py-5 border-r border-brand-accent text-center align-middle text-brand-contrast">
                                    No Application Fee
                                </td>
                                <td className="p-0 align-middle">
                                    <motion.button
                                        whileHover={{ opacity: 0.9 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full h-full min-h-15 bg-brand-accent text-white font-extrabold text-[16px] sm:text-[18px] flex items-center justify-center gap-2 cursor-pointer px-4 py-5"
                                    >
                                        <Calculator size={18} />
                                        Cost Calculator
                                    </motion.button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </motion.div>

                <motion.div
                    {...fadeUp(0.1)}
                    className="md:hidden mt-10 space-y-3"
                >
                    <div className="border border-brand-accent rounded-lg overflow-hidden bg-brand-primary">
                        <div className="bg-brand-accent px-5 py-3">
                            <span className="text-brand-contrast text-lg font-semibold">
                                Tuition:
                            </span>
                        </div>
                        <div className="px-5 py-4 space-y-1">
                            {tuitionRates.map((rate, idx) => (
                                <p key={idx} className="text-[24px] font-black text-brand-contrast leading-tight">
                                    {rate.fee}
                                    {rate.label && (
                                        <span className="text-[11px] font-semibold text-brand-contrast ml-0.5">
                                            {rate.label}
                                        </span>
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="border border-brand-accent rounded-lg overflow-hidden bg-brand-primary">
                            <div className="bg-brand-accent px-4 py-3">
                                <span className="text-white text-base font-semibold">
                                    Scholarship:
                                </span>
                            </div>
                            <div className="px-4 py-4 text-center">
                                <p className="text-lg font-black text-brand-contrast">
                                    {scholarship}
                                </p>
                            </div>
                        </div>

                        <div className="border border-brand-accent rounded-lg overflow-hidden bg-brand-primary">
                            <div className="bg-brand-accent px-4 py-3">
                                <span className="text-white text-base font-semibold">
                                    Initial Deposit:
                                </span>
                            </div>
                            <div className="px-4 py-4 text-center">
                                <p className="text-[24px] font-black text-brand-contrast">
                                    {deposit}
                                </p>
                                {depositNote && (
                                    <p className="text-[10px] text-brand-contrast mt-1">
                                        {depositNote}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="border border-brand-accent rounded-lg bg-brand-primary flex items-center justify-center px-4 py-5">
                            <p className="text-brand-contrast text-sm text-center">
                                No Application Fee
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ opacity: 0.9 }}
                            whileTap={{ scale: 0.97 }}
                            className="rounded-lg bg-brand-accent text-white font-extrabold text-[15px] flex items-center justify-center gap-2 cursor-pointer px-4 py-5"
                        >
                            <Calculator size={16} />
                            Cost Calculator
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
