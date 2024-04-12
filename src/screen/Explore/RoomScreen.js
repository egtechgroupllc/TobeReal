import React, {useLayoutEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../assets/constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  getListRoomDetailAccmo,
  postBookingRoom,
} from '../../Model/api/apiAccom';
import CustomText from '../../components/CustomText';
import EmptyData from '../../components/EmptyData';
import Favourite from '../../components/Favourite';
import MainWrapper from '../../components/MainWrapper';
import {useLanguage} from '../../hooks/useLanguage';
import ItemAccommdSearchLoading from '../Search/components/ItemAccommdSearchLoading';
import RoomFilter from './components/DetailAccommodation/Rooms/RoomFilter';
import RoomFilterType from './components/DetailAccommodation/Rooms/RoomFilterType';
import RoomItem from './components/DetailAccommodation/Rooms/RoomItem';
import {showMess} from '../../assets/constants/Helper';

export default function RoomScreen() {
  const {t} = useLanguage();
  const {setOptions} = useNavigation();

  const queryClient = useQueryClient();
  const params = useRoute().params;
  const insets = useSafeAreaInsets();

  const [date, setDate] = useState();

  const {data, isLoading} = useQuery({
    queryKey: [
      'accommodation',
      'detail',
      'list-room',
      params?.id,
      date?.selectedStartDate,
      date?.selectedEndDate,
    ],
    queryFn: () =>
      getListRoomDetailAccmo({
        id_accomo: params?.id,
        date_start: date?.selectedStartDate,
        date_end: date?.selectedEndDate,
      }),
  });

  const bookingRoomMu = useMutation({
    mutationFn: postBookingRoom,
  });

  const handleBookingRoom = value => {
    bookingRoomMu.mutate(
      {
        data: {
          check_in_date: date?.selectedStartDate,
          check_out_date: date?.selectedEndDate,
          number_room: 2,
        },
        id_room: value,
      },
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );
          queryClient.invalidateQueries([
            'accommodation',
            'detail',
            'list-room',
            params?.id,
          ]);
        },
        onError: err => {
          console.log({err}, 213587137821);
        },
      },
    );
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
      <RoomFilter onSelectDate={setDate} data={data?.data?.[0]} />
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
              dataP={item}
              key={index}
              onBooking={handleBookingRoom}
              date={date}
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
