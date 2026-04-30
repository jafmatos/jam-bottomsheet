const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Add the parent folder to watchFolders
config.watchFolders = [path.resolve(__dirname, "..")];

// Map the package name to the actual location
config.resolver.extraNodeModules = {
  "react-native-bottomsheet": path.resolve(__dirname, "../react-native-bottomsheet"),
};

module.exports = config;
