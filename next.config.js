/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apps.peceduglobal.com",
        // pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.apps.peceduglobal.com",
        // pathname: "**",
      },
      {
        protocol: "https",
        hostname: "peceduglobal.com",
        // pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
