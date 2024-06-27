import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, WIDTH, scale} from '../../../assets/constants';
import {CustomButton} from '../../../components';
import {useLanguage} from '../../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function HeaderNoToken() {
  const {t} = useLanguage();
  const {navigate, goBack} = useNavigation();

  return (
    <View style={{...styles.wrapper}}>
      <CustomButton
        text={t('login')}
        buttonType="large"
        styleText={{color: COLORS.white}}
        style={{
          backgroundColor: COLORS.primary,
          flex: 0.5,
        }}
        outline
        onPress={() => {
          navigate('NavigationAuth');
        }}
      />
      <CustomButton
        text={t('signup')}
        buttonType="large"
        style={{
          flex: 0.5,
          backgroundColor: COLORS.white,
          borderColor: '#fff',
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
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    columnGap: scale(10),
  },
});
