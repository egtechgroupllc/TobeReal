import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, images} from '~/assets/constants';
import {Button, MainWrapper} from '~/components';
import {scale} from '~/utils/scale';
import {colors} from '@styles';
import {IconGoBack} from '~/assets/icon/Icon';
import {IconChevronLeft} from '@tabler/icons-react-native';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '~/hooks/useLanguage';

export default function VerifyLoginScreen() {
  const {goBack, navigate} = useNavigation();
  const {t} = useLanguage();
  return (
    <MainWrapper
      noSafeArea
      noBackgroundColor
      scrollEnabled={false}
      sourceImage={images.bgAuth}
      styleContent={{
        paddingHorizontal: scale(20),
      }}>
      <View
        style={{
          paddingTop: scale(30),
          alignItems: 'flex-start',
        }}>
        <Button.Icon
          Icon={IconChevronLeft}
          noColor={false}
          btnColor={COLORS.White}
          onPress={() => goBack()}
        />
      </View>
      <View
        style={{
          marginTop: 'auto',
          marginBottom: scale(50),
          rowGap: scale(20),
        }}>
        <Button
          styleContent={{height: scale(50)}}
          linearGradientProps={{
            colors: [COLORS.Blue, COLORS.cyan, COLORS.cyan],
          }}
          title={t('sign_in')}
          styleText={{color: COLORS.White}}
          onPress={() => navigate('NavigationAuth', {screen: 'LoginScreen'})}
        />
        <Button
          backgroundColor={COLORS.White}
          styleContent={{height: scale(50)}}
          title={t('create_an_account')}
          styleText={{color: COLORS.black}}
          onPress={() => navigate('NavigationAuth', {screen: 'RegisterScreen'})}
        />
      </View>
    </MainWrapper>
  );
}
