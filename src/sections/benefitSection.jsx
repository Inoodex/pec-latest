"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/heading";

const BenefitsSection = () => {
    const [allPagesData, setAllPagesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllPromotionalPages = async () => {
            try {
                // Fetch all 4 pages
                const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
                const baseUrl = `${siteUrl}${process.env.NEXT_PUBLIC_BASE_URL}`;
                const pageUrls = [
                    `${baseUrl}/pages/promotional-page-1`,
                    `${baseUrl}/pages/promotional-page-2`,
                    `${baseUrl}/pages/promotional-page-3`,
                    `${baseUrl}/pages/promotional-page-4`,
                ];

                const fetchPromises = pageUrls.map(url =>
                    fetch(url).then(res => res.json())
                );

                const results = await Promise.all(fetchPromises);

                const processedData = results.map((data, index) => {
                    const pageData = data?.data;
                    if (!pageData) return null;

                    const offerBlock = pageData?.blocks?.find(
                        (block) => block.block_type === "offer-summary"
                    );

                    const resolveImage = (img) => {
                        if (!img) return null;
                        if (img.startsWith("http")) return img;
                        return `${process.env.NEXT_PUBLIC_SITE_URL}${img}`;
                    };
                    const pageImage = resolveImage(pageData.image || pageData.featured_image || pageData.thumbnail || null);

                    if (offerBlock) {
                        const hasContent = offerBlock.section_description &&
                            offerBlock.section_description.replace(/<[^>]*>/g, '').trim().length > 0;
                        const hasImage = offerBlock?.settings?.section_image;

                        if (!hasContent && !hasImage && !pageImage) return null;
                    }

                    return {
                        id: pageData.id || `page-${index + 1}`,
                        slug: pageData.slug || `promotional-page-${index + 1}`,
                        title: pageData.title || `Promotional Page ${index + 1}`,
                        section_title: offerBlock?.section_title || pageData.title || "What We Offer For You",
                        section_description: offerBlock?.section_description || "",
                        section_image: resolveImage(offerBlock?.settings?.section_image) || pageImage || null,
                        blocks: pageData.blocks || [],
                    };
                });

                const filteredData = processedData.filter(item => item !== null);
                setAllPagesData(filteredData);

            } catch (error) {
                console.error("Failed to fetch promotional data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllPromotionalPages();
    }, []);

    // Show loading state
    if (loading) {
        return (
            <section className="lg:py-20 py-10 px-4 bg-foreground text-brand-contrast min-h-[400px] flex items-center justify-center">
                <div className="text-white/50 text-center">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p>Loading...</p>
                </div>
            </section>
        );
    }

    // If no data, don't render the section
    if (allPagesData.length === 0) {
        return null;
    }

    return (
        <section className="lg:py-20 py-10 px-4 bg-foreground text-brand-contrast overflow-hidden transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                <Heading
                    title="Explore Our Programs"
                    paragraph="Discover study abroad opportunities across multiple countries"
                />
            </div>
            <div className="grid grid-cols-1 max-w-7xl mt-10 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allPagesData.map((pageData, idx) => (
                    <motion.div
                        key={pageData.id || idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: idx * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden group aspect-3/4 shadow-2xl"
                    >
                        {/* Image */}
                        {pageData.section_image ? (
                            <Image
                                src={pageData.section_image}
                                alt={pageData.section_title || pageData.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-500/30 to-orange-600/10 flex items-center justify-center">
                                <span className="text-6xl">🌍</span>
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-5 pb-6 z-10">
                            <div className="w-full h-full flex flex-col justify-end gap-3">
                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug line-clamp-2">
                                    {pageData.section_title || pageData.title}
                                </h3>
                                {/* See More Button */}
                                <div className="w-full mt-2">
                                    <Link
                                        href={`/promotional/${pageData.slug}`}
                                        className="w-full py-3.5 px-6 bg-white/10 text-white rounded-2xl font-bold backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        See More
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
