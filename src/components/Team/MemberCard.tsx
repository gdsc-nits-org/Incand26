"use client";

interface SocialIcon {
  maskGroup: string;
  icon: string;
  link: string;
}

export interface MemberProps {
  maskGroup: string;
  frameImage: string;
  profileImage: string;
  socialIcons: SocialIcon[];
  name: string;
  role: string;
  className?: string;
}

export const MemberCard = ({
  maskGroup,
  frameImage,
  profileImage,
  socialIcons,
  name,
  role,
  className,
}: MemberProps) => {
  return (
    <div
      className={`group relative h-[115vw] w-[70vw] shrink-0 md:h-[65.5vw] md:w-[40vw] lg:h-[38vw] lg:w-[23.2vw] 2xl:h-[29.5vw] 2xl:w-[18vw] ${className ?? ""}`}
    >
      {/* Mask Group (Background Decoration) */}
      <img
        className="pointer-events-none absolute top-[14%] left-[4%] h-[77.5%] w-[90%] object-contain"
        alt="Mask group"
        src={maskGroup}
      />

      {/* Frame Image (Main Background) */}
      <img
        className="pointer-events-none absolute top-0 -left-[32%] h-full w-[163%] max-w-none object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:drop-shadow-[0_0_1vw_rgba(226,190,54,0.5)]"
        alt="Frame"
        src={frameImage}
      />

      {/* Profile Image */}
      <img
        className="absolute top-[30.6%] left-[20.8%] z-10 aspect-square w-[58.5%] rounded-[3.5vw] border-[1vw] border-solid border-black object-cover transition-transform duration-300 group-hover:-translate-y-[2vw] group-hover:scale-125 group-hover:drop-shadow-2xl md:rounded-[1.5vw] md:border-[0.5vw] lg:rounded-[1vw] lg:border-[0.3vw] 2xl:rounded-[0.8vw] 2xl:border-[0.2vw]"
        alt={name}
        src={profileImage}
      />

      {/* Social Icons */}
      <div className="absolute top-[79.5%] left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-[12vw] transition-transform duration-300 group-hover:translate-y-[2vw] group-hover:scale-110 md:gap-[5vw] lg:gap-[3.5vw] 2xl:gap-[2.5vw]">
        {socialIcons
          .filter((icon) => icon.link && icon.link !== "#")
          .map((icon, iconIndex) => (
            <a
              key={`social-${iconIndex}`}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex h-[12vw] w-[12vw] items-center justify-center transition-transform hover:scale-110 active:scale-95 md:h-[5vw] md:w-[5vw] lg:h-[3.5vw] lg:w-[3.5vw] 2xl:h-[2.5vw] 2xl:w-[2.5vw]"
            >
              <img
                className="absolute inset-0 h-full w-full object-contain"
                alt="Social background"
                src={icon.maskGroup}
              />
              <img
                className="absolute h-[45%] w-[45%] object-contain"
                alt="Social icon"
                src={icon.icon}
              />
            </a>
          ))}
      </div>

      {/* Name and Role */}
      <div className="absolute top-[68%] left-1/2 z-20 flex w-[60%] -translate-x-1/2 flex-col items-center gap-[1vw] transition-transform duration-300 group-hover:translate-y-[1vw] group-hover:scale-110 md:gap-[0.5vw] lg:gap-[0.3vw]">
        <h3 className="text-center font-[Futura_Display-Regular,Helvetica] text-[5.5vw] leading-none font-normal text-black md:text-[2.5vw] lg:text-[1.6vw] 2xl:text-[1.2vw]">
          {name}
        </h3>
        <p className="font-hitchcut text-center text-[2.8vw] leading-none font-normal text-black md:text-[1.2vw] lg:text-[0.8vw] 2xl:text-[0.6vw]">
          {role}
        </p>
      </div>
    </div>
  );
};
