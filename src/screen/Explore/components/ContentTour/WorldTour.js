import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContent from '../WrapperContent';
import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {images, scale} from '../../../../assets/constants';
import BoxPlaceItem from './BoxPlaceItem';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListTour} from '../../../../Model/api/apiTour';
import {getListCountry} from '../../../../Model/api/common';

export default function WorldTour() {
  const [filter, setFilter] = useState();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'tour',
      'list-tour',
      {
        country_id: filter?.id,
      },
    ],
    queryFn: () => getListTour({country_id: filter?.id}),
  });
  const listCountry = useQuery({
    queryKey: ['common', 'list-country'],
    queryFn: () => getListCountry(),
  });
  useEffect(() => {
    setFilter(listCountry.data?.data?.[0]);
  }, [listCountry.data?.data]);
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('travel_around_world')];
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={70}>
      {isRender && (
        <WrapperContent
          background={images.bgPackageTour}
          isSeeAll
          isCategory
          dataCategory={listCountry.data?.data?.slice(0, 9)}
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
          // subHeading={t('Discover the 5D4D package tour for families!!') + ` ${formatPrice(1000000)}`}
          styleWrapper={{backgroundColor: 'transparent'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data?.data?.rows}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxPlaceItem isHeart isStar data={item} rental="night" />
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
