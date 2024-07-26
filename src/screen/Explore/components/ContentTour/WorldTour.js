import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContent from '../WrapperContent';
import {formatDate, formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {SIZES, images, scale} from '../../../../assets/constants';
import BoxPlaceItem from './BoxPlaceItem';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {
  getListPopularCountryTour,
  getListTour,
} from '../../../../Model/api/apiTour';
import {getListCountry} from '../../../../Model/api/common';
import {useCountry} from '../../../../hooks/useCountry';
import EmptyData from '../../../../components/EmptyData';
import {IconBookings} from '../../../../assets/icon/Icon';
import {CustomText} from '../../../../components';

export default function WorldTour() {
  const [filter, setFilter] = useState();
  const {currency, country} = useCountry();

  const listCountry = useQuery({
    queryKey: ['common', 'list-country'],
    queryFn: () => getListPopularCountryTour(country?.id),
  });
  useEffect(() => {
    setFilter(listCountry.data?.data?.rows?.[0]);
  }, [listCountry?.data?.data?.rows]);
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'tour',
      'list-tour',
      {
        country_id: filter?.id,
        currency_id: currency?.id,
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
      },
    ],
    queryFn: () =>
      getListTour({
        country_id: filter?.id,
        currency_id: currency?.id,
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
      }),
  });

  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('travel_around_world')];
  return (
    <InViewPort>
      <WrapperContent
        // isSeeAll
        isCategory
        dataCategory={listCountry.data?.data?.rows?.slice(0, 9)}
        onPressSeeAll={() =>
          navigate('NoBottomTab', {
            screen: 'SeeAllTourScreen',
            params: {
              title: title || '',
            },
          })
        }
        onPressCategory={item => setFilter(item)}
        heading={title}
        // subHeading={t('Discover the 5D4D package tour for families!!') + ` ${formatPrice(1000000)}`}
        styleWrapper={{backgroundColor: 'transparent'}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<EmptyData />}
          data={data?.data?.rows}
          contentContainerStyle={styles.content}
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
