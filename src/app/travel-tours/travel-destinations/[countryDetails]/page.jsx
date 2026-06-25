import { MapPin, Calendar, Check, X, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import TravelConsultModal from "@/components/travelConsultModal";

const countries = [
    {
        id: 1,
        countryName: "Canada",
        region: "America",
        src: "/study_abroad/africa.webp",
        duration: "5 Days / 4 Nights",
        price: "৳85,000",
        desc: "Canada is one of the most popular study destinations because of its high-quality education and welcoming environment.",
        visaIncluded: true,
        flightIncluded: true,
        badges: ["Trending", "Student Favorite"],
        url: "canada",
    },
    {
        id: 2,
        countryName: "Australia",
        region: "Australia",
        src: "/study_abroad/america.webp",
        duration: "2 Days / 3 Nights",
        price: "৳92,000",
        desc: "Australia offers globally recognized universities and strong post-study work options.",
        visaIncluded: true,
        flightIncluded: true,
        badges: ["Best Seller"],
        url: "australia",
    },
    {
        id: 3,
        countryName: "United Kingdom",
        region: "Europe",
        src: "/study_abroad/europe.webp",
        duration: "1 Days / 2 Nights",
        price: "৳1,10,000",
        desc: "The UK is known for historic universities and world-class academic programs.",
        visaIncluded: true,
        flightIncluded: false,
        badges: ["Trending"],
        url: "united-kingdom",
    },
    {
        id: 4,
        countryName: "Germany",
        region: "Europe",
        src: "/study_abroad/europe.webp",
        duration: "3 Days / 4 Nights",
        price: "৳78,000",
        desc: "Germany is famous for affordable education and engineering excellence.",
        visaIncluded: true,
        flightIncluded: false,
        badges: ["Student Favorite"],
        url: "germany",
    },
    {
        id: 5,
        countryName: "Malaysia",
        region: "Asia",
        src: "/study_abroad/asia.webp",
        duration: "5 Days / 4 Nights",
        price: "৳65,000",
        desc: "Malaysia offers affordable tuition fees and modern campuses.",
        visaIncluded: true,
        flightIncluded: true,
        badges: ["Best Seller"],
        url: "malaysia",
    },
    {
        id: 6,
        countryName: "Japan",
        region: "Asia",
        src: "/countries/japan.webp",
        duration: "5 Days / 4 Nights",
        price: "৳95,000",
        desc: "Japan combines technology, culture, and excellent education.",
        visaIncluded: true,
        flightIncluded: true,
        badges: ["Trending", "Best Seller"],
        url: "japan",
    },
];

export default async function TravelPackagePage({ params }) {
    const countryParams = await params;
    const countryName = countries.filter(
        (country) => country.url === countryParams.countryDetails,
    );
    const itinerary = [
        { day: "Day 1", desc: "Departure from origin country" },
        { day: "Day 2", desc: "Arrival, hotel check-in, rest" },
        { day: "Day 3", desc: "City tour and local sightseeing" },
        { day: "Day 4", desc: "Main attraction visit & free time" },
        { day: "Day 5", desc: "Shopping & cultural experience" },
        { day: "Day 6", desc: "Return journey" },
    ];

    const included = [
        "Hotel accommodation",
        "Daily breakfast",
        "Airport pickup & drop",
        "Local guide",
        "Sightseeing transport",
    ];

    const excluded = [
        "Visa fee",
        "Personal expenses",
        "Lunch & dinner",
        "Travel insurance",
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative">
                {countryName.map((country) => (
                    <div key={country.id}>
                        <div className="md:h-180 h-140 w-full bg-black relative">
                            <Image
                                src={country.src}
                                alt={country.countryName}
                                height={1000}
                                width={1000}
                                className="w-full h-full object-cover opacity-50"
                            />

                            <div className="absolute left-1/2 top-1/2 -translate-1/2 w-full z-20 flex items-end p-6 md:p-12">
                                <div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white w-full md:max-w-2xl mx-auto p-5 bg-white/10 backdrop-blur-[2px] rounded-2xl flex justify-center flex-col items-center"
                                >
                                    <h1 className="text-3xl text-center md:text-5xl font-bold">
                                        {country.countryName} Tour Package
                                    </h1>
                                    <p className="mt-2 text-lg text-gray-200">
                                        Explore {country.countryName} with
                                        comfort
                                    </p>

                                    <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                        <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                            <Calendar size={16} />
                                            {country.duration}
                                        </span>
                                        <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                            <MapPin size={16} />{" "}
                                            {country.countryName}
                                        </span>
                                    </div>

                                    <TravelConsultModal country={country} />
                                </div>
                            </div>
                        </div>

                        <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white border border-black/10 p-5 rounded-2xl shadow">
                                    <h2 className="text-3xl text-brand-primary font-semibold">
                                        Overview
                                    </h2>
                                    <p className="mt-2 text-lg text-gray-600">
                                        {country.desc}
                                    </p>
                                </div>

                                <div className="bg-white p-5 rounded-2xl shadow">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Itinerary
                                    </h2>
                                    <div className="space-y-3">
                                        {itinerary.map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex gap-3 border-l-2 border-blue-500 pl-3"
                                            >
                                                <div className="font-semibold text-blue-600">
                                                    {item.day}
                                                </div>
                                                <div className="text-gray-600">
                                                    {item.desc}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-2xl shadow">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Gallery
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <Image
                                                width={1000}
                                                height={1000}
                                                key={i}
                                                src={country.src}
                                                alt={country.countryName}
                                                className="rounded-xl object-cover h-28 w-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-5 rounded-2xl shadow">
                                    <div className="flex text-brand-primary items-center gap-2 text-2xl font-bold">
                                        {country.price}
                                    </div>
                                    <p className="text-gray-600 text-base">
                                        Starting from per person
                                    </p>
                                    <TravelConsultModal
                                        country={country}
                                        trigger="book"
                                        className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl bg-brand-primary py-2 text-white transition hover:bg-brand-accent"
                                    />
                                </div>

                                <div className="bg-white p-5 rounded-2xl shadow">
                                    <h3 className="font-semibold text-lg text-brand-primary mb-2 flex items-center gap-2">
                                        <Check className="text-green-500" />{" "}
                                        Included
                                    </h3>
                                    <ul className="space-y-1 text-base text-gray-600">
                                        {included.map((item, i) => (
                                            <li key={i}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white p-5 rounded-2xl shadow">
                                    <h3 className="font-semibold mb-2 flex text-brand-primary text-lg items-center gap-2">
                                        <X className="text-red-500" /> Not
                                        Included
                                    </h3>
                                    <ul className="space-y-1 text-base text-gray-600">
                                        {excluded.map((item, i) => (
                                            <li key={i}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white p-5 rounded-2xl shadow">
                                    <h3 className="font-semibold text-lg mb-3">
                                        Need Help?
                                    </h3>
                                    <div className="flex flex-col gap-2">
                                        <a
                                            href={`https://wa.me/+8801712345678?text="Hello PECEDU Global I need help with study abroad guidance."`}
                                            target="_blank"
                                            className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-xl"
                                        >
                                            <MessageCircle size={16} /> WhatsApp
                                        </a>
                                        <a
                                            href={`https://wa.me/+8801712345678?text="Hello PECEDU Global I need help with study abroad guidance."`}
                                            target="_blank"
                                            className="flex items-center justify-center gap-2 bg-brand-primary text-white py-2 rounded-xl"
                                        >
                                            <Phone size={16} /> Call Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
