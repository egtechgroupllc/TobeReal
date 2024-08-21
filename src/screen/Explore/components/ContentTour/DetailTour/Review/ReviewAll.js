import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS, scale} from '../../../../../../assets/constants';
import ReviewOverview from './ReviewOverview';
import FilterSort from './FilterSort';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getListReviewAccmo} from '../../../../../../Model/api/apiAccom';
import {getListReviewTour} from '../../../../../../Model/api/apiTour';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import ItemBoxReview from './ItemBoxReview';

export default function ReviewAll({valueSort, onSort, id_tour, dataP}) {
  const {t} = useLanguage();

  const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useInfiniteQuery({
      queryKey: ['tour', 'list-review', {id_tour}],
      queryFn: params =>
        getListReviewTour({id_tour, pageParam: params.pageParam}),
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
            text: t('all'),
          },
          {
            text: t('have_pictures'),
          },
        ]}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataArr || (isLoading && [...Array(3)])}
        contentContainerStyle={{
          rowGap: scale(10),
          alignItems: 'center',
        }}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <ItemBoxReview
            isViewAll
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
