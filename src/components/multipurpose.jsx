import Heading from "./heading";

const Multipurpose = ({ data }) => {
    if (!data) {
        return null;
    }

    // console.log("Multipurpose data:", data);

    const { section_title, section_description, elements = [] } = data;

    if (!section_title && !section_description && elements.length === 0) {
        return null;
    }

    return (
        <section className="bg-gray-200 md:py-20 py-10 px-4 2xl:px-0">
            <div className="max-w-7xl mx-auto ">
                <Heading
                    title={section_title}
                    paragraph={section_description}
                    color={false}
                />

                {elements.length > 0 && (
                    <div
                        className={`grid gap-6 ${
                            elements.length === 1
                                ? "grid-cols-1 max-w-2xl mx-auto"
                                : "grid-cols-1 md:grid-cols-2"
                        }`}
                    >
                        {elements.map((el) => {
                            const hasImage =
                                Array.isArray(el.image_paths) &&
                                el.image_paths.length > 0 &&
                                el.image_paths[0];
                            const imageUrl = hasImage
                                ? `${process.env.NEXT_PUBLIC_SITE_URL}/storage/${el.image_paths[0]}`
                                : null;

                            return (
                                <div
                                    key={el.id}
                                    className="p-6 md:p-8 rounded-3xl w-full 
                                                bg-linear-to-br from-white to-gray-50
                                                border border-gray-200
                                                shadow-md hover:shadow-xl
                                                transition-all duration-300
                                                relative overflow-hidden
                                            "
                                >
                                    <div
                                        className={
                                            imageUrl
                                                ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                                                : ""
                                        }
                                    >
                                        <div
                                            className={
                                                imageUrl
                                                    ? "lg:col-span-8 w-full"
                                                    : "w-full"
                                            }
                                        >
                                            <h1 className="text-2xl font-bold text-slate-800 mb-3 relative">
                                                {el.element_title}
                                            </h1>
                                            <div className="w-16 h-1 bg-brand-primary rounded-full mb-6"></div>
                                            <div
                                                className="text-slate-700 leading-relaxed text-md space-y-2 
                                                           [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
                                                           [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4
                                                           [&_li]:text-slate-600 [&_strong]:text-slate-900"
                                                dangerouslySetInnerHTML={{
                                                    __html: el.element_body,
                                                }}
                                            />
                                        </div>
                                        {imageUrl && (
                                            <div className="lg:col-span-4 w-full overflow-hidden rounded-2xl relative shadow-md aspect-4/3 max-h-80">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={imageUrl}
                                                    alt={
                                                        el.element_title ||
                                                        "Image"
                                                    }
                                                    className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Multipurpose;
