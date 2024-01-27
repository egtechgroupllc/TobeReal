import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RecommendedUnitItem from './RecommendedUnitItem';
import {scale} from '../../../../assets/constants';

export default function BigCity({
  styleItem,
  styleWrapper,
  styesTextTitle,
  onPress,
}) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={[...Array(10)]}
      contentContainerStyle={[styles.content, styleWrapper]}
      renderItem={({item, index}) => (
        <RecommendedUnitItem
          viewShow={2.5}
          isCenter
          styesWrapper={styleItem}
          styesTextTitle={styesTextTitle}
          onPress={() => onPress({item, index})}
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