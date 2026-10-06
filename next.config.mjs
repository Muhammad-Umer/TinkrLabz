/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return process.env.VERCEL_ENV === 'preview'
      ? [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]
      : []
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
