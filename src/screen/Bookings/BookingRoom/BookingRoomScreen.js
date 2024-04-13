import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MainWrapper from '../../../components/MainWrapper';
import Content from './components/Content';
import HorizontalStepIndicator from './components/HorizontalStepIndicator';

export default function BookingRoomScreen() {
  return (
    <MainWrapper>
      {/* <Content /> */}
      <HorizontalStepIndicator />
    </MainWrapper>
  );
}
