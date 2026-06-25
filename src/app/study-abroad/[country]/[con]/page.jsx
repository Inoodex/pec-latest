import { getCountriesData } from "@/apis/getCountriesData";
import { getCountryGuide } from "@/apis/getCountryGuide";
import { getAboutData, getHomeData, getStudyAbroadData } from "@/apis/getData";
import { getUniversitiesData } from "@/apis/getUniversities";
import CountryUniversities from "@/components/countryUniversities";
import Heading from "@/components/heading";
import Multipurpose from "@/components/multipurpose";
import OverviewSummary from "@/components/overviewSummary";
import Scoreboard from "@/components/Scoreboard";
import WorkingProcess from "@/sections/about/workingProcess";
import BenefitsSection from "@/sections/benefitSection";
import BlogsSection from "@/sections/blogsSection";
import PopularDestinationsHero from "@/sections/popular-destinations/popular-destinations";
import ServicesSection from "@/sections/servicesSection";
import CallToActionBanner from "@/sections/study-abroad/callToActionBanner";
import CostTable from "@/sections/study-abroad/costTable";
import TuitionTable from "@/sections/study-abroad/tuitionTable";
import DocumentsAndScholarships from "@/sections/study-abroad/documentsScholar";
import EducationSystem from "@/sections/study-abroad/educationSystem";
import FAQSection from "@/sections/study-abroad/faq";
import ReasonToStudy from "@/sections/study-abroad/reasonToStudy";
import StudyAbroadRequirements from "@/sections/study-abroad/studyAbroadRequirements";
import VoucherSection from "@/sections/voucher";
import WhyChooseUs from "@/sections/whyChooseUs";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StaticPage from "@/components/staticPage";

export const countryToContinent = {
    // Asia
    BD: "Asia",
    IN: "Asia",
    PK: "Asia",
    CN: "Asia",
    JP: "Asia",
    KR: "Asia",
    MY: "Asia",
    SG: "Asia",
    TH: "Asia",
    ID: "Asia",
    VN: "Asia",
    PH: "Asia",
    LK: "Asia",
    NP: "Asia",
    MM: "Asia",
    KH: "Asia",
    LA: "Asia",
    MN: "Asia",
    TW: "Asia",
    HK: "Asia",
    MO: "Asia",
    TR: "Asia",
    SA: "Asia",
    AE: "Asia",
    QA: "Asia",

    // North America
    US: "North America",
    CA: "North America",
    MX: "North America",
    CU: "North America",
    JM: "North America",
    BR: "North America",
    AR: "North America",
    CL: "North America",
    CO: "North America",
    PE: "North America",
    VE: "North America",
    EC: "North America",
    UY: "North America",
    PY: "North America",
    BO: "North America",
    CR: "North America",
    PA: "North America",
    GT: "North America",

    // Europe
    UK: "Europe",
    GB: "Europe",
    FR: "Europe",
    DE: "Europe",
    IT: "Europe",
    ES: "Europe",
    NL: "Europe",
    SE: "Europe",
    CH: "Europe",
    NO: "Europe",
    DK: "Europe",
    BE: "Europe",
    PL: "Europe",
    IE: "Europe",
    FI: "Europe",
    AT: "Europe",
    PT: "Europe",
    GR: "Europe",
    UA: "Europe",
    RO: "Europe",
    CZ: "Europe",
    HU: "Europe",
    BY: "Europe",
    BG: "Europe",
    HR: "Europe",
    LT: "Europe",
    LV: "Europe",
    EE: "Europe",
    LU: "Europe",
    CY: "Europe",
    MT: "Europe",
    IS: "Europe",
    SK: "Europe",
    SI: "Europe",

    // Australia / Oceania
    AU: "Australia",
    NZ: "Australia",
    FJ: "Australia",
    PG: "Australia",
    VU: "Australia",
    SB: "Australia",
    WS: "Australia",
    TO: "Australia",

    // Africa
    NG: "Africa",
    ZA: "Africa",
    EG: "Africa",
    KE: "Africa",
    MA: "Africa",
    GH: "Africa",
    ET: "Africa",
    TZ: "Africa",
    UG: "Africa",
    DZ: "Africa",
    SD: "Africa",
    TN: "Africa",
    LY: "Africa",
};

const regionSlugToContinent = {
    asia: "Asia",
    europe: "Europe",
    "north-america": "North America",
    australia: "Australia",
    oceania: "Australia",
    africa: "Africa",
};

const getCountries = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.data?.data)) return response.data.data;
    if (Array.isArray(response?.countries)) return response.countries;
    return [];
};

const formatRegionName = (slug = "") =>
    slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

const CountryDataNotFound = ({ countryName, regionSlug }) => (
    <section className="bg-gray-100 px-4 py-28 md:py-40">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm md:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
                Country data unavailable
            </p>
            <h1 className="mt-4 text-3xl font-bold text-brand-primary md:text-5xl">
                No data found for {countryName}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                We do not have study abroad details for this country yet. Please
                choose another country from {formatRegionName(regionSlug)}.
            </p>
            <Link
                href={`/study-abroad/${regionSlug}`}
                className="mt-8 inline-flex rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white transition hover:bg-brand-primary"
            >
                Back to Countries
            </Link>
        </div>
    </section>
);

const SingleCountry = async ({ params }) => {
    const countryObject = await params;

    const targetCountrySlug = countryObject.con
        .toLowerCase()
        .replace(/[-\s]+/g, "");
    const regionSlug = countryObject.country.toLowerCase();
    const targetContinent = regionSlugToContinent[regionSlug] || regionSlug;

    const countriesData = await getCountriesData("countries", 20);
    const apiCountries = getCountries(countriesData);
    const regionalCountries = apiCountries.filter((country) => {
        const isoCode = country.iso_code?.toUpperCase();

        return (
            countryToContinent[isoCode]?.toLowerCase() ===
            targetContinent.toLowerCase()
        );
    });
    const currentApiCountry = regionalCountries.find(
        (c) =>
            c.id === Number(countryObject.con) ||
            c.name?.toLowerCase().replace(/[-\s]+/g, "") ===
                targetCountrySlug ||
            (c.iso_code || "").toLowerCase() === targetCountrySlug,
    );
    const currentCountryId = currentApiCountry ? currentApiCountry.id : null;

    const countryID = currentApiCountry;

    if (!countryID) {
        notFound();
    }

    // 2. Fetch universities (per_page=1000 to get all, not just first page)
    const universitiesData = await getUniversitiesData(
        "universities?per_page=1000",
        20,
    );
    const apiUniversities = universitiesData?.data?.data || [];

    // Filter universities by the current country's ID
    const filteredApiUniversities = currentCountryId
        ? apiUniversities.filter((u) => u.country?.id === currentCountryId)
        : [];

    // 3. Use API country data as the source of truth for this region.
    const selectedCountry = currentApiCountry;

    const universities = filteredApiUniversities.map((apiUni) => {
        const staticUni = selectedCountry?.university?.find(
            (su) =>
                su.name.toLowerCase().replace(/[-\s]+/g, "") ===
                apiUni.name.toLowerCase().replace(/[-\s]+/g, ""),
        );

        const logoUrl = apiUni.logo
            ? apiUni.logo.startsWith("http")
                ? apiUni.logo
                : `${process.env.NEXT_PUBLIC_SITE_URL}${apiUni.logo}`
            : staticUni?.logo ||
              "/study_abroad/university-of-wolverhampton.webp";

        return {
            id: apiUni.id,
            name: apiUni.name,
            logo: logoUrl,
            location: apiUni.location || staticUni?.location || "N/A",
            tuition: apiUni.tuition_range || staticUni?.tuition || "N/A",
            students: staticUni?.students || "N/A",
            desc:
                apiUni.description ||
                staticUni?.desc ||
                "No description available.",
            url: apiUni.website || staticUni?.url || "#",
        };
    });

    // others

    const { home } = await getHomeData("home", 60);
    const { data } = await getAboutData("about", 60);
    const { data: studyAbroad } = await getStudyAbroadData("study-abroad", 60);
    const res = await getCountryGuide(countryID.id, 60);
    const country = res?.data;

    if (!country?.blocks?.length) {
        return (
            <CountryDataNotFound
                countryName={countryID.name || "this country"}
                regionSlug={regionSlug}
            />
        );
    }

    // Blocks lookup from dynamic Country Guide Guide API
    const heroBlock = country?.blocks?.find(
        (b) => b?.block_type === "hero_section",
    );
    const reasonBlock = country?.blocks?.find(
        (b) => b?.block_type === "feature-grid",
    );
    const partnerBlock = country?.blocks?.find(
        (b) => b?.block_type === "partner-universities",
    );

    const academicRequirementsBlock = country?.blocks?.find(
        (b) =>
            b?.block_type === "academic-requirements" ||
            b?.block_type === "academic_requirements",
    );

    const englishRequirementsBlock = country?.blocks?.find(
        (b) =>
            b?.block_type === "english-requirements" ||
            b?.block_type === "english_requirements",
    );

    const scholarBlock =
        country?.blocks?.find(
            (b) =>
                b?.block_type === "required-documents" ||
                b?.block_type === "required_documents" ||
                b?.block_type === "documents" ||
                b?.block_type === "scholarships" ||
                b?.block_type === "documents-scholarships",
        ) || country?.blocks?.[3];

    const ctaBlock =
        country?.blocks?.find(
            (b) =>
                b?.block_type === "cta-banner" ||
                b?.block_type === "cta_banner",
        ) || studyAbroad?.blocks?.[7];

    const statisticBlock = country?.blocks?.find(
        (b) =>
            b?.block_type === "statistic-section" ||
            b?.block_type === "statistic_section",
    );

    const faqBlock = country?.blocks?.find(
        (b) => b?.block_type === "faqs" || b?.block_type === "faq",
    );

    const costBlock = country?.blocks?.find(
        (b) =>
            b?.block_type === "living-cost" ||
            b?.block_type === "living_cost" ||
            (b?.block_type === "text-content" &&
                (b?.section_title?.toLowerCase().includes("cost") ||
                    b?.elements?.[0]?.element_title
                        ?.toLowerCase()
                        .includes("cost"))),
    );

    const tuitionBlock = country?.blocks?.find(
        (b) =>
            b?.block_type === "tuition-fees" ||
            b?.block_type === "tuition_fees" ||
            b?.block_type === "tuition-cost" ||
            b?.block_type === "tuition_cost" ||
            (b?.block_type === "text-content" &&
                (b?.section_title?.toLowerCase().includes("tuition") ||
                    b?.elements?.[0]?.element_title
                        ?.toLowerCase()
                        .includes("tuition"))),
    );

    // ScoreboardProps config & dynamic mapping
    let scoreboardProps = {
        title:
            statisticBlock?.section_title ||
            `Facts about the ${country?.name || "Denmark"} at a glance`,
        scoreObject: {
            first: { text: "Customer Satisfaction", score: "90%" },
            second: { text: "Success Rate", score: "97%" },
            third: { text: "Happy Clients", score: "983+" },
            fouth: { text: "Partner University", score: "100+" },
        },
    };

    if (statisticBlock?.elements && statisticBlock.elements.length > 0) {
        const el = statisticBlock.elements;
        const stripHtml = (html) =>
            html ? html.replace(/<[^>]*>/g, "").trim() : "";
        scoreboardProps.scoreObject = {
            first: {
                text: stripHtml(el[0]?.element_body) || "Customer Satisfaction",
                score: el[0]?.element_title || "90%",
            },
            second: {
                text: stripHtml(el[1]?.element_body) || "Success Rate",
                score: el[1]?.element_title || "97%",
            },
            third: {
                text: stripHtml(el[2]?.element_body) || "Happy Clients",
                score: el[2]?.element_title || "983+",
            },
            fouth: {
                text: stripHtml(el[3]?.element_body) || "Partner University",
                score: el[3]?.element_title || "100+",
            },
        };
    }

    // Dynamic partner universities mapping for country
    const countryPartners =
        home?.partners?.filter(
            (uni) => uni.country?.id === Number(countryID.id),
        ) || [];

    const dynamicElements = countryPartners.map((uni) => {
        let relativeLogo = uni.logo || "";
        if (relativeLogo.startsWith("/storage/")) {
            relativeLogo = relativeLogo.replace("/storage/", "");
        } else if (relativeLogo.startsWith("storage/")) {
            relativeLogo = relativeLogo.replace("storage/", "");
        }

        return {
            id: uni.id,
            element_title: uni.name,
            element_body: uni.description || uni.location || "",
            link_url:
                uni.website ||
                `/study-abroad/${uni.country?.name?.toLowerCase()}/${uni.slug}`,
            image_paths: relativeLogo ? [relativeLogo] : [],
        };
    });

    const educationSystem = country?.blocks?.find(
        (b) => b?.block_type === "education_system",
    );
    const studentLife = country?.blocks?.find(
        (b) => b?.block_type === "student-life",
    );
    const partTimeWork = country?.blocks?.find(
        (b) => b?.block_type === "part-time-work",
    );
    const settlementPath = country?.blocks?.find(
        (b) => b?.block_type === "settlement-path",
    );
    const overviewSummary = country?.blocks?.find(
        (b) => b?.block_type === "overview",
    );

    const universitiesProps = {
        section_title:
            partnerBlock?.section_title ||
            "We're proud to partner with Top Universities",
        section_description: partnerBlock?.section_description || "",
        elements:
            universities.length > 0
                ? universities
                : dynamicElements.length > 0
                  ? dynamicElements
                  : partnerBlock?.elements || [],
    };

    return (
        <section className="overflow-x-hidden">
            <PopularDestinationsHero heroBlock={heroBlock} />
            <ReasonToStudy reason={reasonBlock} />
            <EducationSystem
                educationSystem={educationSystem}
                countryID={countryID}
            />
            <CountryUniversities
                universities={universitiesProps}
                countryID={countryID}
                countryObject={countryObject}
            />
            <Multipurpose data={studentLife} />
            <CallToActionBanner banner={ctaBlock} />
            <Multipurpose data={partTimeWork} />
            <TuitionTable tuition={tuitionBlock} countryName={country?.name} />
            <CostTable cost={costBlock} countryName={country?.name} />
            <Multipurpose data={settlementPath} />
            <DocumentsAndScholarships scholar={scholarBlock} />
            <OverviewSummary overviewSummary={overviewSummary} />
            <StaticPage />

            {/* <WhyChooseUs chooseUs={home.why_choose_us} /> */}
            {/* <WorkingProcess proccess={data.blocks[1]} /> */}
            {/* <BenefitsSection benefits={home.home_page[1]} /> */}
            {/* <StudyAbroadRequirements
                academicBlock={academicRequirementsBlock}
                englishBlock={englishRequirementsBlock}
            /> */}
            {/* <Scoreboard
                scoreObject={scoreboardProps.scoreObject}
                title={scoreboardProps.title}
            /> */}
            {/* <VoucherSection redem={home.terms} /> */}
            {/* <FAQSection faq={faqBlock} /> */}
            {/* <BlogsSection blogs={home.latest_blogs} /> */}
        </section>
    );
};

export default SingleCountry;
