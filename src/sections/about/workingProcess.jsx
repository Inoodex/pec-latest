"use client";
import Heading from "@/components/heading";
import { motion } from "motion/react";
import Image from "next/image";
import { cardVariants } from "@/animation/animation";

const WorkingProcess = ({ proccess }) => {
    console.log(proccess);
    if (!proccess) {
        return null;
    }

    const {
        block_type,
        section_title,
        section_description,
        elements = [],
        settings,
    } = proccess;

    return (
        <section className="bg-gray-100">
            <section className="max-w-7xl overflow-x-hidden mx-auto md:py-20 px-4 xl:px-10 2xl:px-0 py-10">
                <Heading
                    subtitle={settings.subtitle}
                    title={section_title}
                    color={false}
                    paragraph={section_description}
                />
                <div className="grid grid-cols-1 mt-10 gap-5 md:grid-cols-2 lg:grid-cols-2 lg:px-4">
                    {elements.map((element, idx) => (
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            key={element.id}
                            className="shadow-md bg-white p-2 hover:scale-102 duration-300 rounded-4xl"
                        >
                            <div className="bg-gray-100 rounded-3xl p-5 h-full">
                                <p className="text-5xl text-brand-accent font-bold">
                                    0{idx + 1}
                                </p>
                                <h1 className="my-3 text-3xl font-semibold text-brand-primary">
                                    {element.element_title}
                                </h1>
                                <div
                                    className="text-base mb-5 text-gray-600 prose max-w-none prose-p:my-0"
                                    dangerouslySetInnerHTML={{
                                        __html: element.element_body,
                                    }}
                                />
                                <div className="h-80 overflow-hidden rounded-xl">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_SITE_URL}/storage/${element.image_paths[0]}`}
                                        alt={element.element_title}
                                        className="object-cover h-full object-top hover:scale-110 duration-300"
                                        height={1000}
                                        width={1000}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default WorkingProcess;
