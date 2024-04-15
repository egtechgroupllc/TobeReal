import React, {useLayoutEffect, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';

import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../hooks/useLanguage';

import SearchRecent from './SearchRecent';
import MainWrapper from '../../../../../components/MainWrapper';

import BoxPlaceItem from './components/BoxPlaceItem';
import SearchChooseLocation from '../../ContentTour/SeeAll/SearchChooseLocation';
import FilterMore from '../../ContentTour/SeeAll/FilterMore';

const dataPackage = [
  {
    id: 1,
    src: images.c15_1,
    name: 'C15_05_BlockC Emerald',
    price: 2500,
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
    price: 1600,
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
    price: 2800,
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
    price: 2600,
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
    price: 1800,
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
    price: 195000,
    imgdetail: [
      images.c2_1,
      images.c2_2,
      images.c2_3,
      images.c2_4,
      images.c2_5,
    ],
  },
];

export default function SeeAllRentScreen({route}) {
  const {title} = route.params;
  const {navigate, setOptions} = useNavigation();
  const {t} = useLanguage();
  const Press = () => {
    navigate(t('explore'), {
      screen: 'HomeExploreScreen',
    });
  };
  const handleSelectSearch = value => {
    navigate(t('explore'), {
      screen: 'HomeExploreScreen',
      params: value,
    });
  };

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: title,
    });
  }, []);

  return (
    <MainWrapper>
      <View style={styles.content}>
        <SearchChooseLocation onPress={handleSelectSearch} />
        {/* <SearchRecent onPress={handleSelectSearch} /> */}
        <FilterMore />
      </View>
      <View
        style={{
          backgroundColor: COLORS.theme,
          height: scale(60),
          position: 'absolute',
          width: '100%',
        }}
      />
      <FlatList
        // horizontal
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{
          columnGap: scale(10),
        }}
        showsVerticalScrollIndicator={false}
        data={dataPackage}
        style={{
          columnGap: scale(10),
        }}
        contentContainerStyle={styles.content1}
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
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '86%',
    alignSelf: 'center',
    rowGap: scale(14),
    zIndex: 99,
  },
  content1: {
    alignItems: 'center',
    rowGap: scale(14),
    marginTop: scale(10),
    paddingVertical: scale(6),
    paddingBottom: scale(100),
  },
  buttonStyle: {
    width: '100%',
  },
});
