import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from '../../../components/MainWrapper';
import Content from './components/Content';
import Auth from '../components/MainAuth';
import {useLanguage} from '../../../hooks/useLanguage';

export default function LoginScreen() {
  const {t} = useLanguage();
  return (
    <Auth heading={t('welcome_back') + ' 👋'}>
      <Content />
    </Auth>
  );
}
