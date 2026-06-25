import { getAboutData, getHomeData } from "@/apis/getData";
import Heading from "@/components/heading";
import AboutHero from "@/sections/about/aboutHero";
import OurMissionVision from "@/sections/about/ourMissionVision";
import WhyChooseUs from "@/sections/whyChooseUs";
import Image from "next/image";

const AboutUs = async () => {
    const { data } = await getAboutData("about", 60);
    const { home } = await getHomeData("home", 60);
    const ourValues = data.blocks.find(
        (block) => block.block_type === "our-values",
    );
    const elements = ourValues?.elements || [];
    return (
        <div>
            <AboutHero heroData={data.blocks} />
            <OurMissionVision missionVisionData={data.blocks} />
            <WhyChooseUs chooseUs={home.why_choose_us} />

            {elements.length > 0 && (
                <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 md:py-20">
                    <div className="mx-auto max-w-7xl">
                        <Heading
                            title={ourValues?.section_title || "Our Values"}
                            paragraph={ourValues?.section_description}
                            color={false}
                        />

                        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                            {elements.map((value, index) => (
                                <article
                                    key={value.id}
                                    className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40 hover:bg-white hover:shadow-lg"
                                >
                                    <h2 className="mb-3 text-2xl font-semibold leading-tight text-brand-primary">
                                        {value.section_title ||
                                            value.element_title}
                                    </h2>

                                    <div
                                        className="prose max-w-none text-base leading-relaxed text-gray-600 prose-p:my-0 prose-ul:my-0 prose-li:my-1"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                value.section_description ||
                                                value.element_body ||
                                                "",
                                        }}
                                    />
                                </article>
                            ))}
                            <div className="h-80 rounded-2xl overflow-hidden">
                                <Image
                                    src={"/images/documentation.webp"}
                                    alt="our values"
                                    className="h-full object-cover"
                                    height={1000}
                                    width={1000}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default AboutUs;
