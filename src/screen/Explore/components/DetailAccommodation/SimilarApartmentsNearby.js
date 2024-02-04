import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from '../ContentAccommodation/BoxPlaceItem';
import { useLanguage } from '../../../../hooks/useLanguage';

export default function SimilarApartmentsNearby() {
  const {t}= useLanguage()
  return (
    <WrapperContent
      heading={t('browse_similar')}
      dataList={[...Array(4)].map(item => '1')}
      renderItem={({item, index}) => (
        <BoxPlaceItem
          key={`key-${item}-${index}`}
          seeViewNumber={1.5}
          multiPrice="viewMultiPrice2"
          isUnitAvailable
          rating={4}
          textRating={index % 2 !== 0 && 'New'}
          isHeart
          // jsonImage={item?.imgdetail}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
