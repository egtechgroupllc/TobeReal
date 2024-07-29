import React from 'react';
import {useLanguage} from '../../../hooks/useLanguage';
import MainAuth from '../components/MainAuth';
import Content from './components/Content';
import {useRoute} from '@react-navigation/native';

export default function LoginScreen() {
  const {t} = useLanguage();

  return (
    <MainAuth heading={t('welcome_back') + ' 👋'}>
      <Content />
    </MainAuth>
  );
}
