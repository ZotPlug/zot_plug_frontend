// mobile/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Monorepo support
config.watchFolders = [workspaceRoot];

// Extract defaults
const { assetExts, sourceExts } = config.resolver;

// SVG transformer
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

// Resolver changes for SVG
config.resolver = {
  ...config.resolver,
  disableHierarchicalLookup: true,
  nodeModulesPaths: [path.join(projectRoot, 'node_modules')],
  alias: {
    ...(config.resolver?.alias || {}),
    'react-native': path.join(projectRoot, 'node_modules/react-native'),
  },
  assetExts: assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...new Set([...sourceExts, 'svg', 'cjs'])],
};

// IMPORTANT: export ONLY the wrapped config
module.exports = withNativeWind(config, { input: './global.css' });

