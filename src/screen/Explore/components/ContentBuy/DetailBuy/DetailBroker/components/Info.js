import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  IconCalendar,
  IconCertificate,
  IconEmail,
  IconPhone,
} from '../../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';

export default function Info() {
  return (
    <View style={{paddingVertical: scale(20), paddingHorizontal: scale(50)}}>
      <View style={styles.boxInfoItem}>
        <View style={styles.boxIcon}>
          <IconCertificate
            style={{
              width: scale(12),
              height: scale(12),
            }}
            fill={COLORS.white}
          />
        </View>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
            color: COLORS.white,
            // flex: 1,
          }}>
          Have a broker certificate
        </CustomText>
      </View>
      <View style={styles.boxInfoItem}>
        <View style={styles.boxIcon}>
          <IconCalendar
            style={{
              width: scale(12),
              height: scale(12),
            }}
            fill={COLORS.white}
          />
        </View>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
            color: COLORS.white,
            // flex: 1,
          }}>
          7 years participating in nowtravel.vn
        </CustomText>
      </View>
      <View style={styles.boxInfoItem}>
        <View style={styles.boxIcon}>
          <IconPhone
            style={{
              width: scale(12),
              height: scale(12),
            }}
            fill={COLORS.white}
          />
        </View>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
            color: COLORS.white,
            // flex: 1,
          }}>
          Phone: 0984839994
        </CustomText>
      </View>
      <View style={styles.boxInfoItem}>
        <View style={styles.boxIcon}>
          <IconEmail
            style={{
              width: scale(12),
              height: scale(12),
            }}
            fill={COLORS.white}
          />
        </View>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
            color: COLORS.white,
            // flex: 1,
          }}>
          Email: hoangminh9876@gmail.com
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxInfoItem: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
    paddingVertical: scale(5),
  },
  boxIcon: {
    padding: scale(4),
    backgroundColor: COLORS.primary,
    borderRadius: scale(6),
  },
});
