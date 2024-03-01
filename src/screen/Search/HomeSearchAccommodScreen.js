import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../assets/constants';
import HeaderBar from '../../components/HeaderBar';
import SearchChooseLocation from './SearchChooseLocation';
import SearchRecent from './SearchRecent';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../hooks/useLanguage';
import MainWrapper from '../../components/MainWrapper';

export default function HomeSearchAccommodScreen() {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const handleSelectSearch = value => {
    navigate(t('explore'), {
      screen: 'HomeExploreScreen',
      params: value,
    });
  };

  return (
    <MainWrapper scrollEnabled={false}>
      <View style={styles.wrapper}>
        <HeaderBar
          styleWrapper={{
            height: scale(120),
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
    width: '86%',
    alignSelf: 'center',
    rowGap: scale(14),
    marginTop: scale(-50),
  },
});
