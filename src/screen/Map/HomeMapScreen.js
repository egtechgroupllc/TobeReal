/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Alert, Animated, StyleSheet, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {getListRent} from '../../Model/api/apiAccom';
import {getListSell} from '../../Model/api/apiEstate';
import {getListTour} from '../../Model/api/apiTour';
import {KEY_MAP} from '../../Model/url';
import {COLORS, SIZES, images, scale} from '../../assets/constants';
import {IconMyLocation} from '../../assets/icon/Icon';
import {CustomButton} from '../../components';
import MainWrapper from '../../components/MainWrapper';
import {formatDate} from '../../utils/format';
import {getCurrentLocation} from '../../utils/getCurrentLocation';
import CustomMarker from './CustomMarker';
import ListLocation from './ListLocation';
import MapHeader from './MapHeader';
import {useCountry} from '../../hooks/useCountry';
import CustomText from '../../components/CustomText';
import {Platform} from 'react-native';
import {useLanguage} from '../../hooks/useLanguage';

const initialMapState = {
  markers: [],
  // region: {
  //   latitudeDelta: 0.02605427198568755,
  //   longitudeDelta: 0.014597922563552856,
  // },
};
const CARD_WIDTH = scale(400 / 1.4);
export default function HomeMapScreen({showListLocation, style}) {
  const {t} = useLanguage();

  const [filter, setFilter] = useState();
  const scrollOffsetX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(0);
  const [focusedItem, setFocusedItem] = useState(0);
  const [current, setCurrent] = useState(null);
  const {country, currency} = useCountry();
  const mapRef = useRef(null);

  const objRent = {
    date_end: formatDate(new Date(), {addDays: 1}),
    date_start: formatDate(),
    accommodation_type_id: filter?.type,
    country_id: country?.id,
    province_id: filter?.province?.id,
    name: filter?.name,
    max_price: filter?.budget ? filter?.budget[1] : '',
    min_price: filter?.budget ? filter?.budget[0] : '',
    ...current,
    distance: current?.longitude && 5000,
    currency_id: currency?.id,
  };
  const objBuy = {
    estate_type_id: filter?.type,
    country_id: country?.id,
    province_id: filter?.province?.id,
    title: filter?.name,
    max_price: filter?.budget ? filter?.budget[1] : '',
    min_price: filter?.budget ? filter?.budget[0] : '',
    ...current,
    distance: current?.longitude && 5000,
    currency_id: currency?.id,
  };
  const objTour = {
    country_id: country?.id,
  };
  const {data, isLoading, isError, error} = useQuery({
    queryKey:
      filter?.menu?.id === 'RENT' || !filter?.menu?.id
        ? ['accommodation', 'list-rent', objRent]
        : filter?.menu?.id === 'TOUR'
        ? ['tour', 'list-tour', objTour]
        : ['estate', 'list-post', objBuy],
    queryFn:
      filter?.menu?.id === 'RENT' || !filter?.menu?.id
        ? () => getListRent(objRent)
        : filter?.menu?.id === 'BUY'
        ? () => getListSell(objBuy)
        : () => getListTour(objTour),
  });
  const [state, setState] = useState(initialMapState);

  useEffect(() => {
    setState({
      ...initialMapState,
      markers: data?.data?.rows?.slice(0, 9) || [],
    });
  }, [data?.data]);

  let mapIndex = 0;

  useMemo(() => {
    const handleScroll = ({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      setFocusedItem(index);

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {latitude, longitude} = state.markers[index];
          const coordinate = {
            latitude,
            longitude,
          };
          mapRef.current.animateCamera(
            {
              center: {
                ...coordinate,
                latitudeDelta: 0.06851501762865553,
                longitudeDelta: 0.05517102777957916,
              },
              // heading: 0,
            },
            10,
          );
        }
      }, 10);
    };

    scrollOffsetX.addListener(handleScroll);
  }, [state.markers]);

  const interpolations = useMemo(
    () =>
      state.markers.map((marker, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          (index + 1) * CARD_WIDTH,
        ];

        const scale = scrollOffsetX.interpolate({
          inputRange,
          outputRange: [0.7, 1, 0.7],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollOffsetX.interpolate({
          inputRange,
          outputRange: ['#fff', '#deaf02', '#fff'],
          extrapolate: 'clamp',
        });
        const color = scrollOffsetX.interpolate({
          inputRange,
          outputRange: [COLORS.primary, '#fff', COLORS.primary],
          extrapolate: 'clamp',
        });
        return {scale};
      }),
    [state.markers],
  );

  const onMarkerPress = index => {
    const x = index * CARD_WIDTH;
    flatListRef.current.scrollToOffset(x, true);
  };
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
  const moveCurrentPosition = useCallback(async () => {
    const coordinates = await currentPosition();
    if (coordinates) {
      setCurrent(coordinates);
      mapRef.current.fitToCoordinates([coordinates], {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    }
  }, []);

  const radius = 4 * 1000;

  const fetchPlaces = async () => {
    const location = await currentPosition();

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&key=${KEY_MAP}`;

    fetch(url)
      .then(response => response.json())
      .then(dataPlaces => {
        console.log('data', dataPlaces.results);
      });
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <MainWrapper style={{flex: 1}} scrollEnabled={false}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={[styles.map, style]}
        region={{
          latitude: current?.latitude || state.markers?.[0]?.latitude || 0,
          longitude: current?.longitude || state.markers?.[0]?.longitude || 0,
          latitudeDelta: 0.06851501762865553,
          longitudeDelta: 0.05517102777957916,
        }}
        // onRegionChangeComplete={value => console.log(value)}
        zoomControlEnabled
        showsUserLocation>
        {state.markers.map((marker, index) => {
          const coordinate = {
            latitude: marker?.latitude,
            longitude: marker?.longitude,
          };

          return (
            <Marker
              key={index}
              tracksViewChanges={
                Platform.OS === 'ios' ? index === focusedItem : false
              }
              coordinate={coordinate}
              zIndex={index === focusedItem ? 1 : 0}
              onPress={e => onMarkerPress(index)}>
              {/* <Callout tooltip> */}
              <CustomMarker
                scaleValue={interpolations[index]}
                data={marker}
                markerFocus={index === focusedItem}
                checkFilter={!!filter}
              />
              {/* </Callout> */}
            </Marker>
          );
        })}
        {/* {children} */}
      </MapView>
      <MapHeader
        mapProvince
        menu
        dataReturn={data?.data}
        onFilter={value => {
          !value?.name && delete value?.name;
          const arrKeys = Object.keys(value);

          JSON.stringify(value) !== '{}' && setCurrent({});
          (JSON.stringify(value) === '{}' ||
            (arrKeys?.length === 1 && value?.menu)) &&
            moveCurrentPosition();
          setFilter(value);
        }}
      />
      {!showListLocation && (
        <ListLocation
          ref={flatListRef}
          data={state.markers}
          scrollOffsetX={scrollOffsetX}
          CARD_WIDTH={CARD_WIDTH}
        />
      )}

      <CustomButton
        isShadow
        styleWrapper={{
          position: 'absolute',
          top: '15%',
          right: scale(10),
        }}
        onPress={moveCurrentPosition}
        iconRight={IconMyLocation}
        style={styles.btnRegionUser}
        styleIcon={{
          color: '#3b57f8',
        }}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  map: {
    // width: '100%',
    // height: '100%',
    flex: 1,
  },
  btnRegionUser: {
    backgroundColor: COLORS.white,
    width: scale(33),
    height: scale(33),
    borderRadius: 99,
  },
});
