"use client";
import Image from "next/image";
import { motion } from "motion/react";
import Heading from "@/components/heading";

export default function WhyChooseUs({ chooseUs }) {
    if (!chooseUs || !chooseUs.blocks || !chooseUs.blocks[0]) {
        return null;
    }

    const { section_title, section_description, settings } = chooseUs.blocks[0];
    const features = chooseUs.blocks[0].elements || [];
    return (
        <section className="w-full bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
                <Heading
                    title={chooseUs.title}
                    subtitle={section_title}
                    color={false}
                />
                <motion.div
                    initial={{
                        x: 50,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.2,
                    }}
                    whileInView={{
                        x: 0,
                        opacity: 1,
                    }}
                    className="my-10 prose max-w-none text-lg prose-p:my-0"
                    dangerouslySetInnerHTML={{
                        __html: section_description,
                    }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                    <div className="flex flex-col gap-4">
                        {features.map((feature) => (
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2,
                                }}
                                key={feature.id}
                                className="bg-white rounded-2xl px-5 py-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div
                                    className={`shrink-0 w-13 h-13 text-brand-contrast rounded-xl flex items-center justify-center`}
                                >
                                    <Image
                                        src={
                                            feature?.image_paths?.length > 0
                                                ? `${process.env.NEXT_PUBLIC_SITE_URL}/storage/${feature?.image_paths[0]}`
                                                : "/images/world.webp"
                                        }
                                        alt="icon"
                                        className="rounded-lg h-full object-cover"
                                        width={500}
                                        height={500}
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-xl font-bold text-brand-primary mb-1">
                                        {feature.element_title}
                                    </h3>

                                    <div
                                        className="text-sm sm:text-[15px] text-gray-600
                    leading-relaxed prose max-w-none prose-p:my-0"
                                        dangerouslySetInnerHTML={{
                                            __html: feature.element_body,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative flex items-center justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.2,
                            }}
                            className="relative w-full max-w-120 lg:max-w-full aspect-4/4 rounded-3xl overflow-hidden border-3 border-brand-primary shadow-xl"
                        >
                            <Image
                                src={settings.section_image}
                                alt="why choose us"
                                className="object-cover"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
