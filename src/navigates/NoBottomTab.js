import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HeaderBar} from '~/components';
import routerNoBottomTab from '~/routers/routerNoBottomTab';
const Stack = createNativeStackNavigator();

export default function NoBottomTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: props => <HeaderBar {...props} />,
        headerTransparent: true,
      }}>
      {routerNoBottomTab.map(router => (
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
