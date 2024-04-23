import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '../../../assets/constants';
import BookingItem from './BookingItem';
import {useQuery} from '@tanstack/react-query';
import {getListBookingAccomo} from '../../../Model/api/apiAccom';

const dataHistory = [
  {
    id: 1,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
    type: 1,
  },
  {
    id: 2,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
    type: 2,
  },
  {
    id: 3,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
    type: 1,
  },
  {
    id: 4,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
    type: 1,
  },
  {
    id: 5,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
    type: 2,
  },
];
export default function BookingHistory() {
  const {data, isLoading} = useQuery({
    queryKey: ['accommodation', 'room', 'my-booking'],
    queryFn: getListBookingAccomo,
  });
  console.log(data, 321);
  return (
    <FlatList
      data={data?.data?.rows}
      contentContainerStyle={{
        paddingVertical: scale(10),
        rowGap: scale(10),
      }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      renderItem={({item, index}) => <BookingItem key={index} data={item} />}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({});
