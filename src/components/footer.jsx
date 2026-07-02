"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Send } from "lucide-react";
import { getFooterInfo } from "@/apis/getFooterInfo";
import { getPopularDestinations } from "@/apis/getPopularDestinations";

const Footer = () => {
    
    const [footer, setFooter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popularDestination, setPopularDestination] = useState([]);

    useEffect(() => {
       
        const run = async () => {
            const res = await getPopularDestinations();
            const list = res?.popular_destinations ?? res ?? [];
            setPopularDestination(list);
        };
        run();
    }, []);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getFooterInfo();
                // console.log("footer", res);
                if (res) {
                    setFooter(res);
                } else {
                    setFooter(null);
                    setError("No footer data returned from API");
                }
            } catch (err) {
                console.error("getFooterInfo error:", err);
                setError("Failed to load footer information");
                setFooter(null);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, []);

    const footer_info = footer?.footer_info ?? {};
    const footer_social_links = footer?.footer_social_links ?? [];
    const site_settings = footer?.site_settings ?? {};
    //  console.log(site_settings);

    // Get phone numbers and emails from API
    const phoneNumbers = footer_info?.phone ? footer_info.phone.split(',').map(p => p.trim()) : [];
    const emailAddresses = footer_info?.email ? footer_info.email.split(',').map(e => e.trim()) : [];
  
    const  SitePhone= site_settings?.contact_phone? site_settings.contact_phone.split(',').map(p => p.trim()) : [];
    const siteEmail=site_settings?.contact_email? site_settings.contact_email.split(',').map(e => e.trim()) : [];
    console.log(SitePhone);
    const footerLinks = [
        {
            title: "Quick Links",
            links: [
                { name: "About", url: "/about" },
                { name: "Study Abroad", url: "/study-abroad" },
                { name: "Career", url: "/career" },
                { name: "Contact", url: "/contact" },
            ],
        },
        {
            title: "Country",
            links: popularDestination.map((item) => ({
                name: `Study in ${item.name}`,
                url: `/popular-destinations/${item.id}`,
            })),
        },
    ];

    return (
        <footer className="relative bg-foreground/95 md:py-20 md:pb-10 py-10 px-6 overflow-hidden border-t border-brand-accent/40">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#0b5d2e]/20 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-10">
                    {/* Logo & Address */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <Link
                                href={"/"}
                                className="flex items-center lg:h-15 h-12 w-25 lg:w-30 gap-2 bg-white rounded-lg"
                            >
                                <Image
                                    src={
                                        footer_info?.logo
                                            ? `${process.env.NEXT_PUBLIC_SITE_URL || ""}${footer_info.logo}`
                                            : "/logo/logo.png"
                                    }
                                    alt="PECEDU Global logo"
                                    height={90}
                                    width={200}
                                />
                            </Link>
                        </motion.div>
                        <p className="text-gray-300 mb-5 max-w-sm text-lg leading-relaxed">
                            {error ? (
                                <span className="text-red-300">{error}</span>
                            ) : (
                                footer_info?.address
                            )}
                        </p>
                        <div className="flex items-center gap-2">
                            {Array.isArray(footer_social_links) &&
                            footer_social_links.length > 0 ? (
                                footer_social_links.map((s, idx) => {
                                    const href =
                                        s.url || s.link || s.value || "#";
                                    const key = s.id ?? s.name ?? idx;
                                    const name = (s.name || s.platform || "")
                                        .toString()
                                        .toLowerCase();
                                    let Icon = FaFacebook;
                                    if (
                                        name.includes("instagram") ||
                                        href.includes("instagram.com")
                                    )
                                        Icon = FaInstagram;
                                    else if (
                                        name.includes("linkedin") ||
                                        href.includes("linkedin.com")
                                    )
                                        Icon = FaLinkedin;
                                    else if (
                                        name.includes("youtube") ||
                                        href.includes("youtube.com") ||
                                        name.includes("yt")
                                    )
                                        Icon = FaYoutube;

                                    return (
                                        <a
                                            key={key}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-100 bg-brand-primary duration-300 hover:scale-110 rounded-full p-1.5"
                                        >
                                            <Icon size={25} />
                                        </a>
                                    );
                                })
                            ) : (
                                <>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-100 bg-brand-primary duration-300 hover:scale-110 rounded-full p-1.5"
                                    >
                                        <FaFacebook size={25} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-100 bg-brand-primary duration-300 hover:scale-110 rounded-full p-1.5"
                                    >
                                        <FaLinkedin size={25} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-100 bg-brand-primary duration-300 hover:scale-110 rounded-full p-1.5"
                                    >
                                        <FaInstagram size={25} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-100 bg-brand-primary duration-300 hover:scale-110 rounded-full p-1.5"
                                    >
                                        <FaYoutube size={25} />
                                    </a>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    {footerLinks.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <h4 className="text-white font-bold text-xl mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link, lIdx) => (
                                    <Link
                                        href={link.url || "/career"}
                                        key={lIdx}
                                        className="text-gray-300 hover:text-white transition-colors text-lg flex items-center gap-1 group"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* Need Help & Newsletter */}
                    <div className="text-brand-contrast">
                        <h2 className="text-white font-bold text-xl mb-6">
                            Need Help?
                        </h2>
                        <div>
                           {/* Dynamic Phone Numbers */}
                            {phoneNumbers.length > 0 ? (
                                phoneNumbers.map((phone, index) => (
                                    <a
                                        key={index}
                                        target="_blank"
                                        className="text-gray-300 hover:text-white transition-colors mb-2 text-lg flex items-center gap-1 group"
                                        href={`https://wa.me/${phone}`}
                                    >
                                        {phone}
                                    </a>
                                ))
                            ) : (
                                // Fallback phone numbers if API doesn't return any
                                <>
                                    {/* <a
                                        target="_blank"
                                        className="text-gray-300 hover:text-white transition-colors mb-2 text-lg flex items-center gap-1 group"
                                        href="https://wa.me/+8801349523464"
                                    >
                                        +8801349523464
                                    </a>
                                    <a
                                        target="_blank"
                                        className="text-gray-300 hover:text-white transition-colors mb-2 text-lg flex items-center gap-1 group"
                                        href="https://wa.me/+8801630082236"
                                    >
                                        +8801630082236
                                    </a> */}
                                </>
                            )}

                             {SitePhone.length > 0 ? (
                                SitePhone.map((phone, index) => (
                                    <a
                                        key={index}
                                        target="_blank"
                                        className="text-gray-300 hover:text-white transition-colors mb-2 text-lg flex items-center gap-1 group"
                                        href={`https://wa.me/${phone}`}
                                    >
                                        {phone}
                                    </a>
                                ))
                            ) : (
                                // Fallback phone numbers if API doesn't return any
                                <>
                                    {/* <a
                                        target="_blank"
                                        className="text-gray-300 hover:text-white transition-colors mb-2 text-lg flex items-center gap-1 group"
                                        href="https://wa.me/+8801349523464"
                                    >
                                        +8801349523464
                                    </a>
                                    <a
                                        target="_blank"
                                        className="text-gray-300 hover:text-white transition-colors mb-2 text-lg flex items-center gap-1 group"
                                        href="https://wa.me/+8801630082236"
                                    >
                                        +8801630082236
                                    </a> */}
                                </>
                            )}
                            
                            {/* Dynamic Email Addresses */}
                            {emailAddresses.length > 0 ? (
                               emailAddresses.map((email, index) => (
                                    <a
                                        key={index}
                                        href={`mailto:${email}`}
                                        className={`text-gray-300 hover:text-white transition-colors text-lg flex items-center gap-1 group ${
                                            index > 0 ? 'mt-1' : ''
                                        }  `
                                    }
                                    >
                                        {email}
                                    </a>
                                ))
                            ) :
                            (
                                // Fallback emails if API doesn't return any
                                <>
                                    {/* <a
                                        href="mailto:pec.info.bd@gmail.com"
                                        className="text-gray-300 hover:text-white transition-colors text-lg flex items-center gap-1 group"
                                    >
                                        pec.info.bd@gmail.com
                                    </a>
                                    <a
                                        href="mailto:info@peceduglobal.com"
                                        className="text-gray-300 hover:text-white transition-colors text-lg flex items-center gap-1 group mt-1"
                                    >
                                        info@peceduglobal.com
                                    </a> */}
                                </>
                                
                            )}

                        {/* Dynamic Email Addresses */}
                            {siteEmail.length > 0 ? (
                               siteEmail.map((email, index) => (
                                    <a
                                        key={index}
                                        href={`mailto:${email}`}
                                        className={`text-gray-300 hover:text-white transition-colors text-lg flex items-center gap-1 group ${
                                            index > 0 ? 'mt-1' : ''
                                        }  `
                                    }
                                    >
                                        {email}
                                    </a>
                                ))
                            ) :
                            (
                                // Fallback emails if API doesn't return any
                                <>
                                    {/* <a
                                        href="mailto:pec.info.bd@gmail.com"
                                        className="text-gray-300 hover:text-white transition-colors text-lg flex items-center gap-1 group"
                                    >
                                        pec.info.bd@gmail.com
                                    </a>
                                    <a
                                        href="mailto:info@peceduglobal.com"
                                        className="text-gray-300 hover:text-white transition-colors text-lg flex items-center gap-1 group mt-1"
                                    >
                                        info@peceduglobal.com
                                    </a> */}
                                </>
                                
                            )}     
                            
                           
                        </div>
                        <hr className="my-2 text-gray-400" />
                        {/* <h2 className="text-sm my-3 font-semibold">
                            SUBSCRIBE OUR NEWSLETTER
                        </h2> */}
                        {/* <div className="border rounded-md overflow-hidden relative flex items-center">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="px-4 py-2 outline-none bg-white text-gray-700 placeholder:text-gray-700 w-full"
                            />
                            <button className="flex absolute right-2 cursor-pointer bg-white justify-center text-brand-primary">
                                <Send strokeWidth={1.75} size={20} />
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between gap-8 text-gray-400 text-sm border-t border-gray-800 pt-6">
                    <p>{footer_info?.copyright || "© 2024 PECEDU Global. All rights reserved."}</p>
                    <div className="flex gap-8 ">
                        <Link 
                            href="https://inoodex.com/" 
                            className="text-gray-300 hover:text-white transition-colors text-sm flex text-left items-center gap-2 group mt-1"
                            target="_blank"            
                            rel="noopener noreferrer"  
                        >
                            Developed By Inoodex
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;