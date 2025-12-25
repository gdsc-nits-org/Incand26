"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const Brochure = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, style, ...props }, ref) => {
  return (
    <a
      ref={ref}
      href="https://drive.google.com/file/d/1_YyluMmgFQFs9SShdlpAEvIHRfD1Nnx_/view?usp=sharing"
      className={cn(
        "group relative block h-[5.42vw] w-[21vw] cursor-pointer transition-transform duration-700 ease-in-out select-none hover:-rotate-3",
        className,
      )}
      target="_blank"
      style={style}
      {...props}
    >
      {/* Shadow Layer */}
      <div className="pointer-events-none absolute top-0 left-[0.05vw] h-[5.36vw] w-[20.94vw] rounded-[3.7vw] bg-black transition-all duration-300 ease-out group-hover:-top-[1.51vw] group-hover:-left-[0.73vw] group-hover:h-[8.8vw] group-hover:w-[26.88vw] group-hover:rounded-[4.64vw] group-hover:border-[0.16vw] group-hover:border-black group-hover:bg-[#A25D5D]" />

      {/* Main Layer */}
      <div className="absolute top-0 left-0 z-10 h-[5.36vw] w-[20.94vw] overflow-hidden rounded-[3.7vw] border-[0.16vw] border-black bg-[#751313] transition-all duration-300 ease-out group-hover:-top-[2.4vw] group-hover:-left-[0.21vw] group-hover:h-[8.8vw] group-hover:w-[26.82vw] group-hover:rounded-[4.64vw]">
        {/* Text */}
        <span
          className="absolute font-hitchcut top-[1.25vw] left-[3.49vw] z-20  text-[2.1vw] leading-[1.2] tracking-wider whitespace-nowrap text-[#FCDBBB] transition-all duration-300 ease-out select-none group-hover:top-[1.8vw] group-hover:left-[4.53vw] group-hover:text-[2.7vw] group-hover:text-white"
        >
          BROCHURE
        </span>

        {/* Image 1 (Left) */}
        <img
          src="/footer-assets/laptop/brochure/brochure-icon-1.webp"
          alt=""
          draggable={false}
          className="pointer-events-none absolute -top-[2.5vw] -left-[2.55vw] z-30 h-[11.41vw] w-[6.93vw] max-w-none transition-all duration-300 ease-out select-none group-hover:-top-[1.51vw] group-hover:-left-[3.44vw] group-hover:h-[15vw] group-hover:w-[9.84vw]"
        />

        {/* Image 2 (Right) */}
        <img
          src="/footer-assets/laptop/brochure/brochure-icon-2.webp"
          alt=""
          draggable={false}
          className="pointer-events-none absolute -top-[2.6vw] left-[16.56vw] z-30 h-[11.41vw] w-[6.93vw] max-w-none transition-all duration-300 ease-out select-none group-hover:-top-[3.54vw] group-hover:left-[20.57vw] group-hover:h-[15vw] group-hover:w-[9.84vw]"
        />
      </div>
    </a>
  );
});

Brochure.displayName = "Brochure";
