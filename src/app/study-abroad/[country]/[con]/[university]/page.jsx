import StudyAbroadRequirements from "@/sections/study-abroad/studyAbroadRequirements";
import Accommodation from "@/sections/university/accomodation";
import ScholarFeeTable from "@/sections/university/scholarFeeTable";
import TutionFeesTable from "@/sections/university/tutionFeeTable";
import UniversityHero from "@/sections/university/universityHero";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getStudyAbroadData } from "@/apis/getStudyAbroadData";
import { getUniversityDetails } from "@/apis/getUniversityDetails";
import { getUniversityGuide } from "@/apis/getUniversityGuide";

const Uniservity = async ({ params }) => {
    const { university } = await params;

    const universityDetails = await getUniversityDetails(university);
    const universityGuide = await getUniversityGuide(university);

    // Fetch dynamic page data for this university ID
    let pageData = null;
    try {
        const response = await getStudyAbroadData(
            `university-guide/${university}`,
        );
        if (response?.success && response?.data) {
            pageData = response.data;
        }
    } catch (error) {
        console.error("Failed to fetch university data", error);
    }

    if (!pageData && !universityDetails?.data) {
        notFound();
    }

    const { title, blocks } = pageData || {};
    const heroBlock = blocks?.find((b) => b.block_type === "university-hero");
    const uniData = universityDetails?.data || {};

    // Check if logo is a relative path from the backend
    const logoUrl = uniData.logo
        ? uniData.logo.startsWith("http")
            ? uniData.logo
            : `${process.env.NEXT_PUBLIC_SITE_URL}${uniData.logo}`
        : heroBlock?.settings?.section_image ||
          "/study_abroad/university-of-wolverhampton.webp";

    // Map API block data and University details to the expected format for UniversityHero
    const selectedUniversity = {
        name:
            uniData.name ||
            heroBlock?.section_title ||
            title ||
            "University Details",
        logo: logoUrl,
        desc: uniData.description || heroBlock?.section_description || "",
        location: uniData.location || heroBlock?.settings?.location || "UK",
        tuition:
            uniData.tuition_range ||
            uniData.tuition_fee ||
            heroBlock?.settings?.tuition ||
            "Contact Us",
        students:
            uniData.students ||
            uniData.total_students ||
            heroBlock?.settings?.students ||
            "Available",
        url: uniData.website || heroBlock?.settings?.url || "#",
        subtitle: heroBlock?.settings?.subtitle || "University Details",
        banner: uniData.banner
            ? uniData.banner.startsWith("http")
                ? uniData.banner
                : `${process.env.NEXT_PUBLIC_SITE_URL}${uniData.banner}`
            : logoUrl,
    };

    // Extract guide blocks from universityGuide API response
    const guideBlocks = universityGuide?.data?.blocks || [];
    const academicBlock =
        guideBlocks.find((b) => b.block_type === "academic-requirements") ||
        null;
    const englishBlock =
        guideBlocks.find((b) => b.block_type === "english-requirements") ||
        null;
    const accommodationBlock =
        guideBlocks.find((b) => b.block_type === "accommodation-hall") || null;
    const researchBlock =
        guideBlocks.find((b) => b.block_type === "research-programs") || null;
    const scholarBlock =
        guideBlocks.find((b) => b.block_type === "scholarship-fees") || null;

    return (
        <section className="bg-gray-100">
            <div className="relative h-90 overflow-hidden md:h-180">
                <Image
                    src={selectedUniversity.banner}
                    alt={selectedUniversity.name}
                    height={1000}
                    className="h-full w-full object-cover"
                    width={1000}
                    priority
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 text-white md:pb-16">
                    <p className="mb-3 text-lg font-medium uppercase tracking-wider text-white/75">
                        {selectedUniversity.subtitle}
                    </p>
                    <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                        {selectedUniversity.name}
                    </h1>
                </div>
            </div>
            <div>
                <UniversityHero university={selectedUniversity} />
            </div>
            <div className="max-w-7xl mx-auto px-4">
                <StudyAbroadRequirements
                    academicBlock={academicBlock}
                    englishBlock={englishBlock}
                />
            </div>
            {/* <DemandingSubject /> */}

            <Accommodation accommodationBlock={accommodationBlock} />
            <TutionFeesTable researchBlock={researchBlock} />
            <ScholarFeeTable scholarBlock={scholarBlock} />
        </section>
    );
};

export default Uniservity;
