import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          Inter: require("../assets/fonts/Inter/Inter-Regular.ttf"),
          Regular: require("../assets/fonts/Inter/Inter-Regular.ttf"),
          Medium: require("../assets/fonts/Inter/Inter-Medium.ttf"),
          SemiBold: require("../assets/fonts/Inter/Inter-SemiBold.ttf"),
          Bold: require("../assets/fonts/Inter/Inter-Bold.ttf"),
          ExtraBold: require("../assets/fonts/Inter/Inter-ExtraBold.ttf"),
          Black: require("../assets/fonts/Inter/Inter-Black.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.error("ERR::useCachedResources.useEffect", e);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
