"use client";

import { MemberCard } from "./MemberCard";
import { useState } from "react";

const techHeads= [
   {
    maskGroup: "/team/mask-group.webp",
    frameImage: "/team/e45fa6e1f8e8c01193d414257a13c3d2-1-5.webp",
    profileImage: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303505/k7s1jzlaocuwilqaesfx.webp",
    socialIcons: [
      { maskGroup: "/team/mask-group-1.webp", icon: "/team/insta.svg", link: "https://www.instagram.com/rishi_raj_saha/" },
      { maskGroup: "/team/mask-group-2.webp", icon: "/team/github.webp", link: "https://github.com/rishinhk004" },
      { maskGroup: "/team/mask-group-3.webp", icon: "/team/linkedin.webp", link: "https://www.linkedin.com/in/rishi-raj-saha-696b44257/" },
    ],
    name: "Rishi Raj Saha",
    role: "Web Head",
  },
  {
    maskGroup: "/team/mask-group.webp",
    frameImage: "/team/e45fa6e1f8e8c01193d414257a13c3d2-1-5.webp",
    profileImage: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303505/m9usquxcmxygcyycjogn.webp",
    socialIcons: [
      { maskGroup: "/team/mask-group-1.webp", icon: "/team/insta.svg", link: "#" },
      { maskGroup: "/team/mask-group-2.webp", icon: "/team/github.webp", link: "https://github.com/barnilsarma" },
      { maskGroup: "/team/mask-group-3.webp", icon: "/team/linkedin.webp", link: "https://www.linkedin.com/in/barnil-sarma-34383a255/" },
    ],
    name: "Barnil Sarma",
    role: "Web Head",
  },
  {
    maskGroup: "/team/mask-group.webp",
    frameImage: "/team/e45fa6e1f8e8c01193d414257a13c3d2-1-5.webp",
    profileImage: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303504/bvches6vxw8keeycjhzz.webp",
    socialIcons: [
      { maskGroup: "/team/mask-group-1.webp", icon: "/team/insta.svg", link: "https://www.instagram.com/_samarjitroy_/" },
      { maskGroup: "/team/mask-group-2.webp", icon: "/team/github.webp", link: "https://github.com/Samarjit25" },
      { maskGroup: "/team/mask-group-3.webp", icon: "/team/linkedin.webp", link: "https://www.linkedin.com/in/samarjit-roy-368071257/" },
    ],
    name: "Samarjit Roy",
    role: "UI/UX Head",
  },
 
  {
    maskGroup: "/team/mask-group.webp",
    frameImage: "/team/e45fa6e1f8e8c01193d414257a13c3d2-1-5.webp",
    profileImage: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303505/fhtiuq1jstoifpwg0urc.webp",
    socialIcons: [
      { maskGroup: "/team/mask-group-1.webp", icon: "/team/insta.svg", link: "#" },
      { maskGroup: "/team/mask-group-2.webp", icon: "/team/github.webp", link: "#" },
      { maskGroup: "/team/mask-group-3.webp", icon: "/team/linkedin.webp", link: "https://www.linkedin.com/in/siddharth-ghosh-18ba29251/" },
    ],
    name: "Siddharth Ghosh",
    role: "UI/UX Head",
  },
  
  {
    maskGroup: "/team/mask-group.webp",
    frameImage: "/team/e45fa6e1f8e8c01193d414257a13c3d2-1-5.webp",
    profileImage: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303505/bxsw7gioaa8noezquowu.webp",
    socialIcons: [
      { maskGroup: "/team/mask-group-1.webp", icon: "/team/insta.svg", link: "https://www.instagram.com/dev.kaustav" },
      { maskGroup: "/team/mask-group-2.webp", icon: "/team/github.webp", link: "#" },
      { maskGroup: "/team/mask-group-3.webp", icon: "/team/linkedin.webp", link: "https://www.linkedin.com/in/kaustav-dev-429123248" },
    ],
    name: "Kaustav Dev",
    role: "UI/UX Head",
  },
];

// Junior team member data - Co-Heads (3rd Year) and Members (2nd Year)
const techJuniors = [
  // Co-Heads (3rd Year)
   { id: 5, name: "Anirban Bora", role: "Web Co-Head", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303497/k315hmecmxbn2wli0gk2.webp", linkedin: "https://www.linkedin.com/in/anirban-bora-432b2a280", github: "https://github.com/A-nirvana", instagram: "https://www.instagram.com/ani_r_baan" },
   { id: 6, name: "Mriganka Dey", role: "Web Co-Head", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303503/un89odfxpxkjant105an.webp", linkedin: "https://www.linkedin.com/in/mrigankadey/", github: "https://github.com/velgardey", instagram: "https://www.instagram.com/velgardey/" },
  { id: 3, name: "Bishal Das", role: "Web Co-Head", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303501/nvi9syvvzqlx9wzwpdbh.webp", linkedin: "https://www.linkedin.com/in/bishalnits27", github: "https://github.com/Bishal-NITS-2003", instagram: "https://www.instagram.com/bishalnits27" },
  { id: 4, name: "Subhajyoti Dey", role: "Web Co-Head", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303501/ykdjl5gzn9zhpur3lrmw.webp", linkedin: "https://www.linkedin.com/in/subhajyoti-dey-635922235", github: "https://github.com/SubhaNITS150", instagram: "#" },
  { id: 7, name: "Priyanshu Kashyap", role: "Web Co-Head", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303499/ynhmyyoao4gdpw43q9ue.webp", linkedin: "https://www.linkedin.com/in/priyanshu-kashyap-8196a928a", github: "https://github.com/7rikster", instagram: "https://www.instagram.com/priyanshu._.kashyap_" },
   { id: 1, name: "Jitamanyu Phukan", role: "UI/UX Co-Head", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303500/lheq0fxzvxacchcqnzlf.webp", linkedin: "https://www.linkedin.com/in/jitamanyu-phukan-562728280", github: "#", instagram: "#" },
  { id: 2, name: "Piyush Chatterjee", role: "UI/UX Co-Head", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303506/pwkwrgcfrrxrj7e3sy5c.webp", linkedin: "https://www.linkedin.com/in/piyush-chatterjee64/", github: "#", instagram: "#" },
  // Members (2nd Year)
  { id: 8, name: "Kallul Gogoi", role: "Web Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303503/xzbrnep9wjsxzkaumjq5.webp", linkedin: "https://www.linkedin.com/in/kallul-gogoi-00a5152a0/", github: "https://github.com/kallulgogoi", instagram: "https://www.instagram.com/kallul_gogoi33/" },
  { id: 9, name: "Swarup Das", role: "Web Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303498/wmdfenczjpust74ajuwu.webp", linkedin: "https://www.linkedin.com/in/swarup81", github: "https://github.com/swarup081", instagram: "https://www.instagram.com/swarup_81/" },
  { id: 10, name: "Dhruba Kumar Agarwalla", role: "Web Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768311978/tg5uzvxlatzdod3hdl3j.webp", linkedin: "https://www.linkedin.com/in/dhruba-kumar-agarwalla-7a5346270/", github: "https://github.com/DhrubaAgarwalla", instagram: "#" },
   { id: 15, name: "Harshit Agarwal", role: "Web Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303502/ka7mbi4zorf7ikhg6e0s.webp", linkedin: "https://www.linkedin.com/in/harshit-agarwal-a119a4332/", github: "https://github.com/agarwal-harshit00", instagram: "https://www.instagram.com/harshitaga_01/" },
  { id: 11, name: "Swastika Paul", role: "Web Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303515/n5gbfa3hdycqbghkqkiv.webp", linkedin: "https://www.linkedin.com/in/swastika-paul-05186a381", github: "https://github.com/swastika-paul", instagram: "#" },
  { id: 17, name: "Purba Pratim Mahanta", role: "Web Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303506/wkrrduw4j1fwlj1mufdc.webp", linkedin: "https://www.linkedin.com/in/purba-pratim-mahanta-7037a1358", github: "https://github.com/Purbapratim36", instagram: "#" },
  { id: 13, name: "Dishank Choudhury", role: "Web Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303496/xkqb5cmbr9gotacejycm.webp", linkedin: "https://www.linkedin.com/in/dishank-choudhury-56b565318", github: "https://github.com/di35117", instagram: "https://www.instagram.com/dishank_35117" },
  { id: 14, name: "Mayur Kalita", role: "UI/UX Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303504/znghocbpkwlwnvz8s71v.webp", linkedin: "https://www.linkedin.com/in/mayur-kalita", github: "https://github.com/mayurkalita", instagram: "https://www.instagram.com/mayurrr.design" },
   { id: 12, name: "Mrigakhi Kashyap", role: "UI/UX Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303504/iqizvaeccza7vhy8nchh.webp", linkedin: "https://www.linkedin.com/in/mrigakhi-kashyap-68188a354", github: "https://github.com/mrigakhi65", instagram: "https://www.instagram.com/_mrigakhiiiii_" },
  { id: 16, name: "Anusna Pradhan", role: "UI/UX Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303502/oszsukzzejb9h71vt5tl.webp", linkedin: "https://www.linkedin.com/in/anusna-pradhan/", github: "https://github.com/iz4nam1", instagram: "#" },
  
  { id: 18, name: "Priyadarkshina Khamon", role: "UI/UX Member", image: "https://res.cloudinary.com/dzbcezq5i/image/upload/v1768303502/mr7c0gtij2bbpeu5pdzb.webp", linkedin: "https://www.linkedin.com/in/priyadarkshina-khamon-a89b81332", github: "https://github.com/priyadarkshina19", instagram: "#" },
];

export const TeamPage = () => {
  const [displayedTeam, setDisplayedTeam] = useState("tech");

  return (
    <main
      id="teams-page-container"
      className="w-full h-screen overflow-x-hidden overflow-y-auto"
      style={{
        backgroundColor: "#6e0e17ff",
        backgroundImage: "url('/team/teams-bg--1--3.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative w-full min-h-full">
        <div className="relative z-10 flex flex-col items-center w-full max-w-[2400px] mx-auto pb-[10vw]">
          <section className="relative w-full flex justify-center mt-8 lg:mt-[5vw]">
            <div className="relative w-full lg:w-[93.85vw] flex justify-center items-center">
              <img
                className="w-full h-auto object-contain"
                alt="Meet the Incandescence 2026 Team"
                src="/team/hero-banner.webp"
              />
            </div>
          </section>

          <div className="relative w-[80vw] md:w-[50vw] lg:w-[45vw] h-[15vw] md:h-[10vw] lg:h-[8vw] flex items-center justify-center mt-[10vw] mb-[10vw] md:mt-[6vw] md:mb-[6vw] lg:mt-[5vw] lg:mb-[5vw]">
            <div className="absolute w-full h-[1.5vw] md:h-[0.8vw] lg:h-[0.6vw] bg-[#3f2e18] border-y-[0.2vw] md:border-y-[0.15vw] lg:border-y-[0.1vw] border-[#e2be36] rounded-full"></div>

            <div className="flex justify-between w-[85%] lg:w-[70%] z-10 relative items-center">
              <div
                onClick={() => setDisplayedTeam("core")}
                className={`${displayedTeam === "core" ? "w-[16vw] h-[16vw] md:w-[10vw] md:h-[10vw] lg:w-[7vw] lg:h-[7vw] bg-white border-black scale-110" : "w-[13vw] h-[13vw] md:w-[8vw] md:h-[8vw] lg:w-[5.5vw] lg:h-[5.5vw] bg-black border-[#e2be36]"} rounded-full border-[0.6vw] md:border-[0.3vw] lg:border-[0.2vw] overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300`}
              >
                <img src="/team/navbar-7.webp" className="w-full h-full object-cover" alt="Core Team" />
              </div>

              <div
                onClick={() => setDisplayedTeam("tech")}
                className={`${displayedTeam === "tech" ? "w-[16vw] h-[16vw] md:w-[10vw] md:h-[10vw] lg:w-[7vw] lg:h-[7vw] bg-white border-black scale-110" : "w-[13vw] h-[13vw] md:w-[8vw] md:h-[8vw] lg:w-[5.5vw] lg:h-[5.5vw] bg-black border-[#e2be36]"} rounded-full border-[0.6vw] md:border-[0.3vw] lg:border-[0.2vw] overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300`}
              >
                <img src="/team/navbar2.webp" className="w-full h-full object-cover" alt="Tech Team" />
              </div>

              <div
                onClick={() => setDisplayedTeam("module")}
                className={`${displayedTeam === "module" ? "w-[16vw] h-[16vw] md:w-[10vw] md:h-[10vw] lg:w-[7vw] lg:h-[7vw] bg-white border-black scale-110" : "w-[13vw] h-[13vw] md:w-[8vw] md:h-[8vw] lg:w-[5.5vw] lg:h-[5.5vw] bg-black border-[#e2be36]"} rounded-full border-[0.6vw] md:border-[0.3vw] lg:border-[0.2vw] overflow-hidden flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300`}
              >
                <img src="/team/navbar-1.webp" className="w-full h-full object-cover" alt="Module Heads" />
              </div>
            </div>
          </div>

          {displayedTeam === "core" || displayedTeam === "module" ? (
            <>
              {/* Team Title */}
              <div className="inline-flex items-center justify-center px-[5vw] py-[3vw] lg:px-[3.3vw] lg:py-[1.8vw] bg-[#e2be36] rounded-[2vw] lg:rounded-[0.7vw] border-[1vw] lg:border-[0.4vw] border-solid border-[#514114] mb-[10vw] lg:mb-[5vw]">
                <div className="font-hitchcut font-normal text-[#160f0c] text-[7vw] lg:text-[4.4vw] text-justify tracking-[0.17vw] leading-none whitespace-nowrap">
                  {displayedTeam === "core" ? "CORE TEAM" : "MODULE HEADS"}
                </div>
              </div>
              <div className="text-center text-white text-[6vw] lg:text-[3vw] font-hitchcut mb-[10vw]">Coming Soon</div>
            </>
          ) : (
            <>
              {/* TECH TEAM Title */}
              <div className="inline-flex items-center justify-center px-[5vw] py-[3vw] lg:px-[3.3vw] lg:py-[1.8vw] bg-[#e2be36] rounded-[2vw] lg:rounded-[0.7vw] border-[1vw] lg:border-[0.4vw] border-solid border-[#514114] mb-[10vw] lg:mb-[5vw]">
                <div className="font-hitchcut font-normal text-[#160f0c] text-[7vw] lg:text-[4.4vw] text-justify tracking-[0.17vw] leading-none whitespace-nowrap">
                  TECH TEAM
                </div>
              </div>

              {/* Heads Title */}
              <div className="inline-flex items-center justify-center px-[6vw] py-[3vw] lg:px-[2.3vw] lg:py-[1.2vw] bg-[#e2be36] rounded-[1.5vw] lg:rounded-[0.5vw] border-[0.8vw] lg:border-[0.3vw] border-solid border-[#514114] mb-[15vw] lg:mb-[8vw]">
                <div className="font-hitchcut font-normal text-[#160f0c] text-[8vw] lg:text-[3vw] text-justify tracking-[0.12vw] leading-none whitespace-nowrap">
                  Heads
                </div>
              </div>

              {/* Heads Grid */}
              <div className="flex flex-wrap justify-center gap-y-[15vw] md:gap-x-[5vw] lg:gap-x-[2vw] 2xl:gap-x-[3vw] lg:gap-y-[8vw] 2xl:gap-y-[6vw] mb-[20vw] lg:mb-[10vw] px-[4vw] w-full max-w-[2000px]">
                {techHeads.map((member, index) => (
                  <div
                    key={`member-${index}`}
                    className={`flex justify-center w-full md:w-[45%] lg:w-[30%] ${index === 1 ? "lg:-mt-[5vw]" : ""}`}
                  >
                    <MemberCard {...member} />
                  </div>
                ))}
              </div>

              {/* Junior Members Title */}
              <div className="inline-flex items-center justify-center px-[6vw] py-[3vw] lg:px-[2.3vw] lg:py-[1.2vw] bg-[#e2be36] rounded-[1.5vw] lg:rounded-[0.5vw] border-[0.8vw] lg:border-[0.3vw] border-solid border-black mb-[10vw] lg:mb-[5vw]">
                <div className="font-hitchcut font-normal text-[#160f0c] text-[8vw] lg:text-[3vw] text-justify tracking-[0.12vw] leading-none whitespace-nowrap">
                  Junior Members
                </div>
              </div>

              {/* Junior Members Grid */}
              <section className="w-full relative py-8 md:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8 md:gap-12 lg:gap-x-[5vw] lg:gap-y-[8vw] 2xl:gap-x-[6vw] 2xl:gap-y-[8vw] justify-items-center max-w-[2200px] mx-auto px-[4vw]">
                  {techJuniors.map((member) => (
                    <div
                      key={member.id}
                      className="w-full bg-transparent border-none shadow-none"
                    >
                      <div className="flex flex-col items-center gap-[4vw] lg:gap-[1.2vw] 2xl:gap-[0.8vw] p-0">
                        <div className="relative w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[18vw] 2xl:w-[16vw] aspect-[279/364] flex justify-center items-center group overflow-hidden">
                          <img
                            className="absolute inset-0 w-full h-full z-10 object-contain pointer-events-none"
                            alt="Frame"
                            src="/team/junior-frame.webp"
                          />

                          <img
                            className="w-full h-full object-cover object-top"
                            alt={`${member.name} profile`}
                            src={member.image}
                          />

                          <div className="absolute bottom-[8%] left-0 w-full flex justify-center gap-[4vw] md:gap-[2vw] lg:gap-[1.5vw] 2xl:gap-[1.2vw] z-20 transition-transform duration-300 translate-y-0 lg:translate-y-[300%] lg:group-hover:translate-y-0 2xl:translate-y-0">
                            {member.linkedin && member.linkedin !== "#" && (
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-[8vw] h-[8vw] md:w-[4vw] md:h-[4vw] lg:w-[2.5vw] lg:h-[2.5vw] 2xl:w-[2.2vw] 2xl:h-[2.2vw] bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                <img src="/team/linkedin.webp" alt="LinkedIn" className="w-[60%] h-[60%] object-contain" />
                              </a>
                            )}
                            {member.github && member.github !== "#" && (
                              <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-[8vw] h-[8vw] md:w-[4vw] md:h-[4vw] lg:w-[2.5vw] lg:h-[2.5vw] 2xl:w-[2.2vw] 2xl:h-[2.2vw] bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                <img src="/team/github.webp" alt="Github" className="w-[60%] h-[60%] object-contain" />
                              </a>
                            )}
                            {member.instagram && member.instagram !== "#" && (
                              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-[8vw] h-[8vw] md:w-[4vw] md:h-[4vw] lg:w-[2.5vw] lg:h-[2.5vw] 2xl:w-[2.2vw] 2xl:h-[2.2vw] bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                <img src="/team/insta.svg" alt="Instagram" className="w-[60%] h-[60%] object-contain" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col w-full items-center gap-[2vw] lg:gap-[0.5vw] 2xl:gap-[0.3vw]">
                          <h3 className="w-full font-hitchcut font-normal text-white text-[5vw] md:text-[2.5vw] lg:text-[1.45vw] 2xl:text-[1.1vw] text-center tracking-[0] leading-normal whitespace-nowrap">
                            {member.name}
                          </h3>
                          <p className="w-full font-hitchcut font-normal text-white text-[3.5vw] md:text-[1.8vw] lg:text-[1vw] 2xl:text-[0.75vw] text-center tracking-[0] leading-normal whitespace-nowrap">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
};
