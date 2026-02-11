"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

// --- CONSTANTS ---
const DAY_LABELS = ["JAVED ALI"];

export default function KomediKnightPage() {
  const router = useRouter();
  
  // FIX 1: Removed unused 'setCurrentIndex' to satisfy the linter
  const [currentIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  // FIX 2: Explicit type for audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleNext = () => {
    router.push("/komedi");
  };

  const handlePrevious = () => {
    router.push("./komedi");
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // FIX 3: .play() returns a Promise. We must catch errors to satisfy the "no-floating-promises" rule.
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }
  };

  const currentDayLabel = DAY_LABELS[currentIndex % DAY_LABELS.length];

  return (
    <div className="font-hitchcut relative h-[100dvh] w-full overflow-hidden bg-black">
      
      {/* --- Audio Element --- */}
      <audio ref={audioRef} loop>
        <source src="/Tum-Tak.mp3" type="audio/mpeg" />
      </audio>

      {/* =========================================
          MUSIC TRIGGER AREA
         ========================================= */}
      
      {/* Mobile Trigger */}
      <div 
        onClick={toggleMusic}
        className="absolute z-20 block cursor-pointer bg-transparent
                   w-28 h-28 top-[17%] right-[5%] 
                   md:right-[13%] md:top-[15%] lg:top-[20%] lg:right-[13%]
                   xl:hidden"
        aria-label="Toggle Music"
      ></div>

      {/* Desktop Trigger */}
      <div 
        onClick={toggleMusic}
        className="absolute z-20 hidden cursor-pointer bg-transparent
                   w-44 h-44 top-[12%] right-[10%] 
                   xl:block"
        aria-label="Toggle Music"
      ></div>

      {/* =========================================
          BACKGROUND LAYER 
         ========================================= */}
      <div className="absolute inset-0 z-0">
        {/* --- MOBILE & TABLET BACKGROUND (< lg) --- */}
        <div className="relative block h-full w-full xl:hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Note: Using <img> generates warnings but is valid. Use <Image /> for optimization if needed later. */}
            <img
              src="/CARPEDIEM/mobilebg.png"
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <video
              key={isPlaying ? "mob-play" : "mob-pause"}
              autoPlay
              loop
              muted
              playsInline
              className="relative z-10 h-screen max-h-none w-full scale-110 scale-x-120 md:scale-125 md:scale-x-170 lg:scale-125 lg:scale-x-180"
            >
              <source 
                src={isPlaying ? "/CARPEDIEM/javedMobPlay.webm" : "/CARPEDIEM/javedMobPause.webm"} 
                type="video/webm" 
              />
            </video>
          </div>
        </div>

        {/* --- DESKTOP BACKGROUND (>= lg) --- */}
        <div className="relative hidden h-full w-full lg:block">
          <img
            src="/CARPEDIEM/2.png"
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              key={isPlaying ? "desk-play" : "desk-pause"}
              autoPlay
              loop
              muted
              playsInline
              className="relative z-10 h-auto max-h-none w-full"
            >
              <source 
                src={isPlaying ? "/CARPEDIEM/javedDeskPlay.webm" : "/CARPEDIEM/javedDeskPause.webm"} 
                type="video/webm" 
              />
            </video>
          </div>
        </div>
      </div>

      {/* =========================================
          CONTENT OVERLAY
         ========================================= */}
      <div className="relative z-10 flex h-full w-full flex-col items-center p-4 md:p-6 lg:p-8">
        {/* --- DESKTOP LAYOUT --- */}
        <div className="relative mt-auto mb-auto hidden h-[90vh] w-full max-w-[1400px] items-center justify-between px-4 lg:flex 2xl:max-w-[2400px]">
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
        </div>

        {/* --- MOBILE & TABLET LAYOUT --- */}
        <div className="flex h-full w-full flex-col items-center justify-end px-2 pb-8 lg:hidden">
          <div className="mb-8 hidden border-2 border-[#3E2D26] bg-[#D98605] px-8 py-3 whitespace-nowrap shadow-md">
            <span className="text-xl font-bold tracking-wide text-[#3E2D26]">
              {currentDayLabel}
            </span>
          </div>

          <div className="flex w-full max-w-2xl items-center justify-between">
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