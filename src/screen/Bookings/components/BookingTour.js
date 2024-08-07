import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {getListBookingAccomo} from '../../../Model/api/apiAccom';
import {scale} from '../../../assets/constants';
import EmptyData from '../../../components/EmptyData';
import BookingItem from './BookingItem';
import BookingItemLoading from './BookingItemLoading';
import {useAuthentication} from '../../../hooks/useAuthentication';
import {getListBookingTour} from '../../../Model/api/apiTour';
import BookingTourItem from './BookingTourItem';
import {useCountry} from '../../../hooks/useCountry';

export default function BookingTour() {
  const {navigate} = useNavigation();
  const {token} = useAuthentication();

  const {data, isLoading, isError} = useQuery({
    queryKey: ['tour', 'my-booking'],
    queryFn: getListBookingTour,
    enabled: !!token,
  });
  return (
    <FlatList
      data={data?.data?.rows || (isLoading && [...Array(3)])}
      contentContainerStyle={{
        paddingVertical: scale(10),
        rowGap: scale(10),
        padding: scale(10),
      }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      ListEmptyComponent={() => <EmptyData styleWrapper={{marginTop: '40%'}} />}
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
