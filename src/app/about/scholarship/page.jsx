import { getAboutData } from "@/apis/getData";
import ScholarshipSection from "@/sections/about/scholarshipSection";

const Scholarship = async () => {
    const { data } = await getAboutData("about", 60);
    const scholarInfo = data.blocks.find(
        (block) => block.block_type === "scholarship-information",
    );
    console.log(scholarInfo);
    return (
        <div className="md:py-20 py-10 pt-30 bg-gray-100">
            <ScholarshipSection scholarInfo={scholarInfo} />
        </div>
    );
};

export default Scholarship;
