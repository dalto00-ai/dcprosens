import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // Garante que caminhos como /psa-calculator/ funcionem corretamente na Hostinger
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
