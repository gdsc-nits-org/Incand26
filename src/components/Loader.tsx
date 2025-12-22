
"use client";

import { useEffect, useState ,useLayoutEffect } from "react";
 

//------------------------------tilesphotos-----------------------------------
const strips = Array.from(
  { length: 10 },
  (_, i) => `/tiles/tile${i + 1}.svg`
);
const mobileStrips = [
  "/tiles/tile4.svg",
  "/tiles/tile5.svg",
  "/tiles/tile6.svg",
  "/tiles/tile7.svg",
];

const ipadStrips=[
  "/tiles/tile3.svg",
  "/tiles/tile4.svg",
  "/tiles/tile5.svg",
  "/tiles/tile6.svg",
  "/tiles/tile7.svg",
  "/tiles/tile8.svg"
];

//----------------------------------------------------------------------------

const tileDirections: ("up" | "down")[] = [
  "up",
  "down",
  "up",
  "up",
  "up",
  "down",
  "up",
  "down",
  "down",
  "down",
];
const mobileTileDirections: ("up" | "down")[] = [
  "up",
  "down",
  "up",
  "down",
];
const ipadTileDirections: ("up" | "down")[] = [
  "up",
  "down",
  "up",
  "up",
  "down",
  "down"
];
//--------------------------------------------------------------------
interface LoaderProps {
  onComplete?: () => void;
}
const Loader: React.FC <LoaderProps>= ({onComplete}) => {
  const [showCandle, setShowCandle] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [animateGlow, setAnimateGlow] = useState(false); // glow animation starts
  const [phase, setPhase] = useState<"glowing" | "explode" | "tiles">("glowing");
  const [showText, setShowText] = useState(false);
  const [fadeText, setFadeText] = useState(false);
  const [glowDrop, setGlowDrop] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const [isLap, setIsLap] = useState(false);

  useLayoutEffect(() => {
    const width = window.innerWidth;
    setIsPhone(width >= 320 && width <= 758);
    setIsIpad(width >= 759 && width <= 1024);
    setIsLap(width >= 1025);
    const handleResize = () => {
      const w = window.innerWidth;
      setIsPhone(w >= 320 && w <= 758);
      setIsIpad(w >= 759 && w <= 1200);
      setIsLap(w >= 1201);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  useEffect(() => {
    const tShow = setTimeout(() => {
      setShowCandle(true);
      setShowGlow(true);
      setShowText(true);
    }, 150);
    const tGlow = setTimeout(() => {
      setAnimateGlow(true);
    }, 200);
    const tHide = setTimeout(() => {
      setShowCandle(false);
    }, 1100);
    // const tGlowDrop = setTimeout(() => {
    //   setGlowDrop(true);
    //   setFadeText(true);
    // }, 1400);
    const tTiles = setTimeout(() => {
      setShowGlow(false);
      setGlowDrop(true);
      setFadeText(true);
      setPhase("tiles")
    }, 1600);
    // const tRemoveText = setTimeout(() => {
    //   setShowText(false);
    // }, 1400 + 3000);

    // 7️⃣ loader ends (tiles animation duration = 3000ms)
    const tDone = setTimeout(() => {
      onComplete?.();
    }, 4600);

    return () => {
      clearTimeout(tShow);
      clearTimeout(tGlow);
      clearTimeout(tHide);
      clearTimeout(tTiles);
      clearTimeout(tDone);
    };
  }, [onComplete]);
  return (
    <>
      {/* ================= LAPTOP VIEW ================= */}
      {isLap && (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden ">
          <div
            className="absolute inset-0 grid h-screen w-screen z-10 brightness-150"
            style={{
              gridTemplateColumns: "0.67fr repeat(8,1fr) 0.6fr",
            }}
          >
          {strips.map((src, i) => {
          const direction = tileDirections[i];
          const moveClass =direction === "up" ? "-translate-y-full" : "translate-y-full";
          return (
            <div
              key={i}
              className={`
                h-full w-full overflow-hidden
                transition-transform duration-2500 ease-in-out
                ${phase === "tiles" ?  moveClass : "translate-y-0"}
              `}
            >
              <img
                src={src}
                alt={src[i]}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          );
          })}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-40 gap-[30vh]">
          <div className="relative  flex flex-col items-center top-[15vh]">
            <div className="relative flex flex-col items-center">
    
              {/* 🔥 GLOW — removed from layout */}
              {showGlow && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className={`
                  transition-all duration-500 ease-out
                  ${glowDrop ? " translate-y-[6vh] opacity-0" : "opacity-100"}
                  `}
                >
                  <div className={`torch-brightness ${animateGlow ? "glow-lap" : ""}`} />
                </div>
              </div>
              )}

              {/* 🔥 CANDLE — stays in flex */}
              {showCandle && (
                <div className="relative flex flex-col items-center transition-opacity duration-300 -top-[20vh]">
                  <img src="/fire.gif" className="absolute -top-[18vh] h-[33vh]" />
                  <img src="/stick.svg" className="relative top-[15vh] h-[35vh]" />
                </div>
              )}
            </div>
          </div>
        </div>

         {showText && (
        <p
          style={{ fontFamily: "Hitchcut" }}
          className={`
            relative  top-[80vh] left-[39.5vw]
            text-[3vw] tracking-[0.1vw] text-white z-50
            transition-opacity duration-3000 ease-out
            ${fadeText ? "opacity-0" : "opacity-100"}
          `}
        >
          LOADING <span className="tracking-[1vw]">...</span>
        </p>
        )}
      </div>
      )}

    {/* ================= IPAD VIEW ================= */}
    {isIpad && (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* 🔲 MOBILE TILE GRID (SAME PATTERN AS DESKTOP) */}
      <div
        className="absolute inset-0 grid h-screen w-screen z-10"
        style={{
        gridTemplateColumns: " 0.6fr repeat(4,1fr) 0.6fr",
        }}
      >
      {ipadStrips.map((src, i) => {
        const direction = ipadTileDirections[i];
        const moveClass =
          direction === "up" ? "-translate-y-full" : "translate-y-full";

        return (
          <div
            key={i}
            className={`
              h-full w-full overflow-hidden
              transition-transform duration-2500 ease-in-out
              ${phase === "tiles" ? moveClass : "translate-y-0"}
            `}
          >
            <img
              src={src}
              alt={`ipad-strip-${i}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        );
      })}
    </div>

    {/* ================= CENTER OVERLAY (MATCH DESKTOP) ================= */}
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-40 gap-[30vh]">

      <div className="relative flex flex-col items-center top-[12vh]">

        <div className="relative flex flex-col items-center">
          {showGlow && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className={`
                  transition-all duration-500 ease-out
                  ${glowDrop ? " translate-y-[6vh] opacity-0" : "opacity-100"}
                  `}
                >
                  <div className={`torch-brightness ${animateGlow ? "glow-lap" : ""}`} />
                </div>
              </div>
          )}
          {showCandle && (
            <div className="relative flex flex-col items-center transition-opacity duration-300 -top-[20vh]">
              <img src="/fire.gif" className="absolute -top-[14vh] h-[28vh]" />
              <img src="/stick.svg" className="relative top-[15vh] h-[28vh]" />
            </div>
          )}
        </div>
      </div>
    </div>

    {/* /* ================= LOADING TEXT (MATCH DESKTOP POSITIONING) ================= */}
    {showText && (
        <p
          style={{ fontFamily: "Hitchcut" }}
          className={`
            relative  top-[78vh] left-[20vw]
            text-[9.5vw] tracking-[0.4vw] text-white z-50
            transition-opacity duration-3000 ease-out
            ${fadeText ? "opacity-0" : "opacity-100"}
          `}
        >
          LOADING <span className="tracking-[1vw]">...</span>
        </p>
    )}
  </div>
)}


      {/* ================= MOBILE VIEW ================= */}
{isPhone && (
  <div className="fixed inset-0 z-50 bg-black overflow-hidden">

    {/* 🔲 MOBILE TILE GRID (SAME PATTERN AS DESKTOP) */}
    <div
      className="absolute inset-0 grid h-screen w-screen z-10"
      style={{
        gridTemplateColumns: " 0.6fr repeat(2,1fr) 0.6fr",
      }}
    >
      {mobileStrips.map((src, i) => {
        const direction = mobileTileDirections[i];
        const moveClass =
          direction === "up" ? "-translate-y-full" : "translate-y-full";

        return (
          <div
            key={i}
            className={`
              h-full w-full overflow-hidden
              transition-transform duration-3000 ease-in-out
              ${phase === "tiles" ? moveClass : "translate-y-0"}
            `}
          >
            <img
              src={src}
              alt={`mobile-strip-${i}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        );
      })}
    </div>

    {/* ================= CENTER OVERLAY (MATCH DESKTOP) ================= */}
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-40 gap-[30vh]">

      <div className="relative flex flex-col items-center top-[12vh]">

        <div className="relative flex flex-col items-center">

          {/* 🔥 PROCEDURAL GLOW */}
          {showGlow && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className={`
                  transition-all duration-500 ease-out
                  ${glowDrop ? " translate-y-[6vh] opacity-0" : "opacity-100"}
                  `}
                >
                  <div className={`torch-brightness ${animateGlow ? "glow-lap" : ""}`} />
                </div>
              </div>
          )}
          {/* 🔥 FIRE + STICK */}
          {showCandle && (
            <div className="relative flex flex-col items-center transition-opacity duration-300 -top-[20vh]">
              <img src="/fire.gif" className="absolute -top-[13vh] h-[25vh]" />
              <img src="/stick.svg" className="relative top-[12vh] h-[26vh]" />
            </div>
          )}
        </div>
      </div>
    </div>

    {/* ================= LOADING TEXT (MATCH DESKTOP POSITIONING) ================= */}
    {showText && (
        <p
          style={{ fontFamily: "Hitchcut" }}
          className={`
            relative  top-[78vh] left-[20vw]
            text-[9.5vw] tracking-[0.4vw] text-white z-50
            transition-opacity duration-3000 ease-out
            ${fadeText ? "opacity-0" : "opacity-100"}
          `}
        >
          LOADING <span className="tracking-[1vw]">...</span>
        </p>
    )}
  </div>
)}
    </>
  );
};

export default Loader;

