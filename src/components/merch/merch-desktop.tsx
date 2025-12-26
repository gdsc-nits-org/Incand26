/* eslint-disable @next/next/no-img-element */
"use client";

import {
  AnimatePresence,
  motion,
  LayoutGroup,
  type Variants,
} from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import type { Theme } from "./merch-section";

interface MerchProps {
  theme: Theme;
  isLight: boolean;
  handleThemeSwitch: (t: "light" | "dark") => void;
  springTransition: object;
  popVariants: Variants;
}

export function MerchDesktop({
  theme,
  isLight,
  handleThemeSwitch,
  springTransition,
  popVariants,
}: MerchProps) {
  return (
    <>
      {/* --- GHOST BACKGROUND TEXT --- */}
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center leading-[0.85] opacity-[0.08] select-none">
        <div className="flex items-center gap-4">
          <span
            className="text-[12vw] xl:text-[13vw] 2xl:text-[14vw]"
            style={{ color: isLight ? "#000" : "#fff" }}
          >
            INCAND
          </span>
          <span className="text-[14vw] xl:text-[15vw] text-[#d16d1b]">20</span>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="text-[10vw] xl:text-[11vw] 2xl:text-[12vw]"
            style={{ color: isLight ? "#000" : "#fff" }}
          >
            ESCENCE
          </span>
          <span className="text-[12vw] xl:text-[13vw] text-[#d16d1b]">26</span>
        </div>
      </div>

      {/* --- SIDE DECOR --- */}
      <div className="pointer-events-none absolute inset-0 z-0 flex h-full justify-between px-4 xl:px-12">
        {/* Left Column */}
        <div className="relative flex h-full w-12 flex-col items-center justify-between py-12 mix-blend-overlay lg:w-16 xl:w-24 2xl:w-32">
          <AnimatePresence mode="wait">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`left-deco-${i}-${theme.id}`}
                initial={{ x: -150, opacity: 0, rotate: -360 }}
                animate={{ x: 0, opacity: 0.5, rotate: 0 }}
                exit={{ x: -150, opacity: 0, rotate: -360 }}
                transition={{ duration: 0.8, ease: "backOut", delay: i * 0.05 }}
                className="relative aspect-square w-full shrink-0"
              >
                <img
                  src={theme.japiImage}
                  alt=""
                  className="h-full w-full object-contain drop-shadow-lg"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Right Column */}
        <div className="relative flex h-full w-12 flex-col items-center justify-between py-12 mix-blend-overlay lg:w-16 xl:w-24 2xl:w-32">
          <AnimatePresence mode="wait">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`right-deco-${i}-${theme.id}`}
                initial={{ x: 150, opacity: 0, rotate: 360 }}
                animate={{ x: 0, opacity: 0.5, rotate: 0 }}
                exit={{ x: 150, opacity: 0, rotate: 360 }}
                transition={{ duration: 0.8, ease: "backOut", delay: i * 0.05 }}
                className="relative aspect-square w-full shrink-0"
              >
                <img
                  src={theme.japiImage}
                  alt=""
                  className="h-full w-full object-contain drop-shadow-lg"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <LayoutGroup>
        {/* Main Grid */}
        <div className="font-hitchcut relative z-10 grid h-full max-h-[85vh] w-full max-w-[1920px] grid-cols-12 items-center gap-2 px-8 pb-20 lg:gap-4 lg:px-16 xl:gap-8 xl:px-24 2xl:max-w-full 2xl:gap-12">
          
          {/* --- TOP LEFT ARROW --- */}
          <div className="absolute top-6 left-8 z-[60] lg:top-10 xl:top-0 2xl:-top:10 lg:left-16 xl:left-24">
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
                    className="w-20 cursor-pointer object-contain transition-transform hover:scale-105 lg:w-24 xl:w-32 2xl:w-40"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* === LEFT COLUMN (Price/Buttons) === */}
          {/* Z-Index 30 ensures text stays above Japi pattern if it overlaps */}
          <div className="relative z-30 col-span-4 flex h-full flex-col items-start justify-center pl-4 text-left lg:pl-8 xl:pl-16">
            {isLight ? (
              <>
                <PriceElement
                  theme={theme}
                  isLight={isLight}
                  springTransition={springTransition}
                />
                <AnimatePresence mode="wait">
                  <ButtonsElement popVariants={popVariants} />
                </AnimatePresence>
              </>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <HeadingElement
                    key="head-dark"
                    theme={theme}
                    popVariants={popVariants}
                  />
                </AnimatePresence>
                <DescElement
                  theme={theme}
                  springTransition={springTransition}
                />
              </>
            )}
          </div>

          {/* === CENTER IMAGE COLUMN === */}
          <div className="perspective-1000 relative col-span-4 flex h-[50vh] w-full items-center justify-center lg:h-[60vh] xl:h-[70vh] 2xl:h-[75vh]">
            <AnimatePresence mode="popLayout">
              {theme.japiImage && [
                // Main Japi Pattern (Behind Shirt) - Z-Index 0
                <motion.div
                  key={theme.id + "-japi-main"}
                  initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
                  animate={{
                    rotate: 0,
                    x: isLight ? "-30%" : "30%",
                    scale: 1,
                    opacity: 0.72,
                  }}
                  exit={{ rotate: 180, scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 40 }}
                  className="absolute -top-[5%] left-[5%] z-0 flex aspect-square w-[85%] items-center justify-center lg:w-[85%]"
                >
                  <img
                    src={theme.japiImage}
                    alt=""
                    className="h-full w-full object-contain opacity-[0.92] drop-shadow-2xl"
                  />
                </motion.div>,
                // Small Japi Pattern - Z-Index 0
                <motion.div
                  key={theme.id + "-japi-small"}
                  initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
                  animate={{
                    rotate: 0,
                    x: isLight ? "40%" : "-50%",
                    scale: 1,
                    opacity: 0.72,
                  }}
                  exit={{ rotate: 180, scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 40 }}
                  className="absolute right-[10%] -bottom-[10%] z-0 flex aspect-square w-[65%] items-center justify-center lg:right-[15%] lg:w-[65%]"
                >
                  <img
                    src={theme.japiImage}
                    alt=""
                    className="h-full w-full object-contain opacity-[0.92] drop-shadow-2xl"
                  />
                </motion.div>,
              ]}
            </AnimatePresence>

            {/* T-Shirt Image - Z-Index 40 (Highest priority) */}
            <motion.div
              layoutId="shirt-container"
              className="relative z-40 flex h-[115%] w-full items-center justify-center drop-shadow-2xl lg:h-[120%]"
              transition={springTransition}
            >
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={`desk-shirt-${isLight ? "l" : "d"}`}
                  src={theme.shirtImage}
                  initial={{ y: -20, opacity: 0, scale: isLight ? 0.9 : 0.7 }}
                  animate={{ y: 0, opacity: 1, scale: isLight ? 1.1 : 0.9 }}
                  exit={{ y: 20, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* === RIGHT COLUMN === */}
          {/* Z-Index 30 ensures text stays above Japi pattern if it overlaps */}
          <div className="relative z-30 col-span-4 flex h-full flex-col items-end justify-center pr-4 text-right lg:pr-8 xl:pr-16">
            {isLight ? (
              <>
                <AnimatePresence mode="wait">
                  <HeadingElement
                    key="head-light"
                    theme={theme}
                    popVariants={popVariants}
                  />
                </AnimatePresence>
                <DescElement
                  theme={theme}
                  springTransition={springTransition}
                />
              </>
            ) : (
              <>
                <PriceElement
                  theme={theme}
                  isLight={isLight}
                  springTransition={springTransition}
                />
                <AnimatePresence mode="wait">
                  <ButtonsElement popVariants={popVariants} />
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </LayoutGroup>

      {/* --- DESKTOP TOGGLE BAR --- */}
      <div className="absolute bottom-8 z-50 flex w-full origin-bottom scale-110 items-center justify-center lg:bottom-10 lg:scale-125 xl:bottom-12 xl:scale-115 2xl:bottom-16 2xl:scale-140">
        <div className="absolute z-0 h-[14px] w-[344px] rounded-full border-2 border-[#DCA54E] bg-[#361E1E] shadow-lg" />
        <div className="relative z-10 flex gap-[78px]">
          <button
            onClick={() => handleThemeSwitch("light")}
            className={`flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 ${
              isLight
                ? "scale-110 border-[2px] border-black bg-white shadow-xl"
                : "scale-100 border-[2px] border-[#C39044] bg-black"
            }`}
          >
            <img
              src="/merch/mask_merch_toggle2.svg"
              alt="Light"
              className="h-12 w-12 object-contain"
            />
          </button>
          <button
            onClick={() => handleThemeSwitch("dark")}
            className={`flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 ${
              !isLight
                ? "scale-110 border-[2px] border-black bg-white shadow-xl"
                : "scale-100 border-[2px] border-[#DCA54E] bg-black"
            }`}
          >
            <img
              src="/merch/mask_merch_toggle.svg"
              alt="Dark"
              className="h-12 w-12 object-contain"
            />
          </button>
        </div>
      </div>
    </>
  );
}

// --- DESKTOP SUB COMPONENTS ---

interface SubComponentProps {
  theme?: Theme;
  isLight?: boolean;
  springTransition?: object;
  popVariants?: Variants;
}

function PriceElement({ theme, isLight, springTransition }: SubComponentProps) {
  if (!theme) return null;
  return (
    <motion.div
      layoutId="price-box"
      className="font-hitchcut mb-4 xl:mb-8"
      transition={springTransition}
    >
      <h3
        className="mb-2 text-2xl tracking-widest uppercase lg:text-3xl xl:text-3xl 2xl:text-5xl"
        style={{ color: isLight ? "#5B0D0D" : "#CE8212", fontWeight: 400 }}
      >
        Get it NOW !
      </h3>
      <h2
        className="text-5xl leading-[0.8] font-black tracking-widest lg:text-5xl xl:text-6xl 2xl:text-[7rem]"
        style={{ color: theme.textSecondary }}
      >
        {theme.price}
      </h2>
    </motion.div>
  );
}

function DescElement({ theme, springTransition }: SubComponentProps) {
  if (!theme) return null;
  return (
    <motion.div
      layoutId="desc-box"
      className="font-hitchcut max-w-[260px] text-lg tracking-widest uppercase lg:max-w-[350px] lg:text-xl xl:max-w-[400px] xl:text-xl 2xl:text-3xl 2xl:max-w-[600px]"
      style={{ color: theme.textSecondary }}
      transition={springTransition}
    >
      <p className="leading-[1.1] font-normal whitespace-pre-line">
        {theme.desc}
      </p>
    </motion.div>
  );
}

function HeadingElement({ theme, popVariants }: SubComponentProps) {
  if (!theme) return null;
  return (
    <motion.div
      variants={popVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="font-hitchcut mb-4 xl:mb-8"
    >
      <h1
        className="text-4xl leading-[0.85] uppercase lg:text-5xl xl:text-6xl 2xl:text-[6.6rem]"
        style={{ color: theme.textPrimary, fontWeight: 400 }}
      >
        {theme.heading.split(" ").map((word, i) => (
          <span key={i} className="block">
            {word}
          </span>
        ))}
      </h1>
    </motion.div>
  );
}

function ButtonsElement({ popVariants }: SubComponentProps) {
  const [optOutHover, setOptOutHover] = useState(false);
  const [buyNowHover, setBuyNowHover] = useState(false);

  return (
    <motion.div
      variants={popVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mt-6 flex w-[240px] flex-col gap-4 lg:mt-8 lg:w-[280px] lg:gap-6 xl:w-[350px] 2xl:w-[400px]"
    >
      {/* OPT OUT BUTTON */}
      <button
        onMouseEnter={() => setOptOutHover(true)}
        onMouseLeave={() => setOptOutHover(false)}
        className="group relative flex h-[60px] w-full items-center justify-center overflow-hidden rounded-full shadow-lg transition-all duration-200 hover:scale-105 lg:h-[70px] xl:h-[80px]"
        style={{
          backgroundImage: "url('/merch/button_texture2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="z-10 flex items-center gap-3">
          <div className="relative h-7 w-7 overflow-hidden lg:h-8 lg:w-8 xl:h-10 xl:w-10">
            <motion.img
              src="/merch/svg1.svg"
              className="absolute h-full w-full object-contain"
              animate={{ y: optOutHover ? -35 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.img
              src="/merch/svg2.svg"
              className="absolute h-full w-full object-contain"
              initial={{ y: 35 }}
              animate={{ y: optOutHover ? 0 : 35 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <span className="font-hitchcut pt-1 text-2xl tracking-widest text-[#2A1B12] lg:text-3xl xl:text-4xl">
            OPT OUT
          </span>
        </div>
      </button>

      {/* BUY NOW BUTTON */}
      <button
        onMouseEnter={() => setBuyNowHover(true)}
        onMouseLeave={() => setBuyNowHover(false)}
        className="relative flex h-[60px] w-full items-center justify-center overflow-hidden rounded-full shadow-lg transition-all duration-200 hover:scale-105 lg:h-[70px] xl:h-[80px]"
        style={{
          backgroundImage: "url('/merch/button_texture1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="z-10 flex items-center gap-3">
          <div className="relative h-7 w-7 overflow-hidden lg:h-8 lg:w-8 xl:h-10 xl:w-10">
            <motion.img
              src="/merch/svg3.svg"
              className="absolute h-full w-full object-contain"
              animate={{ y: buyNowHover ? -35 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.img
              src="/merch/svg4.svg"
              className="absolute h-full w-full object-contain"
              initial={{ y: 35 }}
              animate={{ y: buyNowHover ? 0 : 35 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <span className="font-hitchcut pt-1 text-2xl tracking-widest text-[#F5EDD8] lg:text-3xl xl:text-4xl">
            BUY NOW
          </span>
        </div>
      </button>
    </motion.div>
  );
}