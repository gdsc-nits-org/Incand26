import React from "react";
import SponsorCard from "./SponsorCard";

//the shape of the data
interface Sponsor {
  name: string;
  logo: string;
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

  // duplicate the array for the infinite loop effect
  const duplicatedSponsors = [...sponsors, ...sponsors];

  const animationClass = {
    down: "animate-scroll-down",
    up: "animate-scroll-up",
    left: "animate-scroll-left",
    right: "animate-scroll-right",
  }[direction];

  return (
    <div className="h-full w-full overflow-hidden">
      <div
        className={`flex ${isVertical ? "flex-col" : "flex-row"} ${animationClass} gap-6 md:gap-8`}
      >
        {duplicatedSponsors.map((sponsor, idx) => (
          <SponsorCard
            key={idx}
            logoUrl={sponsor.logo}
            name={sponsor.name}
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
