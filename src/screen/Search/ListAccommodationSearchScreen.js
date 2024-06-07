import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MainWrapper from '../../components/MainWrapper';
import FilterSort from '../Explore/components/DetailAccommodation/Review/FilterSort';
import {useLanguage} from '../../hooks/useLanguage';
import MapHeader from '../Map/MapHeader';
import ListAccomSearchContent from './ListAccomSearchContent';
import {useRoute} from '@react-navigation/native';
import ListEstateSearchContent from './ListEstateSearchContent';
import ListTourSearchContent from './ListTourSearchContent';
import {getCurrentLocation} from '../../utils/getCurrentLocation';
import {useCountry} from '../../hooks/useCountry';

export default function ListAccommodationSearchScreen() {
  const {t} = useLanguage();
  const params = useRoute().params;
  const {country, currency} = useCountry();
  const [filter, setFilter] = useState();
  const [current, setCurrent] = useState({});
  const currentPosition = useCallback(async () => {
    const {coords} = await getCurrentLocation();

    if (coords) {
      const coordinates = {
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      };
      setCurrent(coordinates);
      return coordinates;
    }
  }, []);
  useEffect(() => {
    currentPosition();
  }, []);
  // console.log(filter);
  console.log(params, 312321312);
  return (
    <MainWrapper
      scrollEnabled={false}
      styleContent={{backgroundColor: '#f7f9fa'}}>
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        {params?.menu === 'TOUR' ? (
          <MapHeader onFilter={value => setFilter(value)} accom mapProvince />
        ) : params?.menu === 'RENT' ? (
          <MapHeader onFilter={value => setFilter(value)} accom mapProvince />
        ) : (
          <MapHeader
            onFilter={value => {
              setFilter(value);
            }}
            estate
            mapProvince
          />
        )}
        {params?.menu === 'TOUR' ? (
          <ListTourSearchContent paramsFilter={filter} />
        ) : params?.menu === 'RENT' ? (
          <ListAccomSearchContent
            paramsFilter={filter}
            location={current}
            country={country}
            currency={currency}
          />
        ) : (
          <ListEstateSearchContent
            paramsFilter={filter}
            location={current}
            country={country}
            currency={currency}
          />
        )}
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
