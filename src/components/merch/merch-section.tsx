"use client";

import { useState, useEffect, useCallback } from "react";
import { type Variants, AnimatePresence, motion } from "framer-motion";
import { MerchMobile } from "./merch-mobile";
import { MerchDesktop } from "./merch-desktop";
import Loader from "../Loader"; 

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

const springTransition = {
  type: "spring",
  stiffness: 70,
  damping: 25,
} as const;

const popVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
};

// --- PRELOAD HELPER ---
const preloadImages = async (srcArray: string[]) => {
  const promises = srcArray.map((src) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve even on error to avoid sticking
    });
  });
  await Promise.all(promises);
};

export function MerchSection() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);

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
    setMounted(true);
    
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // 2. Preload All Heavy Assets
    const loadAssets = async () => {
      try {
        await preloadImages([
          "/merch/photo_bg1.png",
          "/merch/merch_bg2.png",
          THEMES.light.shirtImage,
          THEMES.dark.shirtImage,
          THEMES.light.japiImage,
        ]);
        
        // Wait minimum time for smoothness
        setTimeout(() => setIsLoading(false), 2000); 
      } catch (error) {
        console.error("Failed to preload merch images", error);
        setIsLoading(false); 
      }
    };

    // Explicitly ignore the promise to satisfy linter
    void loadAssets();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle Scroll Logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating || isLoading) return; 
      if (e.deltaY > 50 && activeTheme === "light") handleThemeSwitch("dark");
      else if (e.deltaY < -50 && activeTheme === "dark")
        handleThemeSwitch("light");
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeTheme, isAnimating, handleThemeSwitch, isLoading]);

  if (!mounted) return null;

  return (
    <section
      className={`font-hitchcut fixed inset-0 z-50 h-full w-full overflow-hidden transition-colors duration-700 ease-in-out`}
      style={{
        backgroundColor: theme.bg,
        backgroundImage: isLoading ? undefined : theme.bgTexture, 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          // --- LOADING SCREEN ---
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="absolute inset-0 z-[60] flex items-center justify-center bg-black"
          >
            {/* FIX: Removed loadingPercentage prop */}
            <Loader /> 
          </motion.div>
        ) : (
          // --- MAIN CONTENT ---
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            {isDesktop ? (
              <div className="relative z-10 flex h-full w-full items-center justify-center">
                <MerchDesktop
                  theme={theme}
                  isLight={isLight}
                  handleThemeSwitch={handleThemeSwitch}
                  springTransition={springTransition}
                  popVariants={popVariants}
                />
              </div>
            ) : (
              <div className="relative z-10 block h-full w-full">
                <MerchMobile
                  theme={theme}
                  isLight={isLight}
                  handleThemeSwitch={handleThemeSwitch}
                  springTransition={springTransition}
                  popVariants={popVariants}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}