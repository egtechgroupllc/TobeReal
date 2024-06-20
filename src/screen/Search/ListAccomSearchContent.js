/* eslint-disable react-hooks/exhaustive-deps */
import {useRoute} from '@react-navigation/native';
import {useInfiniteQuery} from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import React, {useMemo} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {getListRent} from '../../Model/api/apiAccom';
import {animations, scale} from '../../assets/constants';
import EmptyData from '../../components/EmptyData';
import ItemAccommdSearch from './components/ItemAccommdSearch';
import ItemAccommdSearchLoading from './components/ItemAccommdSearchLoading';

export default function ListAccomSearchContent({
  paramsFilter,
  location,
  country,
  currency,
}) {
  const insets = useSafeAreaInsets();
  const params = useRoute().params;

  const objFilter = useMemo(
    () => ({
      ...paramsFilter,
      date_end: paramsFilter?.date?.date_end,
      date_start: paramsFilter?.date?.date_start,
      country_id: country?.id,
      accommodation_type_id: paramsFilter?.type,
      name: paramsFilter?.name,
      latitude: paramsFilter?.near_me ? location?.latitude : '',
      longitude: paramsFilter?.near_me ? location?.longitude : '',
      distance: paramsFilter?.near_me ? 5000 : '',
      province_id: paramsFilter?.province?.id || paramsFilter?.province_id,
      currency_id: currency?.id,
    }),
    [JSON.stringify([paramsFilter, location]), country?.id, currency?.id],
  );
  console.log(objFilter);
  const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useInfiniteQuery({
      queryKey: [
        'accommodation',
        'list-rent',
        'search',
        JSON.stringify(objFilter),
      ],
      queryFn: paramsQuery => getListRent({...objFilter, ...paramsQuery}),
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
    <View style={{flex: 1}}>
      <Animated.FlatList
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        data={dataArr || (isLoading && [...Array(2)])}
        contentContainerStyle={{
          ...styles.content,
          paddingBottom: insets.bottom + scale(20),
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
        ListEmptyComponent={() => (
          <EmptyData
            styleWrapper={{
              marginTop: '40%',
            }}
          />
        )}
        onEndReached={hasNextPage && fetchNextPage}
        onEndReachedThreshold={0.5}
        renderItem={({item, index}) => {
          return item ? (
            <ItemAccommdSearch
              objFilter={objFilter}
              key={`key_${item?.id}-${index}`}
              isButtonBottom
              isStar
              isRating
              rating={3}
              data={item}
              isDiscount
            />
          ) : (
            <ItemAccommdSearchLoading key={index} />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    rowGap: scale(14),
    paddingHorizontal: scale(16),
    paddingTop: scale(70),
  },
});
