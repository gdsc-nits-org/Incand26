import React from "react";
import SponsorCard from "./SponsorCard";

interface Sponsor {
  name: string;
  logo: string;
  link: string;
  partner?: string;
}

interface InfiniteScrollerProps {
  direction: "down" | "up" | "left" | "right";
  sponsors: Sponsor[];
}

const InfiniteScroller: React.FC<InfiniteScrollerProps> = ({
  direction,
  sponsors,
}) => {
  const isVertical = direction === "down" || direction === "up";

  const animationClass = {
    down: "animate-scroll-down",
    up: "animate-scroll-up",
    left: "animate-scroll-left",
    right: "animate-scroll-right",
  }[direction];

  return (
    /* Added "scroller-container" here to target it with our CSS */
    <div className="scroller-container group/scroller relative h-full w-full overflow-hidden">
      <div
        className={`flex gap-6 md:gap-8 ${isVertical ? "flex-col" : "w-max flex-row"} ${animationClass} `}
      >
        {/* We map twice to create the infinite loop */}
        {[...sponsors, ...sponsors].map((sponsor, idx) => (
          <SponsorCard
            key={idx}
            logoUrl={sponsor.logo}
            name={sponsor.name}
            partner={sponsor.partner}
            link={sponsor.link}
            className={
              isVertical ? "h-64 w-full md:h-80" : "h-36 w-36 md:h-48 md:w-48"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroller;
