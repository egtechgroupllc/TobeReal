import React from 'react';
import Content from './components/Content';
import MainAuth from '../components/MainAuth';

export default function RegisterScreen() {
  return (
    <MainAuth
      heading={'Create an account'}
      subHeading={'Connect with your friends today!'}>
      <Content />
    </MainAuth>
  );
}
