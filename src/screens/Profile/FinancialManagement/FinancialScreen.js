import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Platform} from 'react-native';

import {HistoryTransactionScreen, ListMethodBankScreen} from '.';

import HeaderBar from '../../../components/HeaderBar';
import WithdrawScreen from './WithdrawScreen';
import {useLanguage} from '../../../hooks/useLanguage';
import {scale} from '~/utils/scale';
import {COLORS, WIDTH} from '~/assets/constants';
import {
  IconDeposit,
  IconGoBack,
  IconHistory,
  IconWithdraw,
} from '~/assets/icon/Icon';
import {Button} from '~/components';
const Tab = createBottomTabNavigator();

export default function FinancialScreen() {
  const {t} = useLanguage();
  const {goBack} = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="ListMethodBankScreen"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: COLORS.cyan,
        tabBarInactiveTintColor: COLORS.White,
        tabBarItemStyle: {
          columnGap: scale(4),
        },
        headerLeft: () => {
          return (
            <Button.Icon
              Icon={IconGoBack}
              fill={COLORS.White}
              onPress={() => goBack()}
            />
          );
        },
        tabBarHideOnKeyboard: true,
        headerTransparent: true,
        tabBarStyle: [
          WIDTH.widthScreen > 700 && {
            height: scale(50),
          },
          {
            zIndex: -1,
          },
          {
            backgroundColor: COLORS.blueView,
          },
          {paddingBottom: Platform.OS === 'android' ? scale(5) : scale(30)},
        ],
      }}>
      <Tab.Screen
        name={'ListMethodBankScreen'}
        component={ListMethodBankScreen}
        options={{
          tabBarLabel: t('deposit'),
          tabBarIcon: ({focused}) => (
            <IconDeposit
              fill={focused ? COLORS.cyan : COLORS.White}
              width={scale(22)}
              height={scale(22)}
            />
          ),
          header: props => <HeaderBar {...props} />,
        }}
      />
      <Tab.Screen
        name={'WithdrawScreen'}
        component={WithdrawScreen}
        options={{
          tabBarLabel: t('withdraw'),
          tabBarIcon: ({focused}) => (
            <IconWithdraw
              fill={focused ? COLORS.cyan : COLORS.White}
              width={scale(17)}
              height={scale(17)}
            />
          ),
          header: props => <HeaderBar {...props} />,
        }}
      />
      <Tab.Screen
        name={'HistoryTransaction'}
        component={HistoryTransactionScreen}
        options={{
          tabBarLabel: t('transaction_history'),
          tabBarIcon: ({focused}) => (
            <IconHistory
              fill={focused ? COLORS.cyan : COLORS.White}
              width={scale(16)}
              height={scale(16)}
            />
          ),
          header: props => <HeaderBar {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}
