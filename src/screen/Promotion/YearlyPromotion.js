import React from 'react';
import {StyleSheet} from 'react-native';
import {images, scale} from '../../assets/constants';
import BoxPlaceItem from '../Explore/components/ContentAccommodation/BoxPlaceItem';
import WrapperContent from '../Explore/components/WrapperContent';
import PromotionCard from './components/PromotionCard';

export default function YearlyPromotion() {
  return (
    <WrapperContent
      heading={'Yearly Promo'}
      dataList={[...Array(4)].map(item => '321')}
      isList
      renderItem={({item}) => (
        <PromotionCard
          rental="Yearly"
          colorTicket={'#E8505B'}
          discountText={'55'}
          date={'20/10/2024 - 12/12/2024'}
          image={images.voucher50}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});
