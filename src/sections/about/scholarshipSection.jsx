import Button from "@/components/button";
import Heading from "@/components/heading";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const ScholarshipSection = ({ scholarInfo }) => {
    const { section_title, section_description, settings, elements } =
        scholarInfo;
    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto md:py-20 py-10 px-4">
                <Heading
                    title={section_title}
                    subtitle={settings.subtitle}
                    color={false}
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: section_description,
                    }}
                />
                <div className="mt-10 flex flex-col xl:flex-row gap-3 items-center border p-3 bg-white rounded-3xl border-gray-200">
                    <div className="xl:w-6/12 w-full h-60 md:h-100">
                        <Image
                            src={settings.section_image}
                            alt="Scholarship"
                            className="rounded-2xl h-full object-cover"
                            width={1000}
                            height={1000}
                        />
                    </div>
                    <ul className="xl:w-6/12 w-full bg-gray-100 rounded-2xl p-3">
                        <h2 className="md:text-2xl text-xl font-semibold mb-5">
                            Eligibility Criteria:
                        </h2>
                        {elements?.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-2 my-4"
                            >
                                <span>
                                    <CheckCircle
                                        size={20}
                                        strokeWidth={1.75}
                                        className="text-brand-primary"
                                    />
                                </span>
                                <h3 className="md:text-lg text-base font-normal text-gray-800">
                                    {item.element_title}
                                </h3>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-10 flex justify-center">
                    <Button url={"apply-now"}>Free Consultation</Button>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipSection;
