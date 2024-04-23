import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {images, scale} from '../../../../assets/constants';
import BoxPlaceItem from './BoxPlaceItem';
import WrapperContent from '../WrapperContent';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListCountry} from '../../../../Model/api/common';

export default function PackageTour({data}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('package_tour_aboard')];
  // const [filter, setFilter] = useState();
  // const {data, isLoading, isError, error} = useQuery({
  //   queryKey: [
  //     'accommodation',
  //     'list-post',
  //     {
  //       accommodation_type_id: 1,
  //       province_id: filter?.id,
  //       country_id: 241,
  //     },
  //   ],
  //   queryFn: () =>
  //     getListRent({
  //       date_end: formatDate(new Date(), {addDays: 1}),
  //       date_start: formatDate(),
  //       country_id: 241,
  //       province_id: filter?.id,
  //     }),
  // });
  // const listCountry = useQuery({
  //   queryKey: ['common', 'list-country', 1562822],
  //   queryFn: () => getListCountry(1562822),
  // });
  // useEffect(() => {
  //   setFilter(listCountry.data?.data?.[0]);
  // }, [listCountry.data?.data]);
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={70}>
      {isRender && (
        <WrapperContent
          background={images.bgPackageTour}
          isSeeAll
          isCategory
          dataCategory={['Southeast Asia', 'Asia', 'Europe', 'America']}
          onPressSeeAll={() =>
            navigate('NoBottomTab', {
              screen: 'SeeAllTourScreen',
              params: {
                title: title || '',
              },
            })
          }
          onPressCategory={item => console.log(item)}
          heading={title}
          subHeading={t('discover_package_family') + ` ${formatPrice(1000000)}`}
          styleWrapper={{backgroundColor: 'transparent'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxPlaceItem
                isHeart
                isStar
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
