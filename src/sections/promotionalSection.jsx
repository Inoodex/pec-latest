"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { 
  MapPin, Globe, Building, Activity, GraduationCap, 
  BookOpen, Users, Award, Briefcase, School, Clock,
  ChevronRight, Calendar, Heart, Compass, Trophy,
  Sparkles, ArrowRight, Send
} from "lucide-react";
import Button from "@/components/button";

// Dynamic page selection based on route or prop
const PAGE_URLS = {
  1: "https://www.apps.peceduglobal.com/api/public/pages/promotional-page-1",
  2: "https://www.apps.peceduglobal.com/api/public/pages/promotional-page-2",
  3: "https://www.apps.peceduglobal.com/api/public/pages/promotional-page-3",
  4: "https://www.apps.peceduglobal.com/api/public/pages/promotional-page-4"
};

// Block mapping for different page types
const blockMap = {
  "offer-summary": "offerSummary",
  "academic-requirement": "academicRequirement",
  "english-requirement": "englishRequirement",
  "promotional-living-cost": "livingCost",
  "promotional-tuition-fees": "tuitionFees",
  "promotional-part-time-work": "partTimeWork",
  "promotional-scholarship": "scholarship",
  "living-cost-test": "travel",
  "Student Life": "studentLife",
  "Student Life Block": "studentLifeBlock",
  "Tuition & Fees": "tuition",
  "ab": "ab",
  "ew": "ew"
};

// --- INFO CARD COMPONENT ---
const InfoCard = ({ feature, index, variant = "default" }) => {
  const getIcon = () => {
    const title = feature.element_title?.toLowerCase() || "";
    if (title.includes("travel") || title.includes("trip") || title.includes("journey") || title.includes("duration")) 
      return <Globe className="w-5 h-5 text-brand-primary" />;
    if (title.includes("accommodation") || title.includes("stay") || title.includes("hotel") || title.includes("night")) 
      return <Building className="w-5 h-5 text-brand-primary" />;
    if (title.includes("city") || title.includes("destination") || title.includes("country")) 
      return <MapPin className="w-5 h-5 text-brand-primary" />;
    if (title.includes("activity") || title.includes("level") || title.includes("balanced")) 
      return <Activity className="w-5 h-5 text-brand-primary" />;
    if (title.includes("tuition") || title.includes("fee") || title.includes("cost")) 
      return <GraduationCap className="w-5 h-5 text-brand-primary" />;
    if (title.includes("scholarship") || title.includes("award") || title.includes("merit")) 
      return <Award className="w-5 h-5 text-brand-primary" />;
    if (title.includes("student") || title.includes("life") || title.includes("community")) 
      return <Users className="w-5 h-5 text-brand-primary" />;
    if (title.includes("academic") || title.includes("study") || title.includes("course")) 
      return <BookOpen className="w-5 h-5 text-brand-primary" />;
    if (title.includes("career") || title.includes("job") || title.includes("opportunity")) 
      return <Briefcase className="w-5 h-5 text-brand-primary" />;
    return <GraduationCap className="w-5 h-5 text-brand-primary" />;
  };

  const getDisplayText = (body) => {
    if (!body) return "";
    return body.replace(/<[^>]*>/g, '').trim();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className={`flex items-start gap-3 p-4 rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
        variant === "featured" 
          ? "bg-brand-primary/5 border-brand-primary/20" 
          : "bg-white border-gray-100"
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        variant === "featured" 
          ? "bg-brand-primary/20" 
          : "bg-brand-primary/10"
      }`}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-800">{feature.element_title}</h4>
        {feature.element_body && (
          <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
            {getDisplayText(feature.element_body)}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- APPLY NOW SECTION (Beautiful Design) ---
const ApplyNowSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#191970] via-[#1a1a6e] to-[#0d0d4b] py-20 md:py-28 px-4">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-brand-primary/5 to-transparent blur-3xl"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-5 py-2 rounded-full text-xs font-medium text-white/80 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Limited Seats Available
          </div> */}

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Your <br />
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
  
            <span className="text-white">Study Abroad Journey?</span>
          </h2>
          </h2>
          
          {/* Description */}
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Take the first step towards your dream education. Our expert team is here to guide you through the entire process.
          </p>

          {/* Button with Glow Effect */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-blue-500 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <Link
              href="/apply-now"
              className="relative inline-flex items-center gap-3 bg-white text-brand-primary hover:bg-white/90 px-10 py-4 md:px-14 md:py-5 rounded-full text-base md:text-lg font-semibold shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              <Send className="w-5 h-5 md:w-6 md:h-6" />
              Apply Now
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Trust Badges */}
          {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/40 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span>No Application Fee</span>
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span>Free Consultation</span>
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              <span>Quick Response</span>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

// --- MAIN COMPONENT ---
export default function PromotionalSection({ pageNumber = 1 }) {
  const [data, setData] = useState({ 
    blocks: [], 
    mappedBlocks: {},
    allElements: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const url = PAGE_URLS[pageNumber] || PAGE_URLS[1];
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success) {
          const blocks = result?.data?.blocks || [];
          const mappedBlocks = {};
          const allElements = [];
          
          blocks.forEach(b => {
            const key = blockMap[b.block_type] || b.block_type;
            mappedBlocks[key] = b;
            
            if (b.elements && b.elements.length > 0) {
              allElements.push(...b.elements);
            }
          });
          
          setData({ blocks, mappedBlocks, allElements, loading: false, error: null });
        } else {
          setData({ ...data, loading: false, error: "Failed to load data" });
        }
      } catch (error) {
        setData({ ...data, loading: false, error: "Network error" });
      }
    };

    fetchPageData();
  }, [pageNumber]);

  const { blocks, mappedBlocks, allElements, loading, error } = data;
  const reason = blocks?.[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
    {/* HERO SECTION */}
    <section className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-[#191970] via-[#1a1a6e] to-[#0d0d4b]">
      {/* LEFT - Full Screen Image */}
      {reason && (
        <div className="lg:w-1/2 w-full lg:min-h-screen relative overflow-hidden">
          <div className="w-full h-[300px] lg:h-full lg:absolute lg:inset-0">
            <Image
              src={reason.settings?.section_image || "/study_abroad/study-bg.webp"}
              alt={reason.section_title || "Study in Malaysia"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d4b]/50 to-transparent" />
            
            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
              
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RIGHT - Content */}
      <div className="lg:w-1/2 w-full lg:min-h-screen flex items-center">
        <div className="w-full max-w-xl mx-auto px-6 py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {reason && (
              <>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-white/80 mb-4">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Page {pageNumber}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {reason.section_title || "Study in Malaysia"}
                </h1>
              </>
            )}

            {reason?.section_description && (
              <div className="text-white/80 text-sm leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: reason.section_description }}
              />
            )}

            {/* Display all elements in grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {allElements.length > 0 ? (
                allElements.slice(0, 6).map((feature, index) => (
                  <InfoCard key={index} feature={feature} index={index} />
                ))
              ) : (
                <div className="col-span-2 text-white/50 text-sm text-center py-8">
                  No data available
                </div>
              )}
            </div>

            {/* Action Buttons - Only Learn More */}
            <div className="flex flex-wrap gap-3">
           
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* APPLY NOW SECTION - Beautiful Design */}
    <ApplyNowSection />
    </>
  );
}