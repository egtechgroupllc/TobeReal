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
  const insets = useSafeAreaInsets();
  return (
    <View style={{...styles.wrapper, paddingTop: insets.top + scale(20)}}>
      <CustomButton
        text={t('login')}
        buttonType="large"
        style={{
          backgroundColor: '#fff',
          flex: 0.5,
          borderColor: '#fff',
        }}
        outline
        onPress={() => {
          navigate('NavigationAuth');
        }}
      />
      <CustomButton
        text={t('signup')}
        buttonType="large"
        styleText={{
          color: '#fff',
        }}
        style={{
          flex: 0.5,
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
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    columnGap: scale(10),
  },
});
