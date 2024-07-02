import React from 'react';
import MainAuth from '../../components/MainAuth';
import ContentPartner from '../components/ContentPartner';
import {scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import {MainWrapper} from '../../../../components';

export default function RegisterPartnerScreen({route}) {
  const {t} = useLanguage();
  const dataRou = route?.params;

  return (
    <MainAuth
      isShowHeader={dataRou?.isShowHeader}
      heading={t('create_an_account')}
      subHeading={t('connect_with_your_friend')}
      style={{marginTop: scale(30)}}>
      <ContentPartner />
    </MainAuth>
  );
}
