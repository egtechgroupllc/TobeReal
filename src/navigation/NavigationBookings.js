import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerBookings from '../router/routerBookings';
import HeaderBar from '../components/HeaderBar';

const Stack = createNativeStackNavigator();

export default function NavigationBookings() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        header: props => <HeaderBar {...props} />,
      }}>
      {routerBookings.map(router => (
        <Stack.Screen
          key={router.name}
          name={router.name}
          component={router.component}
          options={router?.options}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
