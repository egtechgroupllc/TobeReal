import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS, scale} from '../../../../../assets/constants';
import ItemBoxReview from './ItemBoxReview';
import ReviewOverview from './ReviewOverview';
import FilterSort from './FilterSort';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getListReviewAccmo} from '../../../../../Model/api/apiAccom';
import ItemBoxReviewLoading from './ItemBoxReviewLoading';

export default function ReviewAll({valueSort, onSort, id_accomo}) {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['accommodation', 'list-review', 1],
    queryFn: () => getListReviewAccmo({id_accomo}),
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage?.data?.rows?.length <= 0)) return allPages.length + 1;

      return undefined;
    },
  });

  const dataArr = useMemo(
    () =>
      data?.pages
        .map(page => {
          if (!page) return undefined;
          return page?.data?.rows;
        })
        .flat(),
    [data?.pages],
  );

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
        data={[...Array(3)]}
        contentContainerStyle={{
          marginTop: scale(20),
          rowGap: scale(30),
          paddingHorizontal: scale(20),
        }}
        scrollEnabled={false}
        renderItem={({item, index}) =>
          item ? (
            <ItemBoxReview
              style={{
                width: '100%',
                borderTopWidth: 1,
                borderRadius: 0,
                borderTopColor: '#eee',
              }}
              numberOfLines={0}
              isShadow={false}
              key={`key-${item}-${index}`}
            />
          ) : (
            <ItemBoxReviewLoading />
          )
        }
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
