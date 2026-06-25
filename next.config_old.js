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
        hostname: "peceduglobal.com",
        // pathname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/public/:path*",
        destination: "https://apps.peceduglobal.com/api/public/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination: "https://apps.peceduglobal.com/api/auth/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
