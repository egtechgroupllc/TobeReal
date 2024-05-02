import React, {useLayoutEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';

import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../hooks/useLanguage';
import SearchChooseLocation from './SearchChooseLocation';
import SearchRecent from './SearchRecent';
import MainWrapper from '../../../../../components/MainWrapper';
import BoxPlaceItem from './components/BoxPlaceItem';
import FilterMore from './FilterMore';
import {getListSell} from '../../../../../Model/api/apiEstate';
import {useQuery} from '@tanstack/react-query';
import EmptyData from '../../../../../components/EmptyData';

export default function SeeAllBuyScreen({route}) {
  const {title} = route.params;
  const {navigate, setOptions} = useNavigation();
  const {t} = useLanguage();
  const [filter, setFilter] = useState();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'estate',
      'list-post',
      {
        estate_type_id: filter?.type,
        country_id: 241,
      },
    ],
    queryFn: () => getListSell({country_id: 241, estate_type_id: filter?.type}),
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
        renderItem={({item, index}) => (
          <BoxPlaceItem isHeart isStar data={item} key={index} rental="night" />
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
    paddingHorizontal: scale(30),
    rowGap: scale(14),
    marginTop: scale(10),
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingBottom: scale(100),
  },
  buttonStyle: {
    width: '100%',
  },
});
