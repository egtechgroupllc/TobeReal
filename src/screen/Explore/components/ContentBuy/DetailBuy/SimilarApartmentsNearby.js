import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import WrapperContent from '../../WrapperContent';
import {useLanguage} from '../../../../../hooks/useLanguage';
import BoxSimilarApartment from './BoxSimilarApartment';
import { images, scale } from '../../../../../assets/constants';
const dataPackage = [
  {
    id: 1,
    src: images.tourthailand,
    name: 'Thailand tour package ( Bangkok, Pattaya) - 5N4Đ',
    price: 6690000,
    imgdetail: [
      images.tourthailand,
      images.tourbali,
      images.toursingapore,
    ],
  },
  {
    id: 2,
    src: images.tourbali,
    name: 'Thailand tour Bali( kintamani, Pattaya) ....',
    price: 10880000,
    imgdetail: [
      images.tourthailand,
      images.tourbali,
      images.toursingapore,
    ],
  },
  {
    id: 3,
    src: images.toursingapore,
    name: 'Tour Singapore (Gardens by the Bay, Sentosa, Jurassic Mile)',
    price: 9900000,
    imgdetail: [
      images.tourthailand,
      images.tourbali,
      images.toursingapore,
    ],
  },
];
export default function SimilarApartmentsNearby() {
  const {t} = useLanguage();
  return (
    <WrapperContent
          // background={images.bgPackageTour}
          isSeeAll
          // worldTour
          onPressSeeAll={() => console.log(1)}
          onPressCategory={item => console.log(item)}
          heading={t('Explore Nearby Estates')}
          // subHeading={t('Discover the 5D4D package tour for families!!') + ` ${formatPrice(1000000)}`}
          styleWrapper={{backgroundColor: 'transparent'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataPackage}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <BoxSimilarApartment
                isHeart
                isStar
                data={item}
                rental="night"
                jsonImage={item?.src}
                name={item?.name}
                price={item?.price}
                type={item?.type}
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