"use client";

import Button from "@/components/button";
import { motion } from "motion/react";
import Image from "next/image";
import { fadeUp, slideLeft, slideRight } from "@/animation/animation";

export default function VoucherSection({ redem }) {
  if (!redem || !redem.blocks || !redem.blocks[0]) {
    return null;
  }

  const { section_title, section_description, settings } = redem.blocks[0];
  const terms = redem.blocks[0].elements || [];

  return (
    <section className="relative w-full overflow-hidden bg-gray-100 py-20 px-4 sm:px-6 lg:px-4">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-5 items-center">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_40px_rgba(124,58,237,0.10)] border border-purple-100">
              <h3 className="text-2xl md:text-3xl font-extrabold text-brand-primary mb-2">
                {section_title}
              </h3>

              <ul className="flex flex-col gap-4 mt-10 mb-8">
                {terms.map((t, i) => (
                  <motion.li
                    key={t.id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <span className="shrink-0 w-7 h-7 rounded-full bg-brand-primary text-white text-[12px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm md:text-base  text-gray-600 leading-relaxed">
                      {t.element_title}
                    </p>
                  </motion.li>
                ))}
              </ul>

              <div className="border-t border-dashed border-brand-primary pt-5 mb-6">
                <div
                  className="text-base text-[#64748b] leading-relaxed prose max-w-none prose-p:my-0"
                  dangerouslySetInnerHTML={{
                    __html: section_description,
                  }}
                />
              </div>

              <div>
                <Button url={"apply-now"}>Apply Now</Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="border-3 overflow-hidden md:h-150 rounded-2xl border-brand-accent">
              <Image
                src={settings.section_image}
                alt="laptop"
                height={1000}
                className="object-cover md:h-full h-80"
                width={1000}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
