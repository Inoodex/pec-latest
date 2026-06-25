import AirTicketBookingModal from "@/components/airTicketBookingModal";
import { Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AirTicketsHero = () => {
    return (
        <section className="relative overflow-x-hidden min-h-170 sm:min-h-180 lg:min-h-190">
            <div className="absolute inset-0">
                <Image
                    src="/air-tickets/air-tickets.webp"
                    alt="Travel"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-slate-950/30 to-slate-900/40" />
            </div>

            <div className="relative mx-auto flex min-h-170 max-w-7xl items-center px-4 py-20 sm:min-h-180 md:px-6 lg:min-h-190 lg:py-32">
                <div className="max-w-3xl">
                    <div>
                        <div className="my-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                            <Plane className="h-4 w-4" />
                            International Air Ticket Packages
                        </div>

                        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                            Explore The World With Best Flight Deals
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                            Book student, regular, and group air tickets with
                            affordable pricing and trusted support for worldwide
                            destinations.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <AirTicketBookingModal />

                            <Link
                                href="/travel-tours/air-tickets/ticket-packages"
                                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 font-medium text-white transition-all duration-300 bg-white/20 hover:bg-white/10 backdrop-blur-sm"
                            >
                                Explore Packages
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AirTicketsHero;
