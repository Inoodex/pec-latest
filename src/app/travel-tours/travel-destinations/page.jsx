import HeroBannerSlider from "@/sections/travel-destination/heroBannerSlider";
import CountryRating from "../../../sections/travel-destination/countryRating";
import FindDestination from "@/sections/travel-destination/findDestination";
import Scoreboard from "@/components/Scoreboard";
import {
    getTravelCountryCard,
    getTravelDestinations,
} from "@/apis/getTravelDestinations";
import { getPages } from "@/apis/getPages";
import { getCountriesData } from "@/apis/getCountriesData";

const TravelDestination = async () => {
    const pages = await getPages();
    const travelDestinations = await getTravelCountryCard(10);
    const pageType = pages.data.find(
        (page) => page.slug === "travel-destinations",
    );
    const data = await getTravelDestinations(pageType.slug);
    //     const countriesData = await getCountriesData("countries");
    //     console.log("countries ", countriesData);
    const heroBannerData = data?.data?.blocks?.find(
        (block) => block.block_type === "hero-banner",
    );
    const statistics = data?.data?.blocks?.find(
        (block) => block.block_type === "statistics",
    );
    const choose = data?.data?.blocks?.find(
        (block) => block.block_type === "why-choose-us-for-visa",
    );
    const cardGrid = travelDestinations?.data?.blocks?.find(
        (block) => block.block_type === "feature-grid",
    );

    return (
        <section>
            <div>
                <HeroBannerSlider data={heroBannerData} />
                <Scoreboard
                    title={
                        statistics?.section_title ||
                        "Why Travelers Choose PECEDU Global"
                    }
                    scoreObject={{
                        first: {
                            score:
                                statistics?.elements?.[0]?.element_title || "0",
                            text:
                                statistics?.elements?.[0]?.element_body ||
                                "Destination",
                        },
                        second: {
                            score:
                                statistics?.elements?.[1]?.element_title || "0",
                            text:
                                statistics?.elements?.[1]?.element_body ||
                                "Happy Travelers",
                        },
                        third: {
                            score:
                                statistics?.elements?.[2]?.element_title || "0",
                            text:
                                statistics?.elements?.[2]?.element_body ||
                                "Partner Countries",
                        },
                        fouth: {
                            score:
                                statistics?.elements?.[3]?.element_title || "0",
                            text:
                                statistics?.elements?.[3]?.element_body ||
                                "Visa Success Rate",
                        },
                    }}
                />
            </div>
            <div className="bg-gray-100">
                <FindDestination
                    cardGrid={cardGrid}
                    travelDestinations={travelDestinations?.data?.title}
                />
            </div>
            <div className="bg-foreground">
                <div className="max-w-7xl mx-auto px-4 md:py-20 py-10">
                    <CountryRating choose={choose} />
                </div>
            </div>
        </section>
    );
};

export default TravelDestination;
