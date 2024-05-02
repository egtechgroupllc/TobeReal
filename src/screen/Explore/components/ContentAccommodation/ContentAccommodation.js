import React from 'react';
import {StyleSheet, View} from 'react-native';
import {images, scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import WrapperContent from '../WrapperContent';
import AccommodationPremium from './AccommodationPremium';
import BestSelling from './BestSelling';
import BigCity from './BigCity';
import FindApartmentFitsBudget from './FindApartmentFitsBudget/FindApartmentFitsBudget';
import FindBest from './FindBest';
import HotelResidence from './HotelResidence';
import RecommendedApartments from './RecommendedApartments';
import RecommendedUnit from './RecommendedUnit';
import StayMonthly from './StayMonthly ';
import ThematicInstagram from './ThematicInstagram';
import VideoInfluencerApproved from './VideoInfluencer/VideoInfluencerApproved';
import WeeklyHotDeal from './WeeklyHotDeal';

export default function ContentAccommodation() {
  const {t} = useLanguage();
  return (
    <View style={styles.wrapper}>
      <HotelResidence />
      {/* <RecommendedUnit data={data} /> */}
      {/* <StayMonthly /> */}
      <ThematicInstagram />
      <FindBest />

      <AccommodationPremium />
      {/* <VideoInfluencerApproved /> */}
      {/* <FindApartmentFitsBudget /> */}

      <WeeklyHotDeal />

      {/* <BestSelling /> */}

      <RecommendedApartments />

      <BigCity />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: scale(16),
    rowGap: scale(10),
  },
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});
