import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fr/traiteur-indien-paris",
        permanent: false,
      },
      {
        source: "/fr",
        destination: "/fr/traiteur-indien-paris",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/en/indian-catering-paris",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
