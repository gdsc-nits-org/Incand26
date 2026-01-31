"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import RamanText from "~/components/Nirvana/raman";
import TabaChake from "~/components/Nirvana/tabaChake";
import NegiText from "~/components/Nirvana/negi";

const Nirvana = () => {
  // --- Shared Logic ---
  const [active, setActive] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [showNirvana, setShowNirvana] = useState(false);
  const [showLeftToMid, setShowLeftToMid] = useState(false);
  const [showFinalGroup, setShowFinalGroup] = useState(false);

  // Mobile State
  const [mobileView, setMobileView] = useState<"split" | "upper" | "lower">(
    "split",
  );

  const handleClick = () => {
    setActive(true);
    setTimeout(() => {
      setShowGif(true);
      setTimeout(() => {
        setShowNirvana(true);
        setTimeout(() => {
          setShowLeftToMid(true);
          setShowFinalGroup(true);
        }, 600);
      }, 600);
    }, 1800);
  };

  const springStyle = {
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* --- MOBILE VIEW --- */}

      <div className="relative flex h-screen w-full flex-col overflow-hidden lg:hidden">
        {/* UPPER HALF - NO CHANGES */}
        <motion.div
          onClick={() => setMobileView("upper")}
          animate={{
            height:
              mobileView === "upper"
                ? "100vh"
                : mobileView === "lower"
                  ? "0vh"
                  : "50vh",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative z-10 w-full cursor-pointer overflow-hidden bg-black"
          style={{
            clipPath:
              mobileView === "split"
                ? "polygon(0 0, 100% 0, 100% 85%, 0 100%)"
                : "none",
          }}
        >
          <Image
            src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769804550/Taba_chake_1_traapk.png"
            alt="Taba Side"
            fill
            className="object-cover"
          />

          {/* --- GIF: Adjusted top for connector visibility --- */}
          <motion.div
            className="pointer-events-none absolute z-20 mt-120 ml-40"
            initial={false}
            animate={{
              width: "280%",
              height: "230%",
              left: "-125%",
              // Brought slightly up in split view to be seen in the connector area
              top: mobileView === "upper" ? "-25%" : "-125%",
              opacity: mobileView === "lower" ? 0 : 1,
              scale: mobileView === "upper" ? 1.2 : 1,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          >
            <Image
              src="./gif/raman.gif"
              alt="Effect"
              width={6000}
              height={6000}
              className="object-contain"
              unoptimized
            />
          </motion.div>

          <div
            className={`absolute top-12 left-6 z-30 origin-top-left transition-all duration-700 ${
              mobileView === "upper"
                ? "scale-[0.5] opacity-100"
                : "scale-[0.2] opacity-0"
            }`}
          >
            <TabaChake show={mobileView === "upper"} />
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              setMobileView("split");
            }}
            className={`absolute bottom-1 left-[20%] z-50 h-30 w-[70%] cursor-pointer transition-opacity duration-500 ${
              mobileView === "upper"
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769837212/Back_2_kqxo79.png"
              alt="Back"
              width={600}
              height={600}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* --- UPDATED CONNECTOR: Clean Image, Full Width, No Styles --- */}
        <motion.div
          initial={false}
          animate={{
            top:
              mobileView === "upper"
                ? "92%"
                : mobileView === "lower"
                  ? "8%"
                  : "50%",
            opacity: mobileView === "split" ? 1 : 0,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setMobileView("split");
          }}
          className="absolute right-[-20%] left-[-20%] z-50 flex h-24 -translate-y-1/2 -skew-y-[8deg] cursor-pointer items-center justify-center bg-transparent"
        >
          <motion.div
            animate={{ skewY: "8deg" }}
            className="flex h-20 w-full justify-center"
          >
            <Image
              src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769838082/Frame_1000008537_2_cdz0g9.png"
              alt="Connector"
              width={1000} // Increased for full width detail
              height={200}
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* LOWER HALF - Margin Fix & Man Logic Preserved */}
        <motion.div
          onClick={() => setMobileView("lower")}
          animate={{
            height:
              mobileView === "lower"
                ? "100vh"
                : mobileView === "upper"
                  ? "0vh"
                  : "50vh",
            // Brought lower to cover the gap
            marginTop: mobileView === "split" ? "0vh" : "0vh",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative z-10 w-full cursor-pointer overflow-hidden"
        >
          <Image
            src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769695616/raman_negi_1_pczmse.png"
            alt="Negi Side"
            fill
            className="object-cover"
          />

          <motion.div
            className="pointer-events-none absolute bottom-0 z-20"
            initial={false}
            animate={{
              width: "280%",
              right: "-85%",
              opacity: mobileView === "lower" ? 1 : 0,
              y: mobileView === "lower" ? 0 : 50,
              scale: mobileView === "lower" ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          >
            <Image
              src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769801653/Gemini_Generated_Image_ifti9hifti9hifti_3_1_qvvlhs.png"
              alt="Man"
              width={6000}
              height={7000}
              className="object-contain object-bottom"
              priority
            />
          </motion.div>

          <div
            className={`absolute -top-2 flex flex-col items-center justify-center transition-opacity duration-500 ${
              mobileView === "lower" ? "opacity-100" : "opacity-0"
            }`}
          >
            <RamanText show={mobileView === "lower"} />
            <div className="-mt-35">
              <NegiText show={mobileView === "lower"} />
            </div>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              setMobileView("split");
            }}
            className={`absolute bottom-1 left-[20%] z-50 h-30 w-[70%] cursor-pointer transition-opacity duration-500 ${
              mobileView === "lower"
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769837212/Back_2_kqxo79.png"
              alt="Back"
              width={700}
              height={700}
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
      {/* ================================================================
          DESKTOP VIEW (lg:flex) - Original functionality preserved
          ================================================================ */}
      <div className="relative hidden h-full w-full lg:flex">
        <div
          className={`absolute top-5 left-10 z-150 transition-all duration-500 ${
            showFinalGroup
              ? "translate-x-0 translate-y-0 scale-100 opacity-100"
              : "-translate-x-40 -translate-y-40 scale-0 opacity-0"
          }`}
          style={springStyle}
        >
          <TabaChake show={showFinalGroup} />
        </div>

        <div
          className={`absolute -top-30 -left-178 z-60 h-[80%] w-[80%] transition-all duration-400 ${
            showFinalGroup ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          style={springStyle}
        >
          <Image
            src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769781159/Group_1171279575_dk38ba.png"
            alt="Top Left Spring"
            fill
            className="object-contain"
          />
        </div>

        <div
          className="relative z-40 w-1/2 cursor-pointer overflow-hidden shadow-2xl"
          onClick={handleClick}
        >
          <Image
            src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769695216/Taba_chake_ordmix.png"
            alt="Base"
            fill
            className="object-cover"
          />

          <div
            className={`pointer-events-none absolute -top-[1%] w-[60%] transition-all duration-1200 ease-out ${
              active
                ? "left-[45%] z-50 scale-150 opacity-100"
                : "left-[164%] z-50 scale-100 opacity-0"
            }`}
          >
            <Image
              src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769696035/CITYPNG.COM_HD_Real_White_Cloud_Smoke_Transparent_PNG_-_8000x8000_1_1_s7jzyr.png"
              alt="Cloud"
              width={1200}
              height={1200}
              className="object-contain"
            />
          </div>

          {showGif && (
            <div className="animate-slide-down pointer-events-none absolute top-[5%] -left-[15%] z-30 w-[160%]">
              <Image
                src="./gif/raman.gif"
                alt="Effect"
                width={2000}
                height={2000}
                className="object-contain"
                unoptimized
              />
            </div>
          )}
        </div>

        <div
          className={`pointer-events-none absolute bottom-8 left-0 transition-all duration-1200 ease-out ${
            active
              ? "z-110 translate-x-[40%] scale-110 opacity-100"
              : "z-20 translate-x-[10%] scale-100 opacity-0"
          }`}
          style={{
            clipPath: "inset(0 0 0 calc(50vw - 70%))",
            WebkitClipPath: "inset(0 0 0 calc(50vw - 70%))",
          }}
        >
          <div className="relative h-full w-screen">
            <Image
              src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769801653/Gemini_Generated_Image_ifti9hifti9hifti_3_1_qvvlhs.png"
              alt="Man"
              width={1100}
              height={1300}
              className="object-contain object-bottom"
            />
          </div>
        </div>

        <div
          className={`absolute inset-y-0 left-1/2 z-[100] w-[6%] -translate-x-1/2 transition-all duration-500 ${
            showNirvana
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-20 scale-50 opacity-0"
          }`}
          style={springStyle}
        >
          <Image
            src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769779575/Frame_1000008537_1_ydeewf.png"
            alt="Nirvana Center"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div
          className={`absolute -top-60 z-45 h-[60%] w-[30%] transition-all duration-500 ${
            showLeftToMid ? "left-[35%] opacity-100" : "-left-[35%] opacity-0"
          }`}
          style={springStyle}
        >
          <Image
            src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769781097/Group_1171279576_okpv7g.png"
            alt="Left to Mid"
            fill
            className="object-contain object-top"
          />
        </div>

        <div
          className={`absolute -bottom-50 -left-130 z-60 h-[75%] w-[75%] transition-all duration-400 ${
            showFinalGroup ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          style={springStyle}
        >
          <Image
            src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769781234/Group_1171279577_nh6oba.png"
            alt="Bottom Left Spring"
            fill
            className="object-contain"
          />
        </div>

        <div
          className={`absolute -bottom-[10%] z-55 h-[80%] w-[80%] transition-all duration-500 ${
            showFinalGroup ? "left-[5%] opacity-100" : "left-[60%] opacity-0"
          }`}
          style={springStyle}
        >
          <Image
            src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769781321/Group_1171279578_yf5woo.png"
            alt="Right to Left"
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute -top-[5%] right-[24%] z-100 flex flex-col items-center">
          <RamanText show={showGif} />
          <div className="-mt-35">
            <NegiText show={showGif} />
          </div>
        </div>

        <div className="relative z-90 w-1/2 overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769695616/raman_negi_1_pczmse.png"
            alt="Right"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Nirvana;
