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
import {useLanguage} from '../../../hooks/useLanguage';
const Tab = createBottomTabNavigator();

export default function FinancialScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

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
          tabBarLabel: t('deposit'),
          tabBarIcon: ({focused}) => (
            <IconDeposit fill={focused && '#F0B90B'} />
          ),
        }}
      />
      <Tab.Screen
        name={'WithdrawScreen'}
        component={WithdrawScreen}
        options={{
          tabBarLabel: t('withdraw'),
          tabBarIcon: ({focused}) => (
            <IconWithdraw fill={focused && '#F0B90B'} />
          ),
        }}
      />
      <Tab.Screen
        name={'HistoryTransaction'}
        component={HistoryTransactionScreen}
        options={{
          tabBarLabel: t('transaction_history'),
          tabBarIcon: ({focused}) => (
            <IconHistory fill={focused && '#F0B90B'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
