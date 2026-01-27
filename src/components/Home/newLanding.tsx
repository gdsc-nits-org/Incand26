"use client";

import React from "react";
import { motion } from "framer-motion";
import HornbillMiddle from "~/components/HornbillMiddle";

// ================= CONFIGURATION =================

// 1. HORNBILL SCALE (Background Zoom)
const HORNBILL_SCALE = 0.8;

// 2. DESKTOP CARD SIZE (Screens > 1280px)
// Adjust these Tailwind classes to change size on Laptops/Desktops
const DESKTOP_CARD_CLASS = "w-60 h-80";

// 3. MOBILE/TABLET CARD SIZE (Screens < 1280px)
// Adjust these Tailwind classes to change size on Phones & Tablets
const MOBILE_CARD_CLASS = "w-40 h-56";

// ==============================================

// --- DATA ---
const figures = [
  { id: 1, src: "/newLanding/Frame_1000008516.png" },
  { id: 2, src: "/newLanding/Frame_1000008515.png" },
  { id: 3, src: "/newLanding/Frame_1000008514.png" },
  { id: 4, src: "/newLanding/Frame_1000008512.png" },
  { id: 5, src: "/newLanding/Frame_1000008513.png" },
  { id: 6, src: "/newLanding/Frame_1000008511.png" },
  { id: 7, src: "/newLanding/Frame_1000008517.png" },
];

// --- SHAPE DEFINITIONS ---
const shapeConfigs = [
  { type: "clip", value: ")" },
  { type: "class", value: "" },
  { type: "class", value: "" },
  { type: "class", value: "" },
  { type: "class", value: "" },
  { type: "class", value: "" },
  { type: "class", value: "" },
];

// --- COMPONENTS ---

const Card = ({
  src,
  index,
  sizeClass,
}: {
  src: string;
  bgImage?: string;
  index: number;
  sizeClass: string; // Accepts the custom size class passed from parent
}) => {
  const config = shapeConfigs[index % shapeConfigs.length] ?? {
    type: "class",
    value: "",
  };

  const style: React.CSSProperties =
    config.type === "clip"
      ? { clipPath: config.value, WebkitClipPath: config.value }
      : {};

  const className = config.type === "class" ? config.value : "";

  return (
    // Uses the passed sizeClass (width/height) + standard styling
    <div className={`relative m-2 flex-shrink-0 ${sizeClass}`}>
      {/* Figure Layer */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-2 ${className}`}
        style={style}
      >
        <img
          src={src}
          alt="Figure"
          className="h-full w-full object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
};

const VerticalMarquee = ({
  direction = "up",
  children,
}: {
  direction?: "up" | "down";
  children: React.ReactNode;
}) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden">
      <motion.div
        className="flex flex-col items-center"
        animate={{ y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

const HorizontalMarquee = ({
  direction = "left",
  children,
}: {
  direction?: "left" | "right";
  children: React.ReactNode;
}) => {
  return (
    <div className="relative flex w-full overflow-hidden">
      <motion.div
        className="flex gap-3"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default function NewLanding() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f6eddc] font-sans">
      {/* ------------------------------------------------------- */}
      {/* LAYER 1: BACKGROUND (Hornbill)                          */}
      {/* ------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 flex h-full w-full items-center justify-center overflow-hidden">
        {/* Scaling Wrapper */}
        <div
          className="h-full w-full"
          style={{ transform: `scale(${HORNBILL_SCALE})` }}
        >
          <HornbillMiddle />
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* LAYER 2: FOREGROUND (Marquees)                          */}
      {/* ------------------------------------------------------- */}
      <div className="pointer-events-none relative z-10 h-full w-full">
        {/* DESKTOP LAYOUT (Vertical Marquees)
           Visible only on screens larger than 'xl' (1280px).
           Tablets (iPad Pro, etc) usually fall below 1280px.
        */}
        <div className="hidden h-full w-full flex-row justify-between xl:flex">
          {/* Left Column */}
          <div className="pointer-events-auto relative ml-4 h-full w-[20%]">
            <VerticalMarquee direction="up">
              {figures.map((fig, i) => (
                <Card
                  key={`l-${i}`}
                  {...fig}
                  index={i}
                  sizeClass={DESKTOP_CARD_CLASS}
                />
              ))}
            </VerticalMarquee>
          </div>

          {/* Middle Spacer */}
          <div className="flex-1"></div>

          {/* Right Column */}
          <div className="pointer-events-auto relative mr-4 h-full w-[20%]">
            <VerticalMarquee direction="down">
              {[...figures.slice(3), ...figures.slice(0, 3)].map((fig, i) => {
                const originalIndex = figures.findIndex((f) => f.id === fig.id);
                return (
                  <Card
                    key={`r-${i}`}
                    {...fig}
                    index={originalIndex}
                    sizeClass={DESKTOP_CARD_CLASS}
                  />
                );
              })}
            </VerticalMarquee>
          </div>
        </div>

        {/* MOBILE & TABLET LAYOUT (Horizontal Marquees)
            Visible on screens smaller than 'xl' (1280px).
        */}
        <div className="flex h-full w-full flex-col justify-between py-6 xl:hidden">
          {/* Top Marquee */}
          <div className="pointer-events-auto relative flex h-auto w-full items-center">
            <HorizontalMarquee direction="right">
              {figures.map((fig, i) => (
                <Card
                  key={`m-t-${i}`}
                  {...fig}
                  index={i}
                  sizeClass={MOBILE_CARD_CLASS}
                />
              ))}
            </HorizontalMarquee>
          </div>

          {/* Center Content (Spacer for Hornbill) */}
          <div className="flex-1"></div>

          {/* Bottom Marquee */}
          <div className="pointer-events-auto relative flex h-auto w-full items-center">
            <HorizontalMarquee direction="left">
              {[...figures].reverse().map((fig, i) => {
                const originalIndex = figures.findIndex((f) => f.id === fig.id);
                return (
                  <Card
                    key={`m-b-${i}`}
                    {...fig}
                    index={originalIndex}
                    sizeClass={MOBILE_CARD_CLASS}
                  />
                );
              })}
            </HorizontalMarquee>
          </div>
        </div>
      </div>
    </div>
  );
}
