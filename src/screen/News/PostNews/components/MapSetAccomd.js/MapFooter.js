import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomButton} from '../../../../../components';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconMapView} from '../../../../../assets/icon/Icon';
import {Marquee} from '../../../../../components/Marquee';
import CustomText from '../../../../../components/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function MapFooter({moveLocation, router}) {
  const insets = useSafeAreaInsets();
  const {goBack} = useNavigation();
  const {t} = useLanguage();

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: insets.bottom + scale(10),
        },
      ]}>
      <View style={styles.content}>
        <View style={styles.icon}>
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
            Lng: {moveLocation?.longitude}
          </CustomText>
        </View>
      </View>

      <CustomButton
        text={t('confirm')}
        onPress={() => {
          router?.onGoBack(moveLocation);
          goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: scale(14),
    rowGap: scale(12),
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#eee',
    padding: scale(14),
    borderRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(20),
  },
  icon: {
    backgroundColor: '#fff',
    padding: scale(10),
    borderRadius: scale(10),
  },
});
