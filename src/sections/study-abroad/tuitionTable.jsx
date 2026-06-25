"use client";

import Heading from "@/components/heading";
import { GraduationCap, Coins, Award, BookOpen } from "lucide-react";
import { motion } from "motion/react";

const defaultHeaders = ["Program / Study Level", "Average Tuition Fees"];
const headerIcons = [GraduationCap, Coins];

const stripHtml = (value = "") =>
    value
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<\/(p|li|div|tr|td|th)>/gi, " ")
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();

const parseHtmlTable = (html = "") => {
    if (!html.includes("<table")) return null;

    const rowMatches = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
    const rows = rowMatches
        .map((rowHtml) => {
            const cells = rowHtml.match(/<(th|td)[^>]*>[\s\S]*?<\/\1>/gi) || [];
            return cells.map(stripHtml).filter(Boolean);
        })
        .filter((row) => row.length > 0);

    if (rows.length === 0) return null;

    const firstRowHasHeader = /<th/i.test(rowMatches[0] || "");
    const headers = firstRowHasHeader ? rows[0] : defaultHeaders;
    const bodyRows = firstRowHasHeader ? rows.slice(1) : rows;

    return bodyRows.length > 0 ? { headers, rows: bodyRows } : null;
};

const parseTuitionContent = (html = "") => {
    let tableData = null;

    if (html.includes("<table")) {
        tableData = parseHtmlTable(html);
    }

    let additionalInfoItems = [];

    const lastTableIndex = html.lastIndexOf("</table>");

    if (lastTableIndex !== -1) {
        const contentAfterTable = html.substring(lastTableIndex + 8);

        additionalInfoItems = contentAfterTable
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<\/p>/gi, "\n")
            .replace(/<\/li>/gi, "\n")
            .replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
            .split("\n")
            .map((line) => line.replace(/^[•\-\*\s]+/, "").trim())
            .filter(Boolean);
    }

    return {
        headers: tableData?.headers || defaultHeaders,
        rows: tableData?.rows || null,
        additionalInfo: additionalInfoItems,
    };
};

const removeTablesAndLists = (html = "") => {
    let clean = html.replace(/<table[\s\S]*?<\/table>/gi, "");
    clean = clean.replace(/•[\s\S]*$/g, "");
    return clean.replace(/<[^>]*>/g, "").trim();
};

export default function TuitionTable({ tuition }) {
    const elements = tuition?.elements || [];
    const description = tuition?.section_description || "";
    const bodyContent = elements.map((el) => el?.element_body || "").join("\n");

    const combinedHtml = tuition ? `${description}\n${bodyContent}` : "";
    const parsedData = tuition ? parseTuitionContent(combinedHtml) : null;

    const headingTitle = tuition?.section_title || "Cost Overview";
    const headingParagraph = removeTablesAndLists(description || "");

    const displayRows = parsedData?.rows || [];
    const displayHeaders = parsedData?.headers || defaultHeaders;
    const displayAdditionalInfo = parsedData?.additionalInfo || [];

    const hasAdditionalInfo = displayAdditionalInfo.length > 0;
    const hasRows = displayRows && displayRows.length > 0;

    if (!hasRows && !hasAdditionalInfo) return null;

    return (
        <section className="bg-foreground px-4 py-10 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <Heading
                    title={headingTitle}
                    paragraph={headingParagraph}
                    color={true}
                />

                <div className="mt-10 grid grid-cols-1 gap-8  lg:grid-cols-12 items-start">
                    <div
                        className={`${
                            hasAdditionalInfo
                                ? "lg:col-span-7"
                                : "lg:col-span-12"
                        } overflow-x-auto rounded-2xl bg-gray-50  shadow-sm border border-gray-100`}
                    >
                        {hasRows ? (
                            <table className="w-full border-collapse text-left min-w-100 ">
                                <thead>
                                    <tr className="bg-brand-primary">
                                        {displayHeaders.map((header, index) => {
                                            const Icon =
                                                headerIcons[index] || BookOpen;
                                            return (
                                                <th
                                                    key={`${header}-${index}`}
                                                    className="px-4 py-4 text-sm font-semibold text-brand-contrast md:text-base"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Icon
                                                            size={25}
                                                            className="rounded-md bg-brand-contrast/10 p-1.5 text-brand-contrast"
                                                        />
                                                        {header}
                                                    </div>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayRows.map((row, rowIndex) => (
                                        <motion.tr
                                            key={`${row[0]}-${rowIndex}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.3,
                                                delay: rowIndex * 0.05,
                                            }}
                                            className="border-b border-gray-100 last:border-0 hover:bg-gray-100/50"
                                        >
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700">
                                                {row[0]}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700 font-semibold">
                                                {row[1] || "-"}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : null}
                    </div>

                    {hasAdditionalInfo && (
                        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gray-50  border border-gray-100 shadow-sm overflow-hidden">
                            <div>
                                <div className="flex items-center gap-2  bg-brand-primary py-4 px-6 text-brand-contrast">
                                    <Award
                                        className="rounded-md bg-brand-contrast/10 p-1.5 text-brand-contrast"
                                        size={25}
                                    />
                                    <h3 className="text-sm font-semibold md:text-base">
                                        Additional Details
                                    </h3>
                                </div>
                                <ul className="space-y-2 list-none pl-0 p-4">
                                    {displayAdditionalInfo.map(
                                        (item, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: index * 0.05,
                                                }}
                                                className="flex items-start gap-2 pl-6 text-md text-gray-700"
                                            >
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                                <span>{item}</span>
                                            </motion.li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

// old code

// "use client";

// import Heading from "@/components/heading";
// import { GraduationCap, Coins, Award, BookOpen } from "lucide-react";
// import { motion } from "motion/react";

// const defaultHeaders = ["Program / Study Level", "Average Tuition Fees"];
// const headerIcons = [GraduationCap, Coins];

// const stripHtml = (value = "") =>
//     value
//         .replace(/<br\s*\/?>/gi, " ")
//         .replace(/<\/(p|li|div|tr|td|th)>/gi, " ")
//         .replace(/<[^>]*>/g, "")
//         .replace(/&nbsp;/g, " ")
//         .replace(/&amp;/g, "&")
//         .replace(/\s+/g, " ")
//         .trim();

// const parseHtmlTable = (html = "") => {
//     if (!html.includes("<table")) return null;

//     const rowMatches = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
//     const rows = rowMatches
//         .map((rowHtml) => {
//             const cells = rowHtml.match(/<(th|td)[^>]*>[\s\S]*?<\/\1>/gi) || [];

//             return cells.map(stripHtml).filter(Boolean);
//         })
//         .filter((row) => row.length > 0);

//     if (rows.length === 0) return null;

//     const firstRowHasHeader = /<th/i.test(rowMatches[0] || "");
//     const headers = firstRowHasHeader ? rows[0] : defaultHeaders;
//     const bodyRows = firstRowHasHeader ? rows.slice(1) : rows;

//     return bodyRows.length > 0 ? { headers, rows: bodyRows } : null;
// };

// // const parseTuitionContent = (html = "") => {
// //     if (html.includes("<table")) {
// //         const table = parseHtmlTable(html);
// //         if (table) return table;
// //     }

// //     let text = html
// //         .replace(/<br\s*\/?>/gi, "\n")
// //         .replace(/<\/p>/gi, "\n")
// //         .replace(/<[^>]*>/g, "")
// //         .replace(/&nbsp;/g, " ")
// //         .replace(/&amp;/g, "&");

// //     const lines = text
// //         .split("\n")
// //         .map((line) => line.trim())
// //         .filter((line) => line.length > 0);

// //     const feeRows = [];
// //     let scholarshipItems = [];
// //     // EVERYTHING AFTER TABLE = SCHOLARSHIPS / EXTRA CONTENT
// //     const afterTable = html.replace(/<table[\s\S]*?<\/table>/i, "");

// //     const paragraphMatches = afterTable.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];

// //     paragraphMatches.forEach((p) => {
// //         const clean = p
// //             .replace(/<[^>]*>/g, "")
// //             .replace(/\s+/g, " ")
// //             .trim();

// //         if (clean) {
// //             scholarshipItems.push(clean);
// //         }
// //     });

// //     // const feeRows = [];
// //     // const scholarshipItems = [];
// //     // let isScholarshipSection = false;

// //     // lines.forEach((line) => {
// //     //     const cleanLine = line.replace(/^[•\-\*\s]+/, "").trim();

// //     //     if (cleanLine.toLowerCase().includes("scholarship")) {
// //     //         if (cleanLine.includes(":")) {
// //     //             const parts = cleanLine.split(":");
// //     //             if (parts[1].trim() === "") {
// //     //                 isScholarshipSection = true;
// //     //                 return;
// //     //             }
// //     //         } else {
// //     //             isScholarshipSection = true;
// //     //             return;
// //     //         }
// //     //     }

// //     //     if (isScholarshipSection) {
// //     //         scholarshipItems.push(cleanLine);
// //     //         return;
// //     //     }

// //     //     const parts = cleanLine.split(":");
// //     //     if (parts.length >= 2) {
// //     //         const key = parts[0].trim();
// //     //         const value = parts.slice(1).join(":").trim();
// //     //         feeRows.push([key, value]);
// //     //     }
// //     // });

// //     return {
// //         headers: defaultHeaders,
// //         rows: feeRows.length > 0 ? feeRows : null,
// //         scholarships: scholarshipItems.filter(Boolean),
// //     };
// // };

// const parseTuitionContent = (html = "") => {
//     let tableData = null;
//     let scholarshipItems = [];

//     // 1. Extract the table first if it exists
//     if (html.includes("<table")) {
//         tableData = parseHtmlTable(html);
//     }

//     // 2. Remove tables entirely to cleanly parse the leftover paragraphs & lists
//     const cleanTextSection = html.replace(/<table[\s\S]*?<\/table>/gi, "");

//     // 3. Convert explicit block elements to newlines so they separate properly
//     const textLines = cleanTextSection
//         .replace(/<br\s*\/?>/gi, "\n")
//         .replace(/<\/p>/gi, "\n")
//         .replace(/<\/li>/gi, "\n")
//         .replace(/<[^>]*>/g, "") // Strip out remaining tags
//         .replace(/&nbsp;/g, " ")
//         .replace(/&amp;/g, "&")
//         .split("\n")
//         .map((line) => line.trim())
//         .filter(Boolean);

//     // 4. Extract extra text contextually (e.g., lines mentioning scholarship sources)
//     let capture = false;
//     textLines.forEach((line) => {
//         // Strip out leading bullet symbols if present
//         const cleanLine = line.replace(/^[•\-\*\s]+/, "").trim();
//         if (!cleanLine) return;

//         // Dynamic flag to detect structural keywords like "Scholarships are available through:"
//         if (cleanLine.toLowerCase().includes("scholarship")) {
//             capture = true;
//             const parts = cleanLine.split(":");
//             if (parts[1] && parts[1].trim().length > 0) {
//                 scholarshipItems.push(parts[1].trim());
//             }
//             return;
//         }

//         // Capture subsequent lines if they follow the heading indicator or list structure
//         if (capture) {
//             scholarshipItems.push(cleanLine);
//         } else {
//             // OPTIONAL: If you want to capture ANY random text that wasn't captured by
//             // the scholarship flag, you can push it to a general array or here:
//             if (
//                 !cleanLine.toLowerCase().includes("living cost") &&
//                 !cleanLine.toLowerCase().includes("monthly living")
//             ) {
//                 scholarshipItems.push(cleanLine);
//             }
//         }
//     });

//     return {
//         headers: tableData?.headers || defaultHeaders,
//         rows: tableData?.rows || null,
//         scholarships: scholarshipItems.filter(Boolean),
//     };
// };

// const removeTablesAndLists = (html = "") => {
//     let clean = html.replace(/<table[\s\S]*?<\/table>/gi, "");
//     clean = clean.replace(/•[\s\S]*$/g, ""); // strip bullet points
//     return clean.replace(/<[^>]*>/g, "").trim();
// };

// // this is for defaults when no structured data is provided. We can expand this in the future with more country-specific defaults if needed.
// // const defaultFallbackRows = [
// //     ["Bachelor's Programs", "Varies by course / Contact PECEDU"],
// //     ["Master's Programs", "Varies by course / Contact PECEDU"],
// //     ["Doctoral / Medical Programs", "Varies by course / Contact PECEDU"],
// // ];

// // const getCountrySpecificFallbacks = (countryName = "") => {
// //     const name = countryName.toLowerCase();
// //     if (name.includes("china")) {
// //         return {
// //             rows: [
// //                 ["Bachelor's Programs", "¥15,000 – ¥40,000 per year"],
// //                 ["Master's Programs", "¥20,000 – ¥50,000 per year"],
// //                 ["Medical Degrees", "¥30,000 – ¥70,000+ per year"],
// //             ],
// //             scholarships: [
// //                 "Chinese Government Scholarship (CSC)",
// //                 "University scholarships",
// //                 "Provincial government scholarships",
// //                 "Belt and Road scholarships",
// //             ],
// //         };
// //     }
// //     if (
// //         name.includes("united kingdom") ||
// //         name.includes("uk") ||
// //         name.includes("britain")
// //     ) {
// //         return {
// //             rows: [
// //                 ["Bachelor's Programs", "£10,000 – £25,000 per year"],
// //                 ["Master's Programs", "£12,000 – £30,000 per year"],
// //                 ["Medical / Clinical Degrees", "£22,000 – £45,000+ per year"],
// //             ],
// //             scholarships: [
// //                 "Chevening Scholarships",
// //                 "Commonwealth Scholarships",
// //                 "GREAT Scholarships",
// //                 "University-specific bursaries",
// //             ],
// //         };
// //     }
// //     if (name.includes("canada")) {
// //         return {
// //             rows: [
// //                 ["Bachelor's Programs", "CAD $20,000 – $35,000 per year"],
// //                 ["Master's Programs", "CAD $18,000 – $30,000 per year"],
// //                 ["Doctoral Programs", "CAD $12,000 – $25,000 per year"],
// //             ],
// //             scholarships: [
// //                 "Vanier Canada Graduate Scholarships",
// //                 "Canada Memorial Scholarships",
// //                 "Ontario Trillium Scholarships",
// //                 "University entrance scholarships",
// //             ],
// //         };
// //     }
// //     if (
// //         name.includes("usa") ||
// //         name.includes("united states") ||
// //         name.includes("america")
// //     ) {
// //         return {
// //             rows: [
// //                 ["Bachelor's Programs", "$20,000 – $45,000 per year"],
// //                 ["Master's Programs", "$22,000 – $40,000 per year"],
// //                 ["Doctoral Programs", "$15,000 – $35,000 per year"],
// //             ],
// //             scholarships: [
// //                 "Fulbright Foreign Student Program",
// //                 "Hubert Humphrey Fellowship Program",
// //                 "University merit-based awards",
// //                 "Need-based financial aid",
// //             ],
// //         };
// //     }
// //     if (name.includes("australia")) {
// //         return {
// //             rows: [
// //                 ["Bachelor's Programs", "AUD $20,000 – $40,000 per year"],
// //                 ["Master's Programs", "AUD $22,000 – $45,000 per year"],
// //                 ["Doctoral Programs", "AUD $18,000 – $40,000 per year"],
// //             ],
// //             scholarships: [
// //                 "Australia Awards",
// //                 "Destination Australia Scholarships",
// //                 "Research Training Program (RTP)",
// //                 "University merit scholarships",
// //             ],
// //         };
// //     }
// //     return {
// //         rows: defaultFallbackRows,
// //         scholarships: [
// //             "Government scholarships",
// //             "University merit-based scholarships",
// //             "International student bursaries",
// //         ],
// //     };
// // };

// export default function TuitionTable({ tuition, countryName }) {
//     const elements = tuition?.elements || [];
//     const description = tuition?.section_description || "";
//     const bodyContent = elements.map((el) => el?.element_body || "").join("\n");

//     // Combine description and body for parsing if tuition block exists
//     const combinedHtml = tuition ? `${description}\n${bodyContent}` : "";
//     const parsedData = tuition ? parseTuitionContent(combinedHtml) : null;
//     console.log("PARSED DATA:", parsedData);
//     console.log("SCHOLARSHIPS:", parsedData?.scholarships);
//     const headingTitle = tuition?.section_title || "";
//     const headingParagraph = removeTablesAndLists(description || "");
//     // console.log("Parsed Tuition Data:", parsedData);

//     // const headingTitle =
//     //     tuition?.section_title ||
//     //     `Tuition Fees & Cost of Education in ${countryName || "Abroad"}`;
//     // const headingParagraph =
//     //     (tuition && removeTablesAndLists(description)) ||
//     //     `Average tuition fees for international students in ${countryName || "abroad"} vary depending on the level of study, choice of course, and the university.`;

//     // const countryDefaults = getCountrySpecificFallbacks(countryName || "");

//     // const displayRows =
//     //     parsedData?.rows && parsedData.rows.length > 0
//     //         ? parsedData.rows
//     //         : countryDefaults.rows;

//     // const displayScholarships =
//     //     parsedData?.scholarships && parsedData.scholarships.length > 0
//     //         ? parsedData.scholarships
//     //         : countryDefaults.scholarships;

//     const displayRows = parsedData?.rows || [];

//     const displayScholarships = (parsedData?.scholarships || []).filter(
//         (t) => t && t.trim().length > 0,
//     );

//     const hasScholarships = displayScholarships.length > 0;
//     console.log("HAS:", hasScholarships);

//     const hasRows = displayRows && displayRows.length > 0;

//     if (!hasRows && !hasScholarships) return null;

//     return (
//         <section className="bg-white px-4 py-10 sm:px-6 md:py-20 lg:px-8">
//             <div className="mx-auto max-w-6xl">
//                 <Heading
//                     title={headingTitle}
//                     paragraph={headingParagraph}
//                     color={false}
//                 />

//                 <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
//                     {/* Tuition Table */}
//                     <div
//                         className={`${hasScholarships ? "lg:col-span-7" : "lg:col-span-12"} overflow-x-auto rounded-2xl bg-gray-50 p-4 shadow-sm border border-gray-100`}
//                     >
//                         {hasRows ? (
//                             <table className="w-full border-collapse text-left min-w-100">
//                                 <thead>
//                                     <tr className="border-b border-gray-200">
//                                         {defaultHeaders.map((header, index) => {
//                                             const Icon =
//                                                 headerIcons[index] || BookOpen;
//                                             return (
//                                                 <th
//                                                     key={`${header}-${index}`}
//                                                     className="px-4 py-3 text-sm font-semibold text-gray-900 md:text-base"
//                                                 >
//                                                     <div className="flex items-center gap-2">
//                                                         <Icon
//                                                             size={18}
//                                                             className="text-brand-primary"
//                                                         />
//                                                         {header}
//                                                     </div>
//                                                 </th>
//                                             );
//                                         })}
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {displayRows.map((row, rowIndex) => (
//                                         <motion.tr
//                                             key={`${row[0]}-${rowIndex}`}
//                                             initial={{ opacity: 0, y: 10 }}
//                                             whileInView={{ opacity: 1, y: 0 }}
//                                             viewport={{ once: true }}
//                                             transition={{
//                                                 duration: 0.3,
//                                                 delay: rowIndex * 0.05,
//                                             }}
//                                             className="border-b border-gray-100 last:border-0 hover:bg-gray-100/50"
//                                         >
//                                             <td className="px-4 py-4 text-sm font-medium text-gray-800">
//                                                 {row[0]}
//                                             </td>
//                                             <td className="px-4 py-4 text-sm text-brand-primary font-semibold">
//                                                 {row[1] || "-"}
//                                             </td>
//                                         </motion.tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         ) : // <div className="text-center py-8 text-gray-500">
//                         //     No tuition details structured for table display.
//                         //     Refer to description.
//                         // </div>
//                         null}
//                     </div>

//                     {/* Scholarships Section */}
//                     {/* {hasScholarships && (
//                         <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-brand-primary/5 p-6 border border-brand-primary/10">
//                             <div>
//                                 <div className="flex items-center gap-2 mb-4">
//                                     <Award
//                                         className="text-brand-primary"
//                                         size={24}
//                                     />
//                                     <h3 className="text-lg font-bold text-gray-900">
//                                         Scholarships Available
//                                     </h3>
//                                 </div>
//                                 <ul className="space-y-3">
//                                     {displayScholarships.map((item, idx) => (
//                                         <motion.li
//                                             key={idx}
//                                             initial={{ opacity: 0, x: -10 }}
//                                             whileInView={{ opacity: 1, x: 0 }}
//                                             viewport={{ once: true }}
//                                             transition={{
//                                                 duration: 0.3,
//                                                 delay: idx * 0.05,
//                                             }}
//                                             className="flex items-start gap-2 text-sm text-gray-700"
//                                         >
//                                             <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
//                                             <span>{item}</span>
//                                         </motion.li>
//                                     ))}
//                                 </ul>
//                             </div>
//                             <div className="mt-6 pt-4 border-t border-brand-primary/10">
//                                 <p className="text-xs text-gray-500">
//                                     * Application deadlines and eligibility
//                                     criteria apply to each scholarship scheme.
//                                 </p>
//                             </div>
//                         </div>
//                     )} */}
//                     {hasScholarships && (
//                         <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//                             <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//                                 <Award className="w-5 h-5 text-blue-600" />
//                                 Additional Information & Opportunities
//                             </h3>
//                             <ul className="list-disc pl-5 space-y-2">
//                                 {displayScholarships.map((item, index) => (
//                                     <li key={index} className="text-gray-700">
//                                         {item}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }
