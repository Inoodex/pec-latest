"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ConsultBookingModal from "@/components/consultBookingModal";

const SLIDE_CHANGE_INTERVAL = 5000;

const getSortOrder = (slide, fallback) => {
  const sortOrder = Number(slide?.sort_order);
  return Number.isNaN(sortOrder) ? fallback : sortOrder;
};

const HeroAnimation = ({ hero_sliders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const sortedSlides = useMemo(
    () =>
      (Array.isArray(hero_sliders) ? hero_sliders : [])
        .map((slide, index) => ({ slide, index }))
        .sort(
          (a, b) =>
            getSortOrder(a.slide, a.index) - getSortOrder(b.slide, b.index),
        )
        .map(({ slide }) => slide),
    [hero_sliders],
  );
  const displaySlideIndex = sortedSlides.length
    ? currentSlideIndex % sortedSlides.length
    : 0;

  const baseSlide = sortedSlides[0] || {};
  const activeTextSlide = sortedSlides[displaySlideIndex] || baseSlide;
  const { floating_images, button_text } = baseSlide;
  const { title, subtitle } = activeTextSlide;
  const logos = floating_images || [];

  // Extract country from title
  const words = title.split(" ");
  const country = words.pop();
  const text = words.join(" ");

  useEffect(() => {
    if (sortedSlides.length <= 1) return;

    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % sortedSlides.length);
    }, SLIDE_CHANGE_INTERVAL);

    return () => clearInterval(slideTimer);
  }, [sortedSlides.length]);

  return (
    <section className="px-4 overflow-hidden lg:h-200 py-10 md:py-20 lg:py-40 bg-[url(/images/hero-background.webp)] xl:bg-left bg-left bg-no-repeat relative bg-cover flex items-center">
      <div className="absolute inset-0 bg-black/40"></div>

      <section className="flex flex-col-reverse lg:items-center lg:flex-row max-w-7xl mx-auto justify-between gap-10 w-full">
        <section className="relative w-full lg:w-6/12 ">
          <div className="absolute left-1/2 overflow-hidden w-90 md:w-120 lg:w-150 2xl:w-160 lg:left-1/2 -translate-x-1/2 top-1/2 lg:top-[54%] -translate-y-1/2 z-0 animate-spin-slow opacity-80 lg:opacity-100">
            <Image
              src={"/images/london-wheel.png"}
              width={800}
              height={400}
              alt={"london-wheel.png"}
            />
          </div>
          <div className="absolute  z-0 w-85 left-1/2 bottom-1 md:-bottom-8 md:w-120 lg:w-145 lg:bottom-15 lg:left-1/2 -translate-x-1/2 2xl:w-155 flex justify-center lg:block opacity-80 lg:opacity-100">
            <Image
              src={"/images/bg-stand.webp"}
              width={840}
              height={500}
              alt={"bg-stand"}
              className="brightness-60 md:w-full"
            />
          </div>

          <div className="flex items-center justify-center w-full lg:w-[75%] overflow-hidden 2xl:w-1/2 h-100 md:h-125 lg:h-220 z-10">
            <div className="absolute left-1/2 top-1/2 lg:top-[56%] -translate-y-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center animate-spin-slow hover:[animation-play-state:paused] group">
              {logos.map((logo, index) => {
                const rotationAngle = (index * 360) / logos.length;
                return (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      transform: `rotate(${rotationAngle}deg) translateY(var(--radius, -140px)) rotate(-${rotationAngle}deg)`,
                    }}
                    data-radius-setter
                  >
                    <style jsx>{`
                      div {
                        --radius: -120px;
                      }
                      @media (min-width: 768px) {
                        div {
                          --radius: -150px;
                        }
                      }
                      @media (min-width: 1024px) {
                        div {
                          --radius: -190px;
                        }
                      }
                      @media (min-width: 1536px) {
                        div {
                          --radius: -205px;
                        }
                      }
                    `}</style>

                    <div className="animate-spin-reverse bg-white rounded-md flex items-center justify-center w-16 md:w-20 md:h-12 lg:w-24 h-14 shadow-lg group-hover:[animation-play-state:paused] p-1">
                      <Image
                        src={process.env.NEXT_PUBLIC_SITE_URL + logo}
                        width={80}
                        height={40}
                        alt={`Logo ${index}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="z-10 text-center w-full lg:w-6/12 lg:text-left lg:mt-30 xl:mt-0 mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={
                activeTextSlide.id ||
                activeTextSlide.sort_order ||
                displaySlideIndex
              }
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight lg:leading-[1.2]">
                  {text} <span className="text-yellow-400">{country}</span>
                </h1>
                <div className="flex justify-center lg:justify-start">
                  <Image
                    src={"/images/line.gif"}
                    height={100}
                    width={200}
                    alt={"line.gif"}
                    className="w-37.5 lg:w-75 h-auto"
                  />
                </div>
              </div>
              <p className="text-white text-lg md:text-xl mt-5 max-w-md mx-auto lg:mx-0">
                {subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:mt-8 mt-0 flex justify-center lg:justify-start"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-primary text-white px-6 py-3 mt-5 lg:mt-0 rounded-full cursor-pointer hover:scale-105 duration-300 hover:bg-brand-accent hover:text-white"
            >
              {button_text || "Get Appointment"}
            </button>
          </motion.div>
        </section>
      </section>

      <ConsultBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default HeroAnimation;
