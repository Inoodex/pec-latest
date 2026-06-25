import { getCountriesData } from "@/apis/getCountriesData";
import Heading from "@/components/heading";
import Image from "next/image";
import Link from "next/link";

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

const getImageUrl = (thumbnail) => {
    if (!thumbnail) return "";
    if (thumbnail.startsWith("http")) return thumbnail;
    return `${process.env.NEXT_PUBLIC_SITE_URL}${thumbnail}`;
};

const formatRegionName = (slug = "") =>
    slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

const SingleCountry = async ({ params }) => {
    const allCountries = await getCountriesData("countries", 20);
    const countryParams = await params;
    const regionSlug = countryParams.country.toLowerCase();
    const targetContinent = regionSlugToContinent[regionSlug] || regionSlug;
    const countries = getCountries(allCountries)
        .map((country) => {
            const isoCode = country.iso_code?.toUpperCase();

            return {
                id: country.id,
                name: country.name,
                iso_code: isoCode,
                thumbnail: getImageUrl(country.thumbnail),
                continent: countryToContinent[isoCode],
            };
        })
        .filter(
            (country) =>
                country.continent?.toLowerCase() ===
                targetContinent.toLowerCase(),
        );
    const regionName = formatRegionName(regionSlug);

    return (
        <section className="bg-gray-100">
            <div className="max-w-7xl mx-auto md:py-20 py-10 pt-30 md:pt-40 px-4 2xl:px-0">
                <Heading
                    title="Country for Study Abroad"
                    color={false}
                    highlight={regionName}
                    paragraph="Discover the unique experiences, cuisine, and attractions each country has to offer."
                />

                <p className="text-center text-2xl font-medium">
                    Select Your Country of {regionName}
                </p>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {countries.map((country) => (
                        <Link
                            href={`/study-abroad/${regionSlug}/${country.id}`}
                            key={country?.id}
                            className="bg-white rounded-xl p-4 shadow transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            {country?.thumbnail ? (
                                <div className="overflow-hidden rounded-lg">
                                    <Image
                                        src={country.thumbnail}
                                        alt={country.name}
                                        height={200}
                                        width={500}
                                        className="h-48 w-full hover:scale-115 duration-300 object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-100">
                                    <span className="text-5xl font-bold text-brand-primary">
                                        {country.iso_code}
                                    </span>
                                </div>
                            )}

                            <h2 className="mt-3 text-xl font-semibold">
                                {country?.name}
                            </h2>

                            <p className="text-gray-500">
                                Country Code: {country?.iso_code}
                            </p>
                            <button className="w-full py-2 px-4 rounded-xl bg-brand-accent mt-2 text-white cursor-pointer font-semibold">
                                View Details
                            </button>
                        </Link>
                    ))}
                </div>

                {countries.length === 0 && (
                    <p className="mt-10 text-center text-lg text-gray-500">
                        No countries found for {regionName}.
                    </p>
                )}
            </div>
        </section>
    );
};

export default SingleCountry;
