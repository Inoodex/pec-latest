import {
    BookOpenText,
    CreditCard,
    GraduationCap,
    Map,
    NotepadText,
    PlaneTakeoff,
    UserCheck,
    Users,
} from "lucide-react";
import Image from "next/image";
import Button from "@/components/button";
import Heading from "@/components/heading";

const SERVICE_ICONS = [
    Users,
    BookOpenText,
    Map,
    PlaneTakeoff,
    UserCheck,
    NotepadText,
    GraduationCap,
    CreditCard,
];

const ICON_PROPS = {
    size: 30,
    className: "text-brand-secondary",
    strokeWidth: 1.3,
};

const getServiceIcon = (index) => {
    const fallbackIndex = index % SERVICE_ICONS.length;
    const Icon = SERVICE_ICONS[index] || SERVICE_ICONS[fallbackIndex] || Users;

    return <Icon {...ICON_PROPS} />;
};

export default function ServicesSection({ services }) {
    if (!services || !services.blocks || !services.blocks[0]) {
        return null;
    }

    const { section_title, section_description } = services.blocks[0];
    const elements = services.blocks[0].elements || [];
    const concatServices = elements.map((item, index) => ({
        ...item,
        icon: getServiceIcon(index),
    }));
    return (
        <section
            id="services"
            className="bg-gray-100 text-brand-contrast md:py-20 py-10 px-4 transition-colors duration-200"
        >
            <div className="max-w-7xl mx-auto">
                <Heading
                    title={services.title}
                    color={false}
                    subtitle={section_title}
                    paragraph={section_description}
                />

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    {concatServices?.map((s, idx) => (
                        <ServiceCard key={s?.id || idx} {...s} />
                    ))}
                </div>
                <div className="flex items-center justify-center">
                    <Button url={"contact"}>Contact Us</Button>
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ icon, element_title, element_body, image_paths }) {
    const imgSrc =
        Array.isArray(image_paths) && image_paths.length > 0 && image_paths[0]
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/storage/${image_paths[0]}`
            : "/images/classroom.webp";

    return (
        <div
            className={`bg-gray-200 group border border-gray-300 hover:scale-103 rounded-2xl md:p-4 p-2 flex flex-col md:flex-row items-center gap-6 hover:shadow-md duration-300`}
        >
            <div className="overflow-hidden md:w-6/12 w-full h-70 rounded-xl">
                <Image
                    src={imgSrc}
                    alt={element_title || "Services"}
                    height={1000}
                    className="rounded-xl h-full object-cover duration-300 group-hover:scale-120"
                    width={1000}
                />
            </div>
            <div className="md:w-6/12 w-full p-4 pt-0">
                <div className="bg-brand-primary p-2 rounded-full  w-fit shadow-lg">
                    {icon}
                </div>
                <div>
                    <h3 className="text-brand-primary text-2xl font-semibold my-2.5 leading-snug">
                        {element_title}
                    </h3>
                    <div
                        className="text-gray-600 text-sm leading-relaxed prose max-w-none prose-p:my-0"
                        dangerouslySetInnerHTML={{
                            __html: element_body,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
