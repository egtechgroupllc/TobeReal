import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SIZES, scale} from '../../assets/constants';

import {
  getListRoomDetailAccmo,
  postBookingRoom,
} from '../../Model/api/apiAccom';
import {showMess} from '../../assets/constants/Helper';
import CustomText from '../../components/CustomText';
import EmptyData from '../../components/EmptyData';
import Favourite from '../components/Favourite';
import MainWrapper from '../../components/MainWrapper';
import ItemAccommdSearchLoading from '../Search/components/ItemAccommdSearchLoading';
import RoomFilter from './components/DetailAccommodation/Rooms/RoomFilter';
import RoomFilterType from './components/DetailAccommodation/Rooms/RoomFilterType';
import RoomItem from './components/DetailAccommodation/Rooms/RoomItem';

export default function RoomScreen() {
  const {setOptions, navigate} = useNavigation();

  const params = useRoute().params;
  const insets = useSafeAreaInsets();

  const [date, setDate] = useState();
  const [numRoomGuest, setNumRoomGuest] = useState();

  const {data, isLoading} = useQuery({
    queryKey: [
      'accommodation',
      'detail',
      'list-room',
      params?.id,
      date?.selectedStartDate,
      date?.selectedEndDate,
      numRoomGuest?.numRooms,
      numRoomGuest?.numAdult,
      numRoomGuest?.numChild.length,
      numRoomGuest?.numChild,
    ],
    queryFn: () =>
      getListRoomDetailAccmo({
        id_accomo: params?.id,
        date_start: date?.selectedStartDate,
        date_end: date?.selectedEndDate,
        number_room: numRoomGuest?.numRooms,
        number_occupancy: numRoomGuest?.numAdult,
        number_child_occupancy: numRoomGuest?.numChild.length,
        child_age: JSON.stringify(numRoomGuest?.numChild),
      }),
  });
  const handleBookingRoom = value => {
    navigate('BookingRoomScreen', {...params, ...value});
  };
  useLayoutEffect(() => {
    return setOptions({
      headerTitleComponent: () => (
        <View
          style={{
            width: '60%',
          }}>
          <CustomText
            textType="bold"
            numberOfLines={1}
            style={{
              color: '#fff',
              fontSize: SIZES.xMedium,
            }}>
            {params?.name}
          </CustomText>
          <CustomText
            style={{
              color: '#fff',
            }}>
            {params?.address}
          </CustomText>
        </View>
      ),
      headerTitleStyle: {
        textAlign: 'left',
      },
      headerRight: () => <Favourite />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <MainWrapper scrollEnabled={false}>
      <RoomFilter
        onSelectDate={setDate}
        data={{...data?.data?.[0], dataFilter: params?.dataFilter}}
        onChangeNum={setNumRoomGuest}
      />
      <RoomFilterType />

      <FlatList
        data={data?.data || (isLoading && [...Array(3)])}
        contentContainerStyle={{
          ...styles.content,
          paddingBottom: insets.bottom + scale(10),
        }}
        ListEmptyComponent={() => (
          <EmptyData styleWrapper={{marginTop: '40%'}} />
        )}
        renderItem={({item, index}) => {
          return item?.id ? (
            <RoomItem
              isFilterChildren={!!numRoomGuest?.numChild.length}
              dataP={item}
              key={index}
              onBooking={value =>
                handleBookingRoom({
                  ...item,
                  ...value,
                  date,
                  numRoomGuest,
                  nameAccom: params?.name,
                  idAccom: params?.id,
                })
              }
              date={date}
              onDetail={value =>
                navigate('DetailRoomScreen', {
                  ...params,
                  ...item,
                  ...value,
                  date,
                  numRoomGuest,
                  nameAccom: params?.name,
                  idAccom: params?.id,
                })
              }
            />
          ) : (
            <ItemAccommdSearchLoading key={index} />
          );
        }}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(8),
    rowGap: scale(10),
    paddingTop: scale(10),
  },
  overview: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  overviewNumberRating: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(6),
  },
  numberRating: {
    fontSize: SIZES.xMedium,
    color: COLORS.white,
    padding: scale(10),
  },
});
