import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import WrapperContent from '../../WrapperContent';
import {useLanguage} from '../../../../../hooks/useLanguage';
import BoxSimilarApartment from './BoxSimilarApartment';
import {images, scale} from '../../../../../assets/constants';
import {getListSell} from '../../../../../Model/api/apiEstate';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import BoxFeatureItem from '../BoxFeatureItem';
const dataPackage = [
  {
    id: 1,
    src: images.tourthailand,
    name: 'Thailand tour package ( Bangkok, Pattaya) - 5N4Đ',
    price: 6690000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 2,
    src: images.tourbali,
    name: 'Thailand tour Bali( kintamani, Pattaya) ....',
    price: 10880000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 3,
    src: images.toursingapore,
    name: 'Tour Singapore (Gardens by the Bay, Sentosa, Jurassic Mile)',
    price: 9900000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
];
export default function SimilarApartmentsNearby() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const title = [t('explore_nearby_estate')];
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'estate',
      'list-post',
      {
        estate_type_id: 1,
        country_id: 241,
      },
    ],
    queryFn: () => getListSell({country_id: 241}),
  });
  return (
    <WrapperContent
      // background={images.bgPackageTour}
      // isSeeAll
      onPressSeeAll={() =>
        navigate('NoBottomTab', {
          screen: 'SeeAllBuyScreen',
          params: {
            title: title || '',
          },
        })
      }
      onPressCategory={item => console.log(item)}
      heading={t('explore_nearby_estate')}
      // subHeading={t('Discover the 5D4D package tour for families!!') + ` ${formatPrice(1000000)}`}
      styleWrapper={{backgroundColor: 'transparent'}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.data?.rows?.slice(0, 9)}
        contentContainerStyle={styles.content}
        renderItem={({item}) => (
          <BoxFeatureItem
            isHeart
            isStar
            textRating={2}
            data={item}
            rental="night"
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
  },
});
