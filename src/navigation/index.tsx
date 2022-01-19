import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome'
import Weather from '../screens/Weather'

import routes from './routes'

export type NavigationParamList = {
  [routes.App.Home]: undefined
  [routes.App.Weather]: undefined
}

const Stack = createStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{ headerShown: false }} 
            initialRouteName={routes.App.Home}>
          <Stack.Screen 
            name={routes.App.Home} 
            component={Welcome} 
        />
          <Stack.Screen  
            name={routes.App.Weather} 
            component={Weather} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }