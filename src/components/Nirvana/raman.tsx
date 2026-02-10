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

const letters: Letter[] = [
  {
    char: "R",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715625/Property_1_download_10_1_1_pw6gbz.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715624/Property_1_Vintage_comic_book_font_set_1_1_eaca7n.png",
    width: 175,
    height: 240,
    yOffset: -15, // Reduced from 220/300
  },
  {
    char: "A",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715625/download_10_1_2_x1wnvi.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_2_syf7pl.png",
    width: 145,
    height: 190,
    yOffset: 8,
  },
  {
    char: "M",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715624/Property_1_download_10_1_3_p2itgg.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_4_ebbqq7.png",
    width: 190,
    height: 255,
    yOffset: -10,
  },
  {
    char: "A",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715625/download_10_1_2_x1wnvi.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_2_syf7pl.png",
    width: 135,
    height: 190,
    yOffset: 8,
  },
  {
    char: "N",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715625/Property_1_download_10_1_4_mmw7ps.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_3_y2tdcy.png",
    width: 160,
    height: 165,
    yOffset: -18,
  },
];

export default function RamanText({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ x: 300, y: -300, scale: 0, opacity: 0 }}
      animate={show ? { x: 0, y: 0, scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      style={{ transformOrigin: "top right" }}
      className="flex items-center justify-center -space-x-8 bg-transparent"
    >
      {letters.map((letter, i) => (
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
      style={{
        width: letter.width - 60,
        height: 280,
      }}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ y: letter.yOffset }}
        animate={{
          y: isHovered ? letter.yOffset - 10 : letter.yOffset,
          scale: isHovered ? 0.95 : 1,
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
