import React from "react";

const GlobalScrollStyles: React.FC = () => {
  return (
    <style jsx global>{`
      @keyframes scrollDown {
        0% { transform: translateY(0); }
        100% { transform: translateY(-50%); }
      }
      @keyframes scrollUp {
        0% { transform: translateY(-50%); }
        100% { transform: translateY(0); }
      }
      @keyframes scrollLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes scrollRight {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }

      /* Base animation classes */
      .animate-scroll-down { animation: scrollDown 15s linear infinite; }
      .animate-scroll-up { animation: scrollUp 15s linear infinite; }
      .animate-scroll-left { animation: scrollLeft 20s linear infinite; }
      .animate-scroll-right { animation: scrollRight 20s linear infinite; }

      /* PAUSE LOGIC: Targets the div when it's hovered */
      .animate-scroll-down:hover,
      .animate-scroll-up:hover,
      .animate-scroll-left:hover,
      .animate-scroll-right:hover {
        animation-play-state: paused;
        cursor: pointer;
      }
    `}</style>
  );
};

export default GlobalScrollStyles;