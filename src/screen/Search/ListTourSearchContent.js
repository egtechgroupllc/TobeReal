import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getListRent} from '../../Model/api/apiAccom';
import {animations, scale} from '../../assets/constants';
import ItemAccommdSearch from './components/ItemAccommdSearch';
import ItemAccommdSearchLoading from './components/ItemAccommdSearchLoading';
import LottieView from 'lottie-react-native';
import {getListSell} from '../../Model/api/apiEstate';
import {getListTour} from '../../Model/api/apiTour';
import EmptyData from '../../components/EmptyData';
import {useRoute} from '@react-navigation/native';
import {type} from '../../components/Marquee';
import {useCountry} from '../../hooks/useCountry';
import ItemTourSearch from './components/componentTour/ItemTourSearch';

export default function ListTourSearchContent({paramsFilter, location}) {
  const insets = useSafeAreaInsets();

  const {currency} = useCountry();
  // const {data, isLoading, isError, error} = useQuery({
  //   queryKey: [
  //     'tour',
  //     'list-tour',
  //     {
  //       country_id: 241,
  //       province_id: filter?.province?.id,
  //       date_start: filter?.date?.date_start,
  //       date_end: filter?.date?.date_end,
  //       currency_id: currency?.id,
  //     },
  //   ],
  //   queryFn: () =>
  //     getListTour({
  //       country_id: 241,
  //       province_id: filter?.province?.id,
  //       date_start: filter?.date?.date_start,
  //       date_end: filter?.date?.date_end,
  //       currency_id: currency?.id,
  //     }),
  // });
  const {country} = useCountry();
  const objFilter = useMemo(
    () => ({
      ...paramsFilter,
      date_end: paramsFilter?.date?.date_end,
      date_start: paramsFilter?.date?.date_start,
      country_id:
        paramsFilter?.menu?.id === 'WORLD'
          ? paramsFilter?.country?.id || paramsFilter?.country_id
          : country?.id,
      // latitude: paramsFilter?.near_me ? location?.latitude : '',
      // longitude: paramsFilter?.near_me ? location?.longitude : '',
      // distance: paramsFilter?.near_me ? 5000 : '',
      province_id:
        paramsFilter?.menu?.id === 'DOMESTIC'
          ? paramsFilter?.province?.id || paramsFilter?.province_id
          : '',
      currency_id: currency?.id,
    }),
    [JSON.stringify([paramsFilter, location]), currency?.id, country?.id],
  );

  const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useInfiniteQuery({
      queryKey: ['tour', 'list-tour', JSON.stringify(objFilter)],
      queryFn: paramsQuery => getListTour({...objFilter, ...paramsQuery}),
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
  // const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
  //   useInfiniteQuery({
  //     queryKey: ['accommodation', 'list-rent'],
  //     queryFn: () =>
  //       getListRent({
  //         date_start: dataP?.date_start,
  //         date_end: dataP?.date_end,
  //         country_id: 241,
  //       }),
  //     getNextPageParam: (lastPage, allPages) => {
  //       if (!(lastPage?.data?.rows?.length <= 0)) return allPages.length + 1;

  //       return undefined;
  //     },
  //   });

  // const dataArr = useMemo(
  //   () =>
  //     data?.pages
  //       .map(page => {
  //         if (!page) return undefined;
  //         return page?.data?.rows;
  //       })
  //       .flat(),
  //   [data?.pages],
  // );

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
            <ItemTourSearch
              objFilter={objFilter}
              key={`key_${item?.id}-${index}`}
              isButtonBottom
              data={item}
              isStar
              isRating
              rating={3}
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
