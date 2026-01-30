/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // Leave empty
        pathname: "/**",
      },
    ],
  },
};

export default config;
