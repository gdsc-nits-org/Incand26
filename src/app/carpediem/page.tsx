"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// --- CONSTANTS ---
const DAY_LABELS = ["JAVED ALI"];

export default function KomediKnightPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    router.push("/komedi");
  };

  const handlePrevious = () => {
    router.push("./komedi");
  };

  const currentDayLabel = DAY_LABELS[currentIndex % DAY_LABELS.length];

  return (
    <div className="font-hitchcut relative h-[100dvh] w-full overflow-hidden bg-black">
      
      {/* =========================================
          BACKGROUND LAYER (IMAGES + VIDEOS) 
         ========================================= */}
      <div className="absolute inset-0 z-0">
        
        {/* --- MOBILE & TABLET BACKGROUND (< lg) --- */}
        <div className="relative block h-full w-full lg:hidden">
          {/* 1. Static Image Background (Base Layer) */}
        

          {/* 2. Video/GIF Layer */}
          {/* Flex container ensures the h-auto video is vertically centered */}
          <div className="absolute inset-0 flex items-center justify-center">
              <img 
            src="/CARPEDIEM/mobilebg.png" 
            alt="Background" 
            className="absolute inset-0 h-full w-full object-cover"
          />
            <video
              autoPlay
              loop
              muted
              playsInline
              // Changed: w-full h-auto ensures full width visibility without cropping
              className="relative z-10 scale-480 w-full h-screen max-h-none"
            >
              <source src="/CARPEDIEM/outputmob.webm" type="video/webm" />
            </video>
          </div>
        </div>

        {/* --- DESKTOP BACKGROUND (>= lg) --- */}
        <div className="relative hidden h-full w-full lg:block">
          {/* 1. Static Image Background (Base Layer) */}
          <img 
            src="/CARPEDIEM/2.png" 
            alt="Background" 
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* 2. Video/GIF Layer */}
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              // Changed: w-full h-auto ensures full width visibility without cropping
              className="relative z-10 w-full h-auto max-h-none"
            >
              <source src="/CARPEDIEM/output.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </div>

      {/* =========================================
          CONTENT OVERLAY
         ========================================= */}
      <div className="relative z-10 flex h-full w-full flex-col items-center p-4 md:p-6 lg:p-8">
        
        {/* --- DESKTOP LAYOUT (Large Screens Only) --- */}
        <div className="relative mt-auto mb-auto hidden h-[90vh] w-full max-w-[1400px] items-center justify-between px-4 lg:flex 2xl:max-w-[2400px]">
          
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute bottom-[8%] left-[12%] z-[999] rounded-sm border-2 border-[#514114] bg-[#E69D16] px-6 py-2 text-[10px] font-bold text-black shadow-lg transition-colors hover:bg-[#ffb732] active:scale-95 lg:left-[20%] lg:px-8 lg:py-3 lg:text-xs xl:px-8 xl:py-4 xl:text-sm 2xl:bottom-[5%] 2xl:left-[18%] 2xl:px-16 2xl:py-5 2xl:text-base"
          >
            PREVIOUS
          </button>

          {/* Center Label
          <div className="absolute  bottom-[8%] left-1/2 z-[999] -translate-x-1/2 rounded-sm border-2 border-black bg-[#E69D16] px-8 py-2 text-sm font-bold whitespace-nowrap text-black shadow-lg lg:px-12 lg:py-3 lg:text-lg xl:text-xl 2xl:bottom-[3%] 2xl:px-20 2xl:py-5 2xl:text-2xl">
            {currentDayLabel}
          </div> */}

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-[12%] bottom-[8%] z-[999] rounded-sm border-2 border-[#514114] bg-[#E69D16] px-6 py-2 text-[10px] font-bold text-black shadow-lg transition-colors hover:bg-[#ffb732] active:scale-95 lg:right-[20%] lg:px-8 lg:py-3 lg:text-xs xl:px-8 xl:py-4 xl:text-sm 2xl:right-[18%] 2xl:bottom-[5%] 2xl:px-16 2xl:py-5 2xl:text-base"
          >
            NEXT
          </button>
        </div>

        {/* --- MOBILE & TABLET LAYOUT (Same as video breakpoint) --- */}
        <div className="flex h-full w-full flex-col items-center justify-end px-2 pb-8 lg:hidden">
          
          {/* Center Label - Mobile Position */}
          <div className="hidden mb-8 border-2 border-[#3E2D26] bg-[#D98605] px-8 py-3 whitespace-nowrap shadow-md">
            <span className="text-xl font-bold tracking-wide text-[#3E2D26]">
              {currentDayLabel}
            </span>
          </div>

          {/* Mobile Buttons Container */}
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