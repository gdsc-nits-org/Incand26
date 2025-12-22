import React from "react";
import Image from "next/image";

interface SponsorCardProps {
  logoUrl: string;
  name: string;
  className?: string;
}

const SponsorCard: React.FC<SponsorCardProps> = ({
  logoUrl,
  name,
  className,
}) => {
  // Pattern Assets
  const TOP_PATTERN =
    "https://res.cloudinary.com/dgechlqls/image/upload/v1766219594/download_1_1_wtocfc.png";
  const BOTTOM_PATTERN =
    "https://res.cloudinary.com/dgechlqls/image/upload/v1766218745/download_1_2_t4netw.png";

  // Card Background Texture
  const CARD_BG_IMAGE =
    "https://res.cloudinary.com/dgechlqls/image/upload/v1766223814/Screenshot_2025-12-20_150847_ebmtvn.png";

  return (
    <div
      className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-[#fdfcf0] shadow-lg ${className}`}
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
      <div className="absolute inset-0 z-30 flex items-center justify-center p-4 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-10 lg:group-hover:-translate-y-12">
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
      <div className="absolute top-0 left-0 z-20 h-1/2 w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full">
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
      <div className="absolute bottom-0 left-0 z-20 h-1/2 w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-full">
        <Image
          src={BOTTOM_PATTERN}
          alt="Lower Pattern"
          fill
          className="object-cover object-top"
          unoptimized
        />
        <div className="absolute top-0 h-0.5 w-full bg-[#d4af37]/50" />
      </div>
      {/* ---  SPONSOR NAME --- */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-4 pb-6 opacity-0 transition-all delay-100 duration-500 group-hover:opacity-100 md:pb-8 lg:pb-14">
        <p className="line-clamp-3 w-full text-center text-xs leading-tight font-bold tracking-widest break-words text-amber-900 uppercase drop-shadow-lg md:text-sm lg:text-xl">
          {name}
        </p>
      </div>
    </div>
  );
};

export default SponsorCard;
