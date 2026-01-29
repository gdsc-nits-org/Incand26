"use client";

import { useState } from "react";
import Image from "next/image";
import events from "../../../data/event.json";
import { useParams, useRouter } from "next/navigation";

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
  const [showModal, setShowModal] = useState(false);

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  const currentIndex = events.findIndex((e) => e.id === eventId);

  if (currentIndex === -1) {
    return <div>Invalid event</div>;
  }

  const dateObj = new Date(event.date);
  const isValid = !isNaN(dateObj.getTime());

  // If valid, format the numbers. If not, use a placeholder "--"
  const day = isValid ? String(dateObj.getDate()).padStart(2, "0") : "--";
  const month = isValid
    ? String(dateObj.getMonth() + 1).padStart(2, "0")
    : "--";
  const year = isValid ? String(dateObj.getFullYear()).slice(-2) : "--";

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

  const handleRegister = () => {
    if (event.regLink && event.regLink.trim() !== "") {
      window.open(event.regLink, "_blank");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="grid h-[55rem] min-h-screen w-full max-w-[43.75rem] min-w-screen grid-cols-10 grid-rows-22 divide-x divide-y border border-black bg-[#fffffe] sm:h-[25rem] sm:grid-cols-21 sm:grid-rows-11">
        {/* Background Tiles Loop */}
        {Array.from({ length: 21 * 16 }).map((_, i) => {
          const src = images[i % images.length]!;

          return (
            <div
              key={i}
              className={`relative overflow-hidden border-black transition-colors duration-300 md:border ${
                isAlternateTheme ? "bg-[#4F2222]" : ""
              } `}
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
        })}

        {/* Main Event Image */}
        <div
          className={`relative col-span-8 col-start-2 row-span-9 row-start-2 overflow-hidden sm:col-span-8 sm:col-start-2 sm:row-span-8 sm:row-start-2 ${
            isAlternateTheme ? "border border-white" : ""
          }`}
        >
          <Image
            src={event.image}
            alt="Event"
            fill
            className="object-cover"
            objectPosition="top"
            priority
          />
        </div>

        {/* Event ID */}
        <div
          className={`col-span-1 col-start-2 row-span-1 row-start-12 flex items-center justify-center text-xl font-bold transition-colors duration-300 sm:col-span-1 sm:col-start-11 sm:row-start-2 ${
            isAlternateTheme
              ? "border border-white bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {event.id}
        </div>

        {/* Day */}
        <div
          className={`col-span-1 col-start-7 row-span-1 row-start-12 flex items-center justify-center text-xs font-semibold transition-colors duration-300 sm:col-span-1 sm:col-start-17 sm:row-start-2 sm:text-2xl md:text-xl ${
            isAlternateTheme
              ? "border border-white bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {day}
        </div>

        {/* Month */}
        <div
          className={`col-span-1 col-start-8 row-span-1 row-start-12 flex items-center justify-center text-xs font-semibold transition-colors duration-300 sm:col-span-1 sm:col-start-18 sm:row-start-2 sm:text-2xl md:text-xl ${
            isAlternateTheme
              ? "border-y-[1px] border-white bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {month}
        </div>

        {/* Year */}
        <div
          className={`col-span-1 col-start-9 row-span-1 row-start-12 flex items-center justify-center text-xs font-semibold transition-colors duration-300 sm:col-span-1 sm:col-start-19 sm:row-start-2 sm:text-2xl md:text-xl ${
            isAlternateTheme
              ? "border border-white bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {year}
        </div>

        {/* Title */}
        <div
          className={`col-span-5 col-start-2 row-span-1 row-start-13 flex items-center justify-center text-[0.9375rem] font-bold transition-colors duration-300 sm:col-span-7 sm:col-start-11 sm:row-start-4 sm:text-xl md:col-span-8 md:col-start-11 md:text-xl md:leading-normal lg:col-span-6 lg:col-start-11 lg:text-2xl lg:leading-relaxed ${
            isAlternateTheme
              ? "border border-white bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {event.title}
        </div>

        {/* Description */}
        <div
          className={`col-span-8 col-start-2 row-span-6 row-start-14 overflow-y-auto p-3 text-xs leading-tight whitespace-pre-line transition-colors duration-300 sm:col-span-9 sm:col-start-11 sm:row-span-5 sm:row-start-5 sm:text-sm sm:leading-snug md:text-base md:leading-normal lg:text-xl lg:leading-relaxed [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent ${
            isAlternateTheme
              ? "border border-white bg-[#1E0C0C] text-white [&::-webkit-scrollbar-thumb]:bg-white/20"
              : "bg-[#FFF8EC] text-black [&::-webkit-scrollbar-thumb]:bg-black/20"
          } `}
        >
          {event.description}
        </div>

        {/* Register Button */}
        <div
          className={`col-span-4 col-start-4 row-span-1 row-start-20 flex items-center justify-center sm:col-span-4 sm:col-start-11 sm:row-start-10 ${
            isAlternateTheme
              ? "border border-white bg-amber-950 text-white"
              : "bg-[#FFF8EC] text-white border md:border-0 border-black"
          }`}
        >
          <button
            onClick={handleRegister}
            className={`cursor-pointer rounded-sm px-2 py-1 text-[10px] md:text-[1rem] lg:rounded-xl lg:px-4 lg:py-2 ${
              isAlternateTheme
                ? "bg-gray-100 text-amber-950"
                : "bg-amber-600 text-white"
            } `}
          >
            REGISTER
          </button>
        </div>

        {/* Previous Button */}
        <div
          className={`col-span-3 col-start-2 row-span-1 row-start-22 flex items-center justify-center sm:col-span-2 sm:col-start-2 sm:row-start-10 ${
            isAlternateTheme
              ? "border border-white bg-amber-950 text-white"
              : "bg-[#FFF8EC] text-white border md:border-0 border-black"
          }`}
        >
          <button
            onClick={goPrev}
            className={`cursor-pointer rounded-sm px-2 py-1 text-[10px] md:text-[1rem] lg:rounded-xl lg:px-4 lg:py-2 ${
              isAlternateTheme
                ? "bg-gray-100 text-amber-950"
                : "bg-amber-600 text-white"
            } `}
          >
            PREVIOUS
          </button>
        </div>

        {/* Next Button */}
        <div
          className={`col-span-3 col-start-7 row-start-22 flex items-center justify-center sm:col-span-2 sm:col-start-18 sm:row-start-10 ${
            isAlternateTheme
              ? "border border-white bg-amber-950 text-white"
              : "bg-[#FFF8EC] text-white border md:border-0 border-black"
          }`}
        >
          <button
            onClick={goNext}
            className={`cursor-pointer rounded-sm px-2 py-1 text-[10px] md:text-[1rem] lg:rounded-xl lg:px-4 lg:py-2 ${
              isAlternateTheme
                ? "bg-gray-100 text-amber-950"
                : "bg-amber-600 text-white"
            } `}
          >
            NEXT
          </button>
        </div>
      </div>

      {/* Registration Not Live Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className={`relative mx-4 max-w-md rounded-xl border-2 p-8 text-center shadow-2xl ${
              isAlternateTheme
                ? "border-white/30 bg-[#1E0C0C] text-white"
                : "border-amber-600/30 bg-[#FFF8EC] text-black"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`mb-4 text-5xl ${
                isAlternateTheme ? "text-white/80" : "text-amber-600"
              }`}
            >
              ⏳
            </div>
            <h3
              className={`mb-3 text-xl font-bold ${
                isAlternateTheme ? "text-white" : "text-amber-800"
              }`}
            >
              Registration Coming Soon
            </h3>
            <p
              className={`mb-6 text-sm leading-relaxed ${
                isAlternateTheme ? "text-white/70" : "text-amber-700"
              }`}
            >
              The registration link for this event is not live yet. Please check back later!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className={`cursor-pointer rounded-lg px-6 py-2 font-semibold transition-all duration-200 hover:scale-105 ${
                isAlternateTheme
                  ? "bg-white text-amber-950 hover:bg-gray-100"
                  : "bg-amber-600 text-white hover:bg-amber-700"
              }`}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
