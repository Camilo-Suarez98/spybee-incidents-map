import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "src/shared/styles")],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
