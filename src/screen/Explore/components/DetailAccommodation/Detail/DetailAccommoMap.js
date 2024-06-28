import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {COLORS, SHADOW, scale} from '../../../../../assets/constants';
import {dataMapNearby} from '../../../../../assets/dataFake/MapNearby';
import {IconMapView, IconMarker} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import WrapperContent from '../../WrapperContent';

export default function DetailAccommoMap({
  region,
  data,
  address,
  disable,
  styleWrapper,
  isShowNearby = true,
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

  const [listLocationNearby, setListLocationNearby] = useState([]);

  const radius = 9 * 1000;

  const fetchPlaces = async () => {
    // const {coords} = await getCurrentLocation();
    // if (coords) {
    //   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.latitude},${data.longitude}&radius=${radius}&key=${KEY_MAP}`;

    //   fetch(url)
    //     .then(response => response.json())
    //     .then(dataRes => {
    //       setListLocationNearby(dataMapNearby?.results || dataRes.results);
    //     });
    // }
    setListLocationNearby(dataMapNearby?.results);
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
        <TouchableOpacity
          // disabled={disable}
          disabled={true}
          activeOpacity={0.7}
          style={styles.boxMap}
          onPress={() =>
            navigate('NoBottomTab', {
              screen: 'MapLocateEstate',
              params: {...data, listLocationNearby},
            })
          }>
          <MapView
            scrollEnabled={false}
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
        {/* {isShowNearby && (
          <Nearby
            data={listLocationNearby?.slice(0, 4)}
            coordinate={coordinate}
            onPressLocationNear={() => {
              navigate('NoBottomTab', {
                screen: 'MapLocateEstate',
                params: {...data, listLocationNearby},
              });
            }}
          />
        )} */}
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
