import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContent from '../WrapperContent';
import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {SHADOW, SIZES, images, scale} from '../../../../assets/constants';
import BoxExploreEstate from './BoxExploreEstate';
import {useNavigation} from '@react-navigation/native';
import {getListCountry} from '../../../../Model/api/common';
import {useQuery} from '@tanstack/react-query';
import {getListSell} from '../../../../Model/api/apiEstate';
import {IconBookings} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import {useCountry} from '../../../../hooks/useCountry';
import {
  getListPopularProvince,
  getListPopularProvinceAccom,
} from '../../../../Model/api/apiAccom';
import EmptyData from '../../../../components/EmptyData';
import InViewport from '../../../../components/InViewport';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';

export default function ExploreNearbyEstate({country}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('feature_estate')];

  const [filter, setFilter] = useState();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'estate',
      'list-post',
      {
        estate_type_id: 1,
        country_id: country?.id,
        province_id: filter?.id,
      },
    ],
    queryFn: () =>
      getListSell({country_id: country?.id, province_id: filter?.id}),
  });
  const listProvince = useQuery({
    queryKey: ['accommodation', 'list-popular-province', country?.geoname_id],
    queryFn: () => getListPopularProvinceAccom(country?.geoname_id),
  });
  useEffect(() => {
    setFilter(listProvince.data?.data?.rows?.[0]);
  }, [listProvince?.data?.data?.rows]);
  return (
    <WrapperContent
      // background={images.bgPackageTour}
      // isSeeAll
      // worldTour
      isCategory
      dataCategory={
        !listProvince.isLoading
          ? listProvince?.data?.data?.rows.slice(0, 9)
          : [...Array(4)]
      }
      onPressSeeAll={() =>
        navigate('NoBottomTab', {
          screen: 'SeeAllBuyScreen',
          params: {
            title: title || '',
          },
        })
      }
      onPressCategory={item => setFilter(item)}
      subHeading={t('explore_popular_estate')}
      heading={title}
      styleContent={{
        justifyContent: 'center',
        minHeight: scale(230),
      }}
      // subHeading={t('Discover the 5D4D package tour for families!!') + ` ${formatPrice(1000000)}`}
      styleWrapper={{backgroundColor: 'transparent'}}>
      <InViewport
        loadingMap
        ComponentLoading={
          <BoxPlaceItemLoading
            style={[
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
          ListEmptyComponent={<EmptyData />}
          renderItem={({item}) => (
            <BoxExploreEstate
              isHeart
              isStar
              data={item}
              rental="night"
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
    minHeight: scale(250),
    minWidth: '100%',
  },
});
