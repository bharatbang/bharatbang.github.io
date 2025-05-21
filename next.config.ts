import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
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
        hostname: 'placehold.co', // Ensure this entry is present and correct
        port: '',
        pathname: '/**',
      },
      // If you've replaced placeholders with images from other domains (e.g., wikimedia.org),
      // you'll need to add their hostnames here as well. For example:
      // {
      //   protocol: 'https',
      //   hostname: 'upload.wikimedia.org',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;
