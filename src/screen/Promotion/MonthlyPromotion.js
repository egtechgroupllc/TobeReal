import React from 'react';
import {StyleSheet} from 'react-native';
import {images, scale} from '../../assets/constants';
import BoxPlaceItem from '../Explore/components/ContentAccommodation/BoxPlaceItem';
import WrapperContent from '../Explore/components/WrapperContent';
import PromotionCard from './components/PromotionCard';

export default function MonthlyPromotion() {
  return (
    <WrapperContent
      heading={'Monthly Promo'}
      dataList={[...Array(4)]}
      isList
      renderItem={({item}) => (
        <PromotionCard
          rental="Monthly"
          colorTicket={'#8DB6FF'}
          discountText={'45'}
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
