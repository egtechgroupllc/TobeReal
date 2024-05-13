import React from 'react';

import {useRoute} from '@react-navigation/native';
import MainWrapper from '../../../components/MainWrapper';
import HorizontalStepIndicator from '../components/BookingRoom/HorizontalStepIndicator';
import {scale} from '../../../assets/constants';

export default function BookingRoomScreen() {
  const params = useRoute().params;
  return <HorizontalStepIndicator data={params} />;
}
