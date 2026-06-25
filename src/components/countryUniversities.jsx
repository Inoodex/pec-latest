"use client";
import Link from "next/link";
import Image from "next/image";
import Heading from "./heading";
import { getUniversitiesByCountry } from "@/apis/getUniversitiesByCountry";
import { useEffect, useState } from "react";

const CountryUniversities = ({ universities, countryID, countryObject }) => {
    const [apiUniversities, setApiUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async function () {
            try {
                if (!countryID?.id) {
                    setLoading(false);
                    return;
                }
                const res = await getUniversitiesByCountry(countryID?.id);
                // Support both { data: { data: [] } } and { data: [] }
                const list = res?.data?.data || res?.data || [];
                setApiUniversities(list);
            } catch (e) {
                console.error("Error fetching universities:", e);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [countryID?.id]);

    const { section_title, section_description, elements } = universities || {};
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

    return (
        <section className="bg-foreground">
            <section className="max-w-7xl md:py-20 py-10 mx-auto lg:px-6 px-4">
                <Heading
                    title={
                        section_title ||
                        "We're proud to partner with Top Universities"
                    }
                    paragraph={section_description}
                />

                {loading && (
                    <p className="text-center text-gray-500 mt-12">
                        Loading universities...
                    </p>
                )}

                {!loading &&
                    apiUniversities.length === 0 &&
                    (elements || []).length === 0 && (
                        <p className="text-center text-gray-500 mt-12">
                            No universities found for this country yet.
                        </p>
                    )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                    {apiUniversities.length > 0
                        ? apiUniversities.map((uni, index) => (
                              <div key={uni.id || index} className="h-full">
                                  <Link
                                      href={uni.website || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group flex flex-col h-full bg-white rounded-3xl p-2 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                                  >
                                      <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-50">
                                          {uni.banner ? (
                                              <Image
                                                  src={`${apiUrl}${uni.banner}`}
                                                  alt={
                                                      uni?.name || "University"
                                                  }
                                                  fill
                                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                              />
                                          ) : (
                                              <div className="w-full h-full bg-linear-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center">
                                                  <span className="text-brand-primary font-bold text-lg text-center px-4">
                                                      {uni.name}
                                                  </span>
                                              </div>
                                          )}
                                          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                      </div>

                                      <div className="flex flex-col grow p-4 space-y-3">
                                          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-brand-accent transition-colors duration-300 line-clamp-2">
                                              {uni?.name}
                                          </h3>
                                          <p>
                                              {uni?.location &&
                                                  `${uni.location}, `}
                                              {uni?.country?.name}
                                          </p>

                                          <div className="pt-2 mt-auto">
                                              <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors duration-300">
                                                  Explore University
                                                  <svg
                                                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                  >
                                                      <path
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth={2}
                                                          d="M9 5l7 7-7 7"
                                                      />
                                                  </svg>
                                              </span>
                                          </div>
                                      </div>
                                  </Link>
                              </div>
                          ))
                        : (elements || []).map((uni, index) => (
                              <div key={uni.id || index} className="h-full">
                                  <Link
                                      href={uni.link_url || uni.url || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group flex flex-col h-full bg-white rounded-3xl p-2 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                                  >
                                      <div className="flex flex-col grow p-4 space-y-3">
                                          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-brand-accent transition-colors duration-300 line-clamp-2">
                                              {uni?.element_title || uni?.name}
                                          </h3>
                                          <div className="pt-2 mt-auto">
                                              <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors duration-300">
                                                  Explore University
                                                  <svg
                                                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                  >
                                                      <path
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth={2}
                                                          d="M9 5l7 7-7 7"
                                                      />
                                                  </svg>
                                              </span>
                                          </div>
                                      </div>
                                  </Link>
                              </div>
                          ))}
                </div>
            </section>
        </section>
    );
};

export default CountryUniversities;
