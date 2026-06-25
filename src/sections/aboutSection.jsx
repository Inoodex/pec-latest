"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import Heading from "@/components/heading";

const AboutSection = ({ aboutCompany }) => {
    const { section_title, section_description } = aboutCompany.blocks[0];
    const { element_title, element_body, link_url, image_paths } =
        aboutCompany.blocks[0].elements[0];

    // const redirectUrl = "http://localhost:3000/about/about-us";
    return (
        <section className="lg:py-20 py-10 bg-gray-100">
            <Heading
                title={aboutCompany.title}
                color={false}
                subtitle={section_title}
                paragraph={section_description}
            />
            <section className="lg:mt-20 relative mt-10 px-4 max-w-full mx-auto bg-gray-100 text-brand-contrast transition-colors duration-200">
                <section className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="lg:w-6/12 w-full"
                    >
                        <span className="py-2 px-4 bg-brand-primary rounded-full text-lg text-brand-contrast font-semibold">
                            FEATURE
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 mt-6 text-brand-primary">
                            {element_title}
                        </h1>
                        <div
                            className="mt-5 text-lg border-l-4 rounded-2xl border-gray-400 md:pl-8 pl-4 text-gray-500 md:w-120 prose max-w-none prose-p:my-0"
                            dangerouslySetInnerHTML={{
                                __html: element_body,
                            }}
                        />
                        <Link
                            // href={"https://peceduglobal.com/about/about-us"}
                            href={link_url}
                            className="underline mt-8 inline-flex text-gray-700 font-medium"
                        >
                            Read about us
                        </Link>

                        <div className="mb-20"></div>
                    </motion.div>
                    <section className="lg:w-6/12 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="relative h-full flex flex-col md:flex-row gap-4"
                        >
                            <div className="lg:absolute top-0 left-0 lg:w-100 md:w-6/12 w-full lg:h-100">
                                <Image
                                    src={
                                        image_paths?.[0]
                                            ? `${process.env.NEXT_PUBLIC_SITE_URL}/storage/${image_paths[0]}`
                                            : "/images/world.webp"
                                    }
                                    alt={"about Image"}
                                    width={1000}
                                    className="rounded-3xl w-full h-full object-cover"
                                    height={500}
                                />
                            </div>
                            <div className="lg:absolute bottom-0 right-0 lg:w-100 md:w-6/12 w-full lg:h-100">
                                <Image
                                    src={
                                        image_paths?.[1]
                                            ? `${process.env.NEXT_PUBLIC_SITE_URL}/storage/${image_paths[1]}`
                                            : "/images/contact-image.webp"
                                    }
                                    alt={"about Image"}
                                    width={1000}
                                    className="rounded-3xl w-full h-full object-cover"
                                    height={500}
                                />
                            </div>
                        </motion.div>
                    </section>
                </section>
            </section>
        </section>
    );
};

export default AboutSection;
