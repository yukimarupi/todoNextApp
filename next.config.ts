import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/sw.js',
        destination: '/404',
        permanent: false,
      },
    ];
  },
};


export default nextConfig;
