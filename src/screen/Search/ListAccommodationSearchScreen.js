/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import MainWrapper from '../../components/MainWrapper';
import {useCountry} from '../../hooks/useCountry';
import {getCurrentLocation} from '../../utils/getCurrentLocation';
import MapHeader from '../Map/MapHeader';
import ListAccomSearchContent from './ListAccomSearchContent';
import ListEstateSearchContent from './ListEstateSearchContent';
import ListTourSearchContent from './ListTourSearchContent';
import SearchNavBar from './components/SearchNavBar';
import {useLanguage} from '../../hooks/useLanguage';
import {CustomText} from '../../components';
import {COLORS, SIZES} from '../../assets/constants';

export default function ListAccommodationSearchScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();

  const {country, currency} = useCountry();
  const [filter, setFilter] = useState();
  const [current, setCurrent] = useState({});
  const [empale, setEmpale] = useState();
  const isFilter = useRef();
  const {setOptions} = useNavigation();

  const currentPosition = useCallback(async () => {
    await getCurrentLocation(({coords}) => {
      if (coords) {
        const coordinates = {
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        };
        setCurrent(coordinates);
        return coordinates;
      }
    });
  }, []);
  useEffect(() => {
    currentPosition();
  }, []);

  const objFilter = useMemo(() => {
    return {
      ...params,
      ...filter,
      ...empale?.occupancy,
      near_me:
        (!filter?.province && empale?.destination !== 'near_me') ||
        empale?.destination === 'near_me',
      province:
        (isFilter.current ? filter?.province : empale?.destination) ||
        params?.province,
      date: !empale
        ? params?.date
        : {
            date_end: empale?.date_end,
            date_start: empale?.date_start,
          },
    };
  }, [JSON.stringify([params, filter, empale]), isFilter.current]);

  useEffect(() => {
    return setOptions({
      headerTitleComponent: () =>
        params?.menu === 'RENT' ? (
          <SearchNavBar
            data={objFilter}
            onEmpale={value => {
              isFilter.current = false;
              setEmpale(value);
            }}
          />
        ) : (
          <CustomText
            style={{color: COLORS.white, fontSize: SIZES.medium}}
            textType="semiBold">
            {t('find_real_estate')}
          </CustomText>
        ),
      headerTitleStyle: {
        textAlign: 'left',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(objFilter)]);

  const onFilter = useCallback(
    value => {
      isFilter.current = true;
      setFilter(value);
    },
    [isFilter.current],
  );

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
          <MapHeader onFilter={onFilter} accom mapProvince />
        ) : params?.menu === 'RENT' ? (
          <MapHeader onFilter={onFilter} accom mapProvince />
        ) : (
          <MapHeader onFilter={onFilter} estate mapProvince />
        )}

        {params?.menu === 'TOUR' ? (
          <ListTourSearchContent paramsFilter={filter} />
        ) : params?.menu === 'RENT' ? (
          <ListAccomSearchContent
            paramsFilter={objFilter}
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
