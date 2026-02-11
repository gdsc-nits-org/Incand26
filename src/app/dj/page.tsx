"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Play, Pause } from "lucide-react";

// CONSTANTS
const BACKGROUNDS = [
  { desktop: "/CARPEDIEM/1.png" },
  { desktop: "/CARPEDIEM/2.png" },
  { desktop: "/CARPEDIEM/3.png" },
];

const ARTISTS = [
  {
    name: "DJ PAREK",
    desktopGif: "/CARPEDIEM/parek.webm",
    mobileGif: "/CARPEDIEM/parekMob.webm",
  },
  {
    name: "DJ TASHA",
    desktopGif: "/CARPEDIEM/tasha.webm",
    mobileGif: "/CARPEDIEM/tashaMob.webm",
  },
  {
    name: "DJ LOUN",
    desktopGif: "/CARPEDIEM/loun.webm",
    mobileGif: "/CARPEDIEM/lounMob.webm",
  },
];

// Day Labels
const DAY_LABELS = ["DAY 0", "DAY 2 THUNDERMARCH", "DAY 3 CARPE DIEM"];

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
  rotate: { duration: 0.6 },
};

// Helper to check if source is video
const isVideo = (src: string) => src.endsWith(".webm") || src.endsWith(".mp4");

export default function CarpediemArtistPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % BACKGROUNDS.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + BACKGROUNDS.length) % BACKGROUNDS.length,
    );
  };

  const currentArtist = ARTISTS[currentIndex % ARTISTS.length];
  const currentBg = BACKGROUNDS[currentIndex % BACKGROUNDS.length];
  const currentDancers = DANCER_PAIRS[currentIndex % DANCER_PAIRS.length];
  const currentDayLabel = DAY_LABELS[currentIndex % DAY_LABELS.length];

  if (!currentArtist || !currentBg || !currentDancers) return null;

  return (
    <div className="font-hitchcut relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* =========================================
          BACKGROUND LAYER
         ========================================= */}
      <div className="absolute inset-0 z-0">
        <div className="relative block h-full w-full xl:hidden">
          <Image
            src="/CARPEDIEM/mobilebg.png"
            alt="Static Background Mobile"
            fill
            className="object-cover"
            style={{ objectPosition: "center top" }}
            priority
          />
        </div>

        <div className="relative hidden h-full w-full xl:block">
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
      <div className="relative z-10 flex h-full w-full flex-col items-center p-4 md:p-6 xl:p-8">
        {/* =========================================
            DESKTOP LAYOUT
           ========================================= */}
        <div className="relative mt-auto mb-auto hidden h-[90vh] w-full max-w-[1400px] items-center justify-between px-4 xl:flex 2xl:max-w-[2400px]">
          <div className="relative mx-auto h-[70%] w-[80%] overflow-visible xl:h-[75%] xl:w-[65%] 2xl:h-[85%] 2xl:w-[80%]">
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
                  {/* --- Video/Image Render --- */}
                  {isVideo(currentArtist.desktopGif) ? (
                    <video
                      src={currentArtist.desktopGif}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-2xl"
                    />
                  ) : (
                    <Image
                      src={currentArtist.desktopGif}
                      alt={currentArtist.name}
                      fill
                      unoptimized
                      className="object-contain object-bottom drop-shadow-2xl"
                      priority
                    />
                  )}

                  <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="pointer-events-none absolute right-0 bottom-4 left-0 text-center xl:bottom-12 2xl:bottom-20"
                  >
                    <h2
                      className="text-3xl font-normal tracking-wider text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] xl:text-5xl xl:text-7xl 2xl:text-9xl"
                      style={{
                        textShadow: "0 0 10px rgba(255,255,255,0.5)",
                        fontFamily: "Rocket Thunder, sans-serif",
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
            className="absolute bottom-[8%] left-[12%] z-[999] rounded-sm border-2 border-[#514114] bg-[#E69D16] px-6 py-2 text-[10px] font-bold text-black shadow-lg transition-colors hover:bg-[#ffb732] active:scale-95 xl:left-[20%] xl:px-8 xl:py-3 xl:text-sm 2xl:bottom-[5%] 2xl:left-[18%] 2xl:px-16 2xl:py-5 2xl:text-base"
          >
            PREVIOUS
          </button>

          <button
            onClick={handleNext}
            className="absolute right-[12%] bottom-[8%] z-[999] rounded-sm border-2 border-[#514114] bg-[#E69D16] px-6 py-2 text-[10px] font-bold text-black shadow-lg transition-colors hover:bg-[#ffb732] active:scale-95 xl:right-[20%] xl:px-8 xl:py-3 xl:text-sm 2xl:right-[18%] 2xl:bottom-[5%] 2xl:px-16 2xl:py-5 2xl:text-base"
          >
            NEXT
          </button>

          {/* === DESKTOP MUSIC BUTTON (Fixed Position) === */}
          <CustomMusicButton className="fixed bottom-6 right-6 z-[1000]" />

          <div className="absolute bottom-[8%] left-1/2 z-[999] -translate-x-1/2 rounded-sm border-2 border-black bg-[#E69D16] px-8 py-2 text-sm font-bold whitespace-nowrap text-black shadow-lg xl:px-12 xl:py-3 xl:text-xl 2xl:bottom-[3%] 2xl:px-20 2xl:py-5 2xl:text-2xl">
            {currentDayLabel}
          </div>
        </div>

        {/* =========================================
            MOBILE/TABLET VERTICAL LAYOUT 
           ========================================= */}
        <div className="flex h-full w-full flex-col items-center justify-evenly px-2 pt-8 pb-4 md:px-8 md:pt-16 md:pb-8 xl:hidden">
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
          <div className="relative z-10 mt-2 aspect-square h-[35vh] w-full max-w-[400px] shrink-0 md:h-[45vh]">
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
                {/* --- Conditional Video/Image Render Mobile --- */}
                {isVideo(currentArtist.mobileGif) ? (
                  <video
                    src={currentArtist.mobileGif}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <Image
                    src={currentArtist.mobileGif}
                    alt={currentArtist.name}
                    fill
                    unoptimized
                    className="object-cover object-top"
                    priority
                  />
                )}

                {/* Mobile Artist Name Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute right-0 bottom-8 left-0 z-20 text-center min-[400px]:bottom-12"
                >
                  <h2
                    className="text-3xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] min-[400px]:text-4xl"
                    style={{
                      textShadow: "0 0 5px rgba(255,255,255,0.5)",
                      fontFamily: "Rocket Thunder, sans-serif",
                    }}
                  >
                    {currentArtist.name}
                  </h2>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Day Label */}
          <div className="z-20 -mt-10 shrink-0 border-2 border-[#3E2D26] bg-[#D98605] px-6 py-2 shadow-md min-[400px]:-mt-20 md:px-10">
            <span className="text-base font-bold tracking-wide whitespace-nowrap text-[#3E2D26] md:text-xl">
              {currentDayLabel}
            </span>
          </div>

          <h2
            className="mt-2 shrink-0 text-center text-5xl font-bold tracking-wide text-[#3E2D26] drop-shadow-sm md:text-7xl"
            style={{ fontFamily: "var(--font-hitchcut)" }}
          >
            DJ NIGHT
          </h2>

          <div className="z-20 flex h-[12vh] w-full max-w-2xl items-center justify-between px-2 md:h-[15vh] md:px-12">
            <div className="relative h-full w-[25%]">
              <Image
                src={currentDancers[0]!}
                alt="Dancer Left"
                fill
                className="object-contain"
              />
            </div>

            {/* === MOBILE MUSIC BUTTON (Inline) === */}
            <div className="flex aspect-square h-[60%] items-center justify-center">
              <CustomMusicButton className="h-full w-full border-2 border-[#5c4a40] bg-[#D98605]/10 hover:bg-[#D98605]/30" />
            </div>

            <div className="relative h-full w-[25%]">
              <Image
                src={currentDancers[1]!}
                alt="Dancer Right"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="z-30 flex w-full max-w-2xl items-center justify-between md:px-8">
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

// === LOCAL COMPONENT FOR SPECIFIC MUSIC ===
function CustomMusicButton({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // FIX 1: Handle the Promise returned by play()
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/babailiano-afro-house-dj-iliano-remix-475171.mp3"
        loop
        hidden
      />
      <button
        onClick={toggle}
        // FIX 2: Use ?? (nullish coalescing) instead of || (logical OR)
        className={`flex cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 p-3 backdrop-blur-md transition-all hover:bg-black/70 active:scale-95 ${
          isPlaying ? "animate-pulse" : ""
        } ${className ?? ""}`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6 text-white" />
        ) : (
          <Play className="h-6 w-6 text-white" />
        )}
      </button>
    </>
  );
}