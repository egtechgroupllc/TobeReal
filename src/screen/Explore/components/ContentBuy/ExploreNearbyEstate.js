import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContent from '../WrapperContent';
import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {images, scale} from '../../../../assets/constants';
import BoxExploreEstate from './BoxExploreEstate';
import {useNavigation} from '@react-navigation/native';
import {getListCountry} from '../../../../Model/api/common';
import {useQuery} from '@tanstack/react-query';
import {getListSell} from '../../../../Model/api/apiEstate';

export default function ExploreNearbyEstate() {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('Explore Nearby Estates')];
  const [filter, setFilter] = useState();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'estate',
      'list-post',
      {
        estate_type_id: 1,
        country_id: 241,
        province_id: filter?.id,
      },
    ],
    queryFn: () => getListSell({country_id: 241, province_id: filter?.id}),
  });
  const listCountry = useQuery({
    queryKey: ['common', 'list-country', 1562822],
    queryFn: () => getListCountry(1562822),
  });
  useEffect(() => {
    setFilter(listCountry.data?.data?.[0]);
  }, [listCountry.data?.data]);
  return (
    <InViewPort onChange={render => render && setIsRender(render)} delay={70}>
      {isRender && (
        <WrapperContent
          // background={images.bgPackageTour}
          isSeeAll
          // worldTour
          isCategory
          dataCategory={listCountry.data?.data?.slice(0, 9)}
          onPressSeeAll={() =>
            navigate('NoBottomTab', {
              screen: 'SeeAllBuyScreen',
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
            data={data?.data?.rows}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxExploreEstate isHeart isStar data={item} rental="night" />
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
    rowGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});
