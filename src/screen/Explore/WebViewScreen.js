import {StyleSheet, Text, View, Linking} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {CustomButton, MainWrapper} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import WebView from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import Button from '../Profile/components/Button';
import {IconArrowLeft} from '../../assets/icon/Icon';
import {COLORS, scale} from '../../assets/constants';

export default function WebViewScreen() {
  const {t} = useLanguage();
  const params = useRoute().params;
  const {goBack} = useNavigation();
  return (
    <MainWrapper scrollEnabled={false}>
      {/* <CustomButton
        styleWrapper={{
          position: 'absolute',
          zIndex: 999,
        }}
        style={{backgroundColor: COLORS.white}}
        iconLeft={IconArrowLeft}
        onPress={() => {
          goBack();
        }}
      /> */}
      <WebView
        source={{
          uri: params?.uri,
        }}
        style={{flex: 1}}
        onShouldStartLoadWithRequest={event => {
          const url = event.url;

          if (url.startsWith('tobewallet://')) {
            // Dùng Linking để mở ngoài
            Linking.openURL(url).catch(err =>
              console.warn("Can't open URL:", err),
            );
            return false; // chặn WebView không tự mở
          }

          // Cho phép các URL bình thường
          return true;
        }}
        originWhitelist={['*']}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
