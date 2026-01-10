import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'api'],
  typescript: { ignoreBuildErrors: true },
  webpack: (config: any) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': require.resolve('react-native-web'),
      'react-native-linear-gradient': require.resolve('react-native-web-linear-gradient'),
    };

    // Preserve default module resolution AND add web/node_modules explicitly
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

