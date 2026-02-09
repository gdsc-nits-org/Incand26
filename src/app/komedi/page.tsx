"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Transition } from "framer-motion";

// --- CONSTANTS & ASSETS ---

// Desktop Background
const BACKGROUNDS = [
  { desktop: "/CARPEDIEM/bgmain.png" },
];

// Artist Data
const ARTISTS = [
  {
    name: "Aditya Kulshresth",
    // Desktop: GIF
    desktopGif: "/CARPEDIEM/kullu.gif",
    // Mobile: Foreground Image
    mobileGif: "/CARPEDIEM/komedi_night_fg mobile.png",
  },
];

const DAY_LABELS = ["KOMEDI KNIGHT"];

// --- VARIANTS ---
const bgVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// SHARED ANIMATION SETTINGS
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    rotate: direction > 0 ? 5 : -5,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    rotate: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    rotate: direction < 0 ? 5 : -5,
    opacity: 0,
    scale: 0.9,
  }),
};

// Cinematic smooth transition
const smoothTransition: Transition = {
  x: { type: "tween", ease: "easeInOut", duration: 0.6 },
  opacity: { duration: 0.6 },
  scale: { duration: 0.6 },
  rotate: { duration: 0.6 },
};

export default function KomediKnightPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % ARTISTS.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + ARTISTS.length) % ARTISTS.length,
    );
  };

  // Safe checks
  const currentArtist = ARTISTS[currentIndex % ARTISTS.length];
  const currentBg = BACKGROUNDS[currentIndex % BACKGROUNDS.length];
  
  // FIX: Used '??' instead of '||' to satisfy the linter
  const currentDayLabel = DAY_LABELS[currentIndex % DAY_LABELS.length] ?? DAY_LABELS[0];

  if (!currentArtist || !currentBg) return null;

  return (
    <div className="font-hitchcut relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* =========================================
          BACKGROUND LAYER
         ========================================= */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <div className="relative block h-full w-full lg:hidden">
          <Image
            src="/CARPEDIEM/mobilebg.png"
            alt="Static Background Mobile"
            fill
            className="object-cover"
            style={{ objectPosition: "center top" }}
            priority
          />
        </div>

        {/* Desktop Background */}
        <div className="relative hidden h-full w-full lg:block">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              variants={bgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentBg.desktop}
                alt="Background Desktop"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center p-4 md:p-6 lg:p-8">
        
        {/* =========================================
            DESKTOP LAYOUT
           ========================================= */}
        <div className="relative mt-auto mb-auto hidden h-[90vh] w-full max-w-[1400px] items-center justify-between px-4 lg:flex 2xl:max-w-[2400px]">
          {/* Main Visual Container */}
          <div className="relative mx-auto h-[70%] w-[80%] overflow-visible lg:h-[75%] lg:w-[70%] xl:w-[65%] 2xl:h-[85%] 2xl:w-[80%]">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={currentArtist.name}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={smoothTransition}
                className="absolute inset-0 flex h-full w-full items-end justify-center"
              >
                <div className="relative h-full w-full">
                  {/* Desktop GIF - No Text Overlay */}
                  <Image
                    src={currentArtist.desktopGif}
                    alt={currentArtist.name}
                    fill
                    unoptimized
                    className="object-contain object-bottom drop-shadow-2xl"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute bottom-[8%] left-[12%] z-[999] rounded-sm border-2 border-[#514114] bg-[#E69D16] px-6 py-2 text-[10px] font-bold text-black shadow-lg transition-colors hover:bg-[#ffb732] active:scale-95 lg:left-[20%] lg:px-8 lg:py-3 lg:text-xs xl:px-8 xl:py-4 xl:text-sm 2xl:bottom-[5%] 2xl:left-[18%] 2xl:px-16 2xl:py-5 2xl:text-base"
          >
            PREVIOUS
          </button>

          <button
            onClick={handleNext}
            className="absolute right-[12%] bottom-[8%] z-[999] rounded-sm border-2 border-[#514114] bg-[#E69D16] px-6 py-2 text-[10px] font-bold text-black shadow-lg transition-colors hover:bg-[#ffb732] active:scale-95 lg:right-[20%] lg:px-8 lg:py-3 lg:text-xs xl:px-8 xl:py-4 xl:text-sm 2xl:right-[18%] 2xl:bottom-[5%] 2xl:px-16 2xl:py-5 2xl:text-base"
          >
            NEXT
          </button>

          <div className="absolute bottom-[8%] left-1/2 z-[999] -translate-x-1/2 rounded-sm border-2 border-black bg-[#E69D16] px-8 py-2 text-sm font-bold whitespace-nowrap text-black shadow-lg lg:px-12 lg:py-3 lg:text-lg xl:text-xl 2xl:bottom-[3%] 2xl:px-20 2xl:py-5 2xl:text-2xl">
            {currentDayLabel}
          </div>
        </div>

        {/* =========================================
            MOBILE/TABLET VERTICAL LAYOUT 
           ========================================= */}
        <div className="flex h-full w-full flex-col items-center justify-start px-2 pt-8 pb-4 md:px-8 md:pt-16 md:pb-8 lg:hidden">
          {/* Mobile Header */}
          <div className="z-20 flex shrink-0 flex-row items-center justify-center">
            <h1
              className="text-5xl leading-none font-bold tracking-widest text-[#3E2D26] md:text-6xl"
              style={{ fontFamily: "var(--font-hitchcut)" }}
            >
              INCAND
            </h1>
            <h1
              className="ml-2 text-5xl leading-none font-bold tracking-widest text-[#D98605] md:text-6xl"
              style={{ fontFamily: "var(--font-hitchcut)" }}
            >
              26
            </h1>
          </div>

          {/* Mobile Image Container */}
          <div className="relative z-10 mt-6 aspect-square h-[45vh] w-full max-w-[400px] shrink-0 border-4 border-[#3E2D26] bg-black/20 shadow-xl">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={currentArtist.name}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={smoothTransition}
                className="absolute inset-0 h-full w-full overflow-hidden"
              >
                <Image
                  src={currentArtist.mobileGif}
                  alt={currentArtist.name}
                  fill
                  unoptimized
                  className="object-cover object-top"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Day Label (Overlapping Bottom) */}
            <div className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap border-2 border-[#3E2D26] bg-[#D98605] px-6 py-2 shadow-md">
                <span className="text-base font-bold tracking-wide text-[#3E2D26] md:text-xl">
                {currentDayLabel}
                </span>
            </div>
          </div>

          {/* Mobile Text Content (Replaces Dancers/Music) */}
          <div className="mt-10 flex w-full max-w-[400px] flex-col items-center text-center">
            {/* Artist Name */}
            <h2 
                className="text-4xl font-bold tracking-wide text-[#3E2D26]"
                style={{ fontFamily: "var(--font-hitchcut)" }}
            >
                {currentArtist.name}
            </h2>
            
            {/* Venue Info */}
            <div className="mt-4 flex flex-col gap-1 text-[#3E2D26]">
                <p className="text-lg font-bold">Venue : To be announced soon</p>
                <p className="text-base opacity-80">Other informations to be added</p>
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="mt-auto flex w-full max-w-2xl items-center justify-between pt-6 md:px-8">
            <button
              onClick={handlePrevious}
              className="rounded-sm border border-black bg-[#E69D16] px-5 py-3 text-xs font-bold text-black transition-transform active:scale-95 md:px-8 md:py-4 md:text-xl"
            >
              PREVIOUS
            </button>

            <button
              onClick={handleNext}
              className="rounded-sm border border-black bg-[#E69D16] px-5 py-3 text-xs font-bold text-black transition-transform active:scale-95 md:px-8 md:py-4 md:text-xl"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}