import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HeaderBar from '../components/HeaderBar';
import routerWalletToken from '../router/routerWalletToken';
const Stack = createNativeStackNavigator();

export default function NavigateWalletToken() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: props => <HeaderBar {...props} />,
      }}>
      {routerWalletToken.map(router => (
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
