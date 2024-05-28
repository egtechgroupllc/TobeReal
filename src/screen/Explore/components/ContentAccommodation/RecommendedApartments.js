import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import {images, scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import InViewPort from '../../../../components/InViewport';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListRent} from '../../../../Model/api/apiAccom';
import {formatDate} from '../../../../utils/format';
import {getListCountry} from '../../../../Model/api/common';
export default function RecommendedApartments({
  isSeeAll = true,
  isCategory = true,
}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const title = [t('recommend_apartments')];
  const {navigate} = useNavigation();
  const [filter, setFilter] = useState();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-rent',
      {
        accommodation_type_id: 6,
        province_id: filter?.id,
        country_id: 241,
      },
    ],
    queryFn: () =>
      getListRent({
        accommodation_type_id: 6,
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
    <InViewPort onChange={render => render && setIsRender(render)} delay={300}>
      {isRender && (
        <WrapperContent
          isSeeAll={isSeeAll}
          isCategory={isCategory}
          dataCategory={listCountry.data?.data?.slice(0, 9)}
          // onPressSeeAll={() =>
          //   navigate('NoBottomTab', {
          //     screen: 'SeeAllRentScreen',
          //     params: {
          //       title: title || '',
          //     },
          //   })
          // }
          onPressCategory={item => setFilter(item)}
          heading={title}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data?.data?.rows}
            contentContainerStyle={styles.content}
            renderItem={({item, index}) => (
              <BoxPlaceItem
                key={`key-${item}-${index}`}
                seeViewNumber={1.5}
                data={item}
                isUnitAvailable
                isStar
                rating={4}
                textRating={index % 2 !== 0 && 'New'}
                isHeart
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
// no 159 v1.0
// vrvi 160 v1.0
