import React from "react";
import Image from "next/image";

const MobileComicLayout = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100">
      {/* Blue Panel */}
      <div
        className="absolute inset-0 bg-cyan-600"
        style={{ clipPath: "polygon(0 0, 45% 0, 32% 30%, 0 22%)" }}
      >
        <div
          className="relative h-full w-full"
          style={{ transform: "translateY(-45%) translateX(-30%) scale(0.49)" }}
        >
          <Image
            src="/gif/gif_1.gif"
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-cyan-600 opacity-20" />
      </div>

      {/* Yellow Panel */}
      <div
        className="absolute inset-0 bg-yellow-400"
        style={{ clipPath: "polygon(45% 0, 100% 0, 100% 48%, 32% 30%)" }}
      >
        <div
          className="relative h-full w-full"
          style={{ transform: "translateY(-15%)" }}
        >
          <Image
            src="/gif/gif_4.gif"
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-yellow-400 opacity-20" />
      </div>

      {/* Purple Panel */}
      <div
        className="absolute inset-0 bg-purple-500"
        style={{ clipPath: "polygon(0 22%, 0% 100%, 32% 30%)" }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform:
              "scale(0.65) translateX(-50%) translateY(15%) rotate(-90deg)",
          }}
        >
          <Image
            src="/gif/gif_2.gif"
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-purple-500 opacity-20" />
      </div>

      {/* Orange Panel */}
      <div
        className="absolute inset-0 bg-orange-600"
        style={{ clipPath: "polygon(32% 30%, 100% 48%, 100% 78%, 15% 70%)" }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform:
              "rotate(12deg) translateX(10%) translateY(-18%) scale(0.9)",
          }}
        >
          <Image
            src="/gif/gif_3.gif"
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-orange-600 opacity-20" />
      </div>

      {/* Red Panel */}
      <div
        className="absolute inset-0 bg-red-500"
        style={{ clipPath: "polygon(15% 65%, 60% 74%, 64% 100%, 0 100%)" }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform:
              "scale(0.95) translateX(-2%) translateY(30%) rotate(-5deg)",
          }}
        >
          <Image
            src="/gif/gif_5.gif"
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-red-500 opacity-20" />
      </div>

      {/* Emerald Panel */}
      <div
        className="absolute inset-0 bg-emerald-400"
        style={{ clipPath: "polygon(49% 70%, 100% 80%, 100% 100%, 60% 100%)" }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform:
              "scale(0.95) translateX(2%) translateY(30%) rotate(-5deg)",
          }}
        >
          <Image
            src="/gif/gif_5.gif"
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-emerald-400 opacity-20" />
      </div>

      {/* Striped Borders SVG */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="stripes-mobile"
            width="2"
            height="2"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="1" height="2" fill="white" />
            <rect x="1" width="1" height="2" fill="#d1d5db" />
          </pattern>
        </defs>
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="100"
          stroke="url(#stripes-mobile)"
          strokeWidth="2.5"
        />
        <line
          x1="100"
          y1="0"
          x2="100"
          y2="100"
          stroke="url(#stripes-mobile)"
          strokeWidth="2.5"
        />
        <line
          x1="0"
          y1="22"
          x2="32"
          y2="30"
          stroke="url(#stripes-mobile)"
          strokeWidth="2.5"
        />
        <line
          x1="32"
          y1="30"
          x2="45"
          y2="-1"
          stroke="url(#stripes-mobile)"
          strokeWidth="2.5"
        />
        <line
          x1="32"
          y1="30"
          x2="100"
          y2="48"
          stroke="url(#stripes-mobile)"
          strokeWidth="2.5"
        />
        <line
          x1="32"
          y1="30"
          x2="0"
          y2="100"
          stroke="url(#stripes-mobile)"
          strokeWidth="2.5"
        />
        <line
          x1="15"
          y1="65"
          x2="100"
          y2="78"
          stroke="url(#stripes-mobile)"
          strokeWidth="2.5"
        />
        <line
          x1="50"
          y1="70"
          x2="60"
          y2="100"
          stroke="url(#stripes-mobile)"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
};

export default MobileComicLayout;
