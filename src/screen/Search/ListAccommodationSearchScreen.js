import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MainWrapper from '../../components/MainWrapper';
import FilterSort from '../Explore/components/DetailAccommodation/Review/FilterSort';
import {useLanguage} from '../../hooks/useLanguage';
import MapHeader from '../Map/MapHeader';
import ListAccomSearchContent from './ListAccomSearchContent';
import {useRoute} from '@react-navigation/native';
import ListEstateSearchContent from './ListEstateSearchContent';
import ListTourSearchContent from './ListTourSearchContent';

export default function ListAccommodationSearchScreen() {
  const {t} = useLanguage();
  const params = useRoute().params;
  const [filter, setFirst] = useState();
  return (
    <MainWrapper
      scrollEnabled={false}
      styleContent={{backgroundColor: '#f7f9fa'}}>
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        <MapHeader onFilter={value => setFirst(value)} />
        {params?.menu === 'TOUR' ? (
          <ListTourSearchContent paramsFilter={filter} />
        ) : params?.menu === 'RENT' ? (
          <ListAccomSearchContent paramsFilter={filter} />
        ) : (
          <ListEstateSearchContent paramsFilter={filter} />
        )}
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
