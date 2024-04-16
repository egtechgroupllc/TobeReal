import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';

import {HistoryTransactionScreen, ListMethodBankScreen} from '.';
import {COLORS, scale} from '../../../assets/constants';
import {IconBookings, IconHistory} from '../../../assets/icon/Icon';
import HeaderBar from '../../../components/HeaderBar';
const Tab = createBottomTabNavigator();

export default function FinancialScreen() {
  return (
    <Tab.Navigator
      initialRouteName="ListMethodBankScreen"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#F0B90B',
        tabBarInactiveTintColor: '#000000',
        header: props => (
          <HeaderBar
            {...props}
            options={{
              headerLeftNavigate: 'ProfileScreen',
              ...props.options,
            }}
            back
          />
        ),
      }}>
      <Tab.Screen
        name={'ListMethodBankScreen'}
        component={ListMethodBankScreen}
        options={{
          tabBarLabel: 'Depossit',
          tabBarIcon: ({focused}) => (
            <IconBookings fill={focused && '#F0B90B'} />
          ),
        }}
      />
      <Tab.Screen
        name={'HistoryTransaction'}
        component={HistoryTransactionScreen}
        options={{
          tabBarLabel: 'Transaction history',
          tabBarIcon: ({focused}) => (
            <IconHistory fill={focused && '#F0B90B'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
