"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Globe2, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const countries = [
    {
        id: 1,
        name: "Canada",
        image: "/study_abroad/america.webp",
        packages: 24,
        region: "North America",
    },
    {
        id: 2,
        name: "United Kingdom",
        image: "/study_abroad/america.webp",
        packages: 18,
        region: "Europe",
    },
    {
        id: 3,
        name: "Australia",
        image: "/study_abroad/america.webp",
        packages: 16,
        region: "Oceania",
    },
    {
        id: 4,
        name: "United States",
        image: "/study_abroad/america.webp",
        packages: 21,
        region: "North America",
    },
    {
        id: 5,
        name: "Malaysia",
        image: "/study_abroad/america.webp",
        packages: 12,
        region: "Asia",
    },
    {
        id: 6,
        name: "Dubai",
        image: "/study_abroad/america.webp",
        packages: 14,
        region: "Middle East",
    },
    {
        id: 7,
        name: "Japan",
        image: "/study_abroad/america.webp",
        packages: 11,
        region: "Asia",
    },
    {
        id: 8,
        name: "Germany",
        image: "/study_abroad/america.webp",
        packages: 10,
        region: "Europe",
    },
    {
        id: 9,
        name: "Italy",
        image: "/study_abroad/america.webp",
        packages: 13,
        region: "Europe",
    },
    {
        id: 10,
        name: "France",
        image: "/study_abroad/america.webp",
        packages: 15,
        region: "Europe",
    },
    {
        id: 11,
        name: "Singapore",
        image: "/study_abroad/america.webp",
        packages: 9,
        region: "Asia",
    },
    {
        id: 12,
        name: "Turkey",
        image: "/study_abroad/america.webp",
        packages: 8,
        region: "Europe",
    },
    {
        id: 13,
        name: "Thailand",
        image: "/study_abroad/america.webp",
        packages: 19,
        region: "Asia",
    },
    {
        id: 14,
        name: "Switzerland",
        image: "/study_abroad/america.webp",
        packages: 7,
        region: "Europe",
    },
    {
        id: 15,
        name: "New Zealand",
        image: "/study_abroad/america.webp",
        packages: 5,
        region: "Oceania",
    },
    {
        id: 16,
        name: "South Korea",
        image: "/study_abroad/america.webp",
        packages: 9,
        region: "Asia",
    },
    {
        id: 17,
        name: "China",
        image: "/study_abroad/america.webp",
        packages: 6,
        region: "Asia",
    },
    {
        id: 18,
        name: "Spain",
        image: "/study_abroad/america.webp",
        packages: 10,
        region: "Europe",
    },
    {
        id: 19,
        name: "Netherlands",
        image: "/study_abroad/america.webp",
        packages: 8,
        region: "Europe",
    },
    {
        id: 20,
        name: "Sweden",
        image: "/study_abroad/america.webp",
        packages: 4,
        region: "Europe",
    },
];

const packageCategories = ["All", "Regular", "Student", "Group", "Holiday"];

const priceRanges = [
    { label: "Any Price", min: 0, max: Infinity },
    { label: "$0 - $700", min: 0, max: 700 },
    { label: "$701 - $1,000", min: 701, max: 1000 },
    { label: "$1,001 - $1,500", min: 1001, max: 1500 },
    { label: "$1,501+", min: 1501, max: Infinity },
];

const getPackageCategory = (item) => {
    const categories = ["Regular", "Student", "Group", "Holiday"];

    return categories[item.id % categories.length];
};

const getPackagePrice = (item) => 450 + item.packages * 45;

export default function AllPackagesPage() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [activeCategory, setActiveCategory] = useState("All");
    const [activePriceRange, setActivePriceRange] = useState("Any Price");

    const filteredCountries = useMemo(() => {
        const selectedRange = priceRanges.find(
            (range) => range.label === activePriceRange,
        );

        let data = countries.filter((item) => {
            const matchSearch =
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.region.toLowerCase().includes(search.toLowerCase());

            const matchCategory =
                activeCategory === "All" ||
                getPackageCategory(item) === activeCategory;

            const packagePrice = getPackagePrice(item);
            const matchPrice =
                !selectedRange ||
                (packagePrice >= selectedRange.min &&
                    packagePrice <= selectedRange.max);

            return matchSearch && matchCategory && matchPrice;
        });

        if (sortBy === "a-z") {
            data.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (sortBy === "packages-high") {
            data.sort((a, b) => b.packages - a.packages);
        }

        if (sortBy === "packages-low") {
            data.sort((a, b) => a.packages - b.packages);
        }

        return data;
    }, [activeCategory, activePriceRange, search, sortBy]);

    return (
        <div className="min-h-screen bg-slate-50">
            <section className="relative overflow-hidden h-200">
                <div className="absolute inset-0">
                    <Image
                        src="/study_abroad/america.webp"
                        alt="Travel"
                        fill
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/70 to-slate-900/50" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 lg:py-32">
                    <div className="max-w-3xl mt-20">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                            <Globe2 className="h-4 w-4" />
                            International Travel Packages
                        </div>

                        <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
                            Explore Packages By Country
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                            Browse worldwide travel destinations and discover
                            available ticket packages for students, tourists,
                            and group travelers.
                        </p>
                    </div>
                </div>
            </section>

            <section className="-mt-12 relative z-20">
                <div className="mx-auto max-w-7xl px-4 md:px-6">
                    <div className="rounded-[30px] border border-gray-200 bg-white p-5 shadow-2xl">
                        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-5 py-4">
                                <Search className="h-5 w-5 text-gray-500" />

                                <input
                                    type="text"
                                    placeholder="Search country or region..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-transparent text-sm outline-none"
                                />
                            </div>

                            <button className="rounded-2xl bg-brand-primary px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-sky-700">
                                Search Packages
                            </button>
                        </div>

                        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-end">
                            <div>
                                <p className="mb-3 text-base font-semibold text-slate-600">
                                    Sort by package type
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {packageCategories.map((item) => (
                                        <button
                                            key={item}
                                            onClick={() =>
                                                setActiveCategory(item)
                                            }
                                            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                                                activeCategory === item
                                                    ? "bg-brand-primary text-white"
                                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <label>
                                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                                        Price Range
                                    </span>
                                    <select
                                        value={activePriceRange}
                                        onChange={(e) =>
                                            setActivePriceRange(e.target.value)
                                        }
                                        className="h-12 w-full rounded-2xl border border-gray-200 bg-slate-100 px-4 text-sm font-medium text-slate-700 outline-none transition-all duration-300 hover:bg-slate-200 sm:min-w-44"
                                    >
                                        {priceRanges.map((range) => (
                                            <option
                                                key={range.label}
                                                value={range.label}
                                            >
                                                {range.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                                        Sort Packages
                                    </span>
                                    <div className="flex h-12 items-center gap-2 rounded-2xl border border-gray-200 bg-slate-100 px-4 transition-all duration-300 hover:bg-slate-200">
                                        <SlidersHorizontal className="h-5 w-5 text-gray-500" />

                                        <select
                                            value={sortBy}
                                            onChange={(e) =>
                                                setSortBy(e.target.value)
                                            }
                                            className="h-full w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
                                        >
                                            <option value="default">
                                                Default
                                            </option>
                                            <option value="a-z">
                                                Country A-Z
                                            </option>
                                            <option value="packages-high">
                                                Most Packages
                                            </option>
                                            <option value="packages-low">
                                                Least Packages
                                            </option>
                                        </select>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 md:py-20 py-10 md:px-6">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-3xl text-brand-primary font-bold md:text-5xl">
                            All Countries
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Showing{" "}
                            <span className="text-black font-bold">
                                {filteredCountries.length}
                            </span>{" "}
                            destinations
                        </p>
                    </div>
                </div>

                <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                    {filteredCountries.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.03,
                            }}
                            viewport={{ once: true }}
                            className="group overflow-hidden rounded-[30px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-all duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-1 text-sm text-slate-600">
                                    <MapPin className="h-4 w-4" />
                                    {item.region}
                                </div>

                                <h3 className="mt-3 text-3xl text-brand-primary font-bold">
                                    {item.name}
                                </h3>

                                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Available Packages
                                        </p>

                                        <h4 className="mt-1 text-3xl font-bold text-brand-primary">
                                            {item.packages}
                                        </h4>
                                    </div>

                                    <Link
                                        href={`/travel-tours/air-tickets/ticket-packages/${item.name.replace(/\s+/g, "-").toLowerCase()}`}
                                        className="rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-accent"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* EMPTY */}
                {filteredCountries.length === 0 && (
                    <div className="mt-20 rounded-[30px] bg-white p-16 text-center shadow-sm">
                        <Globe2 className="mx-auto h-14 w-14 text-sky-600" />

                        <h3 className="mt-5 text-3xl font-bold">
                            No Country Found
                        </h3>

                        <p className="mt-4 text-gray-600">
                            Try another search keyword.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
