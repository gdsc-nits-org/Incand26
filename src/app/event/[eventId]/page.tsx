"use client";

import Image from "next/image";
import events from "../../../data/event.json";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const images = [
  "/image/Vector1.png",
  "/image/Vector2.png",
  "/image/Group.png",
  "/image/Group1.png",
  "/image/Vector1.png",
  "/image/Vector2.png",
  "/image/Group.png",
  "/image/Group1.png",
];

export const runtime = "edge";

export default function EventPoster() {
  const params = useParams();
  const router = useRouter();
  const eventId = Number(params.eventId);

  const [gridDimensions, setGridDimensions] = useState({
    cols: 9,
    rows: 30,
    cellWidth: 60,
    cellHeight: 60,
  });
  const TARGET_CELL_SIZE_DESKTOP = 60;
  const TARGET_CELL_SIZE_MOBILE = 36;

  useEffect(() => {
    const calculateGrid = () => {
      // Check if mobile first using a preliminary calculation
      const preliminaryCols = Math.floor(
        window.innerWidth / TARGET_CELL_SIZE_DESKTOP,
      );
      const isMobileDevice = preliminaryCols < 15;

      // Use smaller cells on mobile for more granular grid
      const targetSize = isMobileDevice
        ? TARGET_CELL_SIZE_MOBILE
        : TARGET_CELL_SIZE_DESKTOP;
      const cols = Math.floor(window.innerWidth / targetSize);
      const cellWidth = window.innerWidth / cols;
      const cellHeight = cellWidth; // Keep cells square

      // Calculate rows based on viewport and content needs
      const viewportRows = Math.ceil(window.innerHeight / cellHeight);
      const totalRows = viewportRows; // Use viewport rows to fit exactly in single screen

      setGridDimensions({ cols, rows: totalRows, cellWidth, cellHeight });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  // Calculate layout positions based on screen size
  const isMobile = gridDimensions.cols < 15;

  // Mobile layout (typically 9-12 columns)
  const mobileLayout = {
    image: {
      colStart: 2,
      colSpan: gridDimensions.cols - 2,
      rowStart: 2,
      rowSpan: 10,
    },
    eventId: { colStart: 2, colSpan: 1, rowStart: 13, rowSpan: 1 },
    day: { colStart: 7, colSpan: 1, rowStart: 13, rowSpan: 1 },
    month: { colStart: 8, colSpan: 1, rowStart: 13, rowSpan: 1 },
    year: { colStart: 9, colSpan: 1, rowStart: 13, rowSpan: 1 },
    title: {
      colStart: 2,
      colSpan: gridDimensions.cols - 5,
      rowStart: 14,
      rowSpan: 1,
    },
    description: {
      colStart: 2,
      colSpan: gridDimensions.cols - 2,
      rowStart: 15,
      rowSpan: 7,
    },
    prevButton: { colStart: 2, colSpan: 2, rowStart: 22, rowSpan: 1 },
    nextButton: { colStart: gridDimensions.cols - 2, colSpan: 2, rowStart: 22, rowSpan: 1 },
  };

  // Desktop layout (typically 20+ columns)
  const desktopLayout = {
    image: {
      colStart: 2,
      colSpan: Math.floor(gridDimensions.cols * 0.35) + 1,
      rowStart: 2,
      rowSpan: gridDimensions.rows - 3,
    },
    eventId: {
      colStart: Math.floor(gridDimensions.cols * 0.5),
      colSpan: 1,
      rowStart: 2,
      rowSpan: 1,
    },
    day: {
      colStart: Math.floor(gridDimensions.cols * 0.9) + 2,
      colSpan: 1,
      rowStart: 2,
      rowSpan: 1,
    },
    month: {
      colStart: Math.floor(gridDimensions.cols * 0.8) + 2,
      colSpan: 1,
      rowStart: 2,
      rowSpan: 1,
    },
    year: {
      colStart: Math.floor(gridDimensions.cols * 0.85) + 2,
      colSpan: 1,
      rowStart: 2,
      rowSpan: 1,
    },
    title: {
      colStart: Math.floor(gridDimensions.cols * 0.5),
      colSpan: Math.floor(gridDimensions.cols * 0.3) + 3,
      rowStart: 3,
      rowSpan: 2,
    },
    description: {
      colStart: Math.floor(gridDimensions.cols * 0.5),
      colSpan: Math.floor(gridDimensions.cols * 0.45) + 2,
      rowStart: 5,
      rowSpan: gridDimensions.rows - 6,
    },
    prevButton: {
      colStart: 2,
      colSpan: 2,
      rowStart: gridDimensions.rows - 1,
      rowSpan: 1,
    },
    nextButton: {
      colStart: gridDimensions.cols - 2,
      colSpan: 2,
      rowStart: gridDimensions.rows - 1,
      rowSpan: 1,
    },
  };

  const layout = isMobile ? mobileLayout : desktopLayout;

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  const currentIndex = events.findIndex((e) => e.id === eventId);

  if (currentIndex === -1) {
    return <div>Invalid event</div>;
  }

  const dateObj = new Date(event.date);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear()).slice(-2);

  const isAlternateTheme = event.id % 2 === 1;

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % events.length;
    const nextId = events[nextIndex]!.id;
    router.push(`/event/${nextId}`);
  };

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + events.length) % events.length;
    const prevId = events[prevIndex]!.id;
    router.push(`/event/${prevId}`);
  };

  return (
    <div className="relative min-h-screen w-full max-w-screen overflow-x-hidden overflow-y-auto bg-gray-100 md:max-h-screen">
      {/* Scrollable Background Grid */}
      <div
        className={`absolute inset-0 grid w-full max-w-screen border bg-[#fffffe] ${isAlternateTheme ? "divide-x divide-y divide-black border-black" : "divide-x divide-y divide-black/10 border-black/10"}`}
        style={{
          gridTemplateColumns: `repeat(${gridDimensions.cols}, ${gridDimensions.cellWidth}px)`,
          gridTemplateRows: `repeat(${gridDimensions.rows}, ${gridDimensions.cellHeight}px)`,
          height: `${gridDimensions.rows * gridDimensions.cellHeight}px`,
        }}
      >
        {Array.from({ length: gridDimensions.cols * gridDimensions.rows }).map(
          (_, i) => {
            const src = images[i % images.length]!;

            return (
              <div
                key={i}
                className={`relative overflow-hidden transition-colors duration-300 ${isAlternateTheme ? "border border-black bg-[#4F2222]" : "border border-black/10"} `}
              >
                <Image
                  src={src}
                  fill
                  className={`object-contain transition-all duration-300 ${
                    isAlternateTheme ? "opacity-30" : "opacity-50"
                  }`}
                  alt=""
                />
              </div>
            );
          },
        )}
      </div>

      {/* Content Container */}
      <div
        className="relative z-10 grid w-full max-w-screen"
        style={{
          gridTemplateColumns: `repeat(${gridDimensions.cols}, ${gridDimensions.cellWidth}px)`,
          gridTemplateRows: `repeat(${gridDimensions.rows}, ${gridDimensions.cellHeight}px)`,
          height: `${gridDimensions.rows * gridDimensions.cellHeight}px`,
        }}
      >
        {/* Event Image */}
        <div
          className="relative overflow-hidden shadow-2xl"
          style={{
            gridColumn: `${layout.image.colStart} / span ${layout.image.colSpan}`,
            gridRow: `${layout.image.rowStart} / span ${layout.image.rowSpan}`,
          }}
        >
          <Image
            src={event.image}
            alt="Event"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Event ID */}
        <div
          className={`flex items-center justify-center font-bold transition-colors duration-300 ${isAlternateTheme
              ? "border border-white bg-[#1E0C0C] text-white"
              : "border border-black bg-[#FFF8EC] text-black"
          }`}
          style={{
            gridColumn: `${layout.eventId.colStart} / span ${layout.eventId.colSpan}`,
            gridRow: `${layout.eventId.rowStart} / span ${layout.eventId.rowSpan}`,
            fontSize: `${Math.min(gridDimensions.cellWidth * 0.6, 32)}px`,
          }}
        >
          {event.id.toString().padStart(2, "0")}
        </div>

        {/* Date - Day */}
        <div
          className={`flex items-center justify-center font-bold transition-colors duration-300 ${isAlternateTheme
              ? "border border-white bg-[#1E0C0C] text-white"
              : "border border-black bg-[#FFF8EC] text-black"
          }`}
          style={{
            gridColumn: `${layout.day.colStart} / span ${layout.day.colSpan}`,
            gridRow: `${layout.day.rowStart} / span ${layout.day.rowSpan}`,
            fontSize: `${Math.min(gridDimensions.cellWidth * 0.6, 32)}px`,
          }}
        >
          {day}
        </div>

        {/* Date - Month */}
        <div
          className={`flex items-center justify-center font-bold transition-colors duration-300 ${isAlternateTheme
              ? "border border-white bg-[#1E0C0C] text-white"
              : "border border-black bg-[#FFF8EC] text-black"
          }`}
          style={{
            gridColumn: `${layout.month.colStart} / span ${layout.month.colSpan}`,
            gridRow: `${layout.month.rowStart} / span ${layout.month.rowSpan}`,
            fontSize: `${Math.min(gridDimensions.cellWidth * 0.6, 32)}px`,
          }}
        >
          {month}
        </div>

        {/* Date - Year */}
        <div
          className={`flex items-center justify-center font-bold transition-colors duration-300 ${isAlternateTheme
              ? "border border-white bg-[#1E0C0C] text-white"
              : "border border-black bg-[#FFF8EC] text-black"
          }`}
          style={{
            gridColumn: `${layout.year.colStart} / span ${layout.year.colSpan}`,
            gridRow: `${layout.year.rowStart} / span ${layout.year.rowSpan}`,
            fontSize: `${Math.min(gridDimensions.cellWidth * 0.6, 32)}px`,
          }}
        >
          {year}
        </div>

        {/* Event Title */}
        <div
          className={`flex items-center justify-start px-2 text-left leading-tight font-bold transition-colors duration-300 ${isAlternateTheme
              ? "border border-white bg-[#1E0C0C] text-white"
              : "border border-black bg-[#FFF8EC] text-black"
          }`}
          style={{
            gridColumn: `${layout.title.colStart} / span ${layout.title.colSpan}`,
            gridRow: `${layout.title.rowStart} / span ${layout.title.rowSpan}`,
            fontSize: isMobile
              ? `clamp(16px, ${gridDimensions.cellWidth * 0.45}px, 24px)`
              : `clamp(32px, ${gridDimensions.cellWidth * 0.85}px, 56px)`,
          }}
        >
          {event.title}
        </div>

        {/* Event Description */}
        <div
          className={`p-3 leading-relaxed transition-colors duration-300 ${isAlternateTheme
              ? "border border-white bg-[#1E0C0C]/95 text-white"
              : "border border-black bg-[#FFF8EC]/95 text-black"
          }`}
          style={{
            gridColumn: `${layout.description.colStart} / span ${layout.description.colSpan}`,
            gridRow: `${layout.description.rowStart} / span ${layout.description.rowSpan}`,
            fontSize: isMobile
              ? `clamp(16px, ${gridDimensions.cellWidth * 0.4}px, 20px)`
              : `clamp(18px, ${gridDimensions.cellWidth * 0.35}px, 26px)`,
            overflow: "auto",
            lineHeight: "1.6",
          }}
        >
          {event.description}
        </div>

        {/* Previous Button */}
        <div
          className={`${isAlternateTheme ? "bg-[#1E0C0C]" : ""}`}
          style={{
            gridColumn: `${layout.prevButton.colStart} / span ${layout.prevButton.colSpan}`,
            gridRow: `${layout.prevButton.rowStart} / span ${layout.prevButton.rowSpan}`,
            padding: "8px",
          }}
        >
          <button
            onClick={goPrev}
            className={`flex h-full w-full items-center justify-center px-3 py-2 font-bold tracking-widest uppercase transition-all hover:scale-105 ${
              isAlternateTheme
                ? "border-2 border-[#4F2222] bg-[#FFF8EC] text-[#4F2222] hover:bg-[#F5EED9]"
                : "rounded bg-[#D97706] text-white shadow-lg hover:bg-[#F59E0B]"
            }`}
            style={{
              fontSize: `${Math.min(gridDimensions.cellWidth * 0.22, 12)}px`,
              letterSpacing: "0.15em",
            }}
          >
            Previous
          </button>
        </div>

        {/* Next Button */}
        <div
          className={`${isAlternateTheme ? "bg-[#1E0C0C]" : ""}`}
          style={{
            gridColumn: `${layout.nextButton.colStart} / span ${layout.nextButton.colSpan}`,
            gridRow: `${layout.nextButton.rowStart} / span ${layout.nextButton.rowSpan}`,
            padding: "8px",
          }}
        >
          <button
            onClick={goNext}
            className={`flex h-full w-full items-center justify-center px-3 py-2 font-bold tracking-widest uppercase transition-all hover:scale-105 ${
              isAlternateTheme
                ? "border-2 border-[#4F2222] bg-[#FFF8EC] text-[#4F2222] hover:bg-[#F5EED9]"
                : "rounded bg-[#D97706] text-white shadow-lg hover:bg-[#F59E0B]"
            }`}
            style={{
              fontSize: `${Math.min(gridDimensions.cellWidth * 0.22, 12)}px`,
              letterSpacing: "0.15em",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
