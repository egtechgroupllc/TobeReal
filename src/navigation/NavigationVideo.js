import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';

import routerVideo from '../router/routerVideo';

const Stack = createNativeStackNavigator();

export default function NavigationVideo() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routerVideo.map(router => (
        <Stack.Screen
          key={router.name}
          name={router.name}
          component={router.component}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
