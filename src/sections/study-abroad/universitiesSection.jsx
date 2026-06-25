"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/heading";

const UniversitySection = ({ universities }) => {
    const { section_title, section_description, settings, elements } =
        universities || {};
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    // console.log("University Data:", universities);

    return (
        <section className="bg-foreground">
            <section className="max-w-7xl mx-auto px-4 md:py-20 py-10 xl:px-6">
                <Heading
                    paragraph={section_description}
                    title={section_title}
                    subtitle={settings?.subtitle}
                />

                {!elements || elements.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-brand-soft-text text-lg">
                            No universities found at the moment.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                        {elements.map((uni, index) => {
                            const imageUrl = uni.image_paths?.[0]
                                ? `${apiUrl}/storage/${uni.image_paths[0]}`
                                : "/study_abroad/oxford.webp";

                            return (
                                <motion.div
                                    key={uni.id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.05,
                                    }}
                                    className="group flex flex-col h-full bg-white rounded-3xl p-3 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Image container */}
                                    <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-gray-100">
                                        <Image
                                            src={imageUrl}
                                            alt={
                                                uni.element_title ||
                                                "University"
                                            }
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Content section */}
                                    <div className="flex flex-col grow p-4 space-y-3">
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-brand-accent transition-colors duration-300 line-clamp-2">
                                            {uni.element_title}
                                        </h3>

                                        {uni.element_body && (
                                            <div
                                                className="text-gray-600 text-sm leading-relaxed line-clamp-3 overflow-hidden"
                                                dangerouslySetInnerHTML={{
                                                    __html: uni.element_body,
                                                }}
                                            />
                                        )}

                                        {/* Footer link */}
                                        <div className="pt-4 mt-auto">
                                            <Link
                                                href={uni.link_url || "#"}
                                                target={
                                                    uni.link_url
                                                        ? "_blank"
                                                        : "_self"
                                                }
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors duration-300"
                                            >
                                                Explore University
                                                <svg
                                                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </section>
        </section>
    );
};

export default UniversitySection;
