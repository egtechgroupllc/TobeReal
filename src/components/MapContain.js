import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {scale} from '../assets/constants';

export default function MapContain({children, style}) {
  const mapRef = useRef(null);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     mapRef.current.fitToCoordinates(coordinates, {
  //       edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
  //       animated: true,
  //     });
  //   }
  // }, [data]);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={[styles.map, style]}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
      zoomControlEnabled
      showsUserLocation>
      <Marker
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
      />
      {children}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    // width: '100%',
    // height: '100%',
    flex: 1,
  },
});
