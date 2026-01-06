/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/angebote',
        destination: '/veranstaltungen',
        permanent: false, // 307 temporary redirect
      },
    ];
  },
};

export default nextConfig;

