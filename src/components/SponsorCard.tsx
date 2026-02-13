import React from "react";
import Image from "next/image";

interface SponsorCardProps {
  logoUrl: string;
  name: string;
  link?: string; // Added link prop (optional)
  partner?: string;
  className?: string;
}

const SponsorCard: React.FC<SponsorCardProps> = ({
  logoUrl,
  name,
  partner,
  link,
  className,
}) => {
  const TOP_PATTERN =
    "https://res.cloudinary.com/dgechlqls/image/upload/v1766219594/download_1_1_wtocfc.png";
  const BOTTOM_PATTERN =
    "https://res.cloudinary.com/dgechlqls/image/upload/v1766218745/download_1_2_t4netw.png";
  const CARD_BG_IMAGE =
    "https://res.cloudinary.com/dgechlqls/image/upload/v1766223814/Screenshot_2025-12-20_150847_ebmtvn.png";

  // If a link is provided, use an <a> tag, otherwise a <div>
  const Wrapper = link ? "a" : "div";
  const wrapperProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      /* 1. Name this inner group "card" */
      className={`group/card relative block shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-[#fdfcf0] shadow-lg ${className}`}
    >
      {/* --- CARD BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src={CARD_BG_IMAGE}
          alt="Card Background"
          fill
          className="object-cover opacity-20"
          unoptimized
        />
      </div>

      {/* ---LOGO --- */}
      {/* 2. Use group-hover/card to trigger specific card animations */}
      <div className="absolute inset-0 z-30 flex items-center justify-center p-4 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:-translate-y-10 lg:group-hover/card:-translate-y-12">
        <div className="relative h-1/2 w-full scale-90">
          <Image
            src={logoUrl}
            alt={name}
            fill
            className="object-contain drop-shadow-sm"
            unoptimized
          />
        </div>
      </div>

      {/* Top Shutter */}
      <div className="absolute top-0 left-0 z-20 h-1/2 w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:-translate-y-full">
        <Image
          src={TOP_PATTERN}
          alt="Upper Pattern"
          fill
          className="object-cover object-bottom"
          unoptimized
        />
        <div className="absolute bottom-0 h-0.5 w-full bg-[#d4af37]/50" />
      </div>

      {/* Bottom Shutter */}
      <div className="absolute bottom-0 left-0 z-20 h-1/2 w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:translate-y-full">
        <Image
          src={BOTTOM_PATTERN}
          alt="Lower Pattern"
          fill
          className="object-cover object-top"
          unoptimized
        />
        <div className="absolute top-0 h-0.5 w-full bg-[#d4af37]/50" />
      </div>

      {/* --- SPONSOR NAME --- */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-4 pb-6 opacity-0 transition-all delay-100 duration-500 group-hover/card:opacity-100 md:pb-8 lg:pb-14">
        <p className="line-clamp-3 w-full text-center text-xs leading-tight font-bold tracking-widest break-words text-amber-900 uppercase drop-shadow-lg md:text-sm lg:text-xl">
          {name}
        </p>
        <p className="mt-2 line-clamp-3 w-full text-center text-xs leading-tight font-bold tracking-widest break-words text-amber-900 uppercase drop-shadow-lg md:text-xs lg:text-lg">
          {partner}
        </p>
      </div>
    </Wrapper>
  );
};

export default SponsorCard;
