"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CardHover from "./CardHover";
import eventsData from "../../data/event.json";

const UPPER_CARD_IMAGE =
  "https://res.cloudinary.com/dig1vxljf/image/upload/v1768216195/Component_96_fjlycb.webp";
const LOWER_CARD_IMAGE =
  "https://res.cloudinary.com/dig1vxljf/image/upload/v1768216273/Component_96_1_uapuri.webp";

const STYLES = {
  day1: {
    bgImage:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1768213636/Frame_1000008510_qiglnj.png",
    alt: "Day 1 Style",
    paddingClass: "pt-48 pb-32",
  },
  day2: {
    bgImage:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1768214357/Frame_1000008506_jbkk6e.png",
    alt: "Day 2 Style",
    paddingClass: "pt-32 pb-20 sm:pt-64 sm:pb-32",
  },
  day3: {
    bgImage:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1768214482/Frame_1000008509_g8ykxh.png",
    alt: "Day 3 Style",
    paddingClass: "pt-32 pb-32 sm:pt-64 sm:pb-10",
  },
};

const DayEvents = () => {
  const router = useRouter();

  const eventRows = useMemo(() => {
    const chunkSize = 4;
    const chunks = [];
    for (let i = 0; i < eventsData.length; i += chunkSize) {
      chunks.push(eventsData.slice(i, i + chunkSize));
    }
    return chunks;
  }, []);

  const handleEventClick = (eventId) => {
    router.push(`/event/${eventId}`);
  };

  return (
    <section className="relative z-30 -mt-24 w-full overflow-hidden sm:-mt-60">
      {/* Mobile Background */}
      <div className="absolute inset-0 z-0 sm:hidden">
        <Image
          src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768223559/events_mobile_view_1_avxwzm.png"
          alt="Mobile Background"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <div className="relative z-10 w-full">
        {eventRows.map((rowEvents, index) => {
          const isFirst = index === 0;
          const isLast = index === eventRows.length - 1;

          let config;
          if (isLast) {
            config = STYLES.day3;
          } else {
            config = index % 2 === 0 ? STYLES.day1 : STYLES.day2;
          }

          return (
            <div
              key={`row-${index}`}
              className={`relative w-full ${!isFirst ? "-mt-20 sm:-mt-40" : ""}`}
            >
              <div className="absolute inset-0 z-0 hidden sm:block">
                <Image
                  src={config.bgImage}
                  alt={config.alt}
                  fill
                  className="scale-110 object-cover object-top"
                />
              </div>

              <div
                className={`mx-auto max-w-7xl px-4 ${isFirst ? "pt-70 pb-20 sm:pt-48 sm:pb-32" : config.paddingClass}`}
              >
                <div
                  className={
                    isLast
                      ? "flex flex-wrap justify-center gap-8"
                      : "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                  }
                >
                  {rowEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`flex justify-center ${isLast ? "w-full min-w-[260px] sm:w-72 lg:w-1/5" : ""}`}
                    >
                      <CardHover
                        upperImage={UPPER_CARD_IMAGE}
                        lowerImage={LOWER_CARD_IMAGE}
                        eventName={event.title}
                        onClick={() => handleEventClick(event.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DayEvents;
