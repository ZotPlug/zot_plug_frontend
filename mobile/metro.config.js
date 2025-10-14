// mobile/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);
config.watchFolders = [workspaceRoot];
config.resolver = {
  ...config.resolver,
  disableHierarchicalLookup: false,
  nodeModulesPaths: [path.join(projectRoot, 'node_modules')],
  alias: {
    ...(config.resolver?.alias || {}),
    'react': path.join(projectRoot, 'node_modules', 'react'),
    'react-dom': path.join(projectRoot, 'node_modules', 'react-dom'),
    'react-native': path.join(projectRoot, 'node_modules', 'react-native'),
  },
  sourceExts: [...config.resolver.sourceExts, 'cjs'],
};

// IMPORTANT: export ONLY the wrapped config
module.exports = withNativeWind(config, { input: './global.css' });




