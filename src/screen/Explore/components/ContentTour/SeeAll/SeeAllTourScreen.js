import React, {useLayoutEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';

import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../hooks/useLanguage';
import SearchChooseLocation from './SearchChooseLocation';
import SearchRecent from './SearchRecent';
import MainWrapper from '../../../../../components/MainWrapper';
import FilterMore from './FilterMore';
import BoxPlaceItem from './components/BoxPlaceItem';
import {useQuery} from '@tanstack/react-query';
import {getListTour} from '../../../../../Model/api/apiTour';
import EmptyData from '../../../../../components/EmptyData';

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
  {
    id: 4,
    src: images.tourthailand,
    name: 'Thailand tour package ( Bangkok, Pattaya) - 5N4Đ',
    price: 6690000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 5,
    src: images.tourbali,
    name: 'Thailand tour Bali( kintamani, Pattaya) ....',
    price: 10880000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 6,
    src: images.toursingapore,
    name: 'Tour Singapore (Gardens by the Bay, Sentosa, Jurassic Mile)',
    price: 9900000,
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
];

export default function SeeAllRentScreen({route}) {
  const {title} = route.params;
  const {navigate, setOptions} = useNavigation();
  const {t} = useLanguage();
  const [filter, setFilter] = useState();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'tour',
      'list-tour',
      {
        country_id: 241,
      },
    ],
    queryFn: () => getListTour({country_id: 241}),
  });
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
        <FilterMore onFilter={value => setFilter(value)} />
      </View>
      <View
        style={{
          backgroundColor: COLORS.primary,
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
        ListEmptyComponent={() => <EmptyData />}
        showsVerticalScrollIndicator={false}
        data={data?.data?.rows}
        contentContainerStyle={styles.content1}
        renderItem={({item}) => (
          <BoxPlaceItem isHeart isStar data={item} rental="night" />
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
    rowGap: scale(14),
    marginTop: scale(10),
    columnGap: scale(14),
    paddingHorizontal: scale(30),
    paddingVertical: scale(6),
    paddingBottom: scale(100),
  },
  buttonStyle: {
    width: '100%',
  },
});
