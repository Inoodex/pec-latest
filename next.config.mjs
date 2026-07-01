/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apps.peceduglobal.com",
      },
      {
        protocol: "https",
        hostname: "www.apps.peceduglobal.com",
      },
      {
        protocol: "https",
        hostname: "peceduglobal.com",
      },
    ],
  },
};

export default nextConfig;
