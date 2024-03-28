import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerNews from '../router/routerNews';
import HeaderBar from '../components/HeaderBar';

const Stack = createNativeStackNavigator();

export default function NavigationNews() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: props => <HeaderBar {...props} />,
      }}>
      {routerNews.map(router => (
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
