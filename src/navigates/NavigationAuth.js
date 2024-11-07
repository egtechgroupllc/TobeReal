import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerAuth from '~/routers/routerAuth';
import {HeaderBar} from '~components';

const Stack = createNativeStackNavigator();

export default function NavigationAuth() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        header: props => <HeaderBar {...props} />,
        headerTransparent: true,
      }}>
      {routerAuth.map(router => (
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
