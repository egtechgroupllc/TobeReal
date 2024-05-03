/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {getListRent} from '../../Model/api/apiAccom';
import {getListSell} from '../../Model/api/apiEstate';
import {getListTour} from '../../Model/api/apiTour';
import {KEY_MAP} from '../../Model/url';
import {COLORS, scale} from '../../assets/constants';
import {IconMyLocation} from '../../assets/icon/Icon';
import {CustomButton} from '../../components';
import MainWrapper from '../../components/MainWrapper';
import {formatDate} from '../../utils/format';
import {getCurrentLocation} from '../../utils/getCurrentLocation';
import CustomMarker from './CustomMarker';
import ListLocation from './ListLocation';
import MapHeader from './MapHeader';

const initialMapState = {
  markers: [],
  region: {
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  },
};
const CARD_WIDTH = scale(400 / 1.4);
export default function HomeMapScreen({showListLocation, style}) {
  const [filter, setFilter] = useState();
  const scrollOffsetX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(0);
  const [focusedItem, setFocusedItem] = useState(0);

  const mapRef = useRef(null);
  const objRent = {
    date_end: formatDate(new Date(), {addDays: 1}),
    date_start: formatDate(),
    accommodation_type_id: filter?.type,
    country_id: 241,
    name: filter?.name,
    max_price: filter?.budget ? filter?.budget[1] : '',
    min_price: filter?.budget ? filter?.budget[0] : '',
  };

  const objBuy = {
    estate_type_id: filter?.type,
    country_id: 241,
    title: filter?.name,
    max_price: filter?.budget ? filter?.budget[1] : '',
    min_price: filter?.budget ? filter?.budget[0] : '',
  };
  const objTour = {
    country_id: 241,
  };
  const {data, isLoading, isError, error} = useQuery({
    queryKey:
      filter?.menu?.name === 'RENT' || !filter?.menu?.name
        ? ['accommodation', 'list-rent', objRent]
        : filter?.menu?.name === 'TOUR'
        ? ['tour', 'list-tour', objTour]
        : ['estate', 'list-post', objBuy],
    queryFn:
      filter?.menu?.name === 'RENT' || !filter?.menu?.name
        ? () => getListRent(objRent)
        : filter?.menu?.name === 'BUY'
        ? () => getListSell(objBuy)
        : () => getListTour(objTour),
  });
  console.log(filter, 12321, data);
  const [state, setState] = useState(initialMapState);

  useEffect(() => {
    setState({
      ...initialMapState,
      markers: data?.data?.rows || [],
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
          mapRef.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            500,
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
          outputRange: [0.5, 0.7, 0.5],
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

        return {scale, backgroundColor, color};
      }),
    [state.markers],
  );

  const onMarkerPress = index => {
    const x = index * CARD_WIDTH;
    flatListRef.current.scrollToOffset(x);
  };

  const currentPosition = useCallback(async () => {
    const {coords} = await getCurrentLocation();

    if (coords) {
      const coordinates = {
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      };
      return coordinates;
    }
  }, []);

  const moveCurrentPosition = useCallback(async () => {
    const coordinates = await currentPosition();

    if (coordinates) {
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
          latitude: state.markers?.[0]?.latitude,
          longitude: state.markers?.[0]?.longitude,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        }}
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
              tracksViewChanges={index === focusedItem}
              coordinate={coordinate}
              zIndex={index === focusedItem ? 1 : 0}
              onPress={e => onMarkerPress(index)}>
              <CustomMarker scaleValue={interpolations[index]} data={marker} />
            </Marker>
          );
        })}
        {/* {children} */}
      </MapView>
      <MapHeader menu onFilter={value => setFilter(value)} />
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
