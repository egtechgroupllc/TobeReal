import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {formatDate, formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {SIZES, images, scale} from '../../../../assets/constants';
import BoxPlaceItem from './BoxPlaceItem';
import WrapperContent from '../WrapperContent';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListCountry} from '../../../../Model/api/common';
import {
  getListPopularProvinceTour,
  getListTour,
} from '../../../../Model/api/apiTour';
import {IconBookings} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import EmptyData from '../../../../components/EmptyData';
import {useCountry} from '../../../../hooks/useCountry';
import {getCurrentLocation} from '../../../../utils/getCurrentLocation';

export default function PackageTour() {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('domestic_tour')];
  const [filter, setFilter] = useState();
  const {country, currency} = useCountry();
  const [current, setCurrent] = useState(null);

  const currentPosition = useCallback(async () => {
    await getCurrentLocation(({coords}) => {
      if (coords) {
        const coordinates = {
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        };
        setCurrent(coordinates);
        return coordinates;
      }
    });
  }, []);
  useEffect(() => {
    currentPosition();
  }, []);
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'tour',
      'list-tour',
      {
        country_id: country?.id,
        province_id: filter?.id,
        currency_id: currency?.id,
        // distance: 10000,
        // latitude: current?.latitude,
        // longitude: current?.longitude,
      },
    ],
    queryFn: () =>
      getListTour({
        country_id: country?.id,
        province_id: filter?.id,
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
        currency_id: currency?.id,
        // distance: 10000,
        // latitude: current?.latitude,
        // longitude: current?.longitude,
      }),
  });
  // console.log({
  //   country_id: country?.id,
  //   province_id: filter?.id,
  //   date_end: formatDate(new Date(), {addDays: 1}),
  //   date_start: formatDate(),
  //   currency_id: currency?.id,
  //   distance: 10000,
  //   latitude: current?.latitude,
  //   longitude: current?.longitude,
  // });

  const listProvince = useQuery({
    queryKey: ['tour', 'list-popular-province', country?.geoname_id],
    queryFn: () => getListPopularProvinceTour(country?.geoname_id),
  });
  useEffect(() => {
    setFilter(listProvince.data?.data?.rows?.[0]);
  }, [listProvince?.data?.data?.rows]);
  return (
    <InViewPort>
      <WrapperContent
        // isSeeAll

        isCategory
        dataCategory={
          !listProvince.isLoading
            ? listProvince?.data?.data?.rows.slice(0, 9)
            : [...Array(4)]
        }
        // onPressSeeAll={() =>
        //   navigate('NoBottomTab', {
        //     screen: 'SeeAllTourScreen',
        //     params: {
        //       title: title || '',
        //     },
        //   })
        // }
        onPressCategory={item => setFilter(item)}
        heading={title}
        // subHeading={t('discover_package_family') + ` ${formatPrice(1000000)}`}
        styleWrapper={{backgroundColor: 'transparent'}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data?.data?.rows}
          contentContainerStyle={styles.content}
          ListEmptyComponent={<EmptyData />}
          renderItem={({item}) => (
            <BoxPlaceItem isHeart isStar data={item} rental="night" />
          )}
        />

        {/* <View style={{alignItems: 'center', rowGap: scale(10)}}>
            <IconBookings width={scale(50)} height={scale(50)} />
            <CustomText textType="medium" style={{fontSize: SIZES.medium}}>
              {t('no_data')}
            </CustomText>
          </View> */}
      </WrapperContent>
    </InViewPort>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
    minWidth: '100%',
  },
});
