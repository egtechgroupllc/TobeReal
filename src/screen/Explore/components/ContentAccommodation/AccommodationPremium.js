import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {getListRent} from '../../../../Model/api/apiAccom';
import {SHADOW, scale} from '../../../../assets/constants';
import {InViewport} from '../../../../components';
import {useCountry} from '../../../../hooks/useCountry';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatDate} from '../../../../utils/format';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';
import {getCurrentLocation} from '../../../../utils/getCurrentLocation';
import Geolocation from '@react-native-community/geolocation';

export default function AccommodationPremium({currency}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const title = [t('popular_area')];
  const {navigate} = useNavigation();
  const {country} = useCountry();
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
      ...getListRent.queryKey,
      {
        accommodation_type_id: 1,
        country_id: country?.id,
        currency_id: currency?.id,
        distance: 10000,
        latitude: current?.latitude,
        longitude: current?.longitude,
      },
    ],
    queryFn: () =>
      getListRent({
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
        accommodation_type_id: 1,
        distance: 10000,
        latitude: current?.latitude,
        longitude: current?.longitude,
        country_id: country?.id,
        currency_id: currency?.id,
      }),
  });
  if (!(data?.data?.count !== 0) && !isLoading) return null;
  if (!data?.data?.count && !isLoading) return null;
  return (
    <WrapperContent
      // isSeeAll
      // onPressSeeAll={() =>
      //   navigate('NoBottomTab', {
      //     screen: 'SeeAllRentScreen',
      //     params: {
      //       title: title || '',
      //     },
      //   })
      // }
      heading={title}
      subHeading={t('find_popular')}
      styleWrapper={{backgroundColor: '#f8eede'}}>
      <InViewport
        loadingMap
        ComponentLoading={
          <BoxPlaceItemLoading
            style={[
              styles.wrapper,
              {
                width: scale(400 / 1.6),
              },
              SHADOW,
            ]}
          />
        }>
        <FlatList
          horizontal
          scrollEnabled={!isLoading}
          showsHorizontalScrollIndicator={false}
          data={!isLoading ? data?.data?.rows?.slice(0, 9) : [...Array(4)]}
          contentContainerStyle={styles.content}
          renderItem={({item, index}) => (
            <BoxPlaceItem
              key={index}
              isHeart
              isDiscount
              isStar
              isRating
              data={item}
              seeViewNumber={1.6}
              isViewMap
              isLoading={isLoading}
            />
          )}
        />
      </InViewport>
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});
