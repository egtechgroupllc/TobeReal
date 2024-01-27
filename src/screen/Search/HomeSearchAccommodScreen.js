import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../assets/constants';
import HeaderBar from '../../components/HeaderBar';
import SearchChooseLocation from './SearchChooseLocation';
import SearchRecent from './SearchRecent';
import {useNavigation} from '@react-navigation/native';

export default function HomeSearchAccommodScreen() {
  const {navigate} = useNavigation();

  const handleSelectSearch = value => {
    navigate('Explore', {
      screen: 'HomeExploreScreen',
      params: value,
    });
  };

  return (
    <View style={styles.wrapper}>
      <HeaderBar />

      <View style={styles.content}>
        <SearchChooseLocation onPress={handleSelectSearch} />
        <SearchRecent onPress={handleSelectSearch} />
      </View>
    </View>
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
