import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../hooks/useLanguage';
import {HeaderBar} from '../../components';
import WithdrawTokenScreen from './WithdrawTokenScreen';
import {IconDeposit, IconHistory} from '../../assets/icon/Icon';
import {HistoryTransactionScreen} from '../Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HistoryTokenDataScreen from './HistoryTokenDataScreen';
import {COLORS, scale, WIDTH} from '../../assets/constants';
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
        tabBarActiveTintColor: COLORS.pioPrimary,
        tabBarInactiveTintColor: COLORS.black,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          WIDTH.widthScreen > 700 && {
            height: scale(50),
          },
          {
            zIndex: -1,
          },
          {
            backgroundColor: COLORS.white,
            borderTopWidth: 1,
            borderColor: COLORS.pioBox,
          },
        ],
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
            <IconDeposit fill={focused && COLORS.pioPrimary} />
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
              fill={focused && COLORS.pioPrimary}
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
