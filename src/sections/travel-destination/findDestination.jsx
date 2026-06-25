"use client";

import { useMemo, useState } from "react";
import Heading from "@/components/heading";
import { Plane, Search, Globe2, MapPinned } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const regions = [
    {
        id: 1,
        title: "Asia",
        destinations: 12,
        image: "/study_abroad/asia.webp",
        icon: Globe2,
    },
    {
        id: 2,
        title: "Europe",
        destinations: 8,
        image: "/study_abroad/europe.webp",
        icon: MapPinned,
    },
    {
        id: 3,
        title: "Middle East",
        destinations: 5,
        image: "/study_abroad/america.webp",
        icon: Plane,
    },
    {
        id: 4,
        title: "Africa",
        destinations: 6,
        image: "/study_abroad/africa.webp",
        icon: Globe2,
    },
];

const FindDestination = ({ cardGrid }) => {
    const {
        section_title,
        section_description,
        elements: apiElements,
    } = cardGrid || {};
    const price = apiElements?.map((el) => el.element_title.split(" "));
    // console.log(price.length - 1);

    const elements = useMemo(() => {
        return (
            apiElements?.map((el) => ({
                id: el.id,
                countryName: el.element_title,
                desc: el.element_body?.replace(/<[^>]*>/g, ""),
                src: `${process.env.NEXT_PUBLIC_SITE_URL}/storage/${el.image_paths?.[0]}`,
                duration: "Flexible",
                price: "$600",
                region: "Global",
                visaIncluded: true,
                flightIncluded: true,
                url: el.slug || "details",
            })) || []
        );
    }, [apiElements]);

    const [activeRegion, setActiveRegion] = useState("All");
    const [search, setSearch] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [budget, setBudget] = useState("All");
    const [duration, setDuration] = useState("All");

    const filteredCountries = useMemo(() => {
        const filtered = elements.filter((country) => {
            const matchesSearch = country.countryName
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesRegion =
                activeRegion === "All" && selectedRegion === "All"
                    ? true
                    : country.region === activeRegion ||
                      country.region === selectedRegion;

            const matchesBudget = budget === "All";

            const matchesDuration =
                duration === "All" || country.duration === duration;

            return (
                matchesSearch &&
                matchesRegion &&
                matchesBudget &&
                matchesDuration
            );
        });

        return filtered;
    }, [search, activeRegion, selectedRegion, budget, duration, elements]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-20 pt-30">
            <div className="mb-10">
                <Heading
                    paragraph={section_description}
                    title={section_title}
                    color={false}
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10"
            >
                <div className="flex-1 relative">
                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search country..."
                        className="w-full pl-11 pr-4 py-4 rounded-2xl border shadow-lg"
                    />
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto lg:grid-cols-3 gap-4 mb-10">
                <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="outline-none bg-brand-primary text-white rounded-xl p-3"
                >
                    <option value="All">All Regions</option>
                    {regions.map((r) => (
                        <option key={r.id} value={r.title}>
                            {r.title}
                        </option>
                    ))}
                </select>

                <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="outline-none bg-brand-primary text-white rounded-xl p-3"
                >
                    <option value="All">Budget</option>
                    <option value="low">Under ৳70K</option>
                    <option value="mid">৳70K - ৳90K</option>
                    <option value="high">Above ৳90K</option>
                </select>

                <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="outline-none bg-brand-primary text-white rounded-xl p-3"
                >
                    <option value="All">Duration</option>
                    {[...new Set(elements.map((c) => c.duration))].map(
                        (d, i) => (
                            <option key={i} value={d}>
                                {d}
                            </option>
                        ),
                    )}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {filteredCountries.map((country, index) => (
                    <motion.div
                        key={country.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.08,
                        }}
                        viewport={{ once: true }}
                        className="group overflow-hidden relative rounded-3xl border border-slate-200 bg-white shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                    >
                        <div className="h-56 overflow-hidden">
                            <Image
                                src={country.src}
                                alt={country.countryName}
                                width={1000}
                                height={1000}
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-2xl font-bold text-brand-primary">
                                    {country.countryName}
                                </h2>
                            </div>
                            <div className="flex justify-between gap-10">
                                <h2 className="mb-2 text-2xl font-semibold">
                                    {country.price}
                                </h2>
                            </div>
                            <p className="text-slate-600 h-20 overflow-x-scroll scroll-none leading-relaxed mb-5">
                                {country.desc}
                            </p>
                            <Link
                                href={`/travel-tours/travel-destinations/${country.url}`}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-primary text-white font-semibold hover:bg-brand-primary/90 transition-all duration-300"
                            >
                                View More
                                <ArrowUpRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FindDestination;
