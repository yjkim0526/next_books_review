import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // 이미지 호스트 추가
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
};

export default nextConfig;
