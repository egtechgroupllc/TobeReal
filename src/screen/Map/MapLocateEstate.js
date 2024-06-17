import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useNavigation, useRoute} from '@react-navigation/native';
import getDistance from 'geolib/es/getDistance';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {KEY_MAP} from '../../Model/url';
import {COLORS, SIZES, images, scale} from '../../assets/constants';
import {dataMapNearby} from '../../assets/dataFake/MapNearby';
import {IconMarkerRent, IconMyLocation} from '../../assets/icon/Icon';
import {CustomButton} from '../../components';
import CustomImage from '../../components/CustomImage';
import MainWrapper from '../../components/MainWrapper';
import {useLanguage} from '../../hooks/useLanguage';
import {getCurrentLocation} from '../../utils/getCurrentLocation';
import MarkerLocate from './MarkerLocate';
import CustomText from '../../components/CustomText';
const type = [
  {
    id: 'tourist_attraction',
    name: 'Tourist attraction',
  },
  {
    id: 'health',
    name: 'Necessary',
  },
  {
    id: 'establishment',
    name: 'Other',
  },
];
export default function MapLocateEstate() {
  const [listLocationNearby, setListLocationNearby] = useState([]);
  const flatListRef = useRef(0);
  const bottomSheetRef = useRef();

  const calculatorMeters = position => {
    const metters = getDistance(coordinate, position);

    return metters < 999
      ? `${metters} m`
      : `${(metters / 1000).toFixed(2).replace('.', ',')} km`;
  };
  const {setOptions} = useNavigation();
  const {t} = useLanguage();
  const data = useRoute().params;
  const CARD_WIDTH = scale(400 / 1.4);
  const mapRef = useRef(null);
  const scrollOffsetX = useRef(new Animated.Value(0)).current;
  const [focusedItem, setFocusedItem] = useState(0);
  const [checked, setChecked] = useState('tourist_attraction');

  const coordinate = {
    latitude: data?.latitude,
    longitude: data?.longitude,
  };
  let mapIndex = 0;

  const onMarkerPress = index => {
    Alert.alert('click');
  };
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
  const radius = 9 * 1000;

  const fetchPlaces = async () => {
    const {coords} = await getCurrentLocation();
    if (coords) {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.latitude},${data.longitude}&radius=${radius}&key=${KEY_MAP}`;
      fetch(url)
        .then(response => response.json())
        .then(dataRes => {
          if (dataRes?.status === 'OVER_QUERY_LIMIT') {
            setListLocationNearby(dataMapNearby?.results);

            return;
          }
          setListLocationNearby(dataRes.results);
        });
    }
  };

  useEffect(() => {
    fetchPlaces();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useMemo(() => {
    const handleScroll = ({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= listLocationNearby.length) {
        index = listLocationNearby.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      setFocusedItem(index);

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {latitude, longitude} = listLocationNearby[index];
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
  }, [listLocationNearby]);
  const interpolations = useMemo(
    () =>
      listLocationNearby?.map((item, index) => {
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

        return {scale};
      }),
    [listLocationNearby],
  );
  const dataNew = useMemo(() => {
    const filterData = listLocationNearby?.filter(item => {
      const filterType = item?.types?.map(element => {
        return element;
      });

      return filterType?.includes(checked);
    });
    return filterData;
  }, [listLocationNearby, checked]);
  return (
    <MainWrapper style={{flex: 1}} scrollEnabled={false}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          ...coordinate,
          latitudeDelta: 0.06851501762865553,
          longitudeDelta: 0.05517102777957916,
        }}
        // onRegionChangeComplete={value => console.log(value)}

        zoomControlEnabled>
        <Marker
          coordinate={coordinate}
          icon={images.hotel}
          style={{zIndex: 9999}}>
          <Callout
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: scale(10),
            }}
            tooltip>
            <View
              style={{
                flex: 1,
                padding: scale(7),
              }}>
              <CustomText style={{color: COLORS.white}}>
                {data?.name}
              </CustomText>
            </View>
          </Callout>
        </Marker>

        {dataNew?.map((marker, index) => {
          const position = {
            latitude: marker?.geometry?.location?.lat,
            longitude: marker?.geometry?.location?.lng,
          };
          return (
            <Marker
              key={index}
              // tracksViewChanges={
              //   Platform.OS === 'ios' ? index === focusedItem : false
              // }
              // zIndex={index === focusedItem ? 1 : 0}
              coordinate={position}
              icon={{uri: marker?.icon}}>
              <Callout>
                <View style={{flex: 1, padding: scale(10), rowGap: scale(10)}}>
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
                    {calculatorMeters({
                      latitude: marker.geometry.location.lat,
                      longitude: marker.geometry.location.lng,
                    })}{' '}
                    từ nơi nghỉ của bạn
                  </CustomText>
                </View>
              </Callout>
            </Marker>
          );
        })}
        {/* <Marker coordinate={coordinate}>
          <IconMarkerRent width={scale(70)} height={scale(70)} />
          <MarkerLocate
            // scaleValue={interpolations[index]}
            data={data}
            // markerFocus={index === focusedItem}
            // checkFilter={!!filter}
          />
        </Marker> */}
        {/* <Callout tooltip> */}

        {/* </Callout> */}

        {/* {children} */}
      </MapView>
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
      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={'Occupancy'}
        snapPoints={['20%', '40%', '95%']}
        index={1}
        styleContent={{
          rowGap: scale(10),
          padding: scale(20),
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.grey,
            alignItems: 'center',
          }}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
              padding: scale(10),
            }}>
            Địa điểm lân cận
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 1,
            columnGap: scale(10),
            marginTop: scale(10),
            paddingHorizontal: scale(20),
            paddingVertical: scale(10),
          }}>
          {type?.map((item, index) => (
            <TouchableOpacity
              onPress={e => {
                item && setChecked(item?.id);
              }}
              key={index}
              activeOpacity={0.7}
              style={{
                justifyContent: 'center',
                borderWidth: 1,
                width: scale(110),
                height: scale(25),
                borderRadius: 99,
                alignItems: 'center',
                borderColor: checked === item?.id ? COLORS.primary : '#ccc',
                backgroundColor: checked === item?.id ? COLORS.primary : '#fff',
              }}>
              <CustomText
                style={{
                  textAlign: 'center',
                  color: checked === item?.id ? COLORS.white : COLORS.black,
                }}>
                {item?.name}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
        <BottomSheetFlatList
          key={'keyMap'}
          data={dataNew}
          alwaysBounceVertical={false}
          directionalLockEnabled={true}
          contentContainerStyle={{
            paddingVertical: scale(10),
            paddingBottom: scale(50),
            paddingHorizontal: scale(20),
            rowGap: scale(10),
          }}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(10),
                borderBottomWidth: scale(1),
                borderColor: COLORS.grey,
                paddingBottom: scale(10),
              }}>
              <CustomImage
                source={item?.icon}
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
              <View
                style={{
                  rowGap: scale(2),
                  columnGap: scale(50),
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <CustomText
                  textType="semiBold"
                  numberOfLines={1}
                  style={{width: '70%'}}>
                  {item?.name}
                </CustomText>
                <CustomText style={{color: '#687176'}} numberOfLines={1}>
                  {calculatorMeters({
                    latitude: item.geometry.location.lat,
                    longitude: item.geometry.location.lng,
                  })}
                </CustomText>
              </View>
            </View>
          )}
        />
      </BottomSheet>
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
