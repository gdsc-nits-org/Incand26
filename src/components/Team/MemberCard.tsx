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
        <div className={`relative w-[70vw] h-[115vw] md:w-[40vw] md:h-[65.5vw] lg:w-[23.2vw] lg:h-[38vw] 2xl:w-[18vw] 2xl:h-[29.5vw] shrink-0 group ${className ?? ""}`}>
            {/* Mask Group (Background Decoration) */}
            <img
                className="absolute top-[14%] left-[4%] w-[90%] h-[77.5%] object-contain pointer-events-none"
                alt="Mask group"
                src={maskGroup}
            />

            {/* Frame Image (Main Background) */}
            <img
                className="absolute top-0 -left-[32%] w-[163%] h-full object-cover max-w-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.02] group-hover:drop-shadow-[0_0_1vw_rgba(226,190,54,0.5)]"
                alt="Frame"
                src={frameImage}
            />

            {/* Profile Image */}
            <img
                className="absolute top-[30.6%] left-[20.8%] w-[58.5%] aspect-square rounded-[3.5vw] md:rounded-[1.5vw] lg:rounded-[1vw] 2xl:rounded-[0.8vw] border-[1vw] md:border-[0.5vw] lg:border-[0.3vw] 2xl:border-[0.2vw] border-solid border-black object-cover z-10 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-[2vw] group-hover:drop-shadow-2xl"
                alt={name}
                src={profileImage}
            />

            {/* Social Icons */}
            <div className="inline-flex items-center gap-[12vw] md:gap-[5vw] lg:gap-[3.5vw] 2xl:gap-[2.5vw] absolute top-[79.5%] left-1/2 -translate-x-1/2 z-20 transition-transform duration-300 group-hover:translate-y-[2vw] group-hover:scale-110">
                {socialIcons.filter(icon => icon.link && icon.link !== "#").map((icon, iconIndex) => (
                    <a
                        key={`social-${iconIndex}`}
                        href={icon.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-[12vw] h-[12vw] md:w-[5vw] md:h-[5vw] lg:w-[3.5vw] lg:h-[3.5vw] 2xl:w-[2.5vw] 2xl:h-[2.5vw] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                    >
                        <img
                            className="absolute inset-0 w-full h-full object-contain"
                            alt="Social background"
                            src={icon.maskGroup}
                        />
                        <img
                            className="absolute w-[45%] h-[45%] object-contain"
                            alt="Social icon"
                            src={icon.icon}
                        />
                    </a>
                ))}
            </div>

            {/* Name and Role */}
            <div className="flex flex-col items-center gap-[1vw] md:gap-[0.5vw] lg:gap-[0.3vw] absolute top-[68%] left-1/2 -translate-x-1/2 w-[60%] z-20 transition-transform duration-300 group-hover:translate-y-[1vw] group-hover:scale-110">
                <h3 className="font-[Futura_Display-Regular,Helvetica] font-normal text-black text-[5.5vw] md:text-[2.5vw] lg:text-[1.6vw] 2xl:text-[1.2vw] text-center leading-none">
                    {name}
                </h3>
                <p className="font-hitchcut font-normal text-black text-[2.8vw] md:text-[1.2vw] lg:text-[0.8vw] 2xl:text-[0.6vw] text-center leading-none">
                    {role}
                </p>
            </div>
        </div>
    );
};
