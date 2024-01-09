
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routerAuth from '../router/routerAuth';

const Stack = createNativeStackNavigator();

export default function NavigationAuth() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routerAuth.map(router => (
        <Stack.Screen
          key={router.name}
          name={router.name}
          component={router.component}
        />
      ))}
    </Stack.Navigator>
  );
}