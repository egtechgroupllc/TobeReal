import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../assets/constants';
import HeaderBar from '../../components/HeaderBar';
import SearchChooseLocation from './SearchChooseLocation';
import SearchRecent from './SearchRecent';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../hooks/useLanguage';
import MainWrapper from '../../components/MainWrapper';

export default function HomeSearchAccommodScreen() {
  const {navigate, setOptions} = useNavigation();
  const {t} = useLanguage();

  const handleSelectSearch = value => {
    navigate(t('explore'), {
      screen: 'HomeExploreScreen',
      params: value,
    });
  };

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: 'Search',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper scrollEnabled={false}>
      <View style={styles.wrapper}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: scale(20),
            position: 'absolute',
            width: '100%',
            zIndex: -1,
          }}
        />
        <View style={styles.content}>
          <SearchChooseLocation onPress={handleSelectSearch} />
          <SearchRecent onPress={handleSelectSearch} />
        </View>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: scale(-50),
    width: '86%',
    alignSelf: 'center',
    rowGap: scale(14),
  },
});
