import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HeaderBar from '../components/HeaderBar';
import routerNoBottomTab from '../router/routerNoBottomTab';
const Stack = createNativeStackNavigator();

export default function NoBottomTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: props => <HeaderBar {...props} />,
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
