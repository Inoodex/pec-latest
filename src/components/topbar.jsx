"use client";
import React, { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";
import ConsultBookingModal from "./consultBookingModal";
import Footer from './footer';

const BaseUrl = "https://apps.peceduglobal.com/api/public/site_info";

const Topbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const SiteInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch(BaseUrl);
        const data = await response.json();
        console.log("Topbar API Response:", data);
        
        if (data?.success) {
          setSiteData(data);
        } else {
          setError("Failed to load site information");
        }
      } catch (err) {
        console.error("Error fetching site info:", err);
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    SiteInfo();
  }, []);

  const site_settings = siteData?.site_settings ?? {};
  const footer_info = siteData?.footer_info ?? {};


  // site_settings থেকে নিবে, না থাকলে footer_info থেকে
  const sitePhone = site_settings?.contact_phone || footer_info?.phone || "";
  
  const footer_phone=site_settings?.footer_phone || footer_info?.phone ||"";
  const siteName = site_settings?.site_name || "PECEdu Global";

  // Hotline টেক্সট ফরম্যাট করা
  const hotlineText = sitePhone ? `Hotline: ${sitePhone}` : "";

  return (
    <div className="bg-white text-brand-primary text-xs sm:text-sm py-2  hidden sm:block font-normal tracking-wide">
      <div className="container mx-auto px-2">
        <ul className="flex justify-between  items-center w-full gap-4 flex-wrap sm:flex-nowrap  ">
          <li className="opacity-90 ">
            Welcome to {siteName}
          </li>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-brand-primary bg-brand-primary hover:bg-brand-accent text-white font-medium py-1 px-4 rounded-full transition duration-200 cursor-pointer text-xs md:text-sm shadow-sm flex items-center gap-1"
            >
              Apply for Appointment
            </button>
            
            <Link
              href={"/apply-now"}
              className="border border-brand-primary bg-brand-primary hover:bg-brand-accent text-white font-medium py-1 px-4 rounded-full transition duration-200 cursor-pointer text-xs md:text-sm shadow-sm flex items-center gap-1"
            >
              Apply Now
            </Link>

            <ConsultBookingModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>

          <li className="opacity-90 flex items-center gap-3">
            {/* ফোন নম্বর */}
            {sitePhone && (
              <a 
                href={`tel:${sitePhone}`}
                className="flex items-center gap-1 hover:text-brand-accent transition-colors"
              >
                <FaPhoneAlt className="text-[10px]" />
            <span>Hotline:{sitePhone},{footer_phone}</span>
              </a>
            )}
          

            
          
            {/* {siteEmail && (
              <a 
                href={`mailto:${siteEmail}`}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <FaEnvelope className="text-[10px]" />
                <span>{siteEmail}</span>
              </a>
            )} */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;