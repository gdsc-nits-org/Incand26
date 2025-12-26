"use client";

import { useState, useEffect } from "react";
import AboutIncand from "../About/AboutIncand";
import AboutIncandMobile from "../About/AboutIncandMobile";

export default function AboutIncandResponsive() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Show mobile view if:
      // 1. Width is less than or equal to 1024px, OR
      // 2. Height is greater than width (portrait orientation/tablet)
      if(width <= 1024) {
        if(width > height) {
          setIsMobileView(false);
        }
        setIsMobileView(true);
      }else {
        setIsMobileView(false);
      }
    };

    // Check on mount
    checkViewport();

    // Add resize listener
    window.addEventListener("resize", checkViewport);

    // Cleanup
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Prevent hydration mismatch by rendering nothing on server
  if (!isClient) {
    return null;
  }

  return isMobileView ? <AboutIncandMobile /> : <AboutIncand />;
}
