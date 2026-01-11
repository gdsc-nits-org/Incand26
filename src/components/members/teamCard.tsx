const FRAME_URL =
  "https://res.cloudinary.com/dwzakk4bw/image/upload/v1768108719/Component_92_dwu2ek.webp";
const ICON_URL =
  "https://res.cloudinary.com/dwzakk4bw/image/upload/v1768108728/icon_mggylw.webp";

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  socialLinks: { platform: string; url: string }[];
}
const teamCard = ({ member }: { member: TeamMember }) => {
  const { name, role, imageUrl, socialLinks } = member;

  return (
    <div
      className="relative w-full max-w-dvw aspect-[1/1.45] mx-auto bg-contain bg-no-repeat bg-center group"
      style={{ backgroundImage: `url(${FRAME_URL})` }}
    >
      <div className="absolute inset-11 md:inset-12 pt-[40%] pb-[12%] px-[18%]">
        <div className="flex flex-col items-center w-full transition-transform duration-300 ease-in-out group-hover:scale-105">
          <div className="w-[70%] md:w-[75%] aspect-square rounded-xl overflow-hidden border-2 border-black">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 md:mt-0 lg:mt-4 text-center">
            <h3 className="text-base sm:text-lg md:text-lg md:whitespace-nowrap  font-black text-black uppercase">
              {name}
            </h3>
            <p className="text-[10px] font-bold text-black uppercase tracking-widest mt-1">
              {role}
            </p>
          </div>
        </div>
        <div className="mt-auto flex justify-between gap-3 w-full">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pt-6 transition-transform duration-300 ease-in-out hover:scale-130 active:scale-95 origin-top-left"
            >
             <img
                src={ICON_URL}
                alt={link.platform}
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-sm"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default teamCard;
