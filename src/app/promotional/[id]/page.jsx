import Image from "next/image";
import Heading from "@/components/heading";
import PromotionalSection from "@/sections/promotionalSection";

async function getPromotionalData(id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/public/pages/${id}`,
        { cache: "no-store" },
    );
    const data = await res.json();
    return data?.data || null;
}

const blockTypeMap = {
    "academic-requirement": "academicBlock",
    "academic_requirement": "academicBlock",
    "academic_requirements": "academicBlock",
    "academic-requirements": "academicBlock",
    "english-requirement": "englishBlock",
    "english_requirement": "englishBlock",
    "english_requirements": "englishBlock",
    "english-requirements": "englishBlock",
    "promotional-living-cost": "cost",
    "living-cost": "cost",
    "living_cost": "cost",
    "promotional-tuition-fees": "tuition",
    "tuition-fees": "tuition",
    "tuition_fees": "tuition",
    "promotional-scholarship": "scholar",
    "scholarships": "scholar",
    "documents-scholarships": "scholar",
    "promotional-part-time-work": "jobs",
    "part-time-work": "jobs",
    "part_time_work": "jobs",
};

function PromotionalFallback({ title, image }) {
    return (
        <section className="bg-foreground pt-32 pb-10 md:pt-40 md:pb-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <Heading title={title || "Promotion"} color={true} />
                {image && (
                    <div className="relative w-full max-w-4xl mx-auto mt-10 aspect-video">
                        <Image
                            src={image}
                            alt={title || ""}
                            fill
                            className="object-cover rounded-2xl"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

export default async function PromotionalPage({ params }) {
    const { id } = await params;
    const pageData = await getPromotionalData(id);

    if (!pageData) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center pt-30">
                <h1 className="text-2xl font-bold text-gray-500">This promotion not found</h1>
            </div>
        );
    }

    const blocks = pageData.blocks || [];
    const resolveImage = (img) => {
        if (!img) return null;
        if (img.startsWith("http")) return img;
        return `${process.env.NEXT_PUBLIC_SITE_URL}${img}`;
    };
    const pageImage = resolveImage(pageData.image || pageData.featured_image || pageData.thumbnail || null);

    if (blocks.length === 0) {
        return <PromotionalFallback title={pageData.title} image={pageImage} />;
    }

    const studyAbroad = {
        blocks,
        reason: null,
        academicBlock: null,
        englishBlock: null,
        cost: null,
        tuition: null,
        scholar: null,
        jobs: null,
        countryName: pageData.title || "Promotion",
    };

    blocks.forEach((b) => {
        const key = blockTypeMap[b.block_type];
        if (key) studyAbroad[key] = b;
    });

    return <PromotionalSection studyAbroad={studyAbroad} />;
}
