// src/data/sponsors.ts

export type Sponsor = {
  name: string;
  logo: string;
};

export type SponsorDataStructure = {
  column1: Sponsor[];
  column2: Sponsor[];
};

export const sponsorsData: SponsorDataStructure = {
  column1: [
    {
      name: "ASUS GAMING",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766218737/image_2_1_ibm2vj.png",
    },
    {
      name: "CLOVIA",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236823/Group_1171279518_yyxyzn.png",
    },
    {
      name: "COCA COLA",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236343/Frame_1000006207_aeplge.png",
    },
    {
      name: "UNSTOP",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236343/Group_1171279524_ohjpvl.png",
    },
    {
      name: "AMUL",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236344/Group_1171279529_gs7prq.png",
    },
    {
      name: "ZEBRONICS",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236344/Group_1171279528_vejbsf.png",
    },
    {
      name: "WINKIES",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236345/Group_1171279530_pszytp.png",
    },
    {
      name: "GPLUS",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236343/Group_1171279522_pvhsuj.png",
    },
  ],
  column2: [
    {
      name: "UNIBIC",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236344/Group_1171279527_u0x0ab.png",
    },
    {
      name: "BAULI",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236343/Group_1171279525_yasiiq.png",
    },
    {
      name: "BORAIL VIEW REGENCY",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236343/Group_1171279521_ul0lus.png",
    },
    {
      name: "STATE BANK OF INDIA",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236344/Group_1171279526_k76gfz.png",
    },
    {
      name: "THE SOUL STORE",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236343/Group_1171279519_dcmol7.png",
    },
    {
      name: "THE LONDON SHAKES",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236343/Group_1171279520_qq2t2d.png",
    },
    {
      name: "CAMPUS TIMES PUNE",
      logo: "https://res.cloudinary.com/dgechlqls/image/upload/v1766236343/Group_1171279523_qsrjpn.png",
    },
  ],
};
