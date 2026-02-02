"use client";
import React from "react";
import Image from "next/image";

export default function GeometricLayout() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      {/* Blue section - top left */}
      <div
        className="absolute inset-0 bg-cyan-600"
        style={{ clipPath: "polygon(0 0, 45% 0, 32% 30%, 0 22%)" }}
      >
        <Image
          src="/gif/gif_1.gif"
          alt=""
          fill
          style={{ objectPosition: "90% 100%" }}
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Yellow section - top right */}
      <div
        className="absolute inset-0 bg-yellow-400"
        style={{ clipPath: "polygon(45% 0, 100% 0, 100% 48%, 32% 30%)" }}
      >
        <Image
          src="/gif/gif_4.gif"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "20% 60%" }}
          unoptimized
        />
      </div>

      {/* Purple section - left triangle */}
      <div
        className="absolute inset-0 bg-purple-500"
        style={{ clipPath: "polygon(0 22%, 0% 100%, 32% 30%)" }}
      >
        <Image
          src="/gif/gif_2.gif"
          alt=""
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Orange section - large center */}
      <div
        className="absolute inset-0 bg-orange-600"
        style={{ clipPath: "polygon(32% 30%, 100% 48%, 100% 78%, 15% 70%)" }}
      >
        <Image
          src="/gif/gif_3.gif"
          alt=""
          fill
          className="-rotate-10 object-cover"
          unoptimized
        />
      </div>

      {/* Red section - bottom left */}
      <div
        className="absolute inset-0 bg-red-500"
        style={{ clipPath: "polygon(15% 65%, 60% 74%, 64% 100%, 0 100%)" }}
      >
        <Image
          src="/gif/gif_2.gif"
          alt=""
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Green section - bottom right */}
      <div
        className="absolute inset-0 bg-emerald-400"
        style={{ clipPath: "polygon(49% 70%, 100% 80%, 100% 100%, 60% 100%)" }}
      >
        <Image
          src="/gif/gif_2.gif"
          alt=""
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Striped borders using SVG */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="stripes"
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
          stroke="url(#stripes)"
          strokeWidth="2.5"
        />
        <line
          x1="100"
          y1="0"
          x2="100"
          y2="100"
          stroke="url(#stripes)"
          strokeWidth="2.5"
        />
        <line
          x1="0"
          y1="22"
          x2="32"
          y2="30"
          stroke="url(#stripes)"
          strokeWidth="2.5"
        />
        <line
          x1="32"
          y1="30"
          x2="45"
          y2="0"
          stroke="url(#stripes)"
          strokeWidth="2.5"
        />
        <line
          x1="32"
          y1="30"
          x2="100"
          y2="48"
          stroke="url(#stripes)"
          strokeWidth="2.5"
        />
        <line
          x1="32"
          y1="30"
          x2="0"
          y2="100"
          stroke="url(#stripes)"
          strokeWidth="2.5"
        />
        <line
          x1="15"
          y1="65"
          x2="100"
          y2="78"
          stroke="url(#stripes)"
          strokeWidth="2.5"
        />
        <line
          x1="50"
          y1="70"
          x2="60"
          y2="100"
          stroke="url(#stripes)"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}
