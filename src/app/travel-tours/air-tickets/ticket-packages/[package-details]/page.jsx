"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
     Globe,
     MapPin,
     Plane,
     Calendar,
     CheckCircle,
     ArrowRight,
     Star,
} from "lucide-react";
import Heading from "@/components/heading";
import Link from "next/link";
import AirTicketBookingModal from "@/components/airTicketBookingModal";

const countryData = {
     name: "Canada",
     banner: "/study_abroad/america.webp",
     desc: "Explore the breathtaking beauty of Canada — from snow-capped mountains to vibrant cities and stunning natural landscapes.",
     capital: "Ottawa",
     bestTime: "May - September",
     currency: "CAD",
     tourHighlights: [
          "Niagara Falls experience",
          "Banff National Park adventure",
          "Toronto city tour",
          "Whale watching & nature trips",
     ],
     inclusions: [
          "Hotel accommodation",
          "Daily breakfast",
          "Sightseeing tours",
          "Airport pickup & drop",
          "Tour guide support",
     ],
};

export default function CountryTourDetailsPage() {
     return (
          <div className="w-full bg-gray-100">
               <div className="relative w-full h-200">
                    <Image
                         src={countryData.banner}
                         alt="country banner"
                         fill
                         className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4">
                         <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6 }}
                              className="text-white"
                         >
                              <Heading
                                   title="Discover"
                                   highlight={countryData.name}
                                   paragraph={countryData.desc}
                              />

                              <AirTicketBookingModal
                                   buttonLabel="Book This Tour"
                                   packageDetails={{
                                        name: countryData.name,
                                        bestTime: countryData.bestTime,
                                   }}
                                   className="mx-auto mt-6 flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white transition hover:bg-brand-accent"
                              />
                         </motion.div>
                    </div>
               </div>

               <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
                    <div className="p-5 bg-gray-300 rounded-xl flex items-center gap-3">
                         <MapPin className="text-brand-primary" />
                         <div>
                              <p className="text-sm text-gray-500">Capital</p>
                              <p className="font-semibold text-xl text-brand-primary">
                                   {countryData.capital}
                              </p>
                         </div>
                    </div>

                    <div className="p-5 bg-gray-300 rounded-xl flex items-center gap-3">
                         <Calendar className="text-brand-primary" />
                         <div>
                              <p className="text-sm text-gray-500">Best Time</p>
                              <p className="font-semibold text-xl text-brand-primary">
                                   {countryData.bestTime}
                              </p>
                         </div>
                    </div>

                    <div className="p-5  bg-gray-300 rounded-xl flex items-center gap-3">
                         <Plane className="text-brand-primary" />
                         <div>
                              <p className="text-sm text-gray-500">Currency</p>
                              <p className="font-semibold text-xl text-brand-primary">
                                   {countryData.currency}
                              </p>
                         </div>
                    </div>
               </div>

               <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 py-10">
                    <motion.div
                         initial={{ opacity: 0, x: -40 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                    >
                         <span className="bg-gray-300 text-brand-accent px-4 py-2 rounded-full">
                              - About {countryData.name}
                         </span>
                         <h2 className="text-3xl text-brand-primary font-bold my-5">
                              About This Destination
                         </h2>
                         <p className="text-gray-600 text-lg leading-relaxed">
                              Canada is a dream destination for travelers. It
                              offers a perfect blend of modern cities, rich
                              culture, and untouched natural beauty. From
                              waterfalls to mountains, every moment here is
                              unforgettable.
                         </p>
                         <div className="inline-flex">
                              <AirTicketBookingModal
                                   buttonLabel="Book Now"
                                   packageDetails={{
                                        name: countryData.name,
                                        bestTime: countryData.bestTime,
                                   }}
                                   className="mx-auto mt-6 flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white transition hover:bg-brand-accent"
                              />
                         </div>
                    </motion.div>

                    <motion.div
                         initial={{ opacity: 0, x: 40 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         className="relative h-87.5 rounded-2xl overflow-hidden"
                    >
                         <Image
                              src={countryData.banner}
                              alt="tour image"
                              fill
                              className="object-cover"
                         />
                    </motion.div>
               </div>

               <div className="bg-foreground">
                    <div className="max-w-7xl mx-auto px-4 py-14">
                         <h2 className="text-3xl text-brand-contrast font-bold mb-6">
                              What’s Included in the Package
                         </h2>

                         <div className="grid md:grid-cols-2 gap-4">
                              {countryData.inclusions.map((item, i) => (
                                   <div
                                        key={i}
                                        className="flex items-center gap-3 p-4 border bg-brand-accent border-brand-primary text-brand-contrast rounded-xl"
                                   >
                                        <CheckCircle className="text-brand-contrast" />
                                        <p>{item}</p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>

               <div className="bg-gray-100 text-brand-primary py-16 text-center px-4">
                    <h2 className="text-3xl font-bold">
                         Ready for Your {countryData.name} Trip?
                    </h2>
                    <p className="mt-3 text-gray-600">
                         Contact Us and explore the beauty of Canada!
                    </p>

                    <Link
                         href={"/contact"}
                         className="mt-6 px-6 py-3 bg-brand-primary w-fit text-brand-contrast font-semibold rounded-xl flex items-center gap-2 mx-auto hover:bg-brand-accent transition"
                    >
                         Contact Us <ArrowRight size={18} />
                    </Link>
               </div>
          </div>
     );
}
