"use client";

import { useState, useEffect, useCallback } from "react";
import { type Variants } from "framer-motion"; // FIX: Added import
import { MerchMobile } from "./merch-mobile";
import { MerchDesktop } from "./merch-desktop";
import type { User } from "firebase/auth";
import { env } from "~/env";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


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
    desc: "From lectures\n to late nights\n Incand fits\n everywhere.",
    price: "450/-",
    shirtImage: "/merch/incandmarch.png",
    japiImage: "/merch/a881a76b8a204d1e7a322115721f2ff57996f036.png",
  },
  dark: {
    id: "dark",
    bg: "#201205",
    bgTexture: "url('/merch/merch_bg2.png')",
    textPrimary: "#E19314",
    textSecondary: "#FFFFFF",
    heading: "THUNDER\nMARCH",
    desc: "Drip that\n hits harder\n than the\n bass drops",
    price: "450/-",
    shirtImage: "/merch/thundermerch.png",
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

export function MerchSection() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  // Handle Resize Logic to Determine Desktop vs Mobile
  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      // 1024px is the standard Tailwind 'lg' breakpoint
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle Scroll Logic for Theme Switch
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

  // Prevent Hydration Mismatch
  if (!mounted) return null;

  return (
    <section
      className={`font-hitchcut fixed inset-0 z-50 h-full w-full overflow-hidden transition-colors duration-700 ease-in-out`}
      style={{
        backgroundColor: theme.bg,
        backgroundImage: theme.bgTexture,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isDesktop ? (
        /* --- DESKTOP VIEW (Visible >= lg) --- */
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
        /* --- MOBILE & TABLET VIEW (Visible < lg) --- */
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
    </section>
  );
}

export async function OptOut(user: User,router:AppRouterInstance) {
  try {
    const token = await user?.getIdToken();
    const response = await axios.put(
      `${env.NEXT_PUBLIC_API_URL}/api/merch/opt-out`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        router.push("/signup");
      }
    }
    throw err;
  }
}