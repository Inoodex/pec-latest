import { getAboutData } from "@/apis/getData";
import StudyProcess from "@/sections/about/processedBy";
import WorkingProcess from "@/sections/about/workingProcess";

const OurProcess = async () => {
    const { data } = await getAboutData("about", 60);
    const ourProcess = data.blocks.find(
        (block) => block.block_type === "working-proccess",
    );
    return (
        <div className=" bg-gray-100">
            <div className="md:py-20 py-10  pt-30">
                <WorkingProcess proccess={ourProcess} />
            </div>
            {/* <StudyProcess steps={data.blocks[5]} /> */}
        </div>
    );
};

export default OurProcess;
