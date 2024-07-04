import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../hooks/useLanguage';
import {HeaderBar} from '../../components';
import WithdrawTokenScreen from './WithdrawTokenScreen';
import {IconDeposit, IconHistory} from '../../assets/icon/Icon';
import {HistoryTransactionScreen} from '../Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HistoryTokenDataScreen from './HistoryTokenDataScreen';
const Tab = createBottomTabNavigator();

export default function FinancialTokenScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="WithdrawTokenScreen"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#F0B90B',
        tabBarInactiveTintColor: '#000000',
        header: props => (
          <HeaderBar
            {...props}
            options={{
              headerLeftNavigate: 'WalletTokenScreen',
              ...props.options,
            }}
            back
          />
        ),
      }}>
      <Tab.Screen
        name={'WithdrawTokenScreen'}
        component={WithdrawTokenScreen}
        options={{
          tabBarLabel: t('withdraw_point_voucher'),
          tabBarIcon: ({focused}) => (
            <IconDeposit fill={focused && '#F0B90B'} />
          ),
        }}
      />
      <Tab.Screen
        name={'HistoryTokenDataScreen'}
        component={HistoryTokenDataScreen}
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

const styles = StyleSheet.create({});
