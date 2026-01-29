import Image from "next/image";

type Letter = {
  char: string;
  normal: string;
  hover: string;
  width: number;
  height: number;
};

const letters: Letter[] = [
  {
    char: "R",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715625/Property_1_download_10_1_1_pw6gbz.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715624/Property_1_Vintage_comic_book_font_set_1_1_eaca7n.png",
    width: 95,
    height: 160,
  },
  {
    char: "A",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715625/download_10_1_2_x1wnvi.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_2_syf7pl.png",
    width: 85,
    height: 120,
  },
  {
    char: "M",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715624/Property_1_download_10_1_3_p2itgg.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_4_ebbqq7.png",
    width: 110,
    height: 155,
  },
  {
    char: "A",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715625/download_10_1_2_x1wnvi.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_2_syf7pl.png",
    width: 65,
    height: 120,
  },
  {
    char: "N",
    normal:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715625/Property_1_download_10_1_4_mmw7ps.png",
    hover:
      "https://res.cloudinary.com/dig1vxljf/image/upload/v1769715623/Property_1_Vintage_comic_book_font_set_1_3_y2tdcy.png",
    width: 100,
    height: 105,
  },
];

export default function RamanText() {
  return (
    <div className="flex items-end justify-center gap-0">
      {letters.map((letter, i) => (
        <div
          key={i}
          className="group relative cursor-pointer transition-transform duration-150 hover:scale-95"
        >
          {/* Normal */}
          <Image
            src={letter.normal}
            alt={letter.char}
            width={letter.width}
            height={letter.height}
            className="block group-hover:hidden"
            priority
          />

          {/* Hover */}
          <Image
            src={letter.hover}
            alt={letter.char}
            width={letter.width}
            height={letter.height}
            className="hidden group-hover:block"
            priority
          />
        </div>
      ))}
    </div>
  );
}
