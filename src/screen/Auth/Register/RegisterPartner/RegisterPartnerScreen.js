import React from 'react';
import MainAuth from '../../components/MainAuth';
import ContentPartner from '../components/ContentPartner';
import {scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function RegisterPartnerScreen() {
  const {t} = useLanguage();

  return (
    <MainAuth
      heading={t('create_an_account')}
      subHeading={t('connect_with_your_friend')}
      style={{marginTop: scale(30)}}>
      <ContentPartner />
    </MainAuth>
  );
}
