import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListRent} from '../../../../Model/api/apiAccom';
import {formatDate} from '../../../../utils/format';
import {getListCountry} from '../../../../Model/api/common';

export default function WeeklyHotDeal() {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const title = [t('weekly_hot_deal')];
  const {navigate} = useNavigation();
  console.log('WeeklyHotDeal', isRender);
  const [filter, setFilter] = useState();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-rent',
      {
        accommodation_type_id: 2,
        province_id: filter?.id,
        country_id: 241,
      },
    ],
    queryFn: () =>
      getListRent({
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
        country_id: 241,
        province_id: filter?.id,
      }),
  });
  const listCountry = useQuery({
    queryKey: ['common', 'list-country', 1562822],
    queryFn: () => getListCountry(1562822),
  });
  useEffect(() => {
    setFilter(listCountry.data?.data?.[0]);
  }, [listCountry.data?.data]);
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={240}>
      {isRender && (
        <WrapperContent
          isSeeAll
          isCategory
          dataCategory={listCountry.data?.data?.slice(0, 9)}
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
          subHeading={t('ends_in')}
          dayEndDeals={6}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data?.data?.rows}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxPlaceItem
                isHeart
                isDiscount
                data={item}
                rental="night"
                jsonImage={item?.imgdetail}
                name={item?.name}
                price={item?.price}
              />
            )}
          />
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
