"use client";

import { useEffect, useState } from "react";
import { LaptopFooter } from "./LaptopFooter";
import { MobileFooter } from "./MobileFooter";

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <MobileFooter /> : <LaptopFooter />;
};
