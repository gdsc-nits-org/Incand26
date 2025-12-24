"use client";

import { MountainVector } from "./MountainVector";
import { Brochure } from "./Brochure";
import Link from "next/link";

// Social Icons
const socialIcons = [
  {
    src: "/footer-assets/laptop/images/social-icons-3.svg",
    alt: "Instagram",
    href: "https://www.instagram.com/incandescence_nits",
  },
  {
    src: "/footer-assets/laptop/images/social-icons.svg",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/company/incandescence23/",
  },
  {
    src: "/footer-assets/laptop/images/social-icons-2.svg",
    alt: "Facebook",
    href: "https://www.facebook.com/incandescence.nits/",
  },
  {
    src: "/footer-assets/laptop/images/social-icons-1.svg",
    alt: "Twitter",
    href: "https://x.com/Incandescence23",
  },
];

const decorativeImages = [
  {
    src: "/footer-assets/laptop/images/group.png",
    className: "absolute w-[17.99%] h-[12.44%] top-[66.93%] left-[32.78%]",
    alt: "Decorative group",
  },
  {
    src: "/footer-assets/laptop/images/group-1.png",
    className: "absolute w-[17.99%] h-[12.44%] top-[67.12%] left-[52.67%]",
    alt: "Decorative group",
  },
  {
    src: "/footer-assets/laptop/images/group-15.png",
    className: "absolute top-[71.02%] left-[28.958%] w-[11.302%] h-[9.82%]",
    alt: "Decorative group",
  },
  {
    src: "/footer-assets/laptop/images/group-16.png",
    className: "absolute top-[76.94%] left-[58.438%] w-[11.302%] h-[9.82%]",
    alt: "Decorative group",
  },
  {
    src: "/footer-assets/laptop/images/group-2.png",
    className: "absolute w-[26.02%] h-[18.00%] top-[72.87%] left-[37.41%]",
    alt: "Decorative group",
  },
  {
    src: "/footer-assets/laptop/images/group-13.png",
    className: "absolute top-[82.68%] left-[54.479%] w-[16.146%] h-[13.98%]",
    alt: "Decorative group",
  },
  {
    src: "/footer-assets/laptop/images/group-14.png",
    className: "absolute top-[73.52%] left-[31.667%] w-[19.792%] h-[17.13%]",
    alt: "Decorative group",
  },
  // Mountain Right (Group 3) Individual Vectors
  {
    src: "/mountain-right-vector-5.svg",
    className: "absolute w-[23.65%] h-[73.88%]",
    style: { top: "16.11%", left: "68.28%" },
    alt: "Mountain Element",
    group: "right",
  },
  {
    src: "/mountain-right-vector-4.svg",
    className: "absolute w-[35.78%] h-[76.66%]",
    style: { top: "26.99%", left: "60.78%" },
    alt: "Mountain Element",
    group: "right",
  },
  {
    src: "/mountain-right-vector-1.svg",
    className: "absolute w-[26.67%] h-[75.64%]",
    style: { top: "34.45%", left: "60.73%" },
    alt: "Mountain Element",
    group: "right",
  },
  {
    src: "/mountain-right-vector-8.svg",
    className: "absolute w-[26.2%] h-[75.00%]",
    style: { top: "14.63%", left: "81.72%" },
    alt: "Mountain Element",
    group: "right",
  },
  {
    src: "/mountain-right-vector-2.svg",
    className: "absolute w-[26.2%] h-[75.00%]",
    style: { top: "47.41%", left: "66.35%" },
    alt: "Mountain Element",
    group: "right",
  },
  {
    src: "/mountain-right-vector-7.svg",
    className: "absolute w-[26.2%] h-[60.78%]",
    style: { top: "27.50%", left: "84.17%" },
    alt: "Mountain Element",
    group: "right",
  },
  {
    src: "/mountain-right-vector-6.svg",
    className: "absolute w-[26.67%] h-[75.64%]",
    style: { top: "47.82%", left: "75.31%" },
    alt: "Mountain Element",
    group: "right",
  },
  {
    src: "/mountain-right-vector-3.svg",
    className: "absolute w-[26.67%] h-[75.64%]",
    style: { top: "53.62%", left: "75.94%" },
    alt: "Mountain Element",
    group: "right",
  },

  // Mountain Left (Group 4) Individual Vectors
  {
    src: "/mountain-left-vector-5.svg",
    className: "absolute w-[23.65%] h-[73.88%]",
    style: { top: "14.26%", left: "3.75%" },
    alt: "Mountain Element",
    group: "left",
  },
  {
    src: "/mountain-left-vector-4.svg",
    className: "absolute w-[35.78%] h-[76.66%]",
    style: { top: "25.14%", left: "-1.77%" },
    alt: "Mountain Element",
    group: "left",
  },
  {
    src: "/mountain-left-vector-1.svg",
    className: "absolute w-[26.67%] h-[75.64%]",
    style: { top: "32.59%", left: "8.44%" },
    alt: "Mountain Element",
    group: "left",
  },
  {
    src: "/mountain-left-vector-8.svg",
    className: "absolute w-[26.2%] h-[75.00%]",
    style: { top: "12.78%", left: "-8.13%" },
    alt: "Mountain Element",
    group: "left",
  },
  {
    src: "/mountain-left-vector-2.svg",
    className: "absolute w-[26.2%] h-[75.00%]",
    style: { top: "45.56%", left: "5.68%" },
    alt: "Mountain Element",
    group: "left",
  },
  {
    src: "/mountain-left-vector-7.svg",
    className: "absolute w-[26.2%] h-[60.78%]",
    style: { top: "25.65%", left: "-12.55%" },
    alt: "Mountain Element",
    group: "left",
  },
  {
    src: "/mountain-left-vector-6.svg",
    className: "absolute w-[26.67%] h-[75.64%]",
    style: { top: "45.97%", left: "-6.15%" },
    alt: "Mountain Element",
    group: "left",
  },
  {
    src: "/mountain-left-vector-3.svg",
    className: "absolute w-[26.67%] h-[75.64%]",
    style: { top: "51.75%", left: "-6.77%" },
    alt: "Mountain Element",
    group: "left",
  },
  {
    src: "/footer-assets/laptop/mountains/vector-9.svg",
    className: "absolute top-[57.78%] left-[-3.75%] w-[33.646%] h-[73.15%]",
    alt: "Foreground Mountain",
  },
  {
    src: "/footer-assets/laptop/mountains/vector-12.svg",
    className: "absolute top-[67.32%] left-[59.583%] w-[43.229%] h-[73.15%]",
    alt: "Foreground Mountain",
  },
  {
    src: "/footer-assets/laptop/mountains/vector-11.svg",
    className: "absolute top-[65.37%] left-[-2.604%] w-[39.688%] h-[73.24%]",
    alt: "Foreground Mountain",
  },
  {
    src: "/footer-assets/laptop/mountains/vector-13.svg",
    className: "absolute top-[80.56%] left-[51.927%] w-[48.906%] h-[78.98%]",
    alt: "Foreground Mountain",
  },
  {
    src: "/footer-assets/laptop/mountains/vector-10.svg",
    className: "absolute top-[72.41%] left-[-1.198%] w-[26.615%] h-[71.57%]",
    alt: "Foreground Mountain",
  },
  {
    src: "/footer-assets/laptop/images/group-5.png",
    className: "absolute w-[26.02%] h-[18.00%] top-[87.78%] left-[41.47%]",
    alt: "White cloud decoration",
  },
  {
    src: "/footer-assets/laptop/images/group-6.png",
    className: "absolute w-[26.02%] h-[18.00%] top-[85.37%] left-[72.98%]",
    alt: "White cloud decoration",
  },
  {
    src: "/footer-assets/laptop/images/group-7.png",
    className: "absolute w-[27.85%] h-[36.09%] top-[77.41%] left-[87.40%]",
    alt: "White cloud decoration",
  },
  {
    src: "/footer-assets/laptop/images/group-8.png",
    className: "absolute w-[26.02%] h-[18.00%] top-[82.50%] left-[24.39%]",
    alt: "White cloud decoration",
  },
  {
    src: "/footer-assets/laptop/images/group-9.png",
    className: "absolute w-[26.02%] h-[18.00%] top-[85.93%] left-0",
    alt: "White cloud decoration",
  },
  {
    src: "/footer-assets/laptop/images/group-10.png",
    className: "absolute w-[26.02%] h-[18.00%] top-[90.19%] left-[11.97%]",
    alt: "White cloud decoration",
  },
  {
    src: "/footer-assets/laptop/images/group-17.png",
    className: "absolute top-[89.26%] left-[66.146%] w-[16.927%] h-[10.74%]",
    alt: "Decorative group",
  },
];

const smallVectors = [
  {
    src: "/footer-assets/laptop/images/vector-1.svg",
    className: "absolute w-[2.65%] h-[3.61%] top-[56.48%] left-[70.73%]",
    alt: "Star decoration",
  },
  {
    src: "/footer-assets/laptop/images/vector-5.svg",
    className: "absolute w-[3.72%] h-[5.07%] top-[51.67%] left-[75.31%]",
    alt: "Star decoration",
  },
  {
    src: "/footer-assets/laptop/images/vector.svg",
    className: "absolute w-[1.98%] h-[3.81%] top-[19.35%] left-[27.81%]",
    alt: "Bird decoration",
  },
  {
    src: "/footer-assets/laptop/images/vector-4.svg",
    className: "absolute w-[1.25%] h-[1.62%] top-[22.51%] left-[23.59%]",
    alt: "Bird decoration",
  },
  {
    src: "/footer-assets/laptop/images/vector-2.svg",
    className: "absolute w-[2.12%] h-[2.68%] top-[18.89%] left-[25.16%]",
    alt: "Bird decoration",
  },
];

const getCloudAnimation = (index: number) => {
  const animations = [
    "animate-float",
    "animate-float-slow",
    "animate-float-fast",
    "animate-float-reverse",
    "animate-float-large",
    "animate-float-large-reverse",
    "animate-float-horizontal",
  ];
  return animations[index % animations.length];
};

export const LaptopFooter = (): React.JSX.Element => {
  return (
    <footer className="relative h-screen overflow-hidden select-none [background:radial-gradient(50%_50%_at_50%_31%,rgba(255,255,255,1)_0%,rgba(252,209,166,1)_100%)]">
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="absolute top-[calc(50.00%_-_33.80%)] left-[calc(50.00%_-_12.083%)] h-[42.96%] w-[24.167%] rounded-[92.59%] bg-white" />

        <section className="absolute top-[25.52%] left-[26.094%] h-[26.85%] w-[47.86%]">
          <img
            className="absolute top-0 left-0 h-[100%] w-[80.42%] select-none"
            alt="INCANDESCENCE"
            draggable={false}
            src="/footer-assets/laptop/images/incand-text.svg"
          />

          <img
            className="absolute top-[9.02%] left-[82.14%] h-[87.14%] w-[17.86%] select-none"
            alt="Toucan logo"
            draggable={false}
            src="/footer-assets/laptop/images/toucan-logo.svg"
          />
        </section>

        {decorativeImages.map((image, index) => {
          if (
            image.alt === "Mountain Element" ||
            image.alt === "Foreground Mountain"
          ) {
            return (
              <MountainVector
                key={`decorative-${index}`}
                className={`${image.className} transition-transform duration-500 ease-out select-none hover:-translate-y-2 hover:scale-[1.03]`}
                style={image.style}
                alt={image.alt}
                src={image.src}
              />
            );
          }

          return (
            <img
              key={`decorative-${index}`}
              draggable={false}
              className={`${image.className} select-none ${
                image.alt === "Cloud decoration" ||
                image.alt === "White cloud decoration" ||
                image.alt === "Decorative group"
                  ? getCloudAnimation(index)
                  : ""
              }`}
              style={image.style}
              alt={image.alt}
              src={image.src}
            />
          );
        })}

        {smallVectors.map((vector, index) => (
          <img
            key={`vector-${index}`}
            className={`${vector.className} select-none`}
            draggable={false}
            alt={vector.alt}
            src={vector.src}
          />
        ))}

        <img
          className="absolute top-[10.74%] left-[65.365%] h-[15.46%] w-[12.708%] select-none"
          alt="Top right decoration"
          draggable={false}
          src="/footer-assets/laptop/images/group-48096173.png"
        />

        <img
          className="absolute top-[55.37%] left-[calc(50.00%_-_15.313%)] h-[7.41%] w-[30.625%] select-none"
          alt="Tribal tapestry text"
          draggable={false}
          src="/footer-assets/laptop/images/vector-3.svg"
        />

        <div className="font-hitchcut absolute top-[66.20%] left-1/2 flex h-[3.52%] -translate-x-1/2 items-center justify-center text-center text-[2.96vh] leading-[normal] font-normal tracking-[0] whitespace-nowrap text-[#482727] select-none">
          Contact Us
        </div>

        <nav
          className="absolute top-[72.04%] left-1/2 z-50 flex h-[3.70%] -translate-x-1/2 items-center justify-center gap-[2vw]"
          aria-label="Social media links"
        >
          {socialIcons.map((icon, index) => (
            <Link
              key={`social-${index}`}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[2.074vw] w-[2.074vw] transition-opacity hover:opacity-80"
              aria-label={icon.alt}
            >
              <img
                className="h-full w-full select-none"
                draggable={false}
                alt={icon.alt}
                src={icon.src}
              />
            </Link>
          ))}
        </nav>

        <div className="absolute top-[8.98%] left-[calc(50.00%_-_45.729%)]">
          <Brochure className="origin-top-left scale-[0.8] 2xl:scale-100" />
        </div>

        <div className="absolute right-2 bottom-2 flex h-[11.02%] w-auto items-center justify-center gap-0 select-none xl:right-3 xl:bottom-3">
          <div className="flex flex-col items-center justify-center text-center [font-family:'Inter',Helvetica] text-[15px] leading-[15px] text-black min-[2000px]:text-[30px] min-[2000px]:leading-[30px]">
            <span className="font-semibold">MADE IN COLLABORATION</span>
            <span className="font-semibold">
              WITH <span className="font-extrabold">GDG NIT SILCHAR</span>
            </span>
          </div>
          <img
            src="/footer-assets/laptop/images/gdg-logo.gif"
            alt="GDG Logo"
            className="mt-4 -ml-6 h-[75px] w-auto object-center mix-blend-multiply min-[2000px]:mt-6 min-[2000px]:-ml-12 min-[2000px]:h-[150px]"
            draggable={false}
          />
        </div>
      </div>
    </footer>
  );
};
