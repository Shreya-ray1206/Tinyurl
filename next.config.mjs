import path from "path";

import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove turbopack completely
  webpack(config) {
    config.resolve.alias["@"] = path.resolve("./"); // optional "@/*" alias
    return config;
  },
};

export default nextConfig;
