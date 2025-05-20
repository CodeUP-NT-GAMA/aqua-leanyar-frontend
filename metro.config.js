// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require("expo/metro-config");
const {withNativeWind} = require("nativewind/metro");

const ALIASES = ["react-native-pager-view"];

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {

    if (platform === 'web' && ALIASES.includes(moduleName)) {
        return {
            type: 'empty',
        };
    }
    // Ensure you call the default resolver.
    return context.resolveRequest(context, moduleName, platform);

};

module.exports = withNativeWind(config, {input: "./global.css"});
