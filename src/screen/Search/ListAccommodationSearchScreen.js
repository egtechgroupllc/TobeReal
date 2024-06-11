import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MainWrapper from '../../components/MainWrapper';
import {useCountry} from '../../hooks/useCountry';
import {useLanguage} from '../../hooks/useLanguage';
import {getCurrentLocation} from '../../utils/getCurrentLocation';
import MapHeader from '../Map/MapHeader';
import ListAccomSearchContent from './ListAccomSearchContent';
import ListEstateSearchContent from './ListEstateSearchContent';
import ListTourSearchContent from './ListTourSearchContent';
import CustomText from '../../components/CustomText';
import {SIZES} from '../../assets/constants';
import {formatDate} from '../../utils/format';
import {differenceInDays} from 'date-fns';

export default function ListAccommodationSearchScreen() {
  const {t} = useLanguage();
  const params = useRoute().params;
  const {country, currency} = useCountry();
  const [filter, setFilter] = useState();
  const [current, setCurrent] = useState({});
  const {setOptions} = useNavigation();

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

  useLayoutEffect(() => {
    return setOptions({
      headerTitleComponent: () => (
        <View
          style={{
            width: '70%',
          }}>
          <CustomText
            textType="bold"
            numberOfLines={1}
            style={{
              color: '#fff',
              fontSize: SIZES.xMedium,
            }}>
            {params.near_me ? 'Near me' : params?.province?.name}
          </CustomText>
          <CustomText
            style={{
              color: '#fff',
            }}>
            {`${formatDate(params?.date?.date_end)}, ${differenceInDays(
              params?.date?.date_end,
              params?.date?.date_start,
            )} ${t('night')}, ${params?.numAdult} ${t('guest')}, ${
              params?.numRoom
            } ${t('room')}`}
          </CustomText>
        </View>
      ),
      headerTitleStyle: {
        textAlign: 'left',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
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
