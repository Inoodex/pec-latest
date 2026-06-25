"use client";

import { motion } from "motion/react";
import { School, Award, Check } from "lucide-react";
import { cardVariants, containerVariants } from "@/animation/animation";
import Heading from "@/components/heading";

export default function StudyAbroadRequirements({ academicBlock, englishBlock, mark, englishScores }) {
     const academicTitle = academicBlock?.section_title || "Requirements for Bangladeshi Students to";
     const academicDesc = academicBlock?.section_description || "Bangladesh's educational landscape is evolving, but studying abroad offers unique advantages for Bangladeshi students:";

     // 1. HELPER PARSERS FOR CMS DYNAMIC HTML DATA
     const extractMarks = (html) => {
          if (!html) return "";
          const strongMatch = html.match(/<(?:h1|strong|b|span)[^>]*>([\s\S]*?)<\/\x01*?(?:h1|strong|b|span)>/i) || html.match(/<strong>([\s\S]*?)<\/strong>/i) || html.match(/<b>([\s\S]*?)<\/b>/i);
          if (strongMatch) {
               return strongMatch[1].replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
          }
          const text = html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').trim();
          const reqIdx = text.toLowerCase().indexOf("requirement");
          if (reqIdx > 0) {
               return text.substring(0, reqIdx).trim();
          }
          return "";
     };

     const extractRequirements = (html) => {
          if (!html) return [];
          const liMatches = html.match(/<li>([\s\S]*?)<\/li>/gi);
          if (liMatches && liMatches.length > 0) {
               return liMatches.map(li => li.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()).filter(Boolean);
          }
          const cleanHtml = html.replace(/&nbsp;/g, ' ');
          const reqRegex = /requirements\s*(?:<br\s*\/?>)?\s*([\s\S]*)/i;
          const match = cleanHtml.match(reqRegex);
          if (match && match[1]) {
               const textAfter = match[1];
               const items = textAfter
                    .split(/<\/p>|<p>|<br\s*\/?>|\n/gi)
                    .map(item => item.replace(/<[^>]*>/g, '').trim())
                    .filter(Boolean);
               return items;
          }
          return [];
     };

     const parseEnglishScores = (block, propScores) => {
          const scores = {};

          if (propScores) {
               const propCategories = Object.keys(propScores);
               if (propCategories.length > 0) {
                    const formattedScores = {};
                    propCategories.forEach((key) => {
                         const list = [];
                         const categoryData = propScores[key];
                         if (categoryData && typeof categoryData === 'object') {
                              Object.keys(categoryData).forEach((examKey) => {
                                   if (examKey === "note") return;
                                   let examName = examKey.toUpperCase();
                                   if (examKey === "oietc") examName = "OIETC";
                                   if (examKey === "moi") examName = "MOI";

                                   let sub = "score requirement";
                                   if (examName.includes("IELTS")) sub = "overall band";
                                   else if (examName.includes("PTE")) sub = "academic score";
                                   else if (examName.includes("TOEFL")) sub = "iBT total";

                                   list.push({
                                        name: examName,
                                        value: categoryData[examKey],
                                        sub: sub
                                   });
                              });
                              if (list.length > 0) {
                                   formattedScores[key] = list;
                              }
                         }
                    });
                    return formattedScores;
               }
          }

          if (!block || !block.elements || block.elements.length === 0) {
               return {
                    ug: [
                         { name: "IELTS", value: "6.0", sub: "overall band" },
                         { name: "PTE", value: "55", sub: "academic score" },
                         { name: "TOEFL", value: "70", sub: "iBT total" },
                    ],
                    pg: [
                         { name: "IELTS", value: "6.5", sub: "overall band" },
                         { name: "PTE", value: "60", sub: "academic score" },
                         { name: "TOEFL", value: "70", sub: "iBT total" },
                    ],
               };
          }

          block.elements.forEach((el) => {
               const title = el.element_title || "Program";
               const titleLower = title.toLowerCase();
               const body = el.element_body || "";
               
               const key = titleLower.replace(/\s+/g, '-');

               if (body.includes("<table")) {
                    const rowsHtml = body.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
                    if (rowsHtml && rowsHtml.length >= 2) {
                         const headerRow = rowsHtml[0];
                         const headers = (headerRow.match(/<th[^>]*>([\s\S]*?)<\/th>/gi) || headerRow.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [])
                              .map(h => h.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().toUpperCase());

                         let cells = [];
                         for (let i = 1; i < rowsHtml.length; i++) {
                              const tempCells = (rowsHtml[i].match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [])
                                   .map(c => c.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim());
                              if (tempCells.some(c => c !== "")) {
                                   cells = tempCells;
                                   break;
                              }
                         }

                         if (headers.length > 0 && cells.length > 0) {
                              const parsedList = headers.map((header, idx) => {
                                   const value = cells[idx] || "";
                                   let sub = "score requirement";
                                   if (header.includes("IELTS")) sub = "overall band";
                                   else if (header.includes("PTE")) sub = "academic score";
                                   else if (header.includes("TOEFL")) sub = "iBT total";

                                   return {
                                        name: header || "EXAM",
                                        value: value || "-",
                                        sub: sub
                                   };
                              }).filter(item => item.name);

                              if (parsedList.length > 0) {
                                   scores[key] = parsedList;
                              }
                         }
                    }
               } else {
                    const cleanText = body.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ');
                    const getScoreVal = (text, name) => {
                         const regex = new RegExp(`${name}\\s*:\\s*(\\d+(?:\\.\\d+)?(?:\\s*-\\s*\\d+(?:\\.\\d+)?)?)`, 'i');
                         const match = text.match(regex);
                         return match ? match[1] : null;
                    };

                    const ielts = getScoreVal(cleanText, "IELTS") || "6.0";
                    const pte = getScoreVal(cleanText, "PTE") || "55";
                    const toefl = getScoreVal(cleanText, "TOEFL") || "70";
                    scores[key] = [
                         { name: "IELTS", value: ielts, sub: "overall band" },
                         { name: "PTE", value: pte, sub: "academic score" },
                         { name: "TOEFL", value: toefl, sub: "iBT total" },
                    ];
               }
          });

          return scores;
     };

     // 2. PARSE ACADEMIC CARDS
     const defaultAcademicCards = [
          {
               id: "ug",
               badge: "Undergraduate",
               icon: <School size={20} />,
               heading: "SSC & HSC Results",
               marks: "GPA 3.0+",
               requirements: ["SSC & HSC transcripts", "Minimum GPA 3.0", "HSC completed"],
          },
          {
               id: "pg",
               badge: "Postgraduate",
               icon: <Award size={20} />,
               heading: "Bachelor's Degree",
               marks: "CGPA 2.5+",
               requirements: ["Bachelor transcripts", "Minimum CGPA 2.50", "Graduation certificate"],
          },
          {
               id: "mres",
               badge: "Master's Research",
               icon: <Award size={20} />,
               heading: "MRes Degree",
               marks: "CGPA 3.0+",
               requirements: ["Research proposal", "Minimum CGPA 3.00", "References"],
          },
          {
               id: "phd",
               badge: "PhD",
               icon: <Award size={20} />,
               heading: "PhD Degree",
               marks: "CGPA 3.0+",
               requirements: ["Research proposal", "Supervisor agreement", "References"],
          },
     ];

     let academicCards = defaultAcademicCards;

     if (academicBlock?.elements && academicBlock.elements.length > 0) {
          academicCards = academicBlock.elements.map((el, idx) => {
               const title = el.element_title || "Academic Program";
               const body = el.element_body || "";
               
               let icon = <School size={20} />;
               if (idx > 0) icon = <Award size={20} />;

               // Subheading labels depending on title name
               let heading = "Degree Requirements";
               const lTitle = title.toLowerCase();
               if (lTitle.includes("undergrad")) heading = "SSC & HSC Results";
               else if (lTitle.includes("postgrad")) heading = "Bachelor's Degree";
               else if (lTitle.includes("master") || lTitle.includes("mres")) heading = "MRes Degree";
               else if (lTitle.includes("phd") || lTitle.includes("doctor")) heading = "PhD Degree";

               return {
                    id: `cms-acad-${el.id || idx}`,
                    badge: title,
                    icon,
                    heading,
                    marks: extractMarks(body),
                    requirements: extractRequirements(body),
               };
          });
     } else if (mark) {
          academicCards = Object.keys(mark).map((key, idx) => {
               const item = mark[key];
               let title = "Academic Program";
               let icon = <School size={20} />;
               let heading = "Degree Requirements";

               if (key === "ug") {
                    title = "Undergraduate";
                    icon = <School size={20} />;
                    heading = "SSC & HSC Results";
               } else if (key === "pg") {
                    title = "Postgraduate";
                    icon = <Award size={20} />;
                    heading = "Bachelor's Degree";
               } else if (key === "mres") {
                    title = "Master's Research";
                    icon = <Award size={20} />;
                    heading = "MRes Degree";
               } else if (key === "phd") {
                    title = "PhD";
                    icon = <Award size={20} />;
                    heading = "PhD Degree";
               }

               return {
                    id: `prop-acad-${key}`,
                    badge: title,
                    icon,
                    heading,
                    marks: item.mark || "",
                    requirements: item.requirements || [],
               };
          });
     }

     // 3. PARSE ENGLISH LANGUAGE SCORES
     const langScores = parseEnglishScores(englishBlock, englishScores);

     return (
          <section className="bg-gray-100">
               <section className="max-w-7xl mx-auto px-4 py-10">
                    <Heading
                         paragraph={academicDesc}
                         title={academicTitle}
                         highlight={academicBlock ? "" : "Study Abroad"}
                         color={false}
                    />
                    <motion.h2
                         initial={{
                              y: 50,
                              opacity: 0,
                         }}
                         whileInView={{
                              y: 0,
                              opacity: 1,
                         }}
                         transition={{
                              duration: 0.8,
                         }}
                         className="max-w-5xl font-medium mx-auto text-2xl my-4 text-slate-800"
                    >
                         Academic Requirements:
                    </motion.h2>
                    <motion.div className="flex items-center gap-3 mb-4">
                         <motion.div
                              variants={containerVariants}
                              initial="hidden"
                              whileInView="visible"
                              className={`w-full grid grid-cols-1 ${academicCards.length === 1 ? "max-w-2xl" : "md:grid-cols-2 max-w-5xl"} mx-auto gap-5`}
                         >
                              {academicCards.map((academy) => (
                                   <motion.div
                                        variants={cardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        key={academy?.id}
                                        className="shadow-lg border border-white bg-white p-5 relative rounded-3xl"
                                   >
                                        <div className="absolute bg-brand-primary p-2 rounded-full text-white shadow top-5 right-5">
                                             {academy?.icon}
                                        </div>
                                        <h1 className="text-2xl text-brand-primary font-semibold">
                                             {academy?.badge}
                                        </h1>
                                        <span className="text-sm font-light text-gray-500">
                                             {academy?.heading}
                                        </span>
                                        {academy?.marks && (
                                             <h2 className="my-5 text-4xl font-bold text-brand-primary">
                                                  {academy?.marks}
                                             </h2>
                                        )}
                                        <hr className="border-t border-gray-300 mt-4" />
                                        <div className="my-3 mb-1 text-xl text-black font-medium">
                                             Requirements
                                        </div>
                                        <ul>
                                             {academy?.requirements && academy.requirements.length > 0 ? (
                                                  academy.requirements.map((requirement, idx) => (
                                                       <div
                                                            key={idx}
                                                            className="flex items-center gap-2 text-gray-600"
                                                       >
                                                            <span>
                                                                 <Check
                                                                      strokeWidth={1.5}
                                                                      size={18}
                                                                 />
                                                            </span>
                                                            <li className="my-1">
                                                                 {requirement}
                                                            </li>
                                                       </div>
                                                  ))
                                             ) : (
                                                  <div className="text-sm text-gray-400 italic">No specific requirements listed.</div>
                                             )}
                                        </ul>
                                   </motion.div>
                              ))}
                         </motion.div>
                    </motion.div>

                    <motion.h2
                         initial={{
                              y: 50,
                              opacity: 0,
                         }}
                         whileInView={{
                              y: 0,
                              opacity: 1,
                         }}
                         transition={{
                              duration: 0.8,
                         }}
                         className="max-w-5xl mt-10 font-medium mx-auto text-2xl my-4 text-slate-800"
                    >
                         English Requirements:
                    </motion.h2>
                    <div className="flex flex-col md:flex-row items-stretch max-w-5xl mx-auto gap-5 mb-4">
                         {Object.keys(langScores).map((categoryKey) => {
                              const list = langScores[categoryKey];
                              if (!list || list.length === 0) return null;

                              let cardTitle = "Undergraduate";
                              if (categoryKey.toLowerCase().includes("post") || categoryKey.toLowerCase().includes("pg") || categoryKey.toLowerCase().includes("graduate")) {
                                   cardTitle = "Post Graduate";
                              } else if (categoryKey.toLowerCase().includes("mres")) {
                                   cardTitle = "Master's Research";
                              } else if (categoryKey.toLowerCase().includes("phd")) {
                                   cardTitle = "PhD";
                              } else if (categoryKey.toLowerCase().includes("undergrad") || categoryKey.toLowerCase().includes("ug")) {
                                   cardTitle = "Undergraduate";
                              } else {
                                   cardTitle = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
                              }

                              const numCategories = Object.keys(langScores).filter(k => langScores[k] && langScores[k].length > 0).length;
                              const widthClass = numCategories === 1 ? "w-full" : numCategories === 2 ? "md:w-6/12 w-full" : "md:w-4/12 w-full";

                              return (
                                   <motion.div
                                        variants={cardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        key={categoryKey}
                                        className={`${widthClass} p-3 bg-white grid shadow-lg grid-cols-1 md:grid-cols-12 rounded-3xl mx-auto gap-3`}
                                   >
                                        <h1 className="p-2 col-span-12 text-2xl font-medium text-brand-primary">
                                             {cardTitle}
                                        </h1>
                                        {list.map((pg, idx) => (
                                             <div
                                                  key={idx}
                                                  className={`${idx === list.length - 1 && list.length % 2 !== 0 ? "col-span-12" : "col-span-6"} bg-gray-100 p-5 relative rounded-2xl`}
                                             >
                                                  <h2 className="text-2xl text-brand-primary font-semibold">
                                                       {pg.name}
                                                  </h2>
                                                  <span className="text-sm font-light text-gray-500">
                                                       {pg.sub}
                                                  </span>
                                                  <h2 className="my-5 text-4xl font-bold text-brand-primary">
                                                       {pg.value}
                                                  </h2>
                                             </div>
                                        ))}
                                   </motion.div>
                              );
                         })}
                    </div>
               </section>
          </section>
     );
}
