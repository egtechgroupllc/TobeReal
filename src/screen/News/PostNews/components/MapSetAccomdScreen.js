/* eslint-disable react-hooks/exhaustive-deps */
import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {IconMarker} from '../../../../assets/icon/Icon';
import {getCurrentLocation} from '../../../../utils/getCurrentLocation';
import MapFooter from './MapSetAccomd.js/MapFooter';
import MapHeader from './MapSetAccomd.js/MapHeader';
import {scale} from '../../../../assets/constants';

export default function MapSetAccomdScreen() {
  const router = useRoute().params;
  const mapRef = useRef(null);

  const [moveLocation, setMoveLocation] = useState(
    router?.region || {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
    },
  );

  const [typeMoveLocation, setTypeMoveLocation] = useState('click');

  const animatedMoveCenterMap = arr => {
    mapRef.current.fitToCoordinates(arr, {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      animated: true,
    });
  };
  const currentPosition = useCallback(async () => {
    const {coords} = await getCurrentLocation();

    if (coords || router?.region) {
      const coordinates = router?.region || {
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      };

      setMoveLocation(coordinates);
      animatedMoveCenterMap([coordinates]);
      return coordinates;
    }
  }, []);

  useEffect(() => {
    currentPosition();
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

      <MapFooter router={router} moveLocation={moveLocation} />
    </View>
  );
}

const styles = StyleSheet.create({});
