/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
// import removeImports from "next-remove-imports"
// const removeImports = require("next-remove-imports")();
// module.exports = removeImports({});
