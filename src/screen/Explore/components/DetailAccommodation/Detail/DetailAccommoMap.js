import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {KEY_MAP} from '../../../../../Model/url';
import {COLORS, SHADOW, scale} from '../../../../../assets/constants';
import {IconMapView, IconMarker} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {getCurrentLocation} from '../../../../../utils/getCurrentLocation';
import WrapperContent from '../../WrapperContent';
import Nearby from '../Rooms/components/Nearby';
import {useNavigation} from '@react-navigation/native';
import {dataMapNearby} from '../../../../../assets/dataFake/MapNearby';

export default function DetailAccommoMap({
  region,
  data,
  address,
  styleWrapper,
}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
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

  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current.fitToCoordinates([coordinate], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      animated: true,
    });
  }, [coordinate]);

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
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.boxMap}
          onPress={() =>
            navigate('NoBottomTab', {screen: 'MapLocateEstate', params: data})
          }>
          <MapView
            scrollEnabled={false}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{
              flex: 1,
              borderRadius: scale(10),
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
        </TouchableOpacity>
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
