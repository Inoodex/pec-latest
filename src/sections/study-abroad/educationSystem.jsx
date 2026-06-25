import Heading from "@/components/heading";

const EducationSystem = async ({ educationSystem }) => {
    if (!educationSystem) {
        return null;
    }

    const { section_title, section_description, elements = [] } =
        educationSystem;

    if (!section_title && !section_description && elements.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-100 md:py-20 py-10 px-4 2xl:px-0">
            <div className="max-w-7xl mx-auto">
                <Heading
                    title={section_title}
                    color={false}
                    paragraph={section_description}
                />
                {elements.length > 0 && (
                    <div
                        className={`grid gap-5 mt-10 ${
                            elements.length === 1
                                ? "grid-cols-1 max-w-2xl mx-auto"
                                : "grid-cols-1 md:grid-cols-2"
                        }`}
                    >
                        {elements.map((el) => (
                        <div
                            key={el.id}
                            className="border p-5 border-gray-300 rounded-2xl bg-gray-200 hover:scale-105 duration-300"
                        >
                            <h1 className="text-2xl text-brand-primary mb-5 font-semibold">
                                {el.element_title}
                            </h1>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: el.element_body,
                                }}
                            />
                        </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EducationSystem;
