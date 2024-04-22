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

const data = [
  {
    id: 1,
    src: images.c15,
    name: 'C15_05_BlockC Emerald',
    price: 25000000,
    imgdetail: [
      images.c15_1,
      images.c15_2,
      images.c15_3,
      images.c15_4,
      images.c15_5,
      images.c15_6,
    ],
  },
  {
    id: 2,
    src: images.c16,
    name: 'D11.06 Emerald',
    price: 16000000,
    imgdetail: [
      images.c16_1,
      images.c16_2,
      images.c16_3,
      images.c16_4,
      images.c16_5,
      images.c16_6,
      images.c16_7,
      images.c16_8,
      images.c16_9,
    ],
  },
  {
    id: 3,
    src: images.p14,
    name: 'P14.07 Diamond',
    price: 28000000,
    imgdetail: [
      images.p14_1,
      images.p14_2,
      images.p14_3,
      images.p14_4,
      images.p14_5,
      images.p14_6,
      images.p14_7,
      images.p14_8,
    ],
  },
  {
    id: 4,
    src: images.q10,
    name: 'Centrosa Garden Q.10',
    price: 26000000,
    imgdetail: [
      images.q10_1,
      images.q10_2,
      images.q10_3,
      images.q10_4,
      images.q10_5,
      images.q10_6,
    ],
  },
  {
    id: 5,
    src: images.a6,
    name: 'A6.7.08 Diamod Alanta Plus',
    price: 18000000,
    imgdetail: [
      images.a6_1,
      images.a6_2,
      images.a6_3,
      images.a6_4,
      images.a6_5,
    ],
  },
  {
    id: 6,
    src: images.c2,
    name: 'C2.17',
    price: 19500000000,
    imgdetail: [
      images.c2_1,
      images.c2_2,
      images.c2_3,
      images.c2_4,
      images.c2_5,
    ],
  },
  {
    id: 7,
    src: images.c127,
    name: 'Duplex 127.7m2 Block C Emerald',
    price: 6300000000,
    imgdetail: [
      images.c127_1,
      images.c127_2,
      images.c127_3,
      images.c127_4,
      images.c127_5,
      images.c127_6,
      images.c127_7,
      images.c127_8,
    ],
  },
  {
    id: 8,
    src: images.b15,
    name: 'Duplex B15.20 Emeral',
    price: 8000000000,
    imgdetail: [
      images.b15_1,
      images.b15_2,
      images.b15_3,
      images.b15_4,
      images.b15_5,
      images.b15_6,
      images.b15_7,
      images.b15_8,
      images.b15_9,
    ],
  },
  {
    id: 9,
    src: images.f3,
    name: 'F303 Emerald',
    price: 5600000000,
    imgdetail: [
      images.f3_1,
      images.f3_2,
      images.f3_3,
      images.f3_4,
      images.f3_5,
      images.f3_6,
      images.f3_7,
      images.f3_8,
      images.f3_9,
    ],
  },
  {
    id: 10,
    src: images.a3,
    name: 'Ruby A3.12 Celadon Tan Phu',
    price: 3500000000,
    imgdetail: [
      images.a3_1,
      images.a3_2,
      images.a3_3,
      images.a3_4,
      images.a3_5,
      images.a3_6,
      images.a3_7,
      images.a3_8,
      images.a3_9,
    ],
  },
  {
    id: 11,
    src: images.m253,
    name: '253m2 Duc Hoa Dong, Long An',
    price: 2100000000,
    imgdetail: [images.m253_1, images.m253_2, images.m253_3, images.m253_4],
  },
  {
    id: 12,
    src: images.m1030,
    name: '1030m2 Dat Trong Nhan Bau Don Tay Ninh',
    price: 2400000000,
    imgdetail: [
      images.m1030_1,
      images.m1030_2,
      images.m1030_3,
      images.m1030_4,
      images.m1030_5,
    ],
  },
  {
    id: 13,
    src: images.m508,
    name: 'Lo 508m2 Huu Thanh, Long An',
    price: 3500000000,
    imgdetail: [images.m508_1, images.m508_2, images.m508_3],
  },
];
export default function RecommendedApartments({
  isSeeAll = true,
  isCategory = true,
}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  console.log('RecommendedApartments', isRender);
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
          onPressSeeAll={() =>
            navigate('NoBottomTab', {
              screen: 'SeeAllRentScreen',
              params: {
                title: title || '',
              },
            })
          }
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
