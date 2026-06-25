"use client";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import InsuranceProtectionModal from "@/components/insuranceProtectionModal";
import { useState } from "react";

const WhyInsurance = ({ insurance }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInsuranceType, setSelectedInsuranceType] =
        useState("Health Insurance");
    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-4">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary bg-gray-300 px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
                            {insurance.subtitle}
                        </span>

                        <h2 className="mt-4 text-3xl text-brand-primary font-bold md:text-5xl">
                            {insurance.title}
                        </h2>

                        <p className="mt-6 leading-8 text-gray-600">
                            {insurance.desc}
                        </p>

                        <div className="mt-5 space-y-4">
                            {insurance.benefits.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="mt-1 text-primary" />
                                    <p className="text-gray-700">{item}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => {
                                setSelectedInsuranceType(
                                    "Student Health Insurance",
                                );
                                setIsModalOpen(true);
                            }}
                            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-primary px-8 py-4 font-semibold text-white transition hover:scale-105"
                        >
                            Apply for Insurance
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative h-125 overflow-hidden rounded-3xl"
                    >
                        <Image
                            src={insurance.image}
                            alt="Insurance Support"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
                <InsuranceProtectionModal
                    hideTrigger
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    defaultInsuranceType={selectedInsuranceType}
                />
            </div>
        </section>
    );
};

export default WhyInsurance;
