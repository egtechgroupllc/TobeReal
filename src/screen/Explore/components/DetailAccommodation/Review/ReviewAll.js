import {useInfiniteQuery} from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {getListReviewAccmo} from '../../../../../Model/api/apiAccom';
import {COLORS, animations, scale} from '../../../../../assets/constants';
import EmptyData from '../../../../../components/EmptyData';
import FilterSort from './FilterSort';
import ItemBoxReview from './ItemBoxReview';
import ItemBoxReviewLoading from './ItemBoxReviewLoading';
import ReviewOverview from './ReviewOverview';

export default function ReviewAll({valueSort, onSort, id_accomo, dataP}) {
  const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useInfiniteQuery({
      queryKey: ['accommodation', 'list-review', 1],
      queryFn: params =>
        getListReviewAccmo({id_accomo, pageParam: params.pageParam}),
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
      <ReviewOverview dataP={dataP} />

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
        data={dataArr || (isLoading && [...Array(3)])}
        contentContainerStyle={{
          marginTop: scale(20),
          rowGap: scale(30),
          paddingHorizontal: scale(20),
        }}
        scrollEnabled={false}
        onEndReached={hasNextPage && fetchNextPage}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => {
          return (
            <EmptyData
              styleWrapper={{
                marginTop: '10%',
              }}
            />
          );
        }}
        ListFooterComponent={() =>
          isFetchingNextPage && (
            <View
              style={{
                height: scale(30),
              }}>
              <LottieView
                autoPlay={true}
                source={animations.loading}
                style={{
                  height: '100%',
                }}
              />
            </View>
          )
        }
        renderItem={({item, index}) =>
          item?.id ? (
            <ItemBoxReview
              data={item}
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
            <ItemBoxReviewLoading isWidthFull />
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
