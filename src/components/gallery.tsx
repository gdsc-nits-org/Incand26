"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const GALLERY_ITEMS = [
  { id: 1, content: "Item 1" },
  { id: 2, content: "Item 2" },
  { id: 3, content: "Item 3" },
  { id: 4, content: "Item 4" },
  { id: 5, content: "Item 5" },
];
const BOARD_IMAGES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  src: `/Gallery/image${i + 1}.webp`,
}));

export function Gallery() {
  const [isPhone, setIsPhone] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const [isLap, setIsLap] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [showWhite, setShowWhite] = useState(false);
  const [centerIndex, setCenterIndex] = useState(1);
  const [imageCenterIndex, setImageCenterIndex] = useState(1);

  const handleNextImage = () => {
    setImageCenterIndex((prev) => (prev + 1) % BOARD_IMAGES.length);
  };

  const handlePrevImage = () => {
    setImageCenterIndex(
      (prev) => (prev - 1 + BOARD_IMAGES.length) % BOARD_IMAGES.length,
    );
  };

  const getBoardImage = (diff: number) => {
    const index =
      (imageCenterIndex + diff + BOARD_IMAGES.length) % BOARD_IMAGES.length;

    return BOARD_IMAGES[index] ?? BOARD_IMAGES[0];
  };

  const isShortHeight =
    typeof window !== "undefined" && window.innerHeight <= 700;

  useLayoutEffect(() => {
    if (!isPhone && !isLap && !isIpad) return;

    const timingMap = {
      phone: 2800,
      ipad: 2500,
      lap: 3500,
    };

    const delay = isPhone
      ? timingMap.phone
      : isIpad
        ? timingMap.ipad
        : timingMap.lap;

    const t = setTimeout(() => {
      setShowWhite(true);
    }, delay);

    return () => clearTimeout(t);
  }, [isPhone, isIpad, isLap]);

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
    );
  };

  const getPosition = (index: number) => {
    const len = GALLERY_ITEMS.length;
    let diff = (index - currentIndex + len) % len;
    if (diff > len / 2) diff -= len;
    return diff;
  };

  useLayoutEffect(() => {
    setMounted(true);

    const setDevice = () => {
      const w = window.innerWidth;
      setIsPhone(w >= 320 && w <= 758);
      setIsIpad(w >= 759 && w <= 1024);
      setIsLap(w >= 1025);
    };

    setDevice();
    window.addEventListener("resize", setDevice);
    return () => window.removeEventListener("resize", setDevice);
  }, []);

  if (!mounted) return null;

  // Variants for Arc Animation
  const getVariants = (isLap: boolean, isIpad: boolean, isPhone: boolean) => {
    if (isLap) {
      return {
        center: {
          left: "37vw",
          top: "-83vh",
          width: "35vw",
          opacity: 1,
          zIndex: 20,
        },

        right: {
          left: "70vw",
          top: "-75vh",
          width: "30vw",
          opacity: 1,
          zIndex: 10,
        },

        left: {
          left: "4vw",
          top: "-71vh",
          width: "30vw",
          opacity: 1,
          zIndex: 10,
        },

        hiddenRight: {
          left: "350vw",
          top: "200vh",
          width: "30vw",
          opacity: 0,
        },

        hiddenLeft: {
          left: "-350vw",
          top: "200vh",
          width: "30vw",
          opacity: 0,
        },
      };
    }

    // iPad - Vertical Stack (Added slight rotation for style)
    if (isIpad) {
      return {
        center: {
          left: "30vw",
          top: "15vh",
          width: "55vw",
          opacity: 1,
          zIndex: 20,
          rotate: 0,
        },
        right: {
          left: "37vw",
          top: "37vh",
          width: "48vw",
          opacity: 1,
          zIndex: 10,
          rotate: 5,
        },
        left: {
          left: "35vw",
          top: "0vh",
          width: "50vw",
          opacity: 1,
          zIndex: 10,
          rotate: -5,
        },
        hiddenRight: {
          left: "37vw",
          top: "100vh",
          width: "48vw",
          opacity: 0,
          zIndex: 0,
          rotate: 10,
        },
        hiddenLeft: {
          left: "35vw",
          top: "-50vh",
          width: "50vw",
          opacity: 0,
          zIndex: 0,
          rotate: -10,
        },
      };
    }

    // Phone - Vertical Stack (Added slight rotation for style)
    return {
      center: {
        left: isShortHeight ? "17vw" : "7vw",
        top: isShortHeight ? "24vh" : "25vh",
        width: isShortHeight ? "140vw" : "160vw",
        opacity: 1,
        zIndex: 20,
        rotate: 0,
      },
      right: {
        left: isShortHeight ? "42vw" : "30vw",
        top: isShortHeight ? "53vh" : "53vh",
        width: isShortHeight ? "105vw" : "125vw",
        opacity: 1,
        zIndex: 10,
        rotate: -20,
      },
      left: {
        left: isShortHeight ? "39vw" : "29vw",
        top: isShortHeight ? "7vh" : "7vh",
        width: isShortHeight ? "105vw" : "125vw",
        opacity: 1,
        zIndex: 10,
        rotate: 20,
      },
      hiddenRight: {
        left: "240vw",
        top: "30vh",
        width: "68vw",
        opacity: 0,
        zIndex: 0,
        rotate: 10,
      },
      hiddenLeft: {
        left: "210vw",
        top: "-80vh",
        width: "71vw",
        opacity: 0,
        zIndex: 0,
        rotate: -10,
      },
    };
  };

  const variants = getVariants(isLap, isIpad, isPhone) as Variants;

  return (
    <>
      {/* ================= LAPTOP VIEW ================= */}
      {isLap && (
        <div className="relative min-h-screen w-full overflow-hidden bg-amber-50">
          {/* Background */}
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/Gallery/backgroundgallery.svg"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* ================= TOP DECORATIONS ================= */}
          <div className="pointer-events-none absolute inset-0 z-50">
            <img
              src="/Gallery/topringpart.svg"
              alt="Bottom Ring Part 1"
              className="rotate-cw absolute bottom-[80vh] left-[5vw] w-[22vw]"
            />

            <img
              src="/Gallery/topringpart.svg"
              alt="Bottom Ring Part 2"
              className="rotate-ccw absolute right-[63vw] bottom-[74vh] w-[18vw]"
            />
          </div>

          {/* TOP RIBBON — RIVER FLOW, STARTS AFTER RING */}
          <div className="pointer-events-none absolute inset-0 z-40">
            <div className="absolute -top-[0.1vh] left-[30vw] h-[20vh] w-[calc(100vw-30vw)] translate-y-[1px] overflow-hidden">
              <div
                className="ribbon-flow-right absolute inset-0 bg-top bg-repeat-x"
                style={{
                  backgroundImage: "url('/Gallery/ribbonupper.svg')",
                  backgroundSize: "auto 100%",
                }}
              />

              <div
                className="ribbon-flow-right ribbon-flow-right-2 absolute inset-0 bg-top bg-repeat-x"
                style={{
                  backgroundImage: "url('/Gallery/ribbonupper.webp')",
                  backgroundSize: "auto 100%",
                }}
              />
            </div>
          </div>

          {/* ================= LEFT BOARD (SEPARATE LAYER) ================= */}
          <div className="pointer-events-none absolute inset-0 z-60 flex items-center px-8">
            <img
              src="/Gallery/board1.svg"
              alt="Board 1"
              className="board-two-phase relative -left-[12vw] h-[110vh] w-[80vw]"
            />
          </div>

          {/* ================= CENTER BANNERS (BELOW RIBBON) ================= */}
          <div className="pointer-events-none relative z-30 flex h-screen items-center justify-center">
            <div className="banner-group banner-two-phase-vertical relative bottom-[38vh] left-[20vw] aspect-[3/2] w-[55vw] max-w-[900px]">
              {/* STICK / HOLDER */}
              <div className="absolute inset-0 z-20">
                <Image
                  src="/Gallery/board2part1.svg"
                  alt="Stick"
                  width={600}
                  height={200}
                  className="absolute top-[33%] left-[3%] h-auto w-[90%]"
                  priority
                />
              </div>

              {/* BANNER PART (FLOATING ABOVE RIBBON) */}
              <div className="banner-z-jump absolute inset-0 z-30">
                <Image
                  src="/Gallery/board2part2.svg"
                  alt="Banner"
                  width={600}
                  height={200}
                  className="absolute bottom-[0%] left-[20%] h-auto w-[60%]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ================= BOTTOM DECORATIONS ================= */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="pointer-events-none absolute inset-0 z-10">
              {/* ================= WHITE BOARDS (ANIMATED) ================= */}
              <div
                className="whiteboard-stage relative top-[100vh] left-[2vw] mt-[6vh] scale-[0.98]"
                style={{
                  perspective: "1200px",
                  perspectiveOrigin: "50% 50%",
                }}
              >
                {GALLERY_ITEMS.map((item, index) => {
                  const diff = getPosition(index);

                  let state = "hiddenRight";
                  if (diff === 0) state = "center";
                  else if (diff === 1) state = "right";
                  else if (diff === -1) state = "left";

                  const isInteractive = diff === 1 || diff === -1;
                  const clickHandler =
                    diff === 1
                      ? () => {
                          handleNext(); // board move
                          handleNextImage(); // image change
                        }
                      : diff === -1
                        ? () => {
                            handlePrev(); // board move
                            handlePrevImage(); // image change
                          }
                        : undefined;

                  // rotation stays PERFECT (do not touch)
                  let rotation = 0;
                  if (state === "left") rotation = -12;
                  if (state === "right") rotation = 16;

                  const boardImage = getBoardImage(diff)!;

                  return (
                    <motion.div
                      key={item.id}
                      initial="hidden"
                      animate={
                        showWhite
                          ? {
                              ...variants[state],
                              opacity: 1,
                              y: 0,
                            }
                          : {}
                      }
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                      }}
                      className={`white-board absolute ${
                        isInteractive
                          ? "pointer-events-auto cursor-pointer"
                          : ""
                      }`}
                      style={{
                        rotate: rotation,
                        transformOrigin: "50% 85%",
                      }}
                      onClick={clickHandler}
                    >
                      {/* RELATIVE WRAPPER — only for positioning image */}
<div className="relative h-full w-full">

  {/* WHITEBOARD */}
  <div className="relative w-full z-0">
    <Image
      src="/Gallery/whiteboard.webp"
      alt="White board"
      width={1300}
      height={800}
      className="w-[60vw] h-auto"
      priority
    />
  </div>

{/* 🔴 BANNER RING */}
<div
  className={`rotate-cw pointer-events-none absolute left-[5%] z-40
              w-[5vw] h-[5vw]`}
  style={{
    top:
      diff === 1   // RIGHT banner
        ? "42%"
        : diff === -1 // LEFT banner (optional)
          ? "42%"
          : "44%",    // CENTER banner
  }}
>
  <Image
    src="/Gallery/bannerring.webp"
    alt="Banner Ring"
    fill
    className="object-contain"
    priority
  />
</div>



  {/* SMALL IMAGE ON TOP */}
  <div
    className="absolute top-[4.5%] left-1/2 
               w-[81%] h-[48%]
               -translate-x-1/2 z-20"
  >
    <Image
      src={boardImage.src}
      alt="Board item"
      fill
      className="object-fill rounded-md shadow-lg pointer-events-none"
    />
  </div>

</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* ================= END RING (TOPMOST) ================= */}
              <div className="relative top-[38vh] z-50 h-auto w-[50vw]">
                <img
                  src="/Gallery/bottomring1.svg"
                  alt="Bottom Ring 1"
                  className="rotate-ccw absolute right-[37vw] h-auto w-[23vw]"
                />

                <img
                  src="/Gallery/bottomring2.svg"
                  alt="Bottom Ring 2"
                  className="rotate-cw absolute top-[24vh] right-[30vw] h-auto w-[25vw]"
                />
              </div>

              {/* ================= BOTTOM RIBBON (COVERS WHITE BOARDS) ================= */}
              <div className="relative -bottom-[76vh] left-[8vw] z-40 h-[20vh] w-full overflow-hidden">
                <div
                  className="ribbon-flow-bottom absolute inset-0 bg-bottom bg-repeat-x"
                  style={{
                    backgroundImage: "url('/Gallery/ribbonbottom.webp')",
                    backgroundSize: "auto 100%",
                  }}
                />
                <div
                  className="ribbon-flow-bottom absolute inset-0 bg-bottom bg-repeat-x"
                  style={{
                    backgroundImage: "url('/Gallery/ribbonbottom.webp')",
                    backgroundSize: "auto 100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= IPAD VIEW ================= */}
      {/* ================= IPAD VIEW ================= */}
      {isIpad && (
        <div className="relative h-screen w-full overflow-hidden bg-amber-50">
          {/* ================= BACKGROUND ================= */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Gallery/backgroundmobile.svg"
              alt="Gallery Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* TOP RIBBON */}
          <div className="pointer-events-none absolute bottom-[90vh] left-0 z-10 h-[10vh] w-[120vw] overflow-hidden">
            <div
              className="ribbon-flow-right h-full"
              style={{
                backgroundImage: "url('/Gallery/ribbonupper.webp')",
                backgroundSize: "auto 100%",
              }}
            />
          </div>

          {/* TOP RING */}
          <div className="absolute left-[52vw] z-20 w-[70vw]">
            {/* Top ring part 1 */}
            <Image
              src="/Gallery/topringpart.svg"
              alt="Top Ring Part 1"
              width={0}
              height={0}
              className="rotate-cw absolute left-[22vw] -top-[9vh] w-[55%] h-auto"
              priority
            />

            {/* Top ring part 2 */}
            <Image
              src="/Gallery/topringpart.svg"
              alt="Top Ring Part 2"
              width={0}
              height={0}
              className="rotate-ccw absolute right-[30vw] -top-[9vh] w-[70%] h-auto"
              priority
            />
          </div>

          {/* ================= WHITE BANNERS ================= */}
          <div className="pointer-events-none absolute inset-0 z-[1]">
            {/* TOP WHITE */}
            <img
              src="/Gallery/whitebannermobiletop.svg"
              className="white-banner white-top absolute left-[35vw] w-[50vw] opacity-0"
              alt=""
            />

            {/* MIDDLE WHITE */}
            <img
              src="/Gallery/whitebannermobilemiddle.svg"
              className="white-banner-middle absolute top-[15vh] left-[30vw] w-[55vw] opacity-0"
              alt=""
            />

            {/* BOTTOM WHITE */}
            <img
              src="/Gallery/whitebannermobilebottom.svg"
              className="white-banner white-bottom absolute top-[37vh] left-[37vw] w-[48vw] opacity-0"
              alt=""
            />
          </div>

          {/* ================= MIDDLE PHOTO / GALLERY BANNERS ================= */}
          <div className="ipad-banner-layer pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
            <div className="ipad-banner-anim relative -top-[5vh] mt-[6vh] flex flex-col items-center gap-[4vh]">
              {/* PHOTO BANNER */}
              <Image
                src="/Gallery/photobannermobile.svg"
                alt="Photo Banner"
                width={0}
                height={0}
                className="absolute -top-[60vh] z-10 h-auto w-[75vw] max-w-[75vw]"
                priority
              />

              {/* GALLERY BANNER */}
              <Image
                src="/Gallery/gallerybannermobile.svg"
                alt="Gallery Banner"
                width={0}
                height={0}
                className="absolute -top-[28vh] -right-[40vw] z-0 h-auto w-[72vw] max-w-[75vw]"
                priority
              />
            </div>
          </div>

          {/* BOTTOM RIBBON */}
          <div className="pointer-events-none absolute top-[91vh] left-0 z-10 h-[10vh] w-[110vw] overflow-hidden">
            <div
              className="ribbon-flow-bottom-ipad absolute inset-0 bg-bottom bg-repeat-x h-[90%]"
              style={{
                backgroundImage: "url('/Gallery/ribbonbottom.webp')",
                backgroundSize: "auto 100%",
              }}
            />
            <div
              className="ribbon-flow-bottom-ipad absolute inset-0 bg-bottom bg-repeat-x h-[90%]"
              style={{
                backgroundImage: "url('/Gallery/ribbonbottom.webp')",
                backgroundSize: "auto 100%",
              }}
            />
          </div>

          {/* BOTTOM RING */}
          {/* BOTTOM RING (MOBILE) */}
          <div className="pointer-events-none absolute relative right-0 left-0 z-30 flex items-center justify-center">
            {/* Ring 1 – anti-clockwise */}
            <Image
              src="/Gallery/bottomring1.svg"
              alt="Bottom Ring 1"
              width={0}
              height={0}
              className="rotate-ccw absolute top-[60vh] right-[77vw] h-auto w-[45vw]"
              priority
            />

            {/* Ring 2 – clockwise */}
            <Image
              src="/Gallery/bottomring2.svg"
              alt="Bottom Ring 2"
              width={0}
              height={0}
              className="rotate-cw absolute top-[77vh] right-[58vw] h-auto w-[50vw]"
              priority
            />
          </div>
        </div>
      )}

      {/* ================= MOBILE VIEW ================= */}
      {/* ================= PHONE VIEW ================= */}
      {isPhone && (
        <div className="relative h-screen w-full overflow-hidden bg-amber-50">
          {/* BACKGROUND */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Gallery/backgroundmobile.svg"
              alt="Gallery Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* TOP RIBBON */}
          <div className="pointer-events-none absolute bottom-[90vh] left-0 z-10 h-[10vh] w-[120vw] overflow-hidden">
            <div
              className="ribbon-flow-right h-full"
              style={{
                backgroundImage: "url('/Gallery/ribbonupper.webp')",
                backgroundSize: "auto 100%",
              }}
            />
          </div>

          {/* TOP RING */}
          <div className="absolute left-[52vw] z-20 w-[70vw]">
  {/* Top ring part 1 */}
  <Image
    src="/Gallery/topringpart.svg"
    alt="Top Ring Part 1"
    width={0}
    height={0}
    className="rotate-cw absolute left-[22vw] -top-[9vh] w-[55%] h-auto"
    priority
  />

  {/* Top ring part 2 */}
  <Image
    src="/Gallery/topringpart.svg"
    alt="Top Ring Part 2"
    width={0}
    height={0}
    className="rotate-ccw absolute right-[30vw] -top-[9vh] w-[70%] h-auto"
    priority
  />
</div>


          {/* ================= WHITE BANNERS (PHONE) ================= */}
          {/* REMOVED pointer-events-none, ensured items are clickable */}
<div className="absolute left-[10vw] z-[1]">
  {GALLERY_ITEMS.map((item, index) => {
    const diff = getPosition(index);
const boardImage = getBoardImage(diff)!;

    let state = "hiddenRight";
    if (diff === 0) state = "center";
    else if (diff === 1) state = "right";
    else if (diff === -1) state = "left";

    const clickable = diff === 1 || diff === -1;
    const clickHandler =
  diff === 1
    ? () => {
        handleNext();       // banner move
        handleNextImage();  // image move
      }
    : diff === -1
      ? () => {
          handlePrev();       // banner move
          handlePrevImage();  // image move
        }
      : undefined;

    return (
      <motion.div
        key={item.id}
        initial="hiddenRight"
        animate={showWhite ? state : "hiddenRight"}
        variants={variants}
        className={`absolute ${
          clickable
            ? "pointer-events-auto cursor-pointer"
            : "pointer-events-none"
        }`}
        onClick={clickHandler}
      >
        {/* ✅ WRAPPER (ADDED) */}
        <div className="relative w-full">

          {/* EXISTING BANNER IMAGE (UNCHANGED) */}
          <img
            src="/Gallery/mobilewhitebanner.webp"
            alt=""
            className="h-auto w-full"
          />

         {/* 🖼️ SMALL IMAGE (ADDED) */}
<div
  className="absolute top-[24.5%] left-1/4
             w-[40%] h-[44%]
             -translate-x-1/2 z-20"
>
  <Image
    src={boardImage.src}
    alt="Board item"
    fill
    className="object-fill pointer-events-none"
    sizes="(max-width: 768px) 80vw, 40vw"
    priority
  />
</div>


          {/* 🔴 RING IMAGE (ADDED) */}
          {/* 🔴 BANNER RING */}
<div
  className="rotate-cw pointer-events-none absolute z-40
             w-[13vw] h-[13vw]"
  style={{
    left: "3%",                        // ⬅️ move horizontally
    top: diff === 1 ? "56%" : diff===-1?"55%":"59%",   // ⬆️ move vertically (per banner)
  }}
>
  <Image
    src="/Gallery/bannerring.webp"
    alt="Banner Ring"
    fill
    className="object-contain"
    priority
  />
</div>


        </div>
      </motion.div>
    );
  })}
</div>


          {/* ================= CENTER PHOTO / GALLERY (BELOW RIBBON) ================= */}
          {/* ================= CENTER PHOTO / GALLERY (PHONE) ================= */}
          <div className="phone-banner-layer pointer-events-none relative z-[5] flex h-screen items-center justify-center">
            {/* MOVING ELEMENT */}
            <div className="photo-gallery-group phone-banner-anim relative bottom-[40vh] left-[28vw] aspect-[3/2] w-[95vw] max-w-[1200px]">
              {/* PHOTO */}
              <div className="absolute inset-0 z-30">
                <Image
                  src="/Gallery/photobannermobile.svg"
                  alt="Photo Banner"
                  width={0}
                  height={0}
                  className="absolute top-[10%] right-[30%] h-auto w-[120%]"
                  priority
                />
              </div>

              {/* GALLERY */}
              <div className="absolute inset-0 z-20">
                <Image
                  src="/Gallery/gallerybannermobile.svg"
                  alt="Gallery Banner"
                  width={0}
                  height={0}
                  className="gallery-settle absolute top-[120%] right-[30%] h-auto w-[100%]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* BOTTOM RIBBON */}
          <div className="pointer-events-none absolute top-[91vh] left-0 z-10 h-[10vh] w-[110vw] overflow-hidden">
            <div
              className="ribbon-flow-bottom absolute inset-0 bg-bottom bg-repeat-x"
              style={{
                backgroundImage: "url('/Gallery/ribbonbottom.webp')",
                backgroundSize: "auto 100%",
              }}
            />
            <div
              className="ribbon-flow-bottom absolute inset-0 bg-bottom bg-repeat-x"
              style={{
                backgroundImage: "url('/Gallery/ribbonbottom.webp')",
                backgroundSize: "auto 100%",
              }}
            />
          </div>

          {/* BOTTOM RING */}
          {/* BOTTOM RING (MOBILE) */}
          <div className="pointer-events-none absolute relative right-0 left-0 z-30 flex items-center justify-center">
            {/* Ring 1 – anti-clockwise */}
            <Image
              src="/Gallery/bottomring1.svg"
              alt="Bottom Ring 1"
              width={0}
              height={0}
              className="rotate-ccw absolute -top-[33vh] right-[70vw] h-auto w-[60vw]"
              priority
            />

            {/* Ring 2 – clockwise */}
            <Image
              src="/Gallery/bottomring2.svg"
              alt="Bottom Ring 2"
              width={0}
              height={0}
              className="rotate-cw absolute -top-[18vh] right-[50vw] h-auto w-[65vw]"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
