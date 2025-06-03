/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ['res.cloudinary.com'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;