import React from 'react';
import Navigation from './src/navigation';
import { LogBox } from 'react-native';
import { useFonts } from "expo-font";
import { LocationProvider, useLocation } from './src/contexts'
import { Loading } from './src/components'

LogBox.ignoreLogs(["Require cycle:"])

export default function App() {
  const { isStorage } = useLocation();

  const [ fonts ] = useFonts({
    MontserratBold: require("./src/assets/fonts/Montserrat-Bold.ttf"),
    MontserratExtraBold: require("./src/assets/fonts/Montserrat-ExtraBold.ttf"),
    MontserratMedium: require("./src/assets/fonts/Montserrat-Medium.ttf"),
    MontserratRegular: require("./src/assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fonts) {
    return null
  }

  if(isStorage) {
    return <Loading />
  }

  return (
    <LocationProvider>
      <Navigation />
    </LocationProvider>
  )
}