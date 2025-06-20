import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgix.gurunavi.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'webservice.recruit.co.jp',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgfp.hotp.jp',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.travel.rakuten.co.jp',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'trvimg.r10s.jp',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
