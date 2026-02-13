"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

// --- CONSTANTS ---
const DAY_LABELS = ["JAVED ALI"];

export default function KomediKnightPage() {
  const router = useRouter();

  const [currentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }
  };

  const currentDayLabel = DAY_LABELS[currentIndex % DAY_LABELS.length];

  return (
    // CHANGE 1: Use 'min-h-screen' and 'relative' (removed h-[100dvh] and overflow-y-auto)
    // This allows the document itself to scroll if the content/bg is taller than the screen.
    <div className="font-hitchcut relative min-h-screen w-full overflow-x-hidden bg-black">
      {/* --- Audio Element --- */}
      <audio ref={audioRef} loop>
        <source src="/Tum-Tak.mp3" type="audio/mpeg" />
      </audio>

      {/* =========================================
          MUSIC TRIGGER AREA
          (Kept absolute so they position relative to the document flow)
         ========================================= */}
      
      {/* Mobile Trigger */}
      <div
        onClick={toggleMusic}
        className="absolute top-[17%] right-[5%] z-20 block h-28 w-28 cursor-pointer bg-transparent md:top-[25%] md:right-[13%] lg:top-[25%] lg:right-[10%] xl:hidden"
        aria-label="Toggle Music"
      ></div>

      {/* Desktop Trigger */}
      <div
        onClick={toggleMusic}
        className="absolute top-[12%] right-[10%] z-20 hidden h-44 w-44 cursor-pointer bg-transparent xl:block"
        aria-label="Toggle Music"
      ></div>

      {/* =========================================
          BACKGROUND LAYER 
          (Changed from fixed to relative so it pushes the page height)
         ========================================= */}
      <div className="relative z-0 w-full h-auto">
        {/* --- MOBILE & TABLET BACKGROUND (< lg) --- */}
        <div className="relative block w-full xl:hidden">
            {/* Note: Changed h-full/h-screen to h-auto min-h-screen to allow vertical leakage/scrolling */}
            <img
              src="/CARPEDIEM/mobilebg.png"
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative z-10 w-full h-auto min-h-screen overflow-hidden flex items-center lg:block justify-center">
              <video
                key={isPlaying ? "mob-play" : "mob-pause"}
                autoPlay
                loop
                muted
                playsInline
                // Removed h-screen constraint, allowed scale to dictate visual size
                className="relative w-full h-auto min-h-screen object-cover scale-110 scale-x-100 md:scale-100 md:scale-x-100 lg:scale-105 lg:scale-x-110"
              >
                <source
                  src={
                    isPlaying
                      ? "/CARPEDIEM/javedMobPlay.webm"
                      : "/CARPEDIEM/javedMobPause.webm"
                  }
                  type="video/webm"
                />
              </video>
            </div>
        </div>

        {/* --- DESKTOP BACKGROUND (>= lg) --- */}
        <div className="relative hidden w-full xl:block">
          <img
            src="/CARPEDIEM/2.png"
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative z-10 flex w-full h-auto min-h-screen items-center justify-center">
            <video
              key={isPlaying ? "desk-play" : "desk-pause"}
              autoPlay
              loop
              muted
              playsInline
              className="relative h-auto w-full object-cover"
            >
              <source
                src={
                  isPlaying
                    ? "/CARPEDIEM/javedDeskPlay.webm"
                    : "/CARPEDIEM/javedDeskPause.webm"
                }
                type="video/webm"
              />
            </video>
          </div>
        </div>
      </div>

      {/* =========================================
          CONTENT OVERLAY
          (Changed to absolute inset-0 to match the BACKGROUND's height)
         ========================================= */}
      <div className="absolute inset-0 z-10 flex w-full flex-col items-center p-4 md:p-6 lg:p-8 pointer-events-none">
        
        {/* --- DESKTOP LAYOUT --- */}
        {/* Added pointer-events-auto to buttons so they remain clickable */}
        <div className="relative mt-auto mb-auto hidden h-[90vh] w-full max-w-[1400px] items-center justify-between px-4 lg:flex 2xl:max-w-[2400px]">
          <button
            onClick={handlePrevious}
            className="pointer-events-auto absolute bottom-[8%] left-[12%] z-[999] rounded-sm border-2 border-[#514114] bg-[#E69D16] px-6 py-2 text-[10px] font-bold text-black shadow-lg transition-colors hover:bg-[#ffb732] active:scale-95 lg:left-[20%] lg:px-8 lg:py-3 lg:text-xs xl:px-8 xl:py-4 xl:text-sm 2xl:bottom-[5%] 2xl:left-[18%] 2xl:px-16 2xl:py-5 2xl:text-base"
          >
            PREVIOUS
          </button>

          <button
            onClick={handleNext}
            className="pointer-events-auto absolute right-[12%] bottom-[8%] z-[999] rounded-sm border-2 border-[#514114] bg-[#E69D16] px-6 py-2 text-[10px] font-bold text-black shadow-lg transition-colors hover:bg-[#ffb732] active:scale-95 lg:right-[20%] lg:px-8 lg:py-3 lg:text-xs xl:px-8 xl:py-4 xl:text-sm 2xl:right-[18%] 2xl:bottom-[5%] 2xl:px-16 2xl:py-5 2xl:text-base"
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

          <div className="flex w-full max-w-2xl items-center justify-between pointer-events-auto">
            <button
              onClick={handlePrevious}
              className="rounded-sm border  border-black bg-[#E69D16] px-5 py-3 text-xs font-bold text-black transition-transform active:scale-95 md:px-8 md:py-4 md:text-xl"
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