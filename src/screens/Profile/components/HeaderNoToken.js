import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '../../../components';
import {useLanguage} from '../../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from '~/utils/scale';
import {COLORS} from '~/assets/constants';

export default function HeaderNoToken() {
  const {t} = useLanguage();
  const {navigate, goBack} = useNavigation();

  return (
    <View style={{...styles.wrapper}}>
      <Button
        text={t('login')}
        buttonType="large"
        style={{
          backgroundColor: '#fff',
          flex: 1,
          borderColor: '#fff',
        }}
        outline
        onPress={() => {
          navigate('NavigationAuth');
        }}
        styleWrapper={{
          height: scale(50),
        }}
      />
      <Button
        text={t('signup')}
        buttonType="large"
        styleText={{
          color: '#fff',
        }}
        style={{
          flex: 1,
          borderColor: '#fff',
        }}
        styleWrapper={{
          height: scale(50),
        }}
        outline
        onPress={() => {
          navigate('NavigationAuth', {screen: 'RegisterScreen'});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
    columnGap: scale(10),
    alignItems: 'center',
  },
});
