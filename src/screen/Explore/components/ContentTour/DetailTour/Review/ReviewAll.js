import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS, scale} from '../../../../../../assets/constants';
import ItemBoxReview from './ItemBoxReview';
import ReviewOverview from './ReviewOverview';
import FilterSort from './FilterSort';

const data = [
  {
    id: 1,
    user: 'John',
    content:
      'Central location, friendly staff, full and delicious buffet breakfast.',
    date: '12-02-2024 21:08',
  },
  {
    id: 2,
    user: 'David',
    content: "I really like the hotel's shower gel and shampoo! tasty!",
    date: '27-01-2024 21:08',
  },
  {
    id: 3,
    user: 'Jack',
    content: 'Very good!',
    date: '17-03-2024 21:08',
  },
];
export default function ReviewAll({valueSort, onSort}) {
  return (
    <View>
      <ReviewOverview />

      <FilterSort
        isSelectAll
        onSort={onSort}
        sort={valueSort}
        listFill={[
          {
            text: 'All',
          },
          {
            text: 'Have pictures',
          },
        ]}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{
          rowGap: scale(10),
          // alignItems: 'center',
          paddingHorizontal: scale(20),
        }}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <ItemBoxReview
            style={{
              width: '100%',
              borderTopWidth: 1,
              borderTopColor: '#eee',
              borderRadius: scale(10),
              backgroundColor: COLORS.grey,
            }}
            data={item}
            numberOfLines={0}
            isShadow={false}
            key={`key-${item}-${index}`}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reviewOverview: {
    flexDirection: 'row',
    columnGap: scale(10),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overviewLeft: {
    minWidth: '30%',
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  overviewRight: {
    // flex: 1,
    minWidth: '50%',
    rowGap: scale(6),
  },
});
