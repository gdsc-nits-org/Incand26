"use client";

import { useEffect, useState, useLayoutEffect } from "react";

//------------------------------tilesphotos-----------------------------------
const strips = Array.from({ length: 10 }, (_, i) => `/tiles/tile${i + 1}.svg`);
const mobileStrips = [
  "/tiles/tile4.svg",
  "/tiles/tile5.svg",
  "/tiles/tile6.svg",
  "/tiles/tile7.svg",
];

const ipadStrips = [
  "/tiles/tile3.svg",
  "/tiles/tile4.svg",
  "/tiles/tile5.svg",
  "/tiles/tile6.svg",
  "/tiles/tile7.svg",
  "/tiles/tile8.svg",
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
const mobileTileDirections: ("up" | "down")[] = ["up", "down", "up", "down"];
const ipadTileDirections: ("up" | "down")[] = [
  "up",
  "down",
  "up",
  "up",
  "down",
  "down",
];
//--------------------------------------------------------------------
interface LoaderProps {
  onComplete?: () => void;
  onTilesStart?: () => void;
}
const Loader: React.FC<LoaderProps> = ({ onComplete,onTilesStart }) => {
  const [showCandle, setShowCandle] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [animateGlow, setAnimateGlow] = useState(false); // glow animation starts
  const [phase, setPhase] = useState<"glowing" | "explode" | "tiles">(
    "glowing",
  );
  const [progress, setProgress] = useState(0);
  const [progressDone, setProgressDone] = useState(false);

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
    if (!showCandle) return;
    let value = 0;
    const interval = setInterval(() => {
      value += 1;
      setProgress(value);
      if (value === 100) {
        clearInterval(interval);
        // allow 100% to render once
        setTimeout(() => {
          setProgressDone(true);
        }, 150);
      }
    }, 40); // 100 * 50ms = 5000ms (5s)
    return () => clearInterval(interval);
  }, [showCandle]);

  useEffect(() => {
    let tShow: NodeJS.Timeout | undefined;

    if (!progressDone) {
      tShow = setTimeout(() => {
        setAnimateGlow(false);
        setShowCandle(true);
        setShowGlow(true);
        setShowText(true);
      }, 400);

      return () => {
        if (tShow) clearTimeout(tShow);
      };
    }
    const tGlow = setTimeout(() => {
      setAnimateGlow(true);
    }, 300);
    const tHide = setTimeout(() => {
      setShowCandle(false);
      setShowGlow(false);
      setGlowDrop(true);
    }, 1000);
    // const tGlowDrop = setTimeout(() => {
    //   setGlowDrop(true);
    //   setFadeText(true);
    // }, 1400);
    const tTiles = setTimeout(() => {
      setFadeText(true);
      setPhase("tiles");
      onTilesStart?.();
    }, 1100);
    // const tRemoveText = setTimeout(() => {
    //   setShowText(false);
    // }, 1400 + 3000);

    // 7️⃣ loader ends (tiles animation duration = 3000ms)
    const tDone = setTimeout(() => {
      onComplete?.();
    }, 3600);

    return () => {
      clearTimeout(tShow);
      clearTimeout(tGlow);
      clearTimeout(tHide);
      clearTimeout(tTiles);
      clearTimeout(tDone);
    };
  }, [progressDone, onComplete]);
  return (
    <>
      {/* ================= LAPTOP VIEW ================= */}
      {isLap && (
        <div
          className={`fixed inset-0 overflow-hidden transition-all duration-200
          ${
            phase === "tiles"
            ?"bg-transparent z-50 pointer-events-none"
            : " z-50 pointer-events-auto"
          }
          `}
        >

          <div
            className="absolute inset-0 z-10 grid h-screen w-screen brightness-150 "
            style={{
              gridTemplateColumns: "0.67fr repeat(8,1fr) 0.6fr",
            }}
          >
            {strips.map((src, i) => {
              const direction = tileDirections[i];
              const moveClass =
                direction === "up" ? "-translate-y-full" : "translate-y-full";
              return (
                <div
                  key={i}
                  className={`h-full w-full overflow-hidden  transition-transform duration-2500 ease-in-out ${phase === "tiles" ? moveClass : "translate-y-0"} `}
                >
                  <img
                    src={src}
                    alt={src[i]}
                    className="h-full w-full object-cover scale-x-[1.07]"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-[30vh] bg-black/30">
            <div className="relative top-[15vh] flex flex-col items-center">
              <div className="relative flex flex-col items-center">
                {/* 🔥 GLOW — removed from layout */}
                {showGlow && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div
                      className={`transition-all duration-500 ease-out ${glowDrop ? "translate-y-[6vh] opacity-0" : "opacity-100"} `}
                    >
                      <div className="glow=wrapper">
                        <div
                          className={`torch-brightness ${animateGlow ? "glow-lap" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 🔥 CANDLE — stays in flex */}
                {showCandle && (
                  <div className="relative -top-[20vh] flex flex-col items-center transition-opacity duration-300">
                    <img
                      src="/fire.gif"
                      className="absolute -top-[18vh] h-[33vh]"
                    />
                    <img
                      src="/stick.svg"
                      className="relative top-[15vh] h-[35vh]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {showText && (
            <p
              style={{ fontFamily: "Hitchcut" }}
              className={`relative top-[80vh] left-[40vw] z-50 text-[3vw] tracking-[0.1vw] text-white transition-opacity duration-3000 ease-out ${fadeText ? "opacity-0" : "opacity-100"} `}
            >
              LOADING <span className="tracking-[1vw]">...</span>
            </p>
          )}
          {showCandle && !progressDone && phase !== "tiles" && (
            <p
              style={{ fontFamily: "Hitchcut" }}
              className="relative top-[78vh] left-[48vw] z-50 text-[2vw] tracking-[0.1vw] text-white"
            >
              {progress}%
            </p>
          )}
        </div>
      )}

      {/* ================= IPAD VIEW ================= */}
      {isIpad && (
        <div className={`fixed inset-0 overflow-hidden transition-all duration-200
        ${
            phase === "tiles"
            ?"bg-transparent z-50 pointer-events-none"
            : "bg-black z-50 pointer-events-auto"
        }
      `}>
          {/* MOBILE TILE GRID (SAME PATTERN AS DESKTOP) */}
          <div
            className="absolute inset-0 z-10 grid h-screen w-screen brightness-125"
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
                  className={`h-full w-full overflow-hidden transition-transform duration-2500 ease-in-out ${phase === "tiles" ? moveClass : "translate-y-0"} `}
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
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-[30vh] bg-black/30">
            <div className="relative top-[12vh] flex flex-col items-center">
              <div className="relative flex flex-col items-center">
                {showGlow && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div
                      className={`transition-all duration-500 ease-out ${glowDrop ? "translate-y-[6vh] opacity-0" : "opacity-100"} `}
                    >
                      <div className="glow-wrapper">
                        <div
                          className={`torch-brightness ${animateGlow ? "glow-lap" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {showCandle && (
                  <div className="relative -top-[20vh] flex flex-col items-center transition-opacity duration-300">
                    <img
                      src="/fire.gif"
                      className="absolute -top-[14vh] h-[28vh]"
                    />
                    <img
                      src="/stick.svg"
                      className="relative top-[15vh] h-[28vh]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* /* ================= LOADING TEXT (MATCH DESKTOP POSITIONING) ================= */}
          {showText && (
            <p
              style={{ fontFamily: "Hitchcut" }}
              className={`relative top-[78vh] left-[20vw] z-50 text-[9.5vw] tracking-[0.4vw] text-white transition-opacity duration-3000 ease-out ${fadeText ? "opacity-0" : "opacity-100"} `}
            >
              LOADING <span className="tracking-[1vw]">...</span>
            </p>
          )}
          {showCandle && !progressDone && phase !== "tiles" && (
            <p
              style={{ fontFamily: "Hitchcut" }}
              className="relative top-[77vh] left-[44vw] z-50 text-[6vw] tracking-[0.1vw] text-white"
            >
              {progress}%
            </p>
          )}
        </div>
      )}

      {/* ================= MOBILE VIEW ================= */}
      {isPhone && (
        <div className={`fixed inset-0 overflow-hidden transition-all duration-200
        ${
            phase === "tiles"
            ?"bg-transparent z-50 pointer-events-none"
            : "bg-black z-50 pointer-events-auto"
        }
      `}>
          {/*  MOBILE TILE GRID (SAME PATTERN AS DESKTOP) */}
          <div
            className="absolute inset-0 z-10 grid h-screen w-screen brightness-125"
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
                  className={`h-full w-full overflow-hidden transition-transform duration-3000 ease-in-out ${phase === "tiles" ? moveClass : "translate-y-0"} `}
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
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-[30vh] bg-black/30">
            <div className="relative top-[12vh] flex flex-col items-center">
              <div className="relative flex flex-col items-center">
                {/* 🔥 PROCEDURAL GLOW */}
                {showGlow && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div
                      className={`transition-all duration-500 ease-out ${glowDrop ? "translate-y-[6vh] opacity-0" : "opacity-100"} `}
                    >
                      <div className="glow-wrapper">
                        <div
                          className={`torch-brightness ${animateGlow ? "glow-lap" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* 🔥 FIRE + STICK */}
                {showCandle && (
                  <div className="relative -top-[20vh] flex flex-col items-center transition-opacity duration-300">
                    <img
                      src="/fire.gif"
                      className="absolute -top-[13vh] h-[25vh]"
                    />
                    <img
                      src="/stick.svg"
                      className="relative top-[12vh] h-[26vh]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= LOADING TEXT (MATCH DESKTOP POSITIONING) ================= */}
          {showText && (
            <p
              style={{ fontFamily: "Hitchcut" }}
              className={`relative top-[78vh] left-[20vw] z-50 text-[9.5vw] tracking-[0.4vw] text-white transition-opacity duration-3000 ease-out ${fadeText ? "opacity-0" : "opacity-100"} `}
            >
              LOADING <span className="tracking-[1vw]">...</span>
            </p>
          )}
          {showCandle && !progressDone && phase !== "tiles" && (
            <p
              style={{ fontFamily: "Hitchcut" }}
              className="relative top-[77vh] left-[44vw] z-50 text-[7vw] tracking-[0.1vw] text-white"
            >
              {progress}%
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Loader;
