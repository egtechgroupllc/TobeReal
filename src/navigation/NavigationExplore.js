import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerExplore from '../router/routerExplore';
import {COLORS} from '../assets/constants';

const Stack = createNativeStackNavigator();

export default function NavigationExplore() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routerExplore.map(router => (
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
