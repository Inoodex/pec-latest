"use client";
import Button from "@/components/button";
import Heading from "@/components/heading";
import { CheckLine, Layers, NotebookPen, X } from "lucide-react";
import { motion } from "motion/react";

export default function DocumentsAndScholarships({ scholar }) {
    const { section_title, section_description, elements } = scholar || {};

    const leftElements =
        elements?.filter((el, index) => {
            const order =
                el.sort_order !== undefined
                    ? parseInt(el.sort_order, 10)
                    : index + 1;
            return Math.abs(order) % 2 !== 0;
        }) || [];

    const rightElements =
        elements?.filter((el, index) => {
            const order =
                el.sort_order !== undefined
                    ? parseInt(el.sort_order, 10)
                    : index + 1;
            return Math.abs(order) % 2 === 0;
        }) || [];

    return (
        <section className="md:py-20 py-10 px-4 bg-foreground">
            <div className="max-w-5xl mx-auto">
                <Heading
                    title={section_title}
                    paragraph={section_description}
                />

                <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="rounded-2xl overflow-hidden"
                    >
                        <div className="bg-white px-5 py-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#f0ede8] flex items-center justify-center shrink-0">
                                ✅
                            </div>
                            <div>
                                <p className="text-[13px]  md:text-lg font-semibold text-[#444]">
                                    Advantages
                                </p>
                            </div>
                        </div>
                        {leftElements.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-brand-contrast hover:bg-white/95 px-5 flex items-center border-t border-brand-primary/30 gap-4"
                            >
                                <div className="text-[10px] text-[#bbb] font-medium tracking-wide uppercase">
                                    <div className="bg-foreground w-fit rounded-full p-1 my-3 ">
                                        <CheckLine stroke="white" size={14} />
                                    </div>
                                </div>
                                <p className="text-[13px] md:text-base text-gray-600">
                                    {feature.element_title}
                                </p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="rounded-2xl overflow-hidden"
                    >
                        <div className="bg-brand-primary px-5 py-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                ⚠️
                            </div>
                            <div>
                                <p className="text-[13px] md:text-lg font-semibold text-white">
                                    Disadvantages
                                </p>
                            </div>
                        </div>
                        <div className="bg-linear-150 from-brand-primary to-brand-primary/10">
                            {rightElements.map((feature, index) => (
                                <div
                                    key={index}
                                    className="hover:bg-white/5 px-5 flex items-center border-t border-white/30 gap-4"
                                >
                                    <div className="text-[10px] text-[#bbb]">
                                        <div className="bg-foreground w-fit rounded-full p-1 my-3">
                                            <X stroke="white" size={14} />
                                        </div>
                                    </div>
                                    <p className="text-[13px] md:text-base text-white">
                                        {feature.element_title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="flex justify-center mt-10">
                    <Button url={"apply-now"}>Book Free Consultation</Button>
                </div>
            </div>
        </section>
    );
}
