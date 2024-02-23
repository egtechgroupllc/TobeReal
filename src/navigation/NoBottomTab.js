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
      }}>
      <Stack.Group>
        {routerNoBottomTab.map(router => (
          <Stack.Screen
            key={router.name}
            name={router.name}
            component={router.component}
            options={{
              contentStyle: {
                backgroundColor: '#000',
              },
            }}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
}
