/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { Theme } from "./merch-section";

interface MerchProps {
  theme: Theme;
  isLight: boolean;
  handleThemeSwitch: (t: "light" | "dark") => void;
  springTransition: Record<string, unknown>;
  popVariants: Variants; // FIX: Changed from Record<string, unknown> to Variants
}

export function MerchMobile({
  theme,
  isLight,
  handleThemeSwitch,
  springTransition,
  popVariants,
}: MerchProps) {
  return (
    <div className="font-hitchcut fixed inset-0 z-20 flex h-full w-full flex-col justify-between overflow-hidden bg-transparent px-5 py-4">
      {/* =========================================
          BACKGROUND LAYER 
         ========================================= */}

      {/* 1. Ghost Text (Background) - UPDATED: 2 Lines, Smaller, Customizable */}
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center leading-[0.85] opacity-[0.08] select-none">
        {/* [CUSTOMIZE]: Change text-[20vw] to adjust size */}
        <div className="flex items-center gap-4">
          <span
            className="text-[15vw]"
            style={{ color: isLight ? "#000" : "#fff" }}
          >
            INCAND
          </span>
          <span className="text-[15vw] text-[#d16d1b]">20</span>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="text-[13vw]"
            style={{ color: isLight ? "#000" : "#fff" }}
          >
            ESCENCE
          </span>
          <span className="text-[13vw] text-[#d16d1b]">26</span>
        </div>
      </div>

      {/* 2. Side Decoration - LEFT TOP */}
      <div className="pointer-events-none absolute top-5 left-2 z-0 flex w-8 flex-col gap-2 opacity-70 mix-blend-overlay md:w-10">
        <AnimatePresence mode="wait">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`left-mob-${i}-${theme.id}`}
              initial={{ x: -50, opacity: 0, rotate: -180 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -50, opacity: 0, rotate: -180 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: "backOut" }}
              className="relative aspect-square w-full"
            >
              <img
                src={theme.japiImage}
                alt=""
                className="h-full w-full object-contain"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. Side Decoration - RIGHT BOTTOM */}
      <div className="pointer-events-none absolute right-2 bottom-5 z-0 flex w-8 flex-col-reverse gap-2 opacity-70 mix-blend-overlay md:w-10">
        <AnimatePresence mode="wait">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`right-mob-${i}-${theme.id}`}
              initial={{ x: 50, opacity: 0, rotate: 180 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: 50, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: "backOut" }}
              className="relative aspect-square w-full"
            >
              <img
                src={theme.japiImage}
                alt=""
                className="h-full w-full object-contain"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* =========================================
          CONTENT LAYER 
         ========================================= */}

      {/* --- TOP ROW: Arrow & Heading --- */}
      <div className="relative z-30 mt-2 flex w-full items-start justify-between">
        {/* Arrow Button (Top Left) - ANIMATED */}
        <div className="shrink-0 pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={`arrow-${theme.id}`}
              variants={popVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Link href="/">
                <img
                  src="/merch/button-arrow.jpeg"
                  alt="Back"
                  className="h-auto w-[80px] object-contain drop-shadow-md transition-transform hover:scale-105"
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Heading & Description (Top Right) */}
        <div className="flex flex-col items-end text-right">
          {/* Animated Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-head-${theme.id}`}
              variants={popVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1
                className="mb-2 text-4xl leading-[0.85] tracking-wide uppercase md:text-5xl"
                style={{ color: theme.textPrimary }}
              >
                {theme.heading.split("\n").map((word: string, i: number) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Animated Description - UPDATED */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-desc-${theme.id}`}
              variants={popVariants} // Uses the same pop animation
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: 0.1 }} // Slight stagger
              className="max-w-[150px] text-[10px] leading-[1.3] font-bold tracking-widest uppercase md:text-[15px]"
              style={{ color: theme.textSecondary }}
            >
              {theme.desc}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- MIDDLE: SHIRT & BACKGROUND PATTERNS --- */}
      <div className="relative z-20 flex min-h-0 w-full flex-1 items-center justify-center">
        {/* Pattern 1: Main Center (Behind Shirt) */}
        <AnimatePresence mode="popLayout">
          {theme.japiImage && (
            <motion.div
              key={theme.id + "-mob-japi-main"}
              initial={{ rotate: -180, scale: 0.2, opacity: 0 }}
              animate={{
                rotate: 0,
                scale: 1,
                opacity: 0.5,
                x: isLight ? "-40%" : "30%",
              }}
              exit={{ rotate: 180, scale: 0.2, opacity: 0 }}
              transition={{ type: "spring", stiffness: 40, damping: 20 }}
              className="absolute right-[20%] bottom-[50%] z-0 w-[55%] md:right-[30%] md:w-[35%]"
            >
              <img
                src={theme.japiImage}
                alt=""
                className="h-auto w-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pattern 2: Secondary Small (Bottom Right Background) */}
        <AnimatePresence mode="popLayout">
          {theme.japiImage && (
            <motion.div
              key={theme.id + "-mob-japi-small"}
              initial={{ rotate: 290, scale: 0.2, opacity: 0 }}
              animate={{
                rotate: 2,
                scale: 1,
                opacity: 0.6,
                x: isLight ? "20%" : "-50%",
              }}
              exit={{ rotate: 180, scale: 0.2, opacity: 0 }}
              transition={{ type: "spring", stiffness: 40, damping: 20 }}
              className="absolute right-[20%] bottom-[0%] z-0 w-[45%] md:right-[33%] md:bottom-[10%] md:w-[25%] xl:right-[35%]"
            >
              <img
                src={theme.japiImage}
                alt=""
                className="h-auto w-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- T-SHIRT CONTAINER --- */}
        <div className="relative z-10 flex aspect-[3/4] w-[85%] max-w-[300px] items-center justify-center">
          <AnimatePresence mode="popLayout">
            {isLight ? (
              <motion.img
                key="mob-shirt-light"
                src={theme.shirtImage}
                alt="Light Merch"
                initial={{ opacity: 0, scale: 0.7, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
              />
            ) : (
              <motion.img
                key="mob-shirt-dark"
                src={theme.shirtImage}
                alt="Dark Merch"
                initial={{ opacity: 0, scale: 0.6, y: 15 }}
                animate={{ opacity: 1, scale: 0.8, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- BOTTOM SECTION: Price -> Buttons -> Toggle --- */}
      <div className="relative z-30 mb-2 flex w-full flex-col items-center gap-3">
        {/* Price - ANIMATED */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`price-${theme.id}`}
            layoutId="mob-price"
            className="w-full text-center"
            transition={springTransition}
          >
            <h3
              className="md:text-md mb-1 text-sm font-bold tracking-widest uppercase"
              style={{ color: isLight ? "#5B0D0D" : "#DCA54E" }}
            >
              Get it NOW !
            </h3>
            <h2
              className="text-4xl leading-[0.9] font-black tracking-widest md:text-5xl"
              style={{ color: theme.textSecondary }}
            >
              {theme.price}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* Buttons Row - ANIMATED */}
        <div className="flex w-full items-center justify-center gap-3">
          <AnimatePresence mode="wait">
            {/* BUY NOW */}
            <motion.div
              key={`btn-buy-${theme.id}`}
              variants={popVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: 0.1 }}
            >
              <MobileButton
                text="BUY NOW"
                textColor="#F5EDD8"
                bg="/merch/button_texture1.png"
                iconDefault="/merch/svg3.svg"
                iconHover="/merch/svg4.svg"
              />
            </motion.div>

            {/* OPT OUT */}
            <motion.div
              key={`btn-opt-${theme.id}`}
              variants={popVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: 0.2 }}
            >
              <MobileButton
                text="OPT OUT"
                textColor="#2A1B12"
                bg="/merch/button_texture2.png"
                iconDefault="/merch/svg1.svg"
                iconHover="/merch/svg2.svg"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Toggle Switch */}
        <div className="relative mt-1 flex scale-75 items-center justify-center">
          <div className="absolute z-0 h-[14px] w-[280px] rounded-full border-2 border-[#DCA54E] bg-[#361E1E] shadow-lg" />
          <div className="relative z-10 flex gap-[70px]">
            <button
              onClick={() => handleThemeSwitch("light")}
              className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                isLight
                  ? "scale-110 border-[2px] border-black bg-white shadow-xl"
                  : "scale-100 border-[2px] border-[#C39044] bg-black opacity-80"
              }`}
            >
              <img
                src="/merch/mask_merch_toggle2.svg"
                alt="Light"
                className="h-10 w-10 object-contain"
              />
            </button>
            <button
              onClick={() => handleThemeSwitch("dark")}
              className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                !isLight
                  ? "scale-110 border-[2px] border-black bg-white shadow-xl"
                  : "scale-100 border-[2px] border-[#DCA54E] bg-black opacity-80"
              }`}
            >
              <img
                src="/merch/mask_merch_toggle.svg"
                alt="Dark"
                className="h-10 w-10 object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MOBILE BUTTON COMPONENT ---
interface MobileButtonProps {
  text: string;
  textColor: string;
  bg: string;
  iconDefault: string;
  iconHover: string;
}

function MobileButton({
  text,
  textColor,
  bg,
  iconDefault,
  iconHover,
}: MobileButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative flex h-[50px] w-[160px] items-center justify-center overflow-hidden rounded-full shadow-lg transition-transform active:scale-95 md:w-[200px]"
      style={{
        backgroundImage: `url('${bg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="z-10 flex items-center gap-2">
        <div className="relative h-5 w-4 overflow-hidden">
          <motion.img
            src={iconDefault}
            className="absolute h-full w-full object-contain"
            animate={{ y: hover ? -30 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.img
            src={iconHover}
            className="absolute h-full w-full object-contain"
            initial={{ y: 30 }}
            animate={{ y: hover ? 0 : 30 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        <span
          className="font-hitchcut pt-1 text-lg tracking-widest"
          style={{ color: textColor }}
        >
          {text}
        </span>
      </div>
    </button>
  );
}
