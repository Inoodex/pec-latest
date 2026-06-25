import Button from "@/components/button";

export default function OurMissionVision({ missionVisionData }) {
    console.log(missionVisionData);
    const { section_title, section_description, settings } =
        missionVisionData[4];
    return (
        <section className="bg-white md:py-20 py-10 px-4 xl:px-0">
            <section className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto">
                {missionVisionData.slice(2, 4).map((missionvision) => (
                    <div
                        key={missionvision.id}
                        className="flex flex-col lg:flex-row gap-8"
                    >
                        <div className="w-full">
                            <h1 className="text-4xl font-semibold text-brand-primary mb-4">
                                {missionvision.section_title}
                            </h1>
                            <div
                                className="text-lg prose text-gray-600 max-w-none prose-p:my-0"
                                dangerouslySetInnerHTML={{
                                    __html: missionvision.section_description,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </section>
            <div className="max-w-6xl mt-10 mx-auto text-center rounded-2xl bg-linear-120 from-brand-primary p-6 to-brand-accent">
                <h1 className="md:text-5xl text-3xl text-white font-semibold mb-5">
                    {section_title}
                </h1>
                <div
                    className="md:text-base text-sm prose text-gray-200 max-w-3xl mx-auto prose-p:my-0"
                    dangerouslySetInnerHTML={{
                        __html: section_description,
                    }}
                />
                <div className="flex items-center justify-center">
                    <Button url={"apply-now"}>Join With Us</Button>
                </div>
            </div>

            <div></div>
        </section>
    );
}
