import React from 'react';
import MainAuth from '../../components/MainAuth';
import ContentPartner from '../components/ContentPartner';
import {scale} from '../../../../assets/constants';

export default function RegisterPartnerScreen() {
  return (
    <MainAuth
      heading={'Create an account'}
      subHeading={'Connect with your friends today!'}
      style={{marginTop: scale(10)}}>
      <ContentPartner />
    </MainAuth>
  );
}
