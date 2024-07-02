import {StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContent from '../WrapperContent';
import {formatPrice} from '../../../../utils/format';

import InViewPort from '../../../../components/InViewport';
import {useLanguage} from '../../../../hooks/useLanguage';
import {SIZES, images, scale} from '../../../../assets/constants';
import BoxExploreEstate from './BoxExploreEstate';
import {useNavigation} from '@react-navigation/native';
import {getListCountry} from '../../../../Model/api/common';
import {useQuery} from '@tanstack/react-query';
import {getListSell} from '../../../../Model/api/apiEstate';
import {IconBookings} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';

export default function ExploreNearbyEstate({country}) {
  const {t} = useLanguage();
  const [isRender, setIsRender] = useState(false);
  const {navigate} = useNavigation();
  const title = [t('explore_nearby_estate')];
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
  const listProvince = useQuery({
    queryKey: ['common', 'list-country', country?.geoname_id],
    queryFn: () => getListCountry(country?.geoname_id),
  });
  useEffect(() => {
    setFilter(listProvince.data?.data?.[0]);
  }, [listProvince?.data?.data]);
  return (
    <InViewPort>
      <WrapperContent
        // background={images.bgPackageTour}
        // isSeeAll
        // worldTour
        isCategory
        dataCategory={listProvince.data?.data?.slice(0, 9)}
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
        {data?.data?.count !== 0 ? (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data?.data?.rows}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxExploreEstate isHeart isStar data={item} rental="night" />
            )}
          />
        ) : (
          <View style={{alignItems: 'center', rowGap: scale(10)}}>
            <IconBookings width={scale(50)} height={scale(50)} />
            <CustomText textType="medium" style={{fontSize: SIZES.medium}}>
              {t('no_data')}
            </CustomText>
          </View>
        )}
      </WrapperContent>
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
