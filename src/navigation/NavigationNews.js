import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerNews from '../router/routerNews';

const Stack = createNativeStackNavigator();

export default function NavigationNews() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routerNews.map(router => (
        <Stack.Screen
          key={router.name}
          name={router.name}
          component={router.component}
        />
      ))}
    </Stack.Navigator>
  );
}
