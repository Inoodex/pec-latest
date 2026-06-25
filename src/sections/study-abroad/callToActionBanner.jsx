import Button from "@/components/button";
import Heading from "@/components/heading";

const CallToActionBanner = ({ banner }) => {
    const { section_title, section_description, settings, elements } =
        banner || {};

    const title = section_title || "Start Your Study Abroad Journey with";
    const highlight = banner ? settings?.subtitle || "" : "PECEDU Global";
    const paragraph =
        section_description ||
        "Get expert guidance & resources to reach your academic goals. Enjoy personalized support for your journey.";
    const btnUrl = elements?.[0]?.link_url || "apply-now";
    const btnText = elements?.[0]?.element_title || "Free Counseling";

    return (
        <section className="bg-foreground md:py-20 py-10 overflow-x-hidden">
            <Heading
                title={title}
                highlight={highlight}
                paragraph={paragraph}
            />
            <div className="flex items-center justify-center">
                <Button url={"apply-now"}>{btnText}</Button>
            </div>
        </section>
    );
};

export default CallToActionBanner;
