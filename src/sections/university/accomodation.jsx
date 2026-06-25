"use client";

import { motion } from "motion/react";
import Heading from "@/components/heading";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

const defaultAccommodations = [
    {
        option: "University halls – standard",
        rent: "£101/week",
        contract: "42 weeks",
    },
    {
        option: "University halls – en-suite",
        rent: "£119/week",
        contract: "42 or 52 weeks",
    },
    {
        option: "Private halls (IQ & Host)",
        rent: "£94–128/week",
        contract: "Variable",
    },
];

const parseAccommodationBlock = (block) => {
    if (!block?.elements || block.elements.length === 0) return null;

    const allRows = [];
    for (const el of block.elements) {
        const title = el.element_title || "Accommodation";
        const body = el.element_body || "";

        const trMatches = body.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
        const parsedRows = [];

        if (trMatches.length > 0) {
            for (const tr of trMatches) {
                if (tr.toLowerCase().includes("<th")) {
                    continue;
                }
                const tdMatches = tr.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
                if (tdMatches && tdMatches.length > 0) {
                    const cells = tdMatches.map((td) =>
                        td.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim()
                    );
                    parsedRows.push({
                        option: cells[0] || title,
                        rent: cells[1] || "Contact Us",
                        contract: cells[2] || "Variable",
                    });
                }
            }
        }

        if (parsedRows.length === 0) {
            const cleanText = body.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim();
            const rentMatch = cleanText.match(/(?:rent|price|cost)[:\s]*(£[\d,]+(?:[–\-]£?[\d,]+)?(?:\/\w+)?)/i);
            const contractMatch = cleanText.match(/(?:contract|duration|length)[:\s]*(\d+[\s\S]*?(?:weeks?|months?))/i);

            parsedRows.push({
                option: title,
                rent: rentMatch ? rentMatch[1] : cleanText.substring(0, 30) || "Contact Us",
                contract: contractMatch ? contractMatch[1] : "Variable",
            });
        }

        allRows.push(...parsedRows);
    }
    return allRows;
};

export default function Accommodation({ accommodationBlock }) {
    const parsedData = accommodationBlock ? parseAccommodationBlock(accommodationBlock) : null;
    const accommodations = parsedData && parsedData.length > 0 ? parsedData : defaultAccommodations;

    const headingTitle = accommodationBlock?.section_title || "Accommodation";
    const headingHighlight = accommodationBlock?.section_title ? "" : "Hall";
    const headingParagraph = accommodationBlock?.section_description ||
        "The University of Wolverhampton offers over 1,600 comfortable, affordable student rooms across its City, Walsall, and Telford campuses. With both standard and en-suite options available, weekly rents start from just £101, including all bills, Wi-Fi, and contents insurance";
    return (
        <section className="bg-foreground px-4 md:py-20 py-10">
            <div className="max-w-7xl mx-auto">
                <Heading
                    title={headingTitle}
                    highlight={headingHighlight}
                    paragraph={headingParagraph}
                />

                <motion.div
                    {...fadeUp(0.1)}
                    className="hidden md:block border border-brand-accent mt-10 bg-brand-primary rounded-lg overflow-hidden w-full"
                >
                    <table className="w-full border-collapse text-[14px] sm:text-[15px]">
                        <thead>
                            <tr className="bg-brand-accent">
                                <td className="w-[34%] px-5 py-4 border-r border-brand-accent text-center">
                                    <span className="text-white text-lg font-bold">
                                        Option
                                    </span>
                                </td>
                                <td className="w-[33%] px-5 py-4 border-r border-brand-accent text-center">
                                    <span className="text-white text-lg font-bold">
                                        Typical Rent
                                    </span>
                                </td>
                                <td className="w-[33%] px-5 py-4 text-center">
                                    <span className="text-white text-lg font-bold">
                                        Contract Length
                                    </span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {accommodations.map((row, i) => (
                                <motion.tr
                                    key={i}
                                    {...fadeUp(0.15 + i * 0.07)}
                                    className="border-b border-brand-accent last:border-b-0 hover:bg-brand-accent/10 transition-colors"
                                >
                                    <td className="px-5 py-5 border-r border-brand-accent text-center text-brand-contrast text-base">
                                        {row.option}
                                    </td>
                                    <td className="px-5 py-5 border-r border-brand-accent text-center text-brand-contrast text-base">
                                        {row.rent}
                                    </td>
                                    <td className="px-5 py-5 text-center text-brand-contrast text-base">
                                        {row.contract}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                <motion.div
                    {...fadeUp(0.1)}
                    className="md:hidden mt-10 space-y-3"
                >
                    {accommodations.map((row, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp(0.1 + i * 0.08)}
                            className="border border-brand-accent rounded-lg overflow-hidden bg-brand-primary"
                        >
                            <div className="bg-brand-accent px-5 py-3">
                                <span className="text-white text-base font-semibold">
                                    {row.option}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-200">
                                <div className="px-4 py-4 text-center">
                                    <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-1">
                                        Typical Rent
                                    </p>
                                    <p className="text-[18px] font-black text-gray-900">
                                        {row.rent}
                                    </p>
                                </div>
                                <div className="px-4 py-4 text-center">
                                    <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-1">
                                        Contract Length
                                    </p>
                                    <p className="text-[18px] font-black text-gray-900">
                                        {row.contract}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
