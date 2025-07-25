/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Docker用にスタンドアロンモードを有効化
  reactStrictMode: true,
  experimental: {
    // 必要に応じて実験的機能を有効化
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // APIルートのタイムアウトを延長
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default nextConfig
