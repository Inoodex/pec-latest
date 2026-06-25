"use client";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import InsuranceProtectionModal from "@/components/insuranceProtectionModal";
import { useState } from "react";

const MedicalPosterCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsuranceType, setSelectedInsuranceType] =
    useState("Health Insurance");
  return (
    <section className="relative overflow-hidden bg-black py-24">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/air-tickets/insurance/health-insurance.webp"
          alt="World Map"
          fill
          className="object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-4xl font-bold text-white md:text-6xl">
            Travel With Confidence & Protection
          </h2>

          <p className="mt-6 leading-8 text-gray-300">
            Get reliable international medical and travel insurance support from
            PECEDU Global and enjoy a secure journey anywhere in the world.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary cursor-pointer px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              Apply for Insurance
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      <InsuranceProtectionModal
        hideTrigger
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        defaultInsuranceType={selectedInsuranceType}
      />
    </section>
  );
};

export default MedicalPosterCTA;
