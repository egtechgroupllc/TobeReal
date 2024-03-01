import React from 'react';
import {useLanguage} from '../../../hooks/useLanguage';
import MainAuth from '../components/MainAuth';
import Content from './components/Content';

export default function LoginScreen() {
  const {t} = useLanguage();
  return (
    <MainAuth heading={t('welcome_back') + ' 👋'}>
      <Content />
    </MainAuth>
  );
}
