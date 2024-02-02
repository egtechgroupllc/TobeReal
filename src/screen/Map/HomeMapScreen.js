/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {scale, COLORS} from '../../assets/constants';
import {IconMyLocation} from '../../assets/icon/Icon';
import {CustomButton} from '../../components';
import {markers} from '../../utils/mapData';
import ListLocation from './ListLocation';
import MapHeader from './MapHeader';
import CustomMarker from './CustomMarker';
import {getCurrentLocation} from '../../utils/getCurrentLocation';

const initialMapState = {
  markers,
  region: {
    latitude: 22.62938671242907,
    longitude: 88.4354486029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  },
};
const CARD_WIDTH = scale(400 / 1.4);
export default function HomeMapScreen({children, showListLocation, style}) {
  const scrollOffsetX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(0);

  const mapRef = useRef(null);
  const [state, setState] = useState(initialMapState);

  useEffect(() => {
    setState(initialMapState);
  }, [initialMapState]);

  let mapIndex = 0;

  useEffect(() => {
    const handleScroll = ({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = state.markers[index];
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
  }, []);

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
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });

        return {scale};
      }),
    [],
  );

  const onMarkerPress = index => {
    const x = index * CARD_WIDTH;
    flatListRef.current.scrollToOffset(x);
  };

  const currentPosition = async () => {
    const {coords} = await getCurrentLocation();

    if (coords) {
      const coordinates = {
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      };

      mapRef.current.fitToCoordinates([coordinates], {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={[styles.map, style]}
        region={state.region}
        zoomControlEnabled
        showsUserLocation>
        {state.markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={e => onMarkerPress(index)}>
              <CustomMarker scaleValue={interpolations[index].scale} />
            </Marker>
          );
        })}
        {/* {children} */}
      </MapView>
      <MapHeader />
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
        onPress={currentPosition}
        iconRight={IconMyLocation}
        style={{
          backgroundColor: COLORS.white,
          width: scale(33),
          height: scale(33),
          borderRadius: 99,
        }}
        styleIcon={{
          color: '#3b57f8',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    // width: '100%',
    // height: '100%',
    flex: 1,
  },
});