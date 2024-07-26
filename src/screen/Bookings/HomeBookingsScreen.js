import {useNavigation} from '@react-navigation/native';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getListBookingAccomo} from '../../Model/api/apiAccom';
import {COLORS, SHADOW, SIZES, WIDTH, scale} from '../../assets/constants';
import {IconMarker} from '../../assets/icon/Icon';
import {CustomButton, TabSelect} from '../../components';
import CustomText from '../../components/CustomText';
import MainWrapper from '../../components/MainWrapper';
import {useLanguage} from '../../hooks/useLanguage';
import BookingHistory from './components/BookingTour';
import BookingActive from './components/BookingAccom';
import BookingAccom from './components/BookingAccom';
import BookingTour from './components/BookingTour';
import {useAuthentication} from '../../hooks/useAuthentication';

const dataWaiting = [
  {
    id: 1,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 2,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 3,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 4,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 5,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
];

export default function HomeBookingsScreen() {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const listTab = [t('hotel_booking_history'), t('tour_booking_history')];

  const [tabSelect, setTabSelect] = useState(listTab[0]);

  // const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
  //   useInfiniteQuery({
  //     queryKey: ['accommodation', 'room', 'my-booking'],
  //     queryFn: getListBookingAccomo,
  //     getNextPageParam: (lastPage, allPages) => {
  //       // console.log('====================================');
  //       // console.log(lastPage?.data?.rows, 12321);
  //       // console.log('====================================');
  //       if (!(lastPage?.data?.rows?.length <= 0)) return allPages?.length + 1;

  //       return undefined;
  //     },
  //     // enabled: !!token,
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
    <MainWrapper scrollEnabled={false}>
      <TabSelect
        data={listTab}
        styleWrapper={{
          alignItems: 'center',
          borderRadius: 5,
          paddingBottom: scale(5),
          padding: scale(10),
        }}
        sizeText={SIZES.small}
        transformText={'none'}
        styleContainerTab={styles.containTab}
        styleTabActive={styles.tabActive}
        styleTabDefault={{
          backgroundColor: 'transparent',
        }}
        onChange={e => setTabSelect(e)}
      />
      {tabSelect === listTab[0] ? <BookingAccom /> : <BookingTour />}
      {/* <View
        style={{
          alignItems: 'center',
          borderRadius: 5,
          width: '100%',
        }}>
        <BookingActive />
      </View> */}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: WIDTH.widthContain,
    // marginVertical: scale(20),
    marginTop: scale(10),
    alignItems: 'center',
  },
  containTab: {
    height: scale(56),
    alignItems: 'center',
    borderRadius: scale(12),
    backgroundColor: '#e6e7e8',
    padding: scale(4),
  },
  tabActive: {
    color: COLORS.primary,
    borderRadius: scale(12),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
  img: {
    width: scale(240),
    height: scale(240),
  },
  btnAdd: {
    position: 'absolute',
    bottom: scale(-70),
    right: 0,
    zIndex: 999,
    width: scale(150),
  },
  box: {
    backgroundColor: '#FDFDFD',
    minHeight: scale(100),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: '#DADADA4D',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    rowGap: scale(5),
    ...SHADOW,
  },
  code: {
    borderWidth: scale(1),
    height: scale(30),
    borderRadius: scale(6),
    borderColor: '#0000001A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    alignItems: 'center',
    marginTop: scale(5),
  },
  line: {
    backgroundColor: COLORS.grey,
    height: scale(1),
    width: '100%',
  },
});
