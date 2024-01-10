
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerProfile from '../router/routerProfile';


const Stack = createNativeStackNavigator();

export default function NavigationProfile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routerProfile.map(router => (
        <Stack.Screen
          key={router.name}
          name={router.name}
          component={router.component}
        />
      ))}
    </Stack.Navigator>
  );
}