/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    domains: [
        "avatars.githubusercontent.com",
        "lh3.googleusercontent.com",
        "vipul-twitter-dev.s3.ap-south-1.amazonaws.com"
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

