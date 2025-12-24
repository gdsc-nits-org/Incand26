/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useState, useEffect, useCallback } from "react";
import localFont from "next/font/local";
import { type Variants } from "framer-motion"; // FIX: Added import
import { MerchMobile } from "./merch-mobile";
import { MerchDesktop } from "./merch-desktop";

// --- TYPES ---
export interface Theme {
  id: string;
  bg: string;
  bgTexture: string;
  textPrimary: string;
  textSecondary: string;
  heading: string;
  desc: string;
  price: string;
  shirtImage: string;
  japiImage: string;
}

// --- FONT CONFIGURATION ---
const hitchcut = localFont({
  src: [
    {
      path: "../../../public/fonts/Hitchcut-typeface/Hitchcut-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-hitchcut",
  display: "swap",
  fallback: ["Impact", "sans-serif"],
});

// --- CONFIGURATION ---
const THEMES: Record<"light" | "dark", Theme> = {
  light: {
    id: "light",
    bg: "#FFF7DE",
    bgTexture: "url('/merch/photo_bg1.png')",
    textPrimary: "#2A1B12",
    textSecondary: "#8B2323",
    heading: "INCAND\nMERCH",
    desc: "LOREM IPSUM\nKUCH KUCH\nTSHIRT KE \n BAARE MAE.",
    price: "399/-",
    shirtImage: "/merch/d3692dbcecc3ee28bbb6cb71bba972eed7c75499.png",
    japiImage: "/merch/a881a76b8a204d1e7a322115721f2ff57996f036.png",
  },
  dark: {
    id: "dark",
    bg: "#201205",
    bgTexture: "url('/merch/merch_bg2.png')",
    textPrimary: "#E19314",
    textSecondary: "#FFFFFF",
    heading: "THUNDER\nMARCH",
    desc: "LOREM IPSUM\nKUCH KUCH\nTSHIRT KE\n BAARE MAE.",
    price: "399/-",
    shirtImage: "/merch/36e3457304d265d12daff04034d952d55c27800a.png",
    japiImage: "/merch/a881a76b8a204d1e7a322115721f2ff57996f036.png",
  },
};

const springTransition = { type: "spring", stiffness: 70, damping: 25 };

// FIX: Explicitly typed as Variants to satisfy Framer Motion strict types
const popVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
};

export function MerchSection() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const [isAnimating, setIsAnimating] = useState(false);
  const theme = THEMES[activeTheme];
  const isLight = activeTheme === "light";

  const handleThemeSwitch = useCallback(
    (newTheme: "light" | "dark") => {
      if (isAnimating || activeTheme === newTheme) return;
      setIsAnimating(true);
      setActiveTheme(newTheme);
      setTimeout(() => setIsAnimating(false), 800);
    },
    [activeTheme, isAnimating],
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      if (e.deltaY > 50 && activeTheme === "light") handleThemeSwitch("dark");
      else if (e.deltaY < -50 && activeTheme === "dark")
        handleThemeSwitch("light");
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeTheme, isAnimating, handleThemeSwitch]);

  return (
    <section
      className={`fixed inset-0 z-50 h-full w-full overflow-hidden transition-colors duration-700 ease-in-out ${hitchcut.className}`}
      style={{
        backgroundColor: theme.bg,
        backgroundImage: theme.bgTexture,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* --- MOBILE & TABLET VIEW (Visible < lg) --- */}
      <div className="relative z-10 block h-full w-full lg:hidden">
        <MerchMobile
          theme={theme}
          isLight={isLight}
          handleThemeSwitch={handleThemeSwitch}
          springTransition={springTransition}
          popVariants={popVariants}
        />
      </div>

      {/* --- DESKTOP VIEW (Visible >= lg) --- */}
      <div className="relative z-10 hidden h-full w-full items-center justify-center lg:flex">
        <MerchDesktop
          theme={theme}
          isLight={isLight}
          handleThemeSwitch={handleThemeSwitch}
          springTransition={springTransition}
          popVariants={popVariants}
        />
      </div>
    </section>
  );
}
