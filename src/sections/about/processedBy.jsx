"use client";
import { motion } from "motion/react";
import {
  Users,
  GraduationCap,
  FileText,
  Briefcase,
  Globe,
  CalendarCheck,
  Home,
  PlaneTakeoff,
} from "lucide-react";
import Button from "../../components/button";
import Heading from "@/components/heading";

const stepsIcons = [
  {
    icon: Users,
  },
  {
    icon: GraduationCap,
  },
  {
    icon: FileText,
  },
  {
    icon: Briefcase,
  },
  {
    icon: Globe,
  },
  {
    icon: CalendarCheck,
  },
  {
    icon: Home,
  },
  {
    icon: PlaneTakeoff,
  },
];

export default function StudyProcess({ steps }) {
  const { block_type, section_title, elements } = steps;
  const mergedSteps = elements.map((step, index) => {
    return {
      ...step,
      ...stepsIcons[index],
    };
  });
  return (
    <section className="relative md:py-20 py-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-foreground">
      <div className="relative max-w-6xl mx-auto">
        <Heading subtitle={block_type} title={section_title} />

        <div className="relative mt-10">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-brand-primary" />

          <div className="space-y-8">
            {mergedSteps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: false,
                    margin: "-60px",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="relative flex items-center"
                >
                  <div className="hidden md:flex w-full items-center">
                    <div
                      className={`w-[calc(50%-2rem)] ${isLeft ? "flex justify-end pr-0" : ""}`}
                    >
                      {isLeft && (
                        <StepCard
                          step={step}
                          Icon={
                            step?.image_paths?.[0]
                              ? `${process.env.NEXT_PUBLIC_SITE_URL}/storage/${step.image_paths[0]}`
                              : step.icon
                          }
                          align="right"
                        />
                      )}
                    </div>

                    <div className="w-16 shrink-0 flex items-center justify-center z-10">
                      <div
                        className={`w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center shadow-lg ring-4`}
                      >
                        <span className="text-white text-sm font-black">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-[calc(50%-2rem)] ${!isLeft ? "flex justify-start pl-0" : ""}`}
                    >
                      {!isLeft && (
                        <StepCard step={step} Icon={step.icon} align="left" />
                      )}
                    </div>
                  </div>

                  <div className="md:hidden flex w-full items-start gap-4 pl-4">
                    <div className="relative shrink-0 flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center shadow-lg z-10`}
                      >
                        <span className="text-white text-xs font-black">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 pb-2">
                      <StepCard step={step} Icon={step.icon} align="left" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="md:mt-20 mt-10 flex justify-center">
          <Button url={"apply-now"}>Start Your Journey!</Button>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, Icon, align }) {
  return (
    <div
      className={`group relative p-5 sm:p-6 rounded-xl border border-brand-accent bg-brand-accent/60 transition-all duration-300 hover:-translate-y-1 w-full max-w-sm ${align === "right" ? "ml-auto" : "mr-auto"}`}
    >
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${step.color}`}
      >
        <Icon className="w-10 h-10 text-white bg-brand-accent rounded-xl p-1.5 shadow-md" />
      </div>

      <h3 className="text-base sm:text-xl font-bold mb-1.5 text-brand-contrast">
        {step.element_title}
      </h3>
      <div
        dangerouslySetInnerHTML={{ __html: step.element_body }}
        className="text-sm md:text-base leading-relaxed text-gray-300"
      />
    </div>
  );
}
