import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../WrapperContent';
import BoxPlaceItem from './BoxPlaceItem';
import {scale} from '../../../../assets/constants';
import {formatPrice} from '../../../../utils/format';
import RecommendedUnitItem from './RecommendedUnitItem';
import ThematicInstagram from './ThematicInstagram';
import VideoInfluencerApproved from './VideoInfluencer/VideoInfluencerApproved';
import FindApartmentFitsBudget from './FindApartmentFitsBudget/FindApartmentFitsBudget';
import RecommendedApartments from './RecommendedApartments';
import BigCity from './BigCity';
import { useLanguage } from '../../../../hooks/useLanguage';

export default function ContentAccommodation() {
  const {t}= useLanguage()
  return (
    <View style={styles.wrapper}>
      <WrapperContent
        heading={t('hotel_residence')}
        subHeading={t('seamless_living')}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(10)]}
          contentContainerStyle={styles.content}
          renderItem={({item}) => (
            <BoxPlaceItem
              seeViewNumber={1.5}
              isViewMap
              isStar
              rating={2}
              isHeart
            />
          )}
        />
      </WrapperContent>

      <WrapperContent
        onPressSeeAll={() => console.log(1)}
        heading={t('saveloka_recommended')}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(10)]}
          contentContainerStyle={styles.content}
          renderItem={({item}) => <RecommendedUnitItem isButtonBottom />}
        />
      </WrapperContent>

      <WrapperContent
        isSeeAll
        isCategory
        onPressSeeAll={() => console.log(1)}
        onPressCategory={item => console.log(item)}
        heading={t('stay_monthly')}
        subHeading={t('disc_upto') + ` ${formatPrice(1000000)}`}
        styleWrapper={{backgroundColor: 'transparent'}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(10)]}
          contentContainerStyle={styles.content}
          renderItem={({item}) => <BoxPlaceItem isDiscount />}
        />
      </WrapperContent>

      <WrapperContent
        isSeeAll
        isCategory
        onPressSeeAll={() => console.log(1)}
        onPressCategory={item => console.log(item)}
        heading={t('find_best')}
        subHeading={t('disc_upto') + ` 30%!`}
        styleWrapper={{backgroundColor: '#91F2FF'}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(10)]}
          contentContainerStyle={styles.content}
          renderItem={({item}) => <BoxPlaceItem isDiscount rental="night" />}
        />
      </WrapperContent>

      <ThematicInstagram />

      <WrapperContent
        isSeeAll
        onPressSeeAll={() => console.log(1)}
        onPressCategory={item => console.log(item)}
        heading={t('saveloka_premium')}
        subHeading={t('selected_premium')}
        styleWrapper={{backgroundColor: '#f8eede'}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(10)]}
          contentContainerStyle={styles.content}
          renderItem={({item}) => <BoxPlaceItem multiPrice rental="night" />}
        />
      </WrapperContent>

      {/* <VideoInfluencerApproved /> */}
      <FindApartmentFitsBudget />

      <WrapperContent
        isSeeAll
        isCategory
        onPressSeeAll={() => console.log(1)}
        onPressCategory={item => console.log(item)}
        heading={t('weekly_hot_deal')}
        subHeading={t('ends_in')}
        dayEndDeals={6}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(10)]}
          contentContainerStyle={styles.content}
          renderItem={({item}) => (
            <BoxPlaceItem seeViewNumber={2.5} isDiscount />
          )}
        />
      </WrapperContent>

      <WrapperContent
        isSeeAll
        isCategory
        onPressSeeAll={() => console.log(1)}
        onPressCategory={item => console.log(item)}
        heading={t('best_selling')}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(10)]}
          contentContainerStyle={styles.content}
          renderItem={({item}) => (
            <BoxPlaceItem
              seeViewNumber={1.5}
              multiPrice
              isUnitAvailable
              isHeart
            />
          )}
        />
      </WrapperContent>

      <RecommendedApartments />

      <WrapperContent
        heading={t('looking_for_a_place')}
        subHeading={t('find_by_saveloka')}>
        <BigCity />
      </WrapperContent>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: scale(16),
    rowGap: scale(10),
  },
  content: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});
