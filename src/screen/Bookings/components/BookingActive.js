import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {getListBookingAccomo} from '../../../Model/api/apiAccom';
import {scale} from '../../../assets/constants';
import EmptyData from '../../../components/EmptyData';
import BookingItem from './BookingItem';
import BookingItemLoading from './BookingItemLoading';

export default function BookingActive() {
  const {navigate} = useNavigation();
  const {data, isLoading} = useQuery({
    queryKey: ['accommodation', 'room', 'my-booking'],
    queryFn: getListBookingAccomo,
  });
  return (
    <FlatList
      data={data?.data?.rows || (isLoading && [...Array(3)])}
      contentContainerStyle={{
        paddingVertical: scale(10),
        rowGap: scale(10),
      }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      ListEmptyComponent={() => <EmptyData styleWrapper={{marginTop: '40%'}} />}
      renderItem={({item, index}) =>
        item?.id ? (
          <BookingItem
            key={index}
            data={item}
            onPress={() => navigate('DetailBookingScreen', item)}
            onReView={() =>
              navigate('NoBottomTab', {
                screen: 'PostReviewScreen',
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

const styles = StyleSheet.create({});
