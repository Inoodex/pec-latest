import MedicalSlider from "@/sections/travel-tours/medical-travel-insurace/medicalSlider";
import WhyInsurance from "@/sections/travel-tours/medical-travel-insurace/whyInsurance";
import InsurancePlan from "@/sections/travel-tours/medical-travel-insurace/insurancePlan";
import MedicalPosterCTA from "@/sections/travel-tours/medical-travel-insurace/MedicalPosterCTA";
import Heading from "@/components/heading";
import Image from "next/image";

export default async function MedicalTravelInsurancePage() {
  const partners = [
    {
      id: 1,
      image: "/air-tickets/insurance/health-insurance.webp",
    },
    {
      id: 2,
      image: "/air-tickets/insurance/student-insurance.webp",
    },
    {
      id: 3,
      image: "/air-tickets/insurance/student-insurance.webp",
    },
  ];
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <MedicalSlider />

      <WhyInsurance
        insurance={{
          subtitle: "Why Insurance Matters",
          title: "Protect Your International Journey",
          desc: "Traveling abroad without insurance can expose you to unexpected medical costs, travel emergencies, and financial risks. PECEDU Global helps you stay prepared with flexible and secure insurance plans for education, tourism, medical travel, and international visits.",
          benefits: [
            "Emergency medical treatment coverage",
            "Hospitalization and ambulance support",
            "Visa-compliant student insurance",
            "Travel accident and emergency protection",
          ],
          image: "/air-tickets/insurance/health-insurance.webp",
        }}
      />

      <InsurancePlan />
      <WhyInsurance
        insurance={{
          subtitle: "Student Health Insurance",
          title: "Secure Your Study Abroad Experience",
          desc: "PECEDU Global offers reliable and affordable student health insurance plans designed for international students. Stay protected during your educational journey with worldwide medical coverage, emergency support, and visa-compliant insurance solutions.",
          benefits: [
            "Worldwide medical & emergency coverage",
            "University & visa compliant plans",
            "Affordable protection for students abroad",
            "24/7 assistance and claim support",
          ],
          image: "/air-tickets/insurance/student-insurance.webp",
        }}
      />

      <section className="md:py-20 py-10 bg-foreground">
        <Heading
          title="Our Insurance "
          highlight="Partners"
          subtitle="Insurance Partners"
          paragraph="Your Safety and Comfort are Our Priority. We Partner with Only Trusted Insurance Providers to Ensure You Receive Reliable Coverage and Support During Your Travels."
        />
        <div className="max-w-7xl grid grid-cols-1 mt-10 gap-8 md:grid-cols-3 mx-auto px-4 lg:px-0">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-center">
              <Image
                src={partner.image}
                alt={partner?.id || "image path failed"}
                width={1000}
                height={1000}
                className="object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </section>
      <MedicalPosterCTA />
    </div>
  );
}
