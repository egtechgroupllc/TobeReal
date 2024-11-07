import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WithdrawTokenScreen from './WithdrawTokenScreen';
import {HistoryTransactionScreen} from '../Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HistoryTokenDataScreen from './HistoryTokenDataScreen';
import {useLanguage} from '~/hooks/useLanguage';
import {HeaderBar} from '~/components';
import {IconDeposit, IconHistory} from '~/assets/icon/Icon';
import {scale} from '~/utils/scale';
const Tab = createBottomTabNavigator();

export default function FinancialTokenScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const data = useRoute().params;

  return (
    <Tab.Navigator
      initialRouteName="WithdrawTokenScreen"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#F0B90B',
        tabBarInactiveTintColor: '#000000',
        tabBarHideOnKeyboard: true,

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
        initialParams={data}
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
            <IconHistory
              fill={focused && '#F0B90B'}
              width={scale(15)}
              height={scale(15)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
