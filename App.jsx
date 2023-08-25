import { StatusBar } from "expo-status-bar";
import { useState, useCallback } from "react";
import { useFonts } from "expo-font";

import Navigation from "./components/Navigation";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import FavoritesContextProvider from "./context/FavoriteContextProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// SplashScreen.preventAutoHideAsync();

/* The App starts here. This file is mainly decicated to navigation
    At the moment, the app has two navigators in use, Stack Navigator and Bottom tab navigator
      We have used React native navigation library, for more info see: https://reactnavigation.org/docs/getting-started
   We have used "nested navigation" for flexible navigation between screens
*/

export default function App() {
  /* Certainly not an optimal way for impelementing OnboardingScreen logic since it now resets every time app is opened. This should be changed in the future
    Change initial state below inside useState parentheses to true if you want to display OBscreen when the app starts.
  */
  const [firstTime, setFirstTime] = useState(true);

  // Loading fonts from the assets folder. Keep Splash screen on until fonts are loaded
  const [fontsLoaded] = useFonts({
    "noto-serif": require("./assets/fonts/NotoSerif-Regular.ttf"),
    "noto-serif-bold": require("./assets/fonts/NotoSerif-Bold.ttf"),
  });

  // empty placeholder function that should be replaced with function below if critical assets are needed to load during startup
  const onLayoutRootView = () => {};

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     try {
  //       await SplashScreen.hideAsync();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  function onBoardingCompleted() {
    setFirstTime(false);
  }

  return (
    <>
      <StatusBar style="dark" />
      {firstTime ? (
        <GestureHandlerRootView
          style={{ flex: 1, backgroundColor: "transparent" }}
          onLayout={onLayoutRootView}
        >
          <OnBoardingScreen
            firstTime={onBoardingCompleted}
            modalShown={firstTime}
          />
          <FavoritesContextProvider>
            <Navigation />
          </FavoritesContextProvider>
        </GestureHandlerRootView>
      ) : (
        <GestureHandlerRootView
          style={{ flex: 1, backgroundColor: "transparent" }}
          onLayout={onLayoutRootView}
        >
          <FavoritesContextProvider>
            <Navigation />
          </FavoritesContextProvider>
        </GestureHandlerRootView>
      )}
    </>
  );
}
