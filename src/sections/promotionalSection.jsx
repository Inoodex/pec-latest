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

const API_BASE = "https://www.apps.peceduglobal.com/api/public/pages";

// --- INFO CARD COMPONENT ---
const InfoCard = ({ feature, index }) => {
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
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative flex items-start gap-2.5 p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg hover:bg-white/15 hover:border-white/20 transition-all duration-300 h-full"
    >
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-brand-primary/30 to-brand-primary/10 group-hover:from-brand-primary/40 group-hover:to-brand-primary/20 transition-all duration-300">
        <div className="[&>svg]:!w-4 [&>svg]:!h-4 sm:[&>svg]:!w-5 sm:[&>svg]:!h-5">{getIcon()}</div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight">{feature.element_title}</h4>
        {feature.element_body && (
          <div className="text-[10px] sm:text-xs text-white/60 mt-1 line-clamp-3 leading-relaxed">
            {getDisplayText(feature.element_body)}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- APPLY NOW SECTION ---
const ApplyNowSection = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-24 px-4"
      style={{background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))'}}
    >
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Ready to Start Your{" "}
            <span className="block sm:inline">Study Abroad Journey?</span>
          </h2>
          
          <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed">
            Take the first step towards your dream education. Our expert team is here to guide you through the entire process.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-1 rounded-full blur-xl opacity-70"
              style={{background: 'linear-gradient(to right, var(--brand-primary), var(--brand-accent))'}}
            />
            <Link
              href="/apply-now"
              className="relative inline-flex items-center gap-2 sm:gap-3 bg-white text-brand-primary hover:bg-white/90 px-6 sm:px-10 md:px-14 py-3 sm:py-4 md:py-5 rounded-full text-sm sm:text-base md:text-lg font-semibold shadow-2xl transition-all duration-300"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              Apply Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default function PromotionalSection({ pageNumber = 1 }) {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pageNumber) return;
    setLoading(true);
    fetch(`${API_BASE}/promotional-page-${pageNumber}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          setBlocks(res?.data?.blocks || []);
        } else {
          setError("Failed to load data");
        }
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, [pageNumber]);

  const offerSummaryBlock = blocks?.find(block => block.block_type === "offer-summary");
  const hero = offerSummaryBlock || blocks?.[0];

  const resolvedHeroImage = (() => {
    const img = offerSummaryBlock?.settings?.section_image || blocks?.[0]?.settings?.section_image;
    if (!img) return "/study_abroad/study-bg.webp";
    if (img.startsWith("http")) return img;
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
    return `${siteUrl}${img}`;
  })();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !blocks?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#191970] via-[#1a1a6e] to-[#0d0d4b]">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-white/60" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">No Promotional Data</h1>
          <p className="text-white/60 text-sm">No promotional content available for this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">

      {/* ── MOBILE LAYOUT: stacked (image → content) ── */}
      <section
        className="relative flex flex-col lg:hidden pt-[100px] sm:pt-[115px]"
        style={{background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))'}}
      >
        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-white/[0.03] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-[200px] h-[200px] bg-white/[0.03] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Mobile: Title + description ABOVE image */}
        <div className="relative z-10 px-4 sm:px-6 pt-4 pb-3">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 leading-tight">
              {hero?.section_title || "Study Abroad"}
            </h1>
            <div className="w-8 h-0.5 bg-gradient-to-r from-white/80 to-blue-300 rounded-full mb-3" />
            {hero?.section_description && (
              <div
                className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-3"
                dangerouslySetInnerHTML={{ __html: hero.section_description }}
              />
            )}
          </motion.div>
        </div>

        {/* Mobile: Hero Image — compact height */}
        <div className="relative z-10 px-4 sm:px-6 pb-4">
          <div className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <Image
              src={resolvedHeroImage}
              alt={hero?.section_title || "Study Abroad"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
          </div>
        </div>

        {/* Mobile: Blocks */}
        <div className="relative z-10 px-4 sm:px-6 pb-8 space-y-5">
          {blocks
            .filter(block => block.block_type !== "offer-summary")
            .map((block) => {
              const hasElements = block.elements?.length > 0;
              const hasDescription = block.section_description && block.section_description.replace(/<[^>]*>/g, '').trim().length > 0;
              const blockImage = block.settings?.section_image;
              const resolvedBlockImage = blockImage
                ? blockImage.startsWith("http") ? blockImage
                  : `${(process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "")}${blockImage}`
                : null;

              if (!hasElements && !hasDescription && !resolvedBlockImage) return null;

              return (
                <div key={block.id}>
                  {block.section_title && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 bg-gradient-to-b from-white/80 to-blue-300 rounded-full" />
                      <h2 className="text-sm font-semibold text-white/90">{block.section_title}</h2>
                    </div>
                  )}
                  {resolvedBlockImage && (
                    <div className="w-full aspect-[16/7] relative rounded-xl overflow-hidden shadow-lg border border-white/10 mb-3">
                      <Image src={resolvedBlockImage} alt={block.section_title || "Section image"} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  )}
                  {hasDescription && (
                    <div
                      className="text-white/75 text-xs leading-relaxed mb-3 [&_p]:mb-1.5"
                      dangerouslySetInnerHTML={{ __html: block.section_description }}
                    />
                  )}
                  {hasElements && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {block.elements.map((el, ei) => (
                        <InfoCard key={el.id || ei} feature={el} index={ei} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </section>

      {/* ── DESKTOP LAYOUT: sticky image left + scrolling right ── */}
      <section
        className="relative hidden lg:flex flex-row min-h-[calc(100vh-130px)] pt-[130px]"
        style={{background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))'}}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Left — Sticky Image */}
        <div className="w-[52%] sticky top-[130px] h-[calc(100vh-130px)] flex items-center justify-center p-6 z-20">
          <div className="w-full aspect-[4/5] max-h-[85vh] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <Image
              src={resolvedHeroImage}
              alt={hero?.section_title || "Study Abroad"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        </div>

        {/* Right — Scrolling content */}
        <div className="w-[48%] relative z-10">
          <div className="w-full max-w-xl mx-auto px-6 pt-6 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h1 className="text-4xl xl:text-5xl font-bold text-white mb-2 leading-snug">
                {hero?.section_title || "Study Abroad"}
              </h1>
              <div className="w-8 h-0.5 bg-gradient-to-r from-brand-primary to-blue-500 rounded-full mb-4" />
              {hero?.section_description && (
                <div
                  className="text-white/70 text-sm leading-relaxed mb-10"
                  dangerouslySetInnerHTML={{ __html: hero.section_description }}
                />
              )}
            </motion.div>

            {blocks
              .filter(block => block.block_type !== "offer-summary")
              .map((block) => {
                const hasElements = block.elements?.length > 0;
                const hasDescription = block.section_description && block.section_description.replace(/<[^>]*>/g, '').trim().length > 0;
                const blockImage = block.settings?.section_image;
                const resolvedBlockImage = blockImage
                  ? blockImage.startsWith("http") ? blockImage
                    : `${(process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "")}${blockImage}`
                  : null;

                if (!hasElements && !hasDescription && !resolvedBlockImage) return null;

                return (
                  <div key={block.id} className="mb-10">
                    {block.section_title && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-brand-primary to-blue-500 rounded-full" />
                        <h2 className="text-base font-semibold text-white/90">{block.section_title}</h2>
                      </div>
                    )}
                    {resolvedBlockImage && (
                      <div className="w-full aspect-[16/7] relative rounded-2xl overflow-hidden shadow-xl border border-white/10 mb-3 group">
                        <Image src={resolvedBlockImage} alt={block.section_title || "Section image"} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                    )}
                    {hasDescription && (
                      <div
                        className="text-white/75 text-sm leading-relaxed mb-3 [&_p]:mb-2 last:[&_p]:mb-0"
                        dangerouslySetInnerHTML={{ __html: block.section_description }}
                      />
                    )}
                    {hasElements && (
                      <div className="grid grid-cols-2 gap-3 auto-rows-fr">
                        {block.elements.map((el, ei) => (
                          <InfoCard key={el.id || ei} feature={el} index={ei} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <ApplyNowSection />
    </div>
  );
}