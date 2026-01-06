/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/angebote',
        destination: '/veranstaltungen',
        permanent: true, // 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;

