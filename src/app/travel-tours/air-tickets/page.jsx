import Link from "next/link";
import { ArrowUpRight, Calendar, Users } from "lucide-react";
import AirTicketsPackages from "@/sections/travel-tours/air-tickets/airTicketsPackages";
import AirTicketsHero from "@/sections/travel-tours/air-tickets/airTicketsHero";

const allPackages = [
    {
        id: 1,
        title: "Canada Student Ticket",
        country: "Canada",
        type: "Student",
        image: "/study_abroad/america.webp",
        price: "$780",
        duration: "Flexible Date",
    },
    {
        id: 2,
        title: "UK Regular Air Ticket",
        country: "United Kingdom",
        type: "Regular",
        image: "/study_abroad/america.webp",
        price: "$920",
        duration: "Round Trip",
    },
    {
        id: 3,
        title: "Australia Group Package",
        country: "Australia",
        type: "Group",
        image: "/study_abroad/america.webp",
        price: "$1200",
        duration: "Group Tour",
    },
    {
        id: 4,
        title: "USA Student Deal",
        country: "USA",
        type: "Student",
        image: "/study_abroad/america.webp",
        price: "$980",
        duration: "Student Offer",
    },
];

export default function AirTicket() {
    return (
        <div className="overflow-x-hidden bg-gray-100 text-gray-900">
            <AirTicketsHero />
            <AirTicketsPackages allPackages={allPackages} />

            <section className="bg-linear-to-r from-foreground to-brand-accent py-16 text-white sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-6">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <span className="rounded-full uppercase tracking-wide bg-brand-accent px-4 py-2 text-sm">
                                Contact Information
                            </span>

                            <h2 className="mt-5 text-3xl font-semibold md:text-5xl">
                                Need Help Booking Your Ticket?
                            </h2>

                            <p className="mt-5 max-w-xl leading-8 text-slate-200">
                                Our experienced travel consultants are ready to
                                help you with ticket booking, travel planning,
                                and student airfare solutions.
                            </p>
                            <Link
                                className="mt-6 inline-flex items-center gap-2 font-medium text-brand-contrast bg-brand-primary w-fit px-5 justify-center py-2 rounded-xl transition-all duration-300 hover:gap-3"
                                href={"/contact"}
                            >
                                Contact Us
                                <ArrowUpRight size={20} />
                            </Link>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="rounded-[28px] bg-white/10 p-6 backdrop-blur-md">
                                <Users className="h-10 w-10" />

                                <h3 className="mt-5 text-xl font-bold">
                                    Travel Support
                                </h3>

                                <p className="mt-2 text-slate-300">
                                    Professional consultation for all ticket
                                    types.
                                </p>
                            </div>

                            <div className="rounded-[28px] bg-white/10 p-6 backdrop-blur-md">
                                <Calendar className="h-10 w-10" />

                                <h3 className="mt-5 text-xl font-bold">
                                    Flexible Schedule
                                </h3>

                                <p className="mt-2 text-slate-300">
                                    Easy rescheduling and booking support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
