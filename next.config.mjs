import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {}, // empty to satisfy Turbopack
  webpack(config) {
    config.resolve.alias["@"] = path.resolve("./"); // optional "@/*" alias
    return config;
  },
};

export default nextConfig;
