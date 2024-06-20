import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SHADOW, scale} from '../../../assets/constants';
import BoxItemProfile from './BoxItemProfile';
import {useLanguage} from '../../../hooks/useLanguage';
import {IconDeposit} from '../../../assets/icon/Icon';

export default function Content1() {
  const {t} = useLanguage();

  return (
    <View
      style={{
        backgroundColor: '#fff',
        ...SHADOW,
        padding: scale(12),
      }}>
      <BoxItemProfile Icon={IconDeposit} title={t('financial_management')} />
      <BoxItemProfile title={t('financial_management')} />
      <BoxItemProfile title={'Đăng nhập và bảo mật'} />
    </View>
  );
}

const styles = StyleSheet.create({});
