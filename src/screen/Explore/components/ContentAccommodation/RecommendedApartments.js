import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import {scale} from '../../../../assets/constants';

export default function RecommendedApartments({
  isSeeAll = true,
  isCategory = true,
}) {
  return (
    <WrapperContent
      isSeeAll={isSeeAll}
      isCategory={isCategory}
      onPressSeeAll={() => console.log(1)}
      onPressCategory={item => console.log(item)}
      heading="Recommended Apartments 🏬">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[...Array(10)]}
        contentContainerStyle={styles.content}
        renderItem={({item, index}) => (
          <BoxPlaceItem
            key={`key-${item}-${index}`}
            seeViewNumber={1.5}
            multiPrice="viewMultiPrice2"
            isUnitAvailable
            rating={4}
            textRating={index % 2 !== 0 && 'New'}
            isHeart
            data={index}
          />
        )}
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});
// no 159 v1.0
// vrvi 160 v1.0
