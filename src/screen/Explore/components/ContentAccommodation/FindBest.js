import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useLanguage} from '../../../../hooks/useLanguage';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import InViewPort from '../../../../components/InViewport';
import {SIZES, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import {getListRent} from '../../../../Model/api/apiAccom';
import {formatDate} from '../../../../utils/format';
import {useQuery} from '@tanstack/react-query';
import {getListCountry} from '../../../../Model/api/common';
import EmptyData from '../../../../components/EmptyData';
import CustomText from '../../../../components/CustomText';
import {IconBookings} from '../../../../assets/icon/Icon';

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
        // date_end: formatDate(new Date(), {addDays: 14}),
        // date_start: formatDate(new Date(), {addDays: 2}),
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
    <InViewPort onChange={render => render && setIsRender(render)} delay={130}>
      {isRender && (
        <WrapperContent
          isSeeAll
          isCategory
          dataCategory={listProvince?.data?.data?.slice(0, 9)}
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
          styleWrapper={{backgroundColor: '#91F2FF'}}>
          {data?.data?.count !== 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data?.data?.rows}
              contentContainerStyle={styles.content}
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
                />
              )}
            />
          ) : (
            <View style={{alignItems: 'center', rowGap: scale(10)}}>
              <IconBookings width={scale(50)} height={scale(50)} />
              <CustomText textType="medium" style={{fontSize: SIZES.medium}}>
                No data
              </CustomText>
            </View>
          )}
        </WrapperContent>
      )}
    </InViewPort>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});
