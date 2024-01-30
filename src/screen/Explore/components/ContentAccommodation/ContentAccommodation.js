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

export default function ContentAccommodation() {
  return (
    <View style={styles.wrapper}>
      <WrapperContent
        heading="Hotel Residence"
        subHeading="Seamless Living, Make Hotel Your Permanent Home!">
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
        heading="Travelio Recommended Units">
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
        heading="Stay Monthly For Cheaper Prices 🤑"
        subHeading={`Disc. up to ${formatPrice(1000000)}`}
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
        heading="Find Best Units for Staycation 🌴"
        subHeading={`Disc. up to 30%!`}
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
        heading="Travelio Premium"
        subHeading={`Selected premium unit with 5 star service by Travelio`}
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
        heading="Weekly Hot Deals 🔥"
        subHeading="Ends in"
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
        heading="Best Selling Apartment Buildings 🏆">
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
        heading="Looking for a place to stay? 🏠"
        subHeading="Find “By Travelio” units in Indonesia’s big cities">
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
