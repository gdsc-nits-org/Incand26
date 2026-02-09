"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import MusicButton from "@/components/MusicButton"; 

// CONSTANTS
const BACKGROUNDS = [
  { desktop: "/CARPEDIEM/1.png" },
  { desktop: "/CARPEDIEM/2.png" },
  { desktop: "/CARPEDIEM/3.png" },
];

const ARTISTS = [
  {
    name: "DJ PAREK",
    desktopGif: "/CARPEDIEM/parek_desk.gif",
    mobileGif: "/CARPEDIEM/parek.gif",
  },
  {
    name: "DJ TASHA",
    desktopGif: "/CARPEDIEM/tasha_desk.gif",
    mobileGif: "/CARPEDIEM/tasha.gif",
  },
  {
    name: "DJ LOUN",
    desktopGif: "/CARPEDIEM/lound_desk.gif",
    mobileGif: "/CARPEDIEM/loun.gif",
  }
];

// Day Labels
const DAY_LABELS = [
  "DAY 0 NIRVANA",
  "DAY 2 CARPE DIEM",
  "DAY 3 CARPE DIEM"
];

const DANCER_PAIRS = [
  ["/CARPEDIEM/dancer1.png", "/CARPEDIEM/dancer2.png"], 
  ["/CARPEDIEM/dancer3.png", "/CARPEDIEM/dancer4.png"], 
  ["/CARPEDIEM/dancer5.png", "/CARPEDIEM/dancer6.png"], 
];

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
  rotate: { duration: 0.6 }
};

export default function CarpediemArtistPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1); 
    setCurrentIndex((prev) => (prev + 1) % BACKGROUNDS.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + BACKGROUNDS.length) % BACKGROUNDS.length);
  };

  const currentArtist = ARTISTS[currentIndex % ARTISTS.length];
  const currentBg = BACKGROUNDS[currentIndex % BACKGROUNDS.length];
  const currentDancers = DANCER_PAIRS[currentIndex % DANCER_PAIRS.length];
  const currentDayLabel = DAY_LABELS[currentIndex % DAY_LABELS.length];

  // FIX: Added !currentDancers to the check so TypeScript knows it exists below
  if (!currentArtist || !currentBg || !currentDancers) return null;

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black font-hitchcut">
      
      {/* =========================================
          BACKGROUND LAYER
         ========================================= */}
      <div className="absolute inset-0 z-0">
        <div className="block lg:hidden relative w-full h-full">
            <Image
              src="/CARPEDIEM/mobilebg.png"
              alt="Static Background Mobile"
              fill
              className="object-cover"
              style={{ objectPosition: "center top" }}
              priority
            />
        </div>

        <div className="hidden lg:block relative w-full h-full">
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
      <div className="relative z-10 flex flex-col items-center h-full w-full p-4 md:p-6 lg:p-8">

        {/* =========================================
            DESKTOP LAYOUT
           ========================================= */}
        <div className="hidden lg:flex w-full max-w-[1400px] 2xl:max-w-[2400px] h-[90vh] items-center justify-between relative px-4 mt-auto mb-auto">
          
          <div className="relative w-[80%] lg:w-[70%] xl:w-[65%] 2xl:w-[80%] h-[70%] lg:h-[75%] 2xl:h-[85%] mx-auto overflow-visible">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentArtist.name}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={smoothTransition}
                className="absolute inset-0 w-full h-full flex items-end justify-center"
              >
                <div className="relative w-full h-full">
                    <Image
                      src={currentArtist.desktopGif}
                      alt={currentArtist.name}
                      fill
                      unoptimized
                      className="object-contain object-bottom drop-shadow-2xl"
                      priority
                    />
                    <motion.div
                      initial={{ y: 50, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="absolute bottom-4 lg:bottom-12 2xl:bottom-20 left-0 right-0 text-center pointer-events-none"
                    >
                      <h2 
                        className="text-3xl lg:text-5xl xl:text-7xl 2xl:text-9xl text-white font-normal tracking-wider drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" 
                        style={{ 
                          textShadow: '0 0 10px rgba(255,255,255,0.5)',
                          fontFamily: 'Rocket Thunder, sans-serif' 
                        }}
                      >
                          {currentArtist.name}
                      </h2>
                    </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handlePrevious}
            className="absolute bottom-[8%] 2xl:bottom-[5%] z-[999] left-[12%] lg:left-[20%] 2xl:left-[18%] border-[#514114] bg-[#E69D16] text-black px-6 lg:px-8 xl:px-8 2xl:px-16 py-2 lg:py-3 xl:py-4 2xl:py-5 font-bold hover:bg-[#ffb732] transition-colors border-2 shadow-lg active:scale-95 text-[10px] lg:text-xs xl:text-sm 2xl:text-base rounded-sm"
          >
            PREVIOUS
          </button>
          
          <button
            onClick={handleNext}
            className="absolute bottom-[8%] 2xl:bottom-[5%] z-[999] right-[12%] lg:right-[20%] 2xl:right-[18%] border-[#514114] bg-[#E69D16] text-black px-6 lg:px-8 xl:px-8 2xl:px-16 py-2 lg:py-3 xl:py-4 2xl:py-5 font-bold hover:bg-[#ffb732] transition-colors border-2 shadow-lg active:scale-95 text-[10px] lg:text-xs xl:text-sm 2xl:text-base rounded-sm"
          >
            NEXT
          </button>

          <div className="absolute bottom-[8%] 2xl:bottom-[3%] z-[999] left-1/2 -translate-x-1/2 bg-[#E69D16] px-8 lg:px-12 2xl:px-20 py-2 lg:py-3 2xl:py-5 rounded-sm text-black font-bold border-2 border-black shadow-lg text-sm lg:text-lg xl:text-xl 2xl:text-2xl whitespace-nowrap">
            {currentDayLabel}
          </div>
        </div>


        {/* =========================================
            MOBILE/TABLET VERTICAL LAYOUT 
           ========================================= */}
        <div className="flex lg:hidden flex-col w-full h-full items-center pt-8 md:pt-16 px-2 md:px-8 pb-4 md:pb-8 justify-evenly">

          <div className="flex flex-row items-center justify-center z-20 shrink-0">
             <h1 className="text-5xl md:text-6xl font-bold text-[#3E2D26] tracking-widest leading-none" style={{ fontFamily: 'var(--font-hitchcut)' }}>
                 INCAND
             </h1>
             <h1 className="text-5xl md:text-6xl font-bold text-[#D98605] tracking-widest leading-none ml-2" style={{ fontFamily: 'var(--font-hitchcut)' }}>
                 26
             </h1>
          </div>

          {/* Mobile Image Container */}
          <div className="relative w-full max-w-[400px] h-[35vh] md:h-[45vh] aspect-square z-10 shrink-0 mt-2">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentArtist.name}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={smoothTransition}
                className="absolute inset-0 w-full h-full overflow-hidden"
              >
                <Image
                  src={currentArtist.mobileGif}
                  alt={currentArtist.name}
                  fill
                  unoptimized
                  className="object-cover object-top"
                  priority
                />
                
                {/* Mobile Artist Name Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-8 min-[400px]:bottom-12 left-0 right-0 text-center z-20 pointer-events-none"
                >
                  <h2 
                    className="text-3xl min-[400px]:text-4xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                    style={{ 
                      textShadow: '0 0 5px rgba(255,255,255,0.5)',
                      fontFamily: 'Rocket Thunder, sans-serif' 
                    }}
                  >
                    {currentArtist.name}
                  </h2>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Day Label */}
          <div className="bg-[#D98605] px-6 md:px-10 py-2 -mt-10 min-[400px]:-mt-20 z-20 border-2 border-[#3E2D26] shadow-md shrink-0">
            <span className="text-[#3E2D26] font-bold text-base md:text-xl tracking-wide whitespace-nowrap">
              {currentDayLabel}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-[#3E2D26] mt-2 tracking-wide drop-shadow-sm text-center shrink-0" style={{ fontFamily: 'var(--font-hitchcut)' }}>
             DJ NIGHT
          </h2>

          <div className="w-full flex justify-between items-center px-2 md:px-12 z-20 max-w-2xl h-[12vh] md:h-[15vh]">
             <div className="relative w-[25%] h-full">
                 <Image 
                    src={currentDancers[0]!} 
                    alt="Dancer Left" 
                    fill 
                    className="object-contain"
                 />
             </div>

             {/* Functional Music Button */}
             <div className="h-[60%] aspect-square flex items-center justify-center">
                 <MusicButton 
                   className="w-full h-full bg-[#D98605]/10 border-2 border-[#5c4a40] hover:bg-[#D98605]/30" 
                 />
             </div>

             <div className="relative w-[25%] h-full">
                 <Image 
                    src={currentDancers[1]!}
                    alt="Dancer Right" 
                    fill 
                    className="object-contain"
                 />
             </div>
          </div>

          <div className="flex justify-between items-center w-full z-30 max-w-2xl md:px-8">
            <button
              onClick={handlePrevious}
              className="bg-[#E69D16] text-black px-5 md:px-8 py-3 md:py-4 rounded-sm border border-black font-bold text-xs md:text-xl active:scale-95 transition-transform"
            >
              PREVIOUS
            </button>

            <button
              onClick={handleNext}
              className="bg-[#E69D16] text-black px-5 md:px-8 py-3 md:py-4 rounded-sm border border-black font-bold text-xs md:text-xl active:scale-95 transition-transform"
            >
              NEXT
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}