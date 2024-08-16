import {useNavigation} from '@react-navigation/native';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React, {useMemo, useRef} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

import {getListBookingAccomo} from '../../../Model/api/apiAccom';
import {COLORS, animations, scale} from '../../../assets/constants';
import EmptyData from '../../../components/EmptyData';
import BookingItem from './BookingItem';
import BookingItemLoading from './BookingItemLoading';
import {useAuthentication} from '../../../hooks/useAuthentication';
import {getListBookingTour} from '../../../Model/api/apiTour';
import BookingTourItem from './BookingTourItem';
import {useCountry} from '../../../hooks/useCountry';
import LottieView from 'lottie-react-native';

export default function BookingTour() {
  const {navigate} = useNavigation();
  const {token} = useAuthentication();
  const queryClient = useQueryClient();

  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['tour', 'my-booking', {token: token, limit: 10}],
    queryFn: ({pageParam = 1}) =>
      getListBookingTour({
        pageParam,
        token: token,
        limit: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage?.data?.rows?.length <= 0)) return allPages?.length + 1;

      return undefined;
    },
    enabled: !!token,
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
  const refresh = useRef(false);

  function pullToRefresh(value) {
    refresh.current = true;
    queryClient.invalidateQueries();
    refresh.current = false;
  }
  return (
    <FlatList
      data={dataArr || (isLoading && [1, 2, 3, 5])}
      contentContainerStyle={{
        paddingVertical: scale(10),
        rowGap: scale(10),
        padding: scale(10),
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refresh.current}
          onRefresh={pullToRefresh}
          tintColor={COLORS.primary}
        />
      }
      ListEmptyComponent={() => <EmptyData styleWrapper={{marginTop: '40%'}} />}
      ListFooterComponent={() =>
        isFetchingNextPage && (
          <View
            style={{
              height: scale(40),
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
      onEndReached={hasNextPage && fetchNextPage}
      onEndReachedThreshold={0.1}
      renderItem={({item, index}) =>
        item?.id ? (
          <BookingTourItem
            key={index}
            data={item}
            onPress={() => navigate('DetailBookingTourScreen', item)}
            onReView={() =>
              navigate('NoBottomTab', {
                screen: 'PostReviewScreen',
                params: {...item, isTour: true},
              })
            }
            onViewDetail={() =>
              navigate('NoBottomTab', {
                screen: 'DetailReviewTourScreen',
                params: item,
              })
            }
          />
        ) : (
          <BookingItemLoading />
        )
      }
    />
  );
}
