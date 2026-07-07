/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "apps.peceduglobal.com",
                pathname: "/storage/**",
            },
            {
                protocol: "https",
                hostname: "peceduglobal.com",
                pathname: "/storage/**",
            },
        ],
    },
};

module.exports = nextConfig;