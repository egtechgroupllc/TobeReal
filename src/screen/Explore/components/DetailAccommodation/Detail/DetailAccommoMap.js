import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {KEY_MAP} from '../../../../../Model/url';
import {COLORS, SHADOW, scale} from '../../../../../assets/constants';
import {IconMapView, IconMarker} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {getCurrentLocation} from '../../../../../utils/getCurrentLocation';
import WrapperContent from '../../WrapperContent';
import Nearby from '../Rooms/components/Nearby';

export default function DetailAccommoMap({
  region,
  data,
  address,
  styleWrapper,
  isShowNearby = true,
}) {
  const {t} = useLanguage();
  const [coordinate, setCoordinate] = useState(
    data?.latitude
      ? {
          latitude: +data?.latitude,
          longitude: +data?.longitude,
        }
      : {
          latitude: 0,
          longitude: 0,
        },
  );

  const [listLocationNearby, setListLocationNearby] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current.fitToCoordinates([coordinate], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      animated: true,
    });
  }, [coordinate]);

  const radius = 9 * 1000;

  const fetchPlaces = async () => {
    const {coords} = await getCurrentLocation();
    if (coords) {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.latitude},${data.longitude}&radius=${radius}&key=${KEY_MAP}`;
      fetch(url)
        .then(response => response.json())
        .then(dataRes => {
          setListLocationNearby(dataRes.results);
        });
    }
  };

  useEffect(() => {
    isShowNearby && fetchPlaces();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isShowNearby]);

  useEffect(() => {
    region && setCoordinate(region);
  }, [region]);

  return (
    <WrapperContent
      heading={t('map_view')}
      styleContent={[styles.wrapper, styleWrapper]}>
      <View
        style={{
          rowGap: scale(10),
          width: '100%',
        }}>
        <View style={styles.boxMap}>
          <MapView
            scrollEnabled={false}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{
              flex: 1,
            }}
            region={{
              ...coordinate,
              latitudeDelta: 0.0006187393884509504,
              longitudeDelta: 0.0006142258644104004,
            }}>
            <Marker coordinate={coordinate}>
              <IconMarker />
            </Marker>
          </MapView>

          <View style={styles.footer}>
            <IconMapView
              fill={COLORS.primary}
              style={{
                width: scale(18),
                height: scale(18),
              }}
            />
            <CustomText style={{flex: 1}} numberOfLines={2}>
              {address || data?.address}
            </CustomText>
          </View>
        </View>
        {isShowNearby && (
          <Nearby data={listLocationNearby} coordinate={coordinate} />
        )}
      </View>
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: scale(16),
    // height: scale(200),
  },
  boxMap: {
    width: '100%',
    borderRadius: scale(10),
    height: scale(200),
    backgroundColor: '#fff',
    ...SHADOW,
  },
  footer: {
    minHeight: '20%',
    padding: scale(10),
    flexDirection: 'row',
    columnGap: scale(16),
    alignItems: 'center',
  },
  icon: {
    borderRadius: scale(6),
    backgroundColor: '#f1f1f1',
    padding: scale(6),
  },
});
