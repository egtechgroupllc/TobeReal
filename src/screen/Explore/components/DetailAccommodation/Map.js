import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import WrapperContent from '../WrapperContent';
import {MapContain} from '../../../../components';
import {IconMapView} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';

export default function Map() {
  return (
    <WrapperContent heading="Map View" isShadow styleContent={styles.wrapper}>
      <View
        style={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          borderRadius: scale(12),
        }}>
        <MapContain
          style={{
            flex: 1,
          }}
        />
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
            HR Rasuna Said Kav X-0 Kuningan, Setiabudi, Jakarta Selatan Jl. HR
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
