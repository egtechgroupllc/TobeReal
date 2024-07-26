import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import WrapperContent from '../WrapperContent';
import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {SHADOW, images, scale} from '../../../../assets/constants';
import BoxFeatureItem from './BoxFeatureItem';
import {useNavigation} from '@react-navigation/native';
import {getListSell} from '../../../../Model/api/apiEstate';
import {useQuery} from '@tanstack/react-query';
import {getListCountry} from '../../../../Model/api/common';
import {useCountry} from '../../../../hooks/useCountry';
import {getCurrentLocation} from '../../../../utils/getCurrentLocation';
import InViewport from '../../../../components/InViewport';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';

export default function FeatureEstate() {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const [filter, setFilter] = useState();
  const {country} = useCountry();
  const [current, setCurrent] = useState(null);
  const title = [t('explore_nearby_estate')];

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
      'estate',
      'list-post',
      {
        estate_type_id: 1,
        country_id: country?.id,
        distance: 10000,
        latitude: current?.latitude,
        longitude: current?.longitude,
        // province_id: filter?.id,
      },
    ],
    queryFn: () =>
      getListSell({
        country_id: country?.id,
        distance: 10000,
        latitude: current?.latitude,
        longitude: current?.longitude,
      }),
  });
  // const listCountry = useQuery({
  //   queryKey: ['common', 'list-country', 1562822],
  //   queryFn: () => getListCountry(1562822),
  // });
  // useEffect(() => {
  //   setFilter(listCountry.data?.data?.[0]);
  // }, [listCountry.data?.data]);
  if (!(data?.data?.count !== 0) && !isLoading) return null;
  if (!data?.data?.count && !isLoading) return null;
  return (
    <WrapperContent
      // background={images.bgPackageTour}
      // isSeeAll
      // worldTour
      // isCategory
      // dataCategory={listCountry.data?.data?.slice(0, 9)}
      // onPressSeeAll={() =>
      //   navigate('NoBottomTab', {
      //     screen: 'SeeAllBuyScreen',
      //     params: {
      //       title: title || '',
      //     },
      //   })
      // }
      // onPressCategory={item => setFilter(item)}
      heading={title}
      styleWrapper={{backgroundColor: 'transparent'}}>
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
          showsHorizontalScrollIndicator={false}
          data={!isLoading ? data?.data?.rows?.slice(0, 9) : [...Array(4)]}
          contentContainerStyle={styles.content}
          renderItem={({item}) => (
            <BoxFeatureItem isHeart isStar data={item} rental="night" />
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
