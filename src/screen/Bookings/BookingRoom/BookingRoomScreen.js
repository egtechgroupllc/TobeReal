import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MainWrapper from '../../../components/MainWrapper';
import HorizontalStepIndicator from '../components/BookingRoom/HorizontalStepIndicator';
import Content from '../components/BookingRoom/Content';
import {useRoute} from '@react-navigation/native';

export default function BookingRoomScreen() {
  const params = useRoute().params;
  console.log(params);
  return (
    <MainWrapper scrollEnabled={false}>
      <HorizontalStepIndicator data={params} />
    </MainWrapper>
  );
}
