"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const getCloudAnimation = (index: number) => {
  const animations = [
    "animate-float-mobile-subtle",
    "animate-float-mobile-slow",
    "animate-float-mobile-horizontal",
    "animate-float-mobile-diagonal",
  ];
  return animations[index % animations.length];
};

const socialIcons = [
  {
    src: "/footer-assets/mobile/social-icons-3.webp",
    alt: "Instagram",
    href: "https://www.instagram.com/incandescence_nits",
  },
  {
    src: "/footer-assets/mobile/social-icons-2.webp",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/company/incandescence23/",
  },
  {
    src: "/footer-assets/mobile/social-icons.webp",
    alt: "Facebook",
    href: "https://www.facebook.com/incandescence.nits/",
  },
  {
    src: "/footer-assets/mobile/social-icons-1.webp",
    alt: "Twitter",
    href: "https://x.com/Incandescence23",
  },
];

const decorativeImages = [
  {
    src: "/footer-assets/mobile/vector-6.webp",
    className: "w-[5.98%] h-[2.89%] top-[19.87%] left-[24.26%]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-5.webp",
    className: "w-[3.78%] h-0 top-[22.26%] left-[12.43%]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-1.webp",
    className: "w-[6.40%] h-[2.04%] top-[19.52%] left-[17.15%]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-9.webp",
    className: "w-[4.36%] h-0 top-[46.05%] left-[75.12%]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector.webp",
    className: "w-[6.11%] h-[2.10%] top-[44.06%] left-[82.67%]",
    alt: "Vector",
  },
];

const leftSideImages = [
  {
    src: "/footer-assets/mobile/vector-3.webp",
    className: "top-[534px] left-[29px] w-[142px] h-[232px]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-6-1.webp",
    className: "top-[567px] -left-px w-[212px] h-[237px]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-7.webp",
    className: "top-[590px] left-[55px] w-[157px] h-[241px]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-2.webp",
    className: "top-[529px] left-[-35px] w-[142px] h-[232px]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-8.webp",
    className: "top-[630px] left-10 w-[142px] h-[232px]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-1-1.webp",
    className: "top-[569px] left-[-59px] w-36 h-[188px]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-4.webp",
    className: "top-[632px] -left-6 w-[157px] h-[241px]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-5-1.webp",
    className: "top-[649px] -left-7 w-[157px] h-[241px]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-14-2.webp",
    className: "top-[715px] left-[-54px] w-[271px] h-[331px]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-11.webp",
    className: "top-[756px] left-[-31px] w-[237px] h-[249px]",
    alt: "Vector",
  },
  {
    src: "/footer-assets/mobile/vector-14.webp",
    className: "top-[802px] left-[-18px] w-[147px] h-[223px]",
    alt: "Vector",
  },
];

const bottomGroups = [
  {
    src: "/footer-assets/mobile/group-1.webp",
    className: "w-[32.77%] h-[7.52%] top-[93.57%] left-0",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-2.webp",
    className: "w-[32.77%] h-[7.52%] top-[94.87%] left-0",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-3.webp",
    className: "w-[32.77%] h-[7.52%] top-[91.28%] left-[20.59%]",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-4.webp",
    className: "w-[32.77%] h-[7.52%] top-[93.46%] left-[75.20%]",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-5.webp",
    className: "w-[32.77%] h-[7.52%] top-[94.00%] left-[12.82%]",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-6.webp",
    className: "w-[27.12%] h-[11.47%] top-[95.25%] left-[37.67%]",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-7.webp",
    className: "w-[29.72%] h-[9.16%] top-[89.86%] left-[7.28%]",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-8.webp",
    className: "w-[35.19%] h-[10.12%] top-[85.61%] left-[23.30%]",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-9.webp",
    className: "w-[47.36%] h-[6.76%] top-[92.07%] left-[61.24%]",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-10.webp",
    className: "w-[34.57%] h-[10.25%] top-[91.94%] left-[51.70%]",
    alt: "Group",
  },
];

const rightSideGroups = [
  {
    src: "/footer-assets/mobile/group-11.webp",
    className: "w-[59.71%] h-[10.47%] top-[91.17%] left-[69.90%]",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-12.webp",
    className: "w-[32.79%] h-[7.49%] top-[87.46%] left-[5.56%]",
    alt: "Group",
  },
  {
    src: "/footer-assets/mobile/group-13.webp",
    className: "w-[32.93%] h-[7.52%] top-[87.24%] left-[44.20%]",
    alt: "Group",
  },
];

export const MobileFooter = (): React.JSX.Element => {
  const [scale, setScale] = useState({ x: 1, y: 1 });

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      // Calculate independent scales to fill the screen strictly
      const scaleX = vw / 412;
      const scaleY = vh / 917;
      setScale({ x: scaleX, y: scaleY });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#FCD1A6]">
      <div
        className="absolute top-0 left-0 h-[917px] w-[412px] origin-top-left overflow-hidden bg-white shadow-2xl"
        style={{
          transform: `scale(${scale.x}, ${scale.y})`,
        }}
      >
        <div className="absolute top-0 h-[917px] w-full overflow-hidden [background:radial-gradient(50%_50%_at_50%_31%,rgba(255,255,255,1)_0%,rgba(252,209,166,1)_100%)]">
          <div className="absolute top-[calc(50.00%_-_258px)] left-[calc(50.00%_-_83px)] h-[164px] w-[164px] rounded-[1000px] bg-white" />

          {/* Top Birds */}
          <img
            className="absolute top-[182.22px] left-[99.46px] h-[26.51px] w-[24.54px]"
            alt="Vector"
            src="/footer-assets/mobile/top-bird-1.webp"
          />
          <img
            className="absolute top-[204.15px] left-[50.98px] h-[11.29px] w-[15.48px]"
            alt="Vector"
            src="/footer-assets/mobile/top-bird-2.webp"
          />
          <img
            className="absolute top-[179px] left-[70.3px] h-[18.66px] w-[26.24px]"
            alt="Vector"
            src="/footer-assets/mobile/top-bird-3.webp"
          />

          {decorativeImages.map((img, index) => (
            <img
              key={`decorative-${index}`}
              className={`absolute ${img.className}`}
              alt={img.alt}
              src={img.src}
            />
          ))}

          <img
            className="absolute top-[242px] left-[54px] h-[90px] w-[302px]"
            alt="INCAND ESCENCE"
            src="/footer-assets/mobile/title-group.webp"
          />

          <img
            className="absolute top-[348px] left-[84px] h-[41px] w-[239px]"
            alt="Tribal Tapestry"
            src="/footer-assets/mobile/tribal-tapestry.webp"
          />

          <img
            className="absolute top-[422px] left-[308px] h-[14px] w-[18px]"
            alt="Vector"
            src="/footer-assets/mobile/bottom-bird.webp"
          />

          <img
            className="absolute top-44 left-[285px] h-[63px] w-20"
            alt="Group"
            src="/footer-assets/mobile/group-48096173.webp"
          />

          <img
            className="absolute top-[37.95%] left-[calc(50.00%_-_121px)] h-[4.47%] w-[239px]"
            alt="Vector"
            src="/footer-assets/mobile/vector-10.webp"
          />

          {/* <button
            className="absolute top-[54px] left-[20px] h-[42px] w-[148px] transition-opacity hover:opacity-90"
            aria-label="Brochure"
          >
            <img
              className="h-full w-full"
              alt="Brochure"
              src="/footer-assets/mobile/brochure-group.webp"
            />
          </button> */}

          <img
            className="absolute top-[784px] left-[287px] h-[183px] w-[191px]"
            alt="Vector"
            src="/footer-assets/mobile/vector-12-1.webp"
          />

          <img
            className="absolute top-[757px] left-[301px] h-40 w-[191px]"
            alt="Vector"
            src="/footer-assets/mobile/vector-13.webp"
          />

          <img
            className="absolute top-[527px] left-[236px] h-[364px] w-[209px]"
            alt="Group"
            src="/footer-assets/mobile/group-3-1.webp"
          />

          <img
            className="absolute top-[771px] left-[292px] h-[182px] w-[190px]"
            alt="Vector"
            src="/footer-assets/mobile/vector-12.webp"
          />

          {rightSideGroups.map((img, index) => (
            <img
              key={`right-group-${index}`}
              className={`absolute ${img.className} ${getCloudAnimation(index + 2)}`}
              alt={img.alt}
              src={img.src}
            />
          ))}

          <div
            className="absolute top-[28rem] w-[100vw] translate-x-4 text-black text-center text-xl font-hitchcut" >
              Contact US
          </div>

          <nav
            className="absolute top-[32rem] z-10 flex w-screen translate-x-4 items-center justify-center gap-8"
            aria-label="Social media links"
          >
            {socialIcons.map(({ src, alt, href }, index) => (
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                key={`social-${index}`}
                className="flex translate-x-2 h-[1.8rem] w-[1.8rem] items-center justify-center transition-opacity hover:opacity-70"
                aria-label={alt}
              >
                <img src={src} alt={alt} className="h-full w-full" />
              </Link>
            ))}
          </nav>
        </div>

        <img
          className="animate-float-mobile-subtle absolute top-[89.34%] left-[40.79%] h-[6.43%] w-[27.07%]"
          alt="Group"
          src="/footer-assets/mobile/group.webp"
        />

        {leftSideImages.map((img, index) => (
          <img
            key={`left-${index}`}
            className={`absolute ${img.className} pointer-events-none`}
            alt={img.alt}
            src={img.src}
          />
        ))}

        <img
          className="pointer-events-none absolute top-[821px] left-[182px] h-[216px] w-[238px]"
          alt="Vector"
          src="/footer-assets/mobile/vector-14-1.webp"
        />

        {bottomGroups.map((img, index) => (
          <img
            key={`bottom-${index}`}
            className={`absolute ${img.className} pointer-events-none ${getCloudAnimation(index)}`}
            alt={img.alt}
            src={img.src}
          />
        ))}

        <footer className="absolute top-[94%] left-0 flex w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center font-sans  text-[.6rem] leading-[1.1] text-black">
            <span className="font-semibold">MADE IN COLLABORATION</span>
            <span className="font-semibold">
              WITH <span className="font-extrabold">GDG NIT SILCHAR</span>
            </span>
            <img
              className="h-[50px] w-auto object-center mix-blend-multiply"
              alt="GDG NIT SILCHAR Logo"
              src="/footer-assets/laptop/images/gdg-logo.gif"
            />
          </div>
        </footer>
      </div>
    </div>
  );
};
