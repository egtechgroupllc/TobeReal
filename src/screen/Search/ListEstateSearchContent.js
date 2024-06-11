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

export default function ListEstateSearchContent({
  paramsFilter,
  location,
  country,
  currency,
}) {
  const insets = useSafeAreaInsets();
  const params = useRoute().params;
  const filter = {...params, ...paramsFilter};

  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'estate',
      'list-post',
      'search',
      {
        // ...filter,
        estate_type_id: !paramsFilter?.type ? filter?.type : paramsFilter?.type,
        country_id: country?.id,
        title: filter?.name,
        latitude: params?.near_me ? location?.latitude : '',
        longitude: params?.near_me ? location?.longitude : '',
        distance: params?.near_me ? 5000 : '',
        currency_id: currency?.id,
        province_id: filter?.province?.id || filter?.province_id,
        min_size: filter?.acreage?.[0],
        max_size: filter?.acreage?.[1],
      },
    ],
    queryFn: () =>
      getListSell({
        // ...filter,
        country_id: country?.id,
        estate_type_id: !paramsFilter?.type ? filter?.type : paramsFilter?.type,
        title: filter?.name,
        latitude: !paramsFilter && params?.near_me ? location?.latitude : '',
        longitude: !paramsFilter && params?.near_me ? location?.longitude : '',
        distance: !paramsFilter && params?.near_me ? 5000 : '',
        currency_id: currency?.id,
        province_id: filter?.province?.id || filter?.province_id,
        min_size: filter?.acreage?.[0],
        max_size: filter?.acreage?.[1],
      }),
  });
  console.log('====================================');
  console.log({
    country_id: country?.id,
    estate_type_id: !paramsFilter?.type ? filter?.type : paramsFilter?.type,
    title: filter?.name,
    latitude: !paramsFilter && params?.near_me ? location?.latitude : '',
    longitude: !paramsFilter && params?.near_me ? location?.longitude : '',
    distance: !paramsFilter && params?.near_me ? 5000 : '',
    currency_id: currency?.id,
    province_id: filter?.province?.id || filter?.province_id,
    min_size: filter?.acreage?.[0],
    max_size: filter?.acreage?.[1],
  });
  console.log('====================================');
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
        // data={dataArr || (isLoading && [...Array(2)])}
        data={data?.data?.rows}
        contentContainerStyle={{
          ...styles.content,
          paddingBottom: insets.bottom + scale(20),
        }}
        // ListFooterComponent={() =>
        //   isFetchingNextPage && (
        //     <View
        //       style={{
        //         height: scale(30),
        //       }}>
        //       <LottieView
        //         autoPlay={true}
        //         source={animations.loading}
        //         style={{
        //           height: '100%',
        //         }}
        //       />
        //     </View>
        //   )
        // }
        ListEmptyComponent={() => (
          <EmptyData
            styleWrapper={{
              marginTop: '40%',
            }}
          />
        )}
        // onEndReached={hasNextPage && fetchNextPage}
        onEndReachedThreshold={0.5}
        renderItem={({item, index}) => {
          return item ? (
            <ItemAccommdSearch
              key={`key_${item?.id}-${index}`}
              isButtonBottom
              data={item}
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
