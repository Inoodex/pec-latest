import StudyCountry from "@/sections/study-abroad/studyCountry";
import StudyAbroadRequirements from "@/sections/study-abroad/studyAbroadRequirements";
import StudyAbroadTimeline from "@/sections/study-abroad/journeyTimeline";
import WhyChooseUs from "@/sections/whyChooseUs";
import UniversitySection from "@/sections/study-abroad/universitiesSection";
import ServicesSection from "@/sections/servicesSection";
import WorkingProcess from "@/sections/about/workingProcess";
import BlogsSection from "@/sections/blogsSection";
import FAQSection from "@/sections/study-abroad/faq";
import StudyHero from "@/sections/study-abroad/studyHero";
import CallToActionBanner from "@/sections/study-abroad/callToActionBanner";
import Certifications from "@/sections/study-abroad/certifications";
import { getAboutData, getHomeData, getStudyAbroadData } from "@/apis/getData";
import { getUniversitiesData } from "@/apis/getUniversities";
// import PromotionalSection from "@/sections/promotionalSection";

const StudyAbroad = async () => {
  const { home } = await getHomeData("home", 60);
  const { data } = await getAboutData("about", 60);
  const { data: studyAbroad } = await getStudyAbroadData("study-abroad", 60);
  const universityData = await getUniversitiesData("universities");

  return (
    <section className="overflow-x-hidden">
      <StudyHero studyAbroad={studyAbroad} />
      <StudyCountry continent={studyAbroad?.blocks?.[1]} />
      <Certifications certifications={studyAbroad?.blocks?.[2]} />
      <StudyAbroadRequirements
        mark={{
          ug: {
            mark: "55% - 70%",
            requirements: [
              "55–70% marks in both SSC & HSC",
              "Varies by university & program",
              "GPA minimum often 3.0 out of 5.0",
            ],
          },
          pg: {
            mark: "50% - 65%",
            requirements: [
              "50–65% marks in bachelor's",
              "CGPA 2.5–3.0 / 4.0 scale",
              "Relevant field preferred",
            ],
          },
        }}
      />
      <StudyAbroadTimeline timeline={studyAbroad?.blocks?.[4]} />
      {/* <WhyChooseUs chooseUs={home?.why_choose_us} /> */}
      <UniversitySection universities={studyAbroad?.blocks?.[5]} />
      {/* <ServicesSection services={home?.services} /> */}

      {/* <PromotionalSection /> */}

      <CallToActionBanner banner={studyAbroad?.blocks?.[7]} />
      {/* <WorkingProcess proccess={data?.blocks[1]} />
            <BlogsSection blogs={home?.latest_blogs} /> */}
      <FAQSection faq={studyAbroad?.blocks?.[6]} />
    </section>
  );
};

export default StudyAbroad;
