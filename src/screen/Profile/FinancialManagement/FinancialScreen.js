import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';

import {HistoryTransactionScreen, ListMethodBankScreen} from '.';
import {COLORS, scale} from '../../../assets/constants';
import {
  IconBookings,
  IconDeposit,
  IconHistory,
  IconWithdraw,
} from '../../../assets/icon/Icon';
import HeaderBar from '../../../components/HeaderBar';
import WithdrawScreen from './WithdrawScreen';
const Tab = createBottomTabNavigator();

export default function FinancialScreen() {
  return (
    <Tab.Navigator
      initialRouteName="ListMethodBankScreen"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: COLORS.green,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
        },
        tabBarInactiveTintColor: COLORS.white,
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
            <IconDeposit fill={focused && COLORS.green} />
          ),
        }}
      />
      <Tab.Screen
        name={'WithdrawScreen'}
        component={WithdrawScreen}
        options={{
          tabBarLabel: 'Withdraw',
          tabBarIcon: ({focused}) => (
            <IconWithdraw fill={focused && COLORS.green} />
          ),
        }}
      />
      <Tab.Screen
        name={'HistoryTransaction'}
        component={HistoryTransactionScreen}
        options={{
          tabBarLabel: 'Transaction history',
          tabBarIcon: ({focused}) => (
            <IconHistory fill={focused && COLORS.green} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
