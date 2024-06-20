import {useNavigation, useRoute} from '@react-navigation/native';
import getDistance from 'geolib/es/getDistance';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {COLORS, SHADOW, images, scale} from '../../../../../assets/constants';
import {IconMyLocation} from '../../../../../assets/icon/Icon';
import {CustomButton, CustomImage, CustomText} from '../../../../../components';
import MainWrapper from '../../../../../components/MainWrapper';
import {useLanguage} from '../../../../../hooks/useLanguage';
import BottomNearbyLocations from './BottomNearbyLocations';

export default function MapLocateEstate() {
  const [listLocationNearby, setListLocationNearby] = useState([]);

  const dataPar = useRoute().params;

  const coordinate = useRef({
    latitude: dataPar?.latitude,
    longitude: dataPar?.longitude,
  }).current;

  const {setOptions} = useNavigation();
  const {t} = useLanguage();

  const mapRef = useRef(null);
  const [focusedItem, setFocusedItem] = useState();

  useEffect(() => {
    return setOptions({
      headerTitle: t('Map'),
      headerTitleStyle: {
        textAlign: 'center',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveCurrentPosition = useCallback(async () => {
    mapRef.current.fitToCoordinates([coordinate], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      animated: true,
    });
  }, []);

  useEffect(() => {
    if (focusedItem) {
      const coordinateNearby = {
        latitude: focusedItem?.geometry?.location?.lat,
        longitude: focusedItem?.geometry?.location?.lng,
      };

      mapRef.current.animateCamera(
        {
          center: {
            ...coordinateNearby,
            latitudeDelta: 0.06851501762865553,
            longitudeDelta: 0.05517102777957916,
          },
        },
        10,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(focusedItem?.geometry?.location)]);

  return (
    <MainWrapper style={{flex: 1}} scrollEnabled={false}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...coordinate,
          latitudeDelta: 0.06851501762865553,
          longitudeDelta: 0.05517102777957916,
        }}
        zoomControlEnabled>
        <Marker
          coordinate={coordinate}
          icon={images.hotel}
          style={{zIndex: 9999}}>
          <Callout
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: scale(6),
            }}
            tooltip>
            <View
              style={{
                flex: 1,
                padding: scale(7),
              }}>
              <CustomText style={{color: COLORS.white}}>
                {dataPar?.name}
              </CustomText>
            </View>
          </Callout>
        </Marker>

        {listLocationNearby?.map((marker, index) => {
          const position = {
            latitude: marker?.geometry?.location?.lat,
            longitude: marker?.geometry?.location?.lng,
          };
          const isActive = focusedItem?.place_id === marker?.place_id;
          return (
            <Marker
              isPreselected
              key={index}
              coordinate={position}
              style={{
                alignItems: 'center',
                rowGap: 10,
              }}
              zIndex={isActive ? 2 : 1}
              onPress={() => setFocusedItem(marker)}>
              <MarkerCallout
                marker={marker}
                coordinate={coordinate}
                isActive={isActive}
              />
              <CustomImage
                source={marker?.icon}
                style={{
                  width: scale(20),
                  height: scale(20),
                  transform: [
                    {
                      scale: isActive ? 1.5 : 1,
                    },
                  ],
                }}
              />
            </Marker>
          );
        })}
      </MapView>

      <CustomButton
        isShadow
        styleWrapper={{
          position: 'absolute',
          top: '10%',
          right: scale(10),
        }}
        onPress={moveCurrentPosition}
        iconRight={IconMyLocation}
        style={styles.btnRegionUser}
        styleIcon={{
          color: '#3b57f8',
        }}
      />

      <BottomNearbyLocations
        data={dataPar}
        setListLocationNearby={setListLocationNearby}
        onSelect={setFocusedItem}
        focusedItem={focusedItem}
      />
    </MainWrapper>
  );
}

const calculatorMeters = (coordinate, position) => {
  const metters = getDistance(coordinate, position);

  return metters < 999
    ? `${metters} m`
    : `${(metters / 1000).toFixed(2).replace('.', ',')} km`;
};

const MarkerCallout = ({marker, isActive, coordinate}) => {
  return (
    isActive && (
      <View
        style={{
          padding: scale(10),
          rowGap: scale(3),
          backgroundColor: '#fff',
          alignItems: 'center',
          borderRadius: scale(8),
          ...SHADOW,
        }}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(10),
            alignItems: 'center',
          }}>
          <CustomImage
            source={{uri: marker?.icon}}
            style={{
              width: scale(20),
              height: scale(20),
            }}
          />
          <CustomText>{marker?.name}</CustomText>
        </View>
        <CustomText>
          cách xa{' '}
          {calculatorMeters(coordinate, {
            latitude: marker.geometry.location.lat,
            longitude: marker.geometry.location.lng,
          })}{' '}
          từ nơi nghỉ của bạn
        </CustomText>
      </View>
    )
  );
};

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
