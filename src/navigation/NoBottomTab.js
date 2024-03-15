import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routerNoBottomTab from '../router/routerNoBottomTab';
import HeaderBar from '../components/HeaderBar';
const Stack = createNativeStackNavigator();

export default function NoBottomTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#f7f9fa',
        },
        header: props => <HeaderBar {...props} />,
      }}>
      <Stack.Group>
        {routerNoBottomTab.map(router => (
          <Stack.Screen
            key={router.name}
            name={router.name}
            component={router.component}
            options={router?.options}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
}
