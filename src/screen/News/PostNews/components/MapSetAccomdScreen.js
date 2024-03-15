import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {CustomButton, CustomInput} from '../../../../components';
import {useLanguage} from '../../../../hooks/useLanguage';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconMapView, IconMarker} from '../../../../assets/icon/Icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomText from '../../../../components/CustomText';
import {Marquee} from '../../../../components/Marquee';

export default function MapSetAccomdScreen() {
  const {t} = useLanguage();
  const insets = useSafeAreaInsets();
  const {goBack} = useNavigation();
  const router = useRoute().params;

  const [moveLocation, setMoveLocation] = useState(
    router?.region || {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
    },
  );
  console.log(router?.region, 381683761286328168);
  // useEffect(() => {
  //   setMoveLocation(router?.params);
  // }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          paddingHorizontal: scale(20),
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 1,
          padding: scale(10),
          rowGap: scale(10),
        }}>
        <CustomInput
          placeholder={t('Search')}
          style={{
            backgroundColor: '#fff',
          }}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          ...StyleSheet.absoluteFill,
        }}
        showsUserLocation
        initialRegion={{
          ...moveLocation,
          latitudeDelta: 0.0033771836087304052,
          longitudeDelta: 0.0018943101167820942,
        }}
        zoomControlEnabled
        onRegionChangeComplete={region => {
          // setMoveLocation(region);
        }}
        onPress={e => {
          const region = e.nativeEvent.coordinate;
          setMoveLocation(region);
        }}>
        <Marker coordinate={moveLocation} />
      </MapView>

      <View
        style={{
          position: 'absolute',
        }}>
        <IconMarker />
      </View>

      <View
        style={{
          padding: scale(16),
          rowGap: scale(12),
          position: 'absolute',
          bottom: 0,
          paddingBottom: insets.bottom + scale(10),
          zIndex: 1,
          width: '100%',
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            backgroundColor: '#eee',
            padding: scale(16),
            borderRadius: scale(10),
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(20),
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: scale(10),
              borderRadius: scale(10),
            }}>
            <IconMapView fill={COLORS.primary} />
          </View>
          <View
            style={{
              flex: 1,
              rowGap: scale(4),
            }}>
            <Marquee>
              <CustomText
                textType="semiBold"
                style={{
                  fontSize: SIZES.medium,
                }}>
                Lat: {moveLocation?.latitude}
              </CustomText>
            </Marquee>

            <CustomText style={styles.numberPiece} numberOfLines={2}>
              Lng: {moveLocation?.longitude} 21381263712631631 86381638163
            </CustomText>
          </View>
        </View>

        <CustomButton
          text={t('confirm')}
          onPress={() => {
            router.onGoBack(moveLocation);
            goBack();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
