import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {
  Marker,
  MarkerAnimated,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {COLORS, scale} from '../../../../assets/constants';
import {IconMapView} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import WrapperContent from '../WrapperContent';
import CustomMarker from '../../../Map/CustomMarker';
import { useLanguage } from '../../../../hooks/useLanguage';

export default function Map() {
  const {t}= useLanguage()
  return (
    <WrapperContent heading={t('map_view')} isShadow styleContent={styles.wrapper}>
      <View
        style={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          borderRadius: scale(12),
        }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          scrollEnabled={false}
          initialRegion={{
            latitude: 22.62938671242907,
            longitude: 88.4354486029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
          }}>
          <Marker
            coordinate={{
              latitude: 22.62938671242907,
              longitude: 88.4354486029795,
            }}>
            <CustomMarker />
          </Marker>
        </MapView>
        <View
          style={{
            // flex: 0.5,
            minHeight: '30%',
            padding: scale(12),
            flexDirection: 'row',
            columnGap: scale(16),
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: scale(6),
              backgroundColor: '#f1f1f1',
              padding: scale(6),
            }}>
            <IconMapView
              fill={COLORS.primary}
              style={{
                width: scale(18),
                height: scale(18),
              }}
            />
          </View>
          <CustomText style={{flex: 1}} numberOfLines={5}>
            Jl. HR Rasuna Said Kav X-0 Kuningan, Setiabudi, Jakarta Selatan Jl.
          </CustomText>
        </View>
      </View>
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: scale(16),
    backgroundColor: '#fff',
    height: scale(250),
  },
});
