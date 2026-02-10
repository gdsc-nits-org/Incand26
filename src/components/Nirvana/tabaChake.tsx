"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type LetterConfig = {
  char: string;
  baseImg: string;
  hoverImg: string;
  baseSize: number;
  hoverSize: number;
  tilt: number;
  yOffset: number; // Positive moves down, negative moves up
};

const TABA_DATA: LetterConfig[] = [
  {
    char: "T",
    baseImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794539/Property_1_download_2_1_oyhc94.png",
    hoverImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794536/Property_1_download_2_16_sgzic6.png",
    baseSize: 150,
    hoverSize: 100,
    tilt: -10,
    yOffset: -15,
  },
  {
    char: "A",
    baseImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794539/Property_1_download_2_13_sowvur.png",
    hoverImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794537/Property_1_download_7_1_zlgsmi.png",
    baseSize: 100,
    hoverSize: 85,
    tilt: 8,
    yOffset: -8,
  },
  {
    char: "B",
    baseImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794540/Property_1_download_2_3_pturiq.png",
    hoverImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794538/Property_1_download_1_3_uqwh0k.png",
    baseSize: 150,
    hoverSize: 115,
    tilt: 10,
    yOffset: -15,
  },
  {
    char: "A",
    baseImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794537/Property_1_download_7_1_zlgsmi.png",
    hoverImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794539/Property_1_download_2_13_sowvur.png",
    baseSize: 75,
    hoverSize: 95,
    tilt: 12,
    yOffset: -20,
  },
];

const CHAKE_DATA: LetterConfig[] = [
  {
    char: "C",
    baseImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794539/Property_1_download_1_1_mxl1c7.png",
    hoverImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794538/Property_1_download_2_6_ri7omh.png",
    baseSize: 150,
    hoverSize: 120,
    tilt: 8,
    yOffset: -10,
  },
  {
    char: "H",
    baseImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794538/Property_1_download_2_9_s3jfio.png",
    hoverImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794537/Property_1_download_2_10_rk86op.png",
    baseSize: 130,
    hoverSize: 105,
    tilt: 6,
    yOffset: 12,
  },
  {
    char: "A",
    baseImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794537/Property_1_download_7_1_zlgsmi.png",
    hoverImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794536/Property_1_download_2_15_lzsk7i.png",
    baseSize: 90,
    hoverSize: 95,
    tilt: 15,
    yOffset: 16,
  },
  {
    char: "K",
    baseImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794539/Property_1_download_2_12_hov1yb.png",
    hoverImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794537/Property_1_download_1_5_zfqgz1.png",
    baseSize: 130,
    hoverSize: 110,
    tilt: -5,
    yOffset: 12,
  },
  {
    char: "E",
    baseImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794539/Property_1_download_2_7_nib7cm.png",
    hoverImg:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769794538/Property_1_download_1_2_qa8aao.png",
    baseSize: 90,
    hoverSize: 100,
    tilt: 4,
    yOffset: 15,
  },
];

const TabaChake = ({ show }: { show: boolean }) => {
  return (
    <motion.main
      initial={{ x: -200, y: -200, scale: 0, opacity: 0 }}
      animate={show ? { x: 0, y: 0, scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex flex-col items-center justify-center bg-transparent"
    >
      <div className="flex flex-wrap items-center justify-center -space-x-4">
        {TABA_DATA.map((item, i) => (
          <InteractiveLetter key={`taba-${i}`} config={item} />
        ))}
      </div>
      <div className="-mt-16 flex flex-wrap items-center justify-center -space-x-2">
        {CHAKE_DATA.map((item, i) => (
          <InteractiveLetter key={`chake-${i}`} config={item} />
        ))}
      </div>
    </motion.main>
  );
};

const InteractiveLetter = ({ config }: { config: LetterConfig }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: config.baseSize - 20,
        height: config.baseSize * 1.4,
      }}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ rotate: config.tilt, y: config.yOffset }}
        animate={{
          width: isHovered ? config.hoverSize : config.baseSize,
          height: isHovered ? config.hoverSize * 1.2 : config.baseSize * 1.2,
          rotate: isHovered ? config.tilt * 1.5 : config.tilt,
          y: isHovered ? config.yOffset - 10 : config.yOffset,
          scale: isHovered ? 1.15 : 1,
          zIndex: isHovered ? 100 : 10,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="absolute cursor-pointer"
      >
        <div className="relative h-full w-full">
          <Image
            src={isHovered ? config.hoverImg : config.baseImg}
            alt={config.char}
            fill
            className="object-contain"
            sizes="10vw"
            priority={config.char === "T"}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default TabaChake;
