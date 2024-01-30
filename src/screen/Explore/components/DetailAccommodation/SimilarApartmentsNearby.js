import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from '../ContentAccommodation/BoxPlaceItem';

export default function SimilarApartmentsNearby() {
  return (
    <WrapperContent
      heading={'Browse Similar Apartments Nearby'}
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
          data={index}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
