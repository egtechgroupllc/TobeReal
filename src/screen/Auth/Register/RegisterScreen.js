import React from 'react';
import Content from './components/Content';
import MainAuth from '../components/MainAuth';
import {scale} from '../../../assets/constants';
import {useLanguage} from '../../../hooks/useLanguage';

export default function RegisterScreen() {
  const {t} = useLanguage();

  return (
    <MainAuth
      heading={t('create_an_account')}
      style={{marginTop: scale(40)}}
      subHeading={t('connect_with_your_friend')}>
      <Content />
    </MainAuth>
  );
}
