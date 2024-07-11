/* eslint-disable react-hooks/exhaustive-deps */
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {IconMarker} from '../../../../assets/icon/Icon';
import {getCurrentLocation} from '../../../../utils/getCurrentLocation';
import MapFooter from './MapSetAccomd.js/MapFooter';
import MapHeader from './MapSetAccomd.js/MapHeader';
import {COLORS, scale} from '../../../../assets/constants';
import getDistance from 'geolib/es/getDistance';
import CustomText from '../../../../components/CustomText';
export default function MapSetAccomdScreen() {
  const router = useRoute().params;
  const mapRef = useRef(null);
  const [myLocation, setMyLocation] = useState([]);
  const [moveLocation, setMoveLocation] = useState(
    router?.region || {
      latitude: 0,
      longitude: 0,
    },
  );

  const distance = useMemo(
    () => getDistance(myLocation, moveLocation),
    [myLocation, moveLocation],
  );

  const [typeMoveLocation, setTypeMoveLocation] = useState('click');

  const animatedMoveCenterMap = arr => {
    mapRef.current.fitToCoordinates(arr, {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      animated: true,
    });
  };
  const currentPosition = useCallback(async region => {
    await getCurrentLocation(({coords}) => {
      if (coords || region?.latitude) {
        const coordinates = (region?.latitude && region) || {
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        };

        setMoveLocation(coordinates);
        animatedMoveCenterMap([coordinates]);
        setMyLocation(coordinates);
        return coordinates;
      }
    });
  }, []);

  useEffect(() => {
    currentPosition(router?.region);
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MapHeader
        onPress={currentPosition}
        onPressMove={setTypeMoveLocation}
        typeMove={typeMoveLocation}
      />

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{
          ...StyleSheet.absoluteFill,
        }}
        // mapType="hybrid"
        showsUserLocation
        initialRegion={{
          ...moveLocation,
          latitudeDelta: 0.0033771836087304052,
          longitudeDelta: 0.0018943101167820942,
        }}
        zoomControlEnabled
        onRegionChangeComplete={region => {
          typeMoveLocation === 'move' && setMoveLocation(region);
        }}
        onPress={evt => {
          const region = evt.nativeEvent.coordinate;

          if (typeMoveLocation === 'click') {
            // animatedMoveCenterMap([region]);
            setMoveLocation(region);
          }
        }}>
        <Marker coordinate={moveLocation} />
        <Circle
          center={moveLocation}
          radius={2}
          fillColor={'#F4007420'}
          strokeColor={COLORS.primary}
        />
      </MapView>
      {typeMoveLocation === 'move' && (
        <View
          style={{
            position: 'absolute',
          }}>
          <IconMarker
            style={{
              marginTop: scale(-29),
            }}
          />
        </View>
      )}

      <MapFooter
        router={router}
        moveLocation={moveLocation}
        distance={distance}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
