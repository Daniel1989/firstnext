/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          // Wildcard path matching
          {
            source: '/blog/:slug',
            destination: '/dashboard',
            permanent: true,
          },
        ]
      },
}

module.exports = nextConfig
