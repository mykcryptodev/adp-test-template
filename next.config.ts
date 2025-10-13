import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@coinbase/cds-web', '@coinbase/cds-icons'],
};

export default nextConfig;
