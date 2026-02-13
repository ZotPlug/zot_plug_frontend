import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'api'],
  typescript: { ignoreBuildErrors: true },
  webpack: (config: any) => {
    // Prefer RNW non-CJS entry to avoid the "__esModule is read-only" crash on some setups (mac)
    let rnwEntry: string;
    try {
      rnwEntry = require.resolve('react-native-web/dist/index.js');
    } catch {
      rnwEntry = require.resolve('react-native-web');
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': rnwEntry,
      'react-native-linear-gradient': require.resolve('react-native-web-linear-gradient'),
    };

    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, 'node_modules'),
    ];

    config.resolve.extensions = [
      '.web.tsx', '.web.ts', '.web.js',
      '.tsx', '.ts', '.js', '.jsx', '.json',
    ];

    return config;
  },
};

export default nextConfig;

