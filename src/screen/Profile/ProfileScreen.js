import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainAuth from '../../components/MainAuth';
import AvatarImage from './components/AvatarImage';
import Content from './components/Content';
import Bottom from './components/Bottom';
import HeaderAvatar from './components/HeaderAvatar';
import Header from '../Explore/components/Header';

export default function ProfileScreen() {
  const goBack = () => {};
  const upgrade = () => {};
  return (
    <MainAuth>
      <HeaderAvatar noti={true} notify={goBack} heading={'Profile'} />
      <AvatarImage upgrade={true} name={'John'} onPressUpgrade={upgrade} />
      <Content />
      <Bottom />
    </MainAuth>
  );
}
