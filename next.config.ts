// import type { NextConfig } from "next";



// const nextConfig: NextConfig = {
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ["@svgr/webpack"],
//     });
//     return config;
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;

