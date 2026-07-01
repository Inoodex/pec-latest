"use client";
import Heading from "@/components/heading";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
export const continents = [
    {
        name: "Asia",
    },
    {
        name: "Europe",
    },
    {
        name: "North America",
    },
    {
        name: "Australia",
    },
];
const StudyCountry = ({ continent }) => {
    const { section_title, section_description, settings, elements } =
        continent || {};
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const mergedContinents =
        elements?.map((element, index) => {
            return {
                ...element,
                ...continents[index],
            };
        }) || [];
    return (
        <section className="bg-foreground">
            <section className="max-w-7xl mx-auto md:py-20 py-10 sm:px-4">
                <Heading
                    paragraph={section_description}
                    subtitle={settings?.subtitle}
                    title={section_title}
                />

                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl text-center mx-auto text-lg text-brand-soft-text mb-10 px-4 leading-relaxed"
                ></motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 rounded-3xl overflow-hidden">
                    {mergedContinents.map((continent) => (
                        <Link
                            href={`/study-abroad/${continent.name.toLowerCase().replace(/\s+/g, "-")}`}
                            key={continent.id}
                        >
                            <div className="relative group h-100">
                                <motion.h1
                                    initial={{
                                        y: 50,
                                        opacity: 0,
                                    }}
                                    whileInView={{
                                        y: 0,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                    }}
                                    className="text-4xl absolute z-10 top-1/2 left-1/2 -translate-1/2 text-center font-bold text-brand-contrast"
                                >
                                    {continent.element_title === "Australia" ? "Explore Australia" : continent.element_title}
                                </motion.h1>
                                <Image
                                    src={`${apiUrl}/storage/${continent.image_paths[0]}`}
                                    alt={continent.element_title || "Continent"}
                                    height={1000}
                                    className="h-full object-cover group-hover:brightness-50 group-hover:blur-[3px] brightness-75 duration-300"
                                    width={1000}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default StudyCountry;
