"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Letter = {
  char: string;
  normal: string;
  hover: string;
  width: number;
  height: number;
  yOffset: number;
};

const negiLetters: Letter[] = [
  {
    char: "N",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715625/Property_1_download_10_1_4_mmw7ps.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_3_y2tdcy.png",
    width: 160,
    height: 170,
    yOffset: 8, // Reduced from 200/210
  },
  {
    char: "E",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715624/Property_1_download_10_1_5_dggald.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_7_vfimun.png",
    width: 145,
    height: 155,
    yOffset: -12,
  },
  {
    char: "G",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715624/Property_1_download_10_1_7_k6nsge.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_6_svhfrp.png",
    width: 135,
    height: 145,
    yOffset: -18,
  },
  {
    char: "I",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715624/Property_1_download_10_1_6_tp4nco.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_5_psuzwf.png",
    width: 130,
    height: 140,
    yOffset: -20,
  },
];

export default function NegiText({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ x: 300, y: -100, scale: 0, opacity: 0 }}
      animate={show ? { x: 0, y: 0, scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.1 }}
      style={{ transformOrigin: "top right" }}
      className="flex items-center justify-center -space-x-6 bg-transparent"
    >
      {negiLetters.map((letter, i) => (
        <InteractiveLetter key={i} letter={letter} />
      ))}
    </motion.div>
  );
}

function InteractiveLetter({ letter }: { letter: Letter }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: letter.width - 55, height: 240 }}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ y: letter.yOffset }}
        animate={{
          y: isHovered ? letter.yOffset - 15 : letter.yOffset,
          scale: isHovered ? 0.98 : 1,
          zIndex: isHovered ? 100 : 10,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="absolute cursor-pointer"
      >
        <Image
          src={isHovered ? letter.hover : letter.normal}
          alt={letter.char}
          width={letter.width}
          height={letter.height}
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
