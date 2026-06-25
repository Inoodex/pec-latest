"use client";

import { motion } from "motion/react";
import Heading from "@/components/heading";
import { ArrowRight, Clock3, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const AirTicketsPackages = ({ allPackages }) => {
    const [search, setSearch] = useState("");
    const [flightSearch, setFlightSearch] = useState({
        category: "All",
        tripType: "One Way",
        from: "Dhaka",
        to: "Canada",
        departureDate: "",
        returnDate: "",
        travelers: "1",
        ticketClass: "Economy",
    });

    const sliderRef = useRef(null);
    const isInteracting = useRef(false);

    // ১. ফিল্টার করা প্যাকেজ
    const filteredPackages = useMemo(() => {
        const terms = search.toLowerCase().split(" ").filter(Boolean);
        const category = flightSearch.category.toLowerCase();

        return allPackages.filter((item) => {
            const packageText =
                `${item.title} ${item.country} ${item.type}`.toLowerCase();

            const matchesCategory =
                category === "all" || item.type.toLowerCase() === category;

            const matchesSearch =
                terms.length === 0 ||
                terms.some((term) => packageText.includes(term));

            return matchesCategory && matchesSearch;
        });
    }, [flightSearch.category, search, allPackages]);

    // ২. ইনফিনিটি লুপের জন্য ডুপ্লিকেট লিস্ট তৈরি (ডাটা কম থাকলে লুপ সুন্দর দেখানোর জন্য)
    const displayPackages = useMemo(() => {
        if (filteredPackages.length === 0) return [];
        // যদি ডাটা খুব কম থাকে, ইনফিনিটি এফেক্টের জন্য ট্রিপল বা ডাবল করা ভালো
        if (filteredPackages.length < 6) {
            return [
                ...filteredPackages,
                ...filteredPackages,
                ...filteredPackages,
            ];
        }
        return [...filteredPackages, ...filteredPackages];
    }, [filteredPackages]);

    // ৩. অটো-স্লাইডার এবং ইনফিনিটি স্ক্রল হ্যান্ডলার
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider || filteredPackages.length === 0) return;

        let animationFrame;

        const autoSlide = () => {
            if (!isInteracting.current) {
                slider.scrollLeft += 0.8; // স্ক্রল স্পিড

                const halfWidth = slider.scrollWidth / 2;

                // যখন স্ক্রল অর্ধেক পার হয়ে যাবে, তখন নিঃশব্দে শুরুতে ফেরত নিয়ে আসবে
                if (slider.scrollLeft >= halfWidth) {
                    slider.scrollLeft -= halfWidth;
                }
            }
            animationFrame = requestAnimationFrame(autoSlide);
        };

        animationFrame = requestAnimationFrame(autoSlide);

        // ইউজার যখন নিজে স্ক্রল বা ইন্টারঅ্যাক্ট করবে তখন অটো-স্লাইড পজিশন ঠিক রাখা
        const handleScroll = () => {
            const halfWidth = slider.scrollWidth / 2;
            if (slider.scrollLeft >= halfWidth) {
                slider.scrollLeft -= halfWidth;
            } else if (slider.scrollLeft <= 0) {
                slider.scrollLeft += halfWidth;
            }
        };

        const pause = () => {
            isInteracting.current = true;
        };
        const play = () => {
            isInteracting.current = false;
        };

        slider.addEventListener("scroll", handleScroll);
        slider.addEventListener("mouseenter", pause);
        slider.addEventListener("mouseleave", play);
        slider.addEventListener("touchstart", pause);
        slider.addEventListener("touchend", play);

        return () => {
            cancelAnimationFrame(animationFrame);
            slider.removeEventListener("scroll", handleScroll);
            slider.removeEventListener("mouseenter", pause);
            slider.removeEventListener("mouseleave", play);
            slider.removeEventListener("touchstart", pause);
            slider.removeEventListener("touchend", play);
        };
    }, [filteredPackages]);

    // ৪. লেফট এবং রাইট বাটন ক্লিক ফাংশন
    const slidePackages = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        // ইউজার বাটনে ক্লিক করলে সাময়িক অটো-স্লাইড অফ থাকবে
        isInteracting.current = true;

        const firstCard = slider.querySelector("[data-package-card]");
        const cardWidth = firstCard?.offsetWidth || 360;
        const styles = window.getComputedStyle(slider);
        const gap = parseFloat(styles.gap) || 28;

        slider.scrollBy({
            left: direction * (cardWidth + gap),
            behavior: "smooth",
        });

        // ক্লিক অ্যানিমেশন শেষ হওয়ার পর আবার অটো-স্লাইড অন হবে
        setTimeout(() => {
            isInteracting.current = false;
        }, 600);
    };

    const handleFlightSearch = (event) => {
        event.preventDefault();
        setSearch(
            `${flightSearch.to} ${flightSearch.ticketClass} ${flightSearch.tripType}`,
        );
    };

    const updateFlightSearch = (field, value) => {
        setFlightSearch((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const swapRoute = () => {
        setFlightSearch((current) => ({
            ...current,
            from: current.to,
            to: current.from,
        }));
    };

    return (
        <div>
            {/* সার্চ ফর্ম সেকশন */}
            {/* <section className="relative z-20 -mt-15 sm:-mt-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="mx-auto -mb-7 grid w-full max-w-2xl grid-cols-5 overflow-hidden rounded-xl bg-white shadow-xl sm:rounded-2xl">
                        {["All", "Regular", "Student", "Group", "Holiday"].map(
                            (item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() =>
                                        updateFlightSearch("category", item)
                                    }
                                    className={`flex items-center justify-center px-2 py-4 text-xs font-semibold transition sm:px-3 sm:text-base ${
                                        flightSearch.category === item
                                            ? "border-b-2 border-brand-primary text-brand-primary"
                                            : "text-slate-700 hover:bg-slate-50"
                                    }`}
                                >
                                    {item}
                                </button>
                            ),
                        )}
                    </div>

                    <form
                        onSubmit={handleFlightSearch}
                        className="rounded-[28px] bg-white px-4 pb-6 pt-12 shadow-2xl sm:px-6 lg:px-8"
                    >
                        <div className="flex flex-wrap gap-4 text-sm font-semibold text-brand-primary sm:gap-6 sm:text-base">
                            {["One Way", "Round Way", "Multi City"].map(
                                (type) => (
                                    <label
                                        key={type}
                                        className="flex cursor-pointer items-center gap-2"
                                    >
                                        <input
                                            type="radio"
                                            name="tripType"
                                            value={type}
                                            checked={
                                                flightSearch.tripType === type
                                            }
                                            onChange={(event) =>
                                                updateFlightSearch(
                                                    "tripType",
                                                    event.target.value,
                                                )
                                            }
                                            className="h-4 w-4 accent-brand-primary"
                                        />
                                        {type}
                                    </label>
                                ),
                            )}
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-12">
                            <label className="col-span-12 rounded-xl border border-gray-200 px-4 py-3 md:col-span-5 xl:col-span-2">
                                <span className="text-xs font-semibold uppercase text-brand-primary">
                                    From
                                </span>
                                <input
                                    type="text"
                                    value={flightSearch.from}
                                    onChange={(event) =>
                                        updateFlightSearch(
                                            "from",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full bg-transparent text-xl font-bold text-slate-950 outline-none"
                                    placeholder="Dhaka"
                                />
                                <span className="block truncate text-xs text-slate-500">
                                    Departure country or city
                                </span>
                            </label>

                            <button
                                type="button"
                                onClick={swapRoute}
                                aria-label="Swap route"
                                className="mx-auto col-span-12 flex h-11 w-11 rotate-90 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-primary shadow-sm transition hover:bg-brand-primary hover:text-white md:col-span-2 md:rotate-0 lg:mt-8 xl:col-span-1"
                            >
                                <ArrowRight className="h-4 w-4 rotate-180" />
                                <ArrowRight className="-ml-1 h-4 w-4" />
                            </button>

                            <label className="col-span-12 rounded-xl border border-gray-200 px-4 py-3 md:col-span-5 xl:col-span-3">
                                <span className="text-xs font-semibold uppercase text-brand-primary">
                                    To
                                </span>
                                <input
                                    type="text"
                                    value={flightSearch.to}
                                    onChange={(event) =>
                                        updateFlightSearch(
                                            "to",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 block w-full bg-transparent text-xl font-bold text-slate-950 outline-none"
                                    placeholder="Canada"
                                />
                                <span className="block truncate text-xs text-slate-600">
                                    Arrival country or city
                                </span>
                            </label>

                            <div className="col-span-12 grid grid-cols-1 gap-3 md:grid-cols-12 xl:col-span-6">
                                <label className="rounded-xl border border-gray-200 px-4 py-3 md:col-span-4 xl:col-span-4">
                                    <span className="text-xs font-semibold uppercase text-brand-primary">
                                        Departure Date
                                    </span>
                                    <input
                                        type="date"
                                        value={flightSearch.departureDate}
                                        onChange={(event) =>
                                            updateFlightSearch(
                                                "departureDate",
                                                event.target.value,
                                            )
                                        }
                                        className="mt-1 block w-full bg-transparent text-base font-bold text-slate-950 outline-none"
                                    />
                                </label>

                                <label className="rounded-xl border border-gray-200 px-4 py-3 md:col-span-4 xl:col-span-4">
                                    <span className="text-xs font-semibold uppercase text-brand-primary">
                                        Return Date
                                    </span>
                                    <input
                                        type="date"
                                        value={flightSearch.returnDate}
                                        onChange={(event) =>
                                            updateFlightSearch(
                                                "returnDate",
                                                event.target.value,
                                            )
                                        }
                                        disabled={
                                            flightSearch.tripType === "One Way"
                                        }
                                        className="mt-1 block w-full bg-transparent text-base font-bold text-slate-950 outline-none disabled:text-slate-400"
                                    />
                                </label>

                                <label className="rounded-xl border border-gray-200 px-4 py-3 md:col-span-4">
                                    <span className="text-xs font-semibold uppercase text-brand-primary">
                                        Traveler Class
                                    </span>
                                    <div className="mt-1 grid grid-cols-12 gap-2">
                                        <input
                                            type="number"
                                            min="1"
                                            value={flightSearch.travelers}
                                            onChange={(event) =>
                                                updateFlightSearch(
                                                    "travelers",
                                                    event.target.value,
                                                )
                                            }
                                            className="col-span-4 min-w-0 bg-transparent text-xl font-bold text-slate-950 outline-none"
                                        />
                                        <select
                                            value={flightSearch.ticketClass}
                                            onChange={(event) =>
                                                updateFlightSearch(
                                                    "ticketClass",
                                                    event.target.value,
                                                )
                                            }
                                            className="col-span-8 min-w-0 bg-transparent text-sm text-slate-700 outline-none"
                                        >
                                            <option>Economy</option>
                                            <option>Business</option>
                                            <option>Student</option>
                                            <option>Group</option>
                                        </select>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-center">
                            <button
                                type="submit"
                                className="inline-flex w-full max-w-xs cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-accent px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-brand-primary"
                            >
                                <Search className="h-5 w-5 text-white" />
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section> */}

            {/* প্যাকেজ স্লাইডার সেকশন */}
            <section
                id="packages"
                className="mx-auto max-w-7xl px-4 py-16 sm:py-20 md:px-6 lg:py-24"
            >
                <Heading
                    title="Find Your Perfect"
                    highlight="Flight"
                    subtitle="Air Ticket Packages"
                    color={false}
                    paragraph="Discover affordable and flexible ticket packages for students, tourists, and travel groups."
                />

                <div className="relative mt-10 sm:mt-14">
                    {filteredPackages.length > 0 && (
                        <button
                            type="button"
                            aria-label="Previous package"
                            onClick={() => slidePackages(-1)}
                            className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-primary shadow-lg transition hover:bg-brand-primary hover:text-white sm:h-11 sm:w-11"
                        >
                            <ArrowRight className="h-5 w-5 rotate-180" />
                        </button>
                    )}

                    {/* স্লাইডার কন্টেইনার */}
                    <div
                        ref={sliderRef}
                        className="scroll-none flex gap-5 overflow-x-auto scroll-smooth px-12 py-2 sm:gap-7"
                    >
                        {displayPackages.map((item, index) => (
                            <motion.div
                                key={`${item.id}-${index}`} // ইউনিক কি (key) নিশ্চিত করার জন্য ইনডেক্স যোগ করা হয়েছে
                                data-package-card
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay:
                                        (index % filteredPackages.length) *
                                        0.05,
                                }}
                                viewport={{ once: true }}
                                className="group w-[calc(100vw-7rem)] shrink-0 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm outline-none transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:w-85 sm:rounded-[30px] md:w-90"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-all duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur">
                                        {item.type}
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MapPin className="h-4 w-4" />
                                        {item.country}
                                    </div>

                                    <h3 className="mt-3 text-xl font-bold text-brand-primary sm:text-2xl">
                                        {item.title}
                                    </h3>

                                    <div className="mt-5 flex items-start justify-between gap-4 border-t border-gray-100 pt-5">
                                        <div>
                                            <p className="text-sm text-slate-600">
                                                Starting From
                                            </p>
                                            <h4 className="text-2xl font-bold text-brand-primary">
                                                {item.price}
                                            </h4>
                                        </div>
                                        <div className="text-right">
                                            <p className="flex items-center justify-end gap-1 text-sm text-slate-600">
                                                <Clock3 className="h-4 w-4" />
                                                {item.duration}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/travel-tours/air-tickets/ticket-packages/${item.country.toLowerCase()}`}
                                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-2 font-semibold text-brand-contrast transition-all duration-300 hover:gap-3"
                                    >
                                        View Details
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}

                        {filteredPackages.length === 0 && (
                            <div className="w-full rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                                <h3 className="text-xl font-semibold text-brand-primary">
                                    No packages found
                                </h3>
                                <p className="mt-2 text-slate-600">
                                    Try searching with another destination or
                                    ticket type.
                                </p>
                            </div>
                        )}
                    </div>

                    {filteredPackages.length > 0 && (
                        <button
                            type="button"
                            aria-label="Next package"
                            onClick={() => slidePackages(1)}
                            className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-primary shadow-lg transition hover:bg-brand-primary hover:text-white sm:h-11 sm:w-11"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AirTicketsPackages;
