/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // The route to intercept
        destination: 'https://api-dev.eduapply.io/:path*',  // The target URL (your backend)
      }
    ]
  }
};

module.exports = nextConfig;
