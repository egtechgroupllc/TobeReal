import React from 'react';
import {StyleSheet} from 'react-native';
import {images, scale} from '../../assets/constants';
import BoxPlaceItem from '../Explore/components/ContentAccommodation/BoxPlaceItem';
import WrapperContent from '../Explore/components/WrapperContent';
import PromotionCard from './components/PromotionCard';

export default function DailyPromotion() {
  return (
    <WrapperContent
      heading={'Daily Promo'}
      dataList={[...Array(4)]}
      isList
      renderItem={({item}) => (
        <PromotionCard
          isReverse
          rental="Daily"
          discountText={'25'}
          date={'20/10/2024 - 12/12/2024'}
          image={images.voucher25}
        />
      )}
    />
  );
}
