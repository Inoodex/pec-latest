import Image from "next/image";
import Heading from "./heading";

const aboutImage = "/images/about-image.png";

const OverviewSummary = ({ overviewSummary }) => {
    if (!overviewSummary) {
        return null;
    }

    const { section_title, section_description, settings } = overviewSummary;

    if (!section_title && !section_description) {
        return null;
    }

    // fallback image path
    const sectionImage =
        settings?.section_image || settings?.image || aboutImage;

    return (
        <section className="w-full flex items-start justify-center bg-gray-100 py-10 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl">
                <Heading color={false} title={section_title} />

                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mt-8">
                    <div
                        className="text-gray-700 md:w-7/12 w-full text-lg leading-relaxed
                                   [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
                                   [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4
                                   [&_li]:text-gray-600 [&_strong]:text-slate-900"
                        dangerouslySetInnerHTML={{
                            __html: section_description,
                        }}
                    />
                    <div className="md:w-5/12 w-full overflow-hidden">
                        <Image
                            src={sectionImage}
                            className="rounded-2xl object-cover w-full h-auto shadow-sm"
                            alt={section_title || "Overview Section Image"}
                            height={600}
                            width={600}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OverviewSummary;
