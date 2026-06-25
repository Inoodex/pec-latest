"use client";
import Button from "@/components/button";
import Heading from "@/components/heading";
import { CirclePlus, Layers, X, Check } from "lucide-react";
import { motion } from "motion/react";

export default function ComparisonSection({ comparison }) {
  const { section_title } = comparison.blocks[0];
  const elements = comparison.blocks[0].elements;

  const mergedElement = elements.map((element) => {
    const title = element.element_title?.trim();

    const shouldBeChecked =
      title === "Authorised by International Universities" ||
      title === "Gift Hamper"||
      title === "Health Insurance Guidance" ||
       title === "IELTS Registration Cashback" 


    return {
      ...element,
      others: shouldBeChecked ? true : false,
      pecedu: true,
    };
  });

  return (
    <section className="md:py-20 py-10 px-4 bg-foreground">
      <div className="max-w-5xl mx-auto">
        <Heading title={comparison.title} subtitle={section_title} />

        <div className="grid md:grid-cols-2 grid-cols-1 mt-10 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-2xl overflow-hidden"
          >
            <div className="bg-white px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f0ede8] flex items-center justify-center shrink-0">
                <CirclePlus strokeWidth={1} className="text-brand-primary" />
              </div>
              <div>
                <p className="text-[13px] md:text-lg font-semibold text-[#444]">
                  Other Consultancy
                </p>
                <p className="text-[10px] text-[#bbb] font-medium tracking-wide uppercase">
                  Standard
                </p>
              </div>
            </div>
            {mergedElement.map((feature, index) => (
              <div
                key={index}
                className="bg-brand-secondary hover:bg-white/98 px-5 flex items-center border-t border-brand-primary/30 gap-4"
              >
                <div className="text-[10px] text-[#bbb] font-medium tracking-wide uppercase">
                  {feature.others ? (
                    <div className="bg-[#05351c] w-fit rounded-full p-1 my-3 flex items-center justify-center">
                      <Check stroke="white" size={12} strokeWidth={2.5} />
                    </div>
                  ) : (
                    <div className="bg-red-500/80 w-fit rounded-full p-1 my-3 flex items-center justify-center">
                      <X stroke="white" size={12} strokeWidth={2.5} />
                    </div>
                  )}
                </div>
                <p className="text-[13px] md:text-base font-semibold text-[#444]">
                  {feature.element_title}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-2xl overflow-hidden"
          >
            <div className="bg-brand-primary px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Layers strokeWidth={1} stroke="#FFF" />
              </div>
              <div>
                <p className="text-[13px] md:text-lg font-semibold text-white">
                  PECEDU Global
                </p>
                <p className="text-[10px] text-gray-300 font-semibold tracking-wide uppercase">
                  Recommended
                </p>
              </div>
            </div>
            <div className="bg-linear-150 from-brand-primary to-brand-primary/10">
              {mergedElement.map((feature, index) => (
                <div
                  key={index}
                  className="hover:bg-white/5 px-5 flex items-center border-t border-white/30 gap-4"
                >
                  <div className="text-[10px] text-[#bbb] font-medium tracking-wide uppercase">
                    {feature.pecedu ? (
                      <div className="bg-[#05351c] w-fit rounded-full p-1 my-3 flex items-center justify-center">
                        <Check stroke="white" size={12} strokeWidth={2.5} />
                      </div>
                    ) : (
                      <div className="bg-red-500/80 w-fit rounded-full p-1 my-3 flex items-center justify-center">
                        <X stroke="white" size={12} strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                  <p className="text-[13px] md:text-base font-semibold text-white">
                    {feature.element_title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mt-10">
          <Button url={"apply-now"}>Book Free Consultation</Button>
        </div>
      </div>
    </section>
  );
}
