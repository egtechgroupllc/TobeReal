import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import routerHome from '~/routers/routerHome';

const Stack = createNativeStackNavigator();

export default function NavigationHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routerHome.map(router => (
        <Stack.Screen
          key={router.name}
          name={router.name}
          component={router.component}
          options={router.options}
        />
      ))}
    </Stack.Navigator>
  );
}
