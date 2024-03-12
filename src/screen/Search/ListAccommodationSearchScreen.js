import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from '../../components/MainWrapper';
import FilterSort from '../Explore/components/DetailAccommodation/Review/FilterSort';
import {useLanguage} from '../../hooks/useLanguage';
import MapHeader from '../Map/MapHeader';
import ListAccomSearchContent from './ListAccomSearchContent';

export default function ListAccommodationSearchScreen() {
  const {t} = useLanguage();
  return (
    <MainWrapper
      scrollEnabled={false}
      styleContent={{backgroundColor: '#f7f9fa'}}>
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        <MapHeader />

        <ListAccomSearchContent />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
