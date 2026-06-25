"use client";
import Heading from "@/components/heading";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  HeartPulse,
  Plane,
} from "lucide-react";

const insurancePlans = [
  {
    id: 1,
    title: "Student Travel Insurance",
    icon: GraduationCap,
    desc: "Affordable insurance plans for international students covering medical emergencies, hospitalization, visa requirements, and travel support.",
    features: [
      "Visa compliant insurance",
      "Emergency hospitalization",
      "COVID-19 coverage",
      "24/7 support assistance",
    ],
  },
  {
    id: 2,
    title: "Medical Travel Insurance",
    icon: HeartPulse,
    desc: "Comprehensive medical insurance for travelers and visitors abroad with emergency care, treatment, and accident coverage.",
    features: [
      "Emergency medical treatment",
      "Doctor consultation",
      "Accident coverage",
      "Medical evacuation",
    ],
  },
  {
    id: 3,
    title: "Holiday & Tourist Insurance",
    icon: Plane,
    desc: "Travel safely with worldwide holiday insurance plans covering trip interruptions, baggage loss, and unexpected emergencies.",
    features: [
      "Trip cancellation",
      "Lost baggage support",
      "Flight delay protection",
      "Worldwide coverage",
    ],
  },
];

const InsurancePlan = () => {
  const handleLearnMore = (planTitle) => {
    setSelectedInsuranceType(getInsuranceType(planTitle));
    setIsModalOpen(true);
  };
  const getInsuranceType = (title) => {
    if (title.toLowerCase().includes("student")) {
      return "Student Health Insurance";
    }
    if (title.toLowerCase().includes("travel")) {
      return "Travel Health Insurance";
    }
    if (
      title.toLowerCase().includes("holiday") ||
      title.toLowerCase().includes("tourist")
    ) {
      return "Tourist Insurance";
    }
    return "Health Insurance";
  };
  return (
    <section className="md:py-20 py-10 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Heading
            title="Insurance Plans We"
            highlight="Provide"
            subtitle="Insurance Solutions"
            paragraph="Choose from flexible international insurance plans
                            designed for students, travelers, visitors, and
                            medical patients abroad."
          />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {insurancePlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group rounded-3xl border border-white/40 bg-brand-accent p-8 shadow-sm transition hover:-translate-y-2 hover:border-primary hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center text-white bg-white/20 shadow-lg justify-center rounded-2xl">
                  <Icon size={32} />
                </div>

                <h3 className="mt-6 text-3xl font-bold text-brand-contrast">
                  {plan.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-200">{plan.desc}</p>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-gray-200" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-8 inline-flex items-center gap-2 font-semibold bg-white/30 cursor-pointer w-full justify-center py-2 rounded-full text-white">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InsurancePlan;
