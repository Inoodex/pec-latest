"use client";
import { motion } from "motion/react";
import {
    ShieldCheck,
    Headphones,
    Plane,
    GraduationCap,
    BadgeCheck,
    CreditCard,
} from "lucide-react";
import Heading from "@/components/heading";

const serviceCards = [
    {
        icon: ShieldCheck,
    },
    {
        icon: Headphones,
    },
    {
        icon: Plane,
    },
    {
        icon: GraduationCap,
    },
    {
        icon: BadgeCheck,
    },
    {
        icon: CreditCard,
    },
];

export default function WhyChooseUs({ choose }) {
    const { section_title, section_description, elements } = choose;
    const mergedElements = elements.map((el, idx) => ({
        ...el,
        ...serviceCards[idx],
    }));
    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <Heading
                    title="Why Choose"
                    highlight="PECEDU Global"
                    subtitle="Trusted Travel"
                    paragraph="We make your international journey simple, safe, and affordable with complete support from planning to departure."
                />

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
                    {mergedElements.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="group rounded-3xl border border-white/10 bg-linear-to-b from-white/10 to-white/5 backdrop-blur-xl p-7 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="mb-6 flex h-14 w-14 shadow items-center justify-center rounded-2xl bg-brand-primary/20 border border-brand-primary/30">
                                    <Icon
                                        size={26}
                                        className="text-brand-contrast"
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-white">
                                    {item.element_title}
                                </h3>
                                <div
                                    className="mt-3 text-lg leading-7 text-gray-300"
                                    dangerouslySetInnerHTML={{
                                        __html: item.element_body,
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
