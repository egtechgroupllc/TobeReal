import React from 'react';
import {StyleSheet} from 'react-native';
import {images, scale} from '../../assets/constants';
import BoxPlaceItem from '../Explore/components/ContentAccommodation/BoxPlaceItem';
import WrapperContent from '../Explore/components/WrapperContent';
import PromotionCard from './components/PromotionCard';
import { useLanguage } from '../../hooks/useLanguage';

export default function DailyPromotion() {
  const {t}= useLanguage()
  return (
    <WrapperContent
      heading={t('daily_promo')}
      dataList={[...Array(4)].map(item => '321')}
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
