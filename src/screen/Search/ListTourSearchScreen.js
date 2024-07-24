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
import {Category, CustomText} from '../../components';
import {COLORS, SIZES, scale} from '../../assets/constants';
import {useQuery} from '@tanstack/react-query';
import {getListPopularProvinceTour} from '../../Model/api/apiTour';
import CategoryTour from './components/CategoryTour';
import MapProvince from '../Map/Header/MapProvince';
import ProvinceTour from './components/componentTour/ProvinceTour';
import FilterTour from './components/FilterTour';

export default function ListTourSearchScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();
  const {country, currency} = useCountry();
  const [filter, setFilter] = useState();
  const [current, setCurrent] = useState({});
  const [empale, setEmpale] = useState();
  const isFilter = useRef();
  const {setOptions} = useNavigation();
  const bottomSheetChildRef = useRef();

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
      headerTitleComponent: () => (
        <CustomText
          style={{color: COLORS.white, fontSize: SIZES.medium}}
          textType="semiBold">
          {t('find_tour')}
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
  const {data, isLoading} = useQuery({
    queryKey: ['list', 'popular-province-tour', country?.geoname_id],
    queryFn: () => getListPopularProvinceTour(country?.geoname_id),
  });

  return (
    <MainWrapper
      scrollEnabled={false}
      styleContent={{backgroundColor: '#f7f9fa'}}>
      <FilterTour onFilter={onFilter} />

      <ListTourSearchContent
        paramsFilter={objFilter}
        location={current}
        country={country}
        currency={currency}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
