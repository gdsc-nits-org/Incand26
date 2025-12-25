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
      {/* --- GHOST BACKGROUND TEXT (Desktop Position) --- */}
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center leading-[0.85] opacity-[0.08] select-none">
        <div className="flex items-center gap-4">
          <span
            className="text-[13vw] 2xl:text-[14vw]"
            style={{ color: isLight ? "#000" : "#fff" }}
          >
            INCAND
          </span>
          <span className="text-[15vw] text-[#d16d1b]">20</span>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="text-[11vw] 2xl:text-[12vw]"
            style={{ color: isLight ? "#000" : "#fff" }}
          >
            ESCENCE
          </span>
          <span className="text-[13vw] text-[#d16d1b]">26</span>
        </div>
      </div>

      {/* --- SIDE DECOR (Desktop) --- */}
      <div className="pointer-events-none absolute inset-0 z-0 flex h-full justify-between px-4 xl:px-8">
        {/* Left Column */}
        <div className="relative flex h-full w-16 flex-col items-center justify-between py-8 mix-blend-overlay min-[2200px]:w-64 xl:w-24 2xl:w-40">
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
        <div className="relative flex h-full w-16 flex-col items-center justify-between py-8 mix-blend-overlay min-[2200px]:w-64 xl:w-24 2xl:w-40">
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
        <div className="font-hitchcut relative z-10 grid h-full max-h-[85vh] w-full max-w-[1600px] grid-cols-12 items-center gap-4 px-12 pb-24 min-[2200px]:max-w-[95%] min-[2200px]:gap-32 md:px-24 xl:gap-8">
          {/* --- TOP LEFT ARROW (Desktop Position) - ANIMATED --- */}
          <div className="absolute top-0 left-12 z-[60] min-[2200px]:top-24 min-[2200px]:left-24 min-[2200px]:scale-[3.8] lg:left-16 xl:left-24 2xl:scale-[2.36]">
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
                    className="w-24 cursor-pointer object-contain transition-transform hover:scale-105 lg:w-28 xl:w-32"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* === LEFT COLUMN === */}
          <div className="col-span-4 flex h-full flex-col items-start justify-center pl-8 text-left xl:pl-16">
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
          <div className="perspective-1000 relative col-span-4 flex h-[60vh] w-full items-center justify-center min-[2200px]:h-[85vh] xl:h-[70vh] 2xl:h-[90vh]">
            <AnimatePresence mode="popLayout">
              {theme.japiImage && [
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
                  className="absolute -top-[5%] left-[5%] z-0 flex aspect-square w-[85%] items-center justify-center min-[2200px]:w-[140%] 2xl:top-[15%] 2xl:w-[105%]"
                >
                  <img
                    src={theme.japiImage}
                    alt=""
                    className="h-full w-full object-contain opacity-[0.92] drop-shadow-2xl"
                  />
                </motion.div>,
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
                  className="absolute right-[15%] -bottom-[10%] z-0 flex aspect-square w-[65%] items-center justify-center min-[2200px]:w-[120%] 2xl:bottom-[20%] 2xl:w-[85%]"
                >
                  <img
                    src={theme.japiImage}
                    alt=""
                    className="h-full w-full object-contain opacity-[0.92] drop-shadow-2xl"
                  />
                </motion.div>,
              ]}
            </AnimatePresence>

            <motion.div
              layoutId="shirt-container"
              className="relative z-20 flex h-[120%] w-full items-center justify-center drop-shadow-2xl min-[2200px]:w-[85%]"
              transition={springTransition}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`desk-shirt-${isLight ? "l" : "d"}`}
                  src={theme.shirtImage}
                  initial={{ y: -20, opacity: 0, scale: isLight ? 0.9 : 0.7 }}
                  animate={{ y: 0, opacity: 1, scale: isLight ? 1.1 : 0.9 }}
                  exit={{ y: 20, opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* === RIGHT COLUMN === */}
          <div className="col-span-4 flex h-full flex-col items-end justify-center pr-8 text-right xl:pr-16">
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
      <div className="absolute bottom-10 z-50 flex w-full origin-bottom scale-100 items-center justify-center min-[2200px]:bottom-40 min-[2200px]:scale-[2.5] xl:bottom-12 xl:scale-110">
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

// Helper type for sub-components
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
      className="font-hitchcut mb-6 xl:mb-8"
      transition={springTransition}
    >
      <h3
        className="mb-2 text-3xl tracking-widest uppercase min-[2200px]:text-7xl xl:text-2xl"
        style={{ color: isLight ? "#5B0D0D" : "#CE8212", fontWeight: 400 }}
      >
        Get it NOW !
      </h3>
      <h2
        className="text-6xl leading-[0.8] font-black tracking-widest min-[2200px]:text-[13rem] xl:text-7xl"
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
      className="font-hitchcut max-w-[320px] text-xl tracking-widest uppercase min-[2200px]:max-w-[800px] min-[2200px]:text-5xl xl:max-w-[450px] xl:text-2xl"
      style={{ color: theme.textSecondary }}
      transition={springTransition}
    >
      <p className="leading-[1.1] font-normal whitespace-pre-line min-[2200px]:leading-[1.2]">
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
      className="font-hitchcut mb-6 xl:mb-8"
    >
      <h1
        className="text-7xl leading-[0.85] uppercase min-[2200px]:text-[11rem] xl:text-7xl"
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
      className="mt-8 flex w-[260px] flex-col gap-6 min-[2200px]:w-[600px] xl:w-[300px]"
    >
      {/* OPT OUT BUTTON */}
      <button
        onMouseEnter={() => setOptOutHover(true)}
        onMouseLeave={() => setOptOutHover(false)}
        className="group relative flex h-[60px] w-full items-center justify-center overflow-hidden rounded-full shadow-lg transition-all duration-200 hover:scale-105 min-[2200px]:h-[140px] xl:h-[70px]"
        style={{
          backgroundImage: "url('/merch/button_texture2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="z-10 flex items-center gap-3">
          <div className="relative h-7 w-7 overflow-hidden min-[2200px]:h-20 min-[2200px]:w-20 xl:h-9 xl:w-9">
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
          <span className="font-hitchcut pt-1 text-2xl tracking-widest text-[#2A1B12] min-[2200px]:text-6xl xl:text-3xl">
            OPT OUT
          </span>
        </div>
      </button>

      {/* BUY NOW BUTTON */}
      <button
        onMouseEnter={() => setBuyNowHover(true)}
        onMouseLeave={() => setBuyNowHover(false)}
        className="relative flex h-[60px] w-full items-center justify-center overflow-hidden rounded-full shadow-lg transition-all duration-200 hover:scale-105 min-[2200px]:h-[140px] xl:h-[70px]"
        style={{
          backgroundImage: "url('/merch/button_texture1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="z-10 flex items-center gap-3">
          <div className="relative h-7 w-7 overflow-hidden min-[2200px]:h-20 min-[2200px]:w-20 xl:h-9 xl:w-9">
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
          <span className="font-hitchcut pt-1 text-2xl tracking-widest text-[#F5EDD8] min-[2200px]:text-6xl xl:text-3xl">
            BUY NOW
          </span>
        </div>
      </button>
    </motion.div>
  );
}
