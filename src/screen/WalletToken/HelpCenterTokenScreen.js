import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {MainWrapper} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import WebView from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

export default function HelpCenterTokenScreen() {
  const {t} = useLanguage();
  const params = useRoute().params;
  return (
    <MainWrapper headerTitle={t('help_center')} scrollEnabled={false}>
      <WebView
        source={{
          uri: params?.uri,
        }}
        style={{flex: 1}}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
