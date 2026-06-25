"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { cardVariants, containerVariants } from "@/animation/animation";
import Heading from "@/components/heading";
const achivement = [
  {
    id: 1,
    icons: "/study_abroad/winner.webp",
    title: "Global Recognition",
    desc: "Degrees from international universities carry worldwide recognition",
  },
  {
    id: 2,
    icons: "/study_abroad/certificate.webp",
    title: "Quality Education",
    desc: "Quality Education Access to cutting-edge facilities and world-class faculty",
  },
  {
    id: 3,
    icons: "/study_abroad/oppurtunity.webp",
    title: "Career Opportunities",
    desc: "Enhanced job prospects both globally and back in Bangladesh",
  },
  {
    id: 4,
    icons: "/study_abroad/growth.webp",
    title: "Personal Growth",
    desc: "Develop independence, adaptability, and cross-cultural communication skills",
  },
  {
    id: 5,
    icons: "/study_abroad/language.webp",
    title: "Language Proficiency",
    desc: "Language Proficiency Improve English proficiency and potentially learn new languages for global communication",
  },
  {
    id: 6,
    icons: "/study_abroad/culture.webp",
    title: "Cultural Exchange",
    desc: "Exposure to diverse cultures, perspectives, and global networking opportunities",
  },
];

export default function Certifications({ certifications }) {
  const { section_title, section_description, settings, elements } =
    certifications || {};
  return (
    <section className="bg-gray-100">
      <section className="max-w-7xl mx-auto md:py-20 py-10 px-4 xl:px-6">
        <Heading
          paragraph={section_description}
          title={section_title}
          subtitle={settings?.subtitle}
          color={false}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {elements?.map((achive) => (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              key={achive.id}
              className="min-h-80 rounded-[40px] p-2 hover:scale-105 duration-300 shadow-md bg-white"
            >
              <div className="bg-gray-100 flex items-center justify-center p-6 flex-col text-center space-y-5 h-full rounded-[36px]">
                <div>
                  <Image
                    src={achive.image_paths?.[0] ? `${process.env.NEXT_PUBLIC_SITE_URL}/storage/${achive.image_paths[0]}` : "/study_abroad/winner.webp"}
                    width={80}
                    height={50}
                    alt={achive.element_title || "Achievement"}
                  />
                </div>
                <h1 className="text-4xl font-semibold text-brand-accent">
                  {achive.element_title}
                </h1>
                <div
                  className="text-gray-600 text-base"
                  dangerouslySetInnerHTML={{ __html: achive.element_body }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </section>
  );
}
