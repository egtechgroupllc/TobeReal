import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BoxPlaceItem from '../Explore/components/ContentAccommodation/BoxPlaceItem';
import {scale} from '../../assets/constants';

export default function WishList({data}) {
  return (
    <View style={styles.contentList}>
      {data.map((item, index) => (
        <BoxPlaceItem
          key={`key-${item}-${index}`}
          seeViewNumber={2.3}
          isHeart
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contentList: {
    gap: scale(14),
    paddingVertical: scale(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
