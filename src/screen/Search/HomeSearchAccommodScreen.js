import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {getListCountry} from '../../Model/api/common';
import {COLORS, scale} from '../../assets/constants';
import MainWrapper from '../../components/MainWrapper';
import {useLanguage} from '../../hooks/useLanguage';
import SearchChooseLocation from './SearchChooseLocation';
import SearchPopular from './SearchPopular';
export default function HomeSearchAccommodScreen() {
  const {navigate, setOptions} = useNavigation();
  const {t} = useLanguage();

  const handleSelectSearch = value => {
    navigate('Explore', {
      screen: 'HomeExploreScreen',
      params: value,
    });
  };

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('search'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const listCountry = useQuery({
    queryKey: ['common', 'list-country', 1562822],
    queryFn: () => getListCountry(1562822),
  });
  // useEffect(() => {
  //   setFilter(listCountry.data?.data?.[0]);
  // }, [listCountry.data?.data]);
  const data = listCountry.data?.data?.slice(0, 9);
  return (
    <MainWrapper>
      <View style={styles.content}>
        <SearchChooseLocation onPress={handleSelectSearch} />
        {/* <SearchRecent onPress={handleSelectSearch} /> */}
        <SearchPopular onPress={handleSelectSearch} data={data} />
      </View>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: scale(60),
          position: 'absolute',
          width: '100%',
        }}
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
    paddingBottom: scale(50),
  },
});
