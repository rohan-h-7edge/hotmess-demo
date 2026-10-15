import dotenv from "dotenv";

dotenv.config();

const PERMISSIONS = {
  notifications: "We use notifications to keep you updated about important alerts.",
};

function getBundleIdentifier() {
  const appVariant = process.env.EXPO_PUBLIC_APP_VARIANT;
  const baseBundleId = "com.hotmessdemo.app";
  if (appVariant === "prod") return baseBundleId;
  if (appVariant === "preprod") return `${baseBundleId}.preprod`;
  if (appVariant === "qa") return `${baseBundleId}.qa`;
  return `${baseBundleId}.develop`;
}

function getAndroidPackage() {
  const bundleId = getBundleIdentifier();
  return bundleId;
}

function getIconPath(prefix: string) {
  const appVariant = process.env.EXPO_PUBLIC_APP_VARIANT;
  if (appVariant === "prod") return `./src/assets/icons/${prefix}-prod.png`;
  if (appVariant === "preprod") return `./src/assets/icons/${prefix}-preprod.png`;
  if (appVariant === "qa") return `./src/assets/icons/${prefix}-qa.png`;
  return `./src/assets/icons/${prefix}-develop.png`;
}

function getSplashPath() {
  return getAppIcon();
}

function getAppIcon() {
  return getIconPath("icon");
}

function getAdaptiveIcon() {
  return getIconPath("adaptive-icon");
}

export default {
  name: "Hotmess Demo",
  slug: "hotmess-demo",
  version: "1.0.0",
  orientation: "portrait",
  icon: getAppIcon(),
  splash: {
    image: getSplashPath(),
    resizeMode: "cover",
    backgroundColor: "#000000",
  },
  scheme: getBundleIdentifier(),
  userInterfaceStyle: "automatic",
  experiments: {
    reactCompiler: true,
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: getBundleIdentifier(),
    icon: getAppIcon(),
    infoPlist: {
      NSUserNotificationUsageDescription: PERMISSIONS.notifications,
    },
  },
  android: {
    package: getAndroidPackage(),
    icon: getAppIcon(),
    adaptiveIcon: {
      foregroundImage: getAdaptiveIcon(),
      backgroundColor: "#ffffff",
    },
  },
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          enableMinifyInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
          useLegacyPackaging: true,
        },
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "./src/assets/fonts/Poppins-Regular.ttf",
          "./src/assets/fonts/Poppins-Medium.ttf",
          "./src/assets/fonts/Poppins-SemiBold.ttf",
        ],
      },
    ],
    "expo-image",
    "./plugins/withAndroidImeInsets",
    "expo-localization",
    "expo-secure-store",
    "expo-status-bar",
    [
      "expo-notifications",
      {
        icon: getAppIcon(),
        color: "#ffffff",
        defaultChannel: "default",
        enableBackgroundRemoteNotifications: false,
      },
    ],
  ],
};

