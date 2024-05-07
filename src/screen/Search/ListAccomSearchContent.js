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

export default function ListAccomSearchContent({paramsFilter}) {
  const insets = useSafeAreaInsets();
  const params = useRoute().params;
  const filter = {...params, ...paramsFilter};
  console.log('====================================');
  console.log(params);
  console.log('====================================');
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-rent',
      'search',
      {
        ...filter,
        accommodation_type_id: filter?.type,
        country_id: 241,
        name: filter?.name,
      },
    ],
    queryFn: () =>
      getListRent({
        ...filter,
        date_end: filter?.date?.date_end,
        date_start: filter?.date?.date_start,
        country_id: 241,
        accommodation_type_id: filter?.type,
        name: filter?.name,
        // province_id: 1,
      }),
  });

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
