"use client";

import { useEffect, useState } from "react";
import { LaptopFooter } from "../Footer/LaptopFooter";
import { MobileFooter } from "../Footer/MobileFooter";

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 1024 || window.innerHeight > window.innerWidth,
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <MobileFooter /> : <LaptopFooter />;
};
