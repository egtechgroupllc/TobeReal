import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../WrapperContent';
import RecommendedUnitItem from './RecommendedUnitItem';
import {WIDTH, scale} from '../../../../assets/constants';
import Carousel from 'react-native-new-snap-carousel';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function ThematicInstagram() {
  const {dispatch, isFocused} = useNavigation();
  const {t} = useLanguage();
  return (
    <WrapperContent
      isSeeAll
      onPressSeeAll={() => console.log(1)}
      heading={t('thematic_instagram')}
      subHeading={t('stay_with')}>
      <Carousel
        loop
        autoplay
        autoplayInterval={5000}
        layout={'default'}
        layoutCardOffset={10}
        data={[...Array(40)]}
        sliderWidth={WIDTH.widthScreen}
        itemWidth={WIDTH.widthScreen > 500 ? scale(500) : WIDTH.widthScreen}
        containerCustomStyle={{
          borderRadius: 12,
          overflow: 'hidden',
          paddingVertical: scale(6),
        }}
        renderItem={() => {
          return (
            <FlatList
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              data={[...Array(4)]}
              style={{borderRadius: 12, overflow: 'hidden'}}
              contentContainerStyle={styles.content}
              renderItem={({item}) => (
                <RecommendedUnitItem
                  isShowDetail
                  styesWrapper={{
                    borderRadius: 0,
                  }}
                  // onPress={() => {
                  //   if (isFocused()) {
                  //     dispatch(
                  //       StackActions.push('NoBottomTab', {
                  //         screen: 'DetailAccommodationScreen',
                  //       }),
                  //     );
                  //   }
                  // }}
                />
              )}
            />
          );
        }}
        // itemWidth={itemWidth}
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  content: {
    columnGap: scale(16),
    borderRadius: 12,
    overflow: 'hidden',
  },
});
