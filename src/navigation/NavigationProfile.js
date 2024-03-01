import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerProfile from '../router/routerProfile';
import {useAuthentication} from '../hooks/useAuthentication';
import {useIsFocused, useNavigation} from '@react-navigation/native';

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
