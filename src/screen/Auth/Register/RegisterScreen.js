import React from 'react';
import Content from './components/Content';
import MainAuth from '../components/MainAuth';
import {scale} from '../../../assets/constants';

export default function RegisterScreen() {
  return (
    <MainAuth
      heading={'Create an account'}
      style={{marginTop: scale(40)}}
      subHeading={'Connect with your friends today!'}>
      <Content />
    </MainAuth>
  );
}
