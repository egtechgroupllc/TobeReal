import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {getListRent} from '../../../../Model/api/apiAccom';
import {getListCountry} from '../../../../Model/api/common';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import EmptyData from '../../../../components/EmptyData';
import InViewport from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatDate} from '../../../../utils/format';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import BoxPlaceItemLoading from './BoxPlaceItem/BoxPlaceItemLoading';

export default function FindBest({country, currency}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const title = [t('find_best')];
  const {navigate} = useNavigation();
  const [filter, setFilter] = useState();

  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-rent',
      {
        accommodation_type_id: 1,
        province_id: filter?.id,
        country_id: country?.id,
        currency_id: currency?.id,
      },
    ],
    queryFn: () =>
      getListRent({
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),

        country_id: country?.id,
        province_id: filter?.id,
        currency_id: currency?.id,
      }),
  });
  const listProvince = useQuery({
    queryKey: ['common', 'list-country', country?.geoname_id],
    queryFn: () => getListCountry(country?.geoname_id),
  });
  useEffect(() => {
    setFilter(listProvince.data?.data?.[0]);
  }, [listProvince?.data?.data]);

  return (
    <WrapperContent
      // isSeeAll
      isCategory
      dataCategory={listProvince?.data?.data?.slice(0, 9) || [...Array(4)]}
      onPressSeeAll={() =>
        navigate('NoBottomTab', {
          screen: 'SeeAllRentScreen',
          params: {
            title: title || '',
          },
        })
      }
      onPressCategory={item => setFilter(item)}
      heading={title}
      subHeading={t('disc_upto') + ` 30%!`}
      styleWrapper={{
        backgroundColor: COLORS.subPrimary,
      }}
      styleContent={{
        justifyContent: 'center',
        minHeight: scale(230),
      }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.data?.rows || [...Array(4)]}
        contentContainerStyle={styles.content}
        ListEmptyComponent={<EmptyData />}
        renderItem={({item, index}) => (
          <BoxPlaceItem
            key={index}
            seeViewNumber={1.6}
            isViewMap
            isStar
            isRating
            isDiscount
            rating={2}
            isHeart
            data={item}
            isLoading={isLoading}
          />
        )}
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
    minHeight: scale(230),
    minWidth: '100%',
  },
});
