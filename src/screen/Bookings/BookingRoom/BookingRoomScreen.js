import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MainWrapper from '../../../components/MainWrapper';
import HorizontalStepIndicator from '../components/BookingRoom/HorizontalStepIndicator';
import Content from '../components/BookingRoom/Content';

export default function BookingRoomScreen() {
  return (
    <MainWrapper>
      <HorizontalStepIndicator />
      <Content />
    </MainWrapper>
  );
}
