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
import {useLanguage} from '../../../../../../../hooks/useLanguage';

export default function Info({data}) {
  const {t} = useLanguage();

  return (
    <View style={{paddingVertical: scale(20), paddingHorizontal: scale(50)}}>
      <View style={styles.boxInfoItem}>
        <View style={styles.boxIcon}>
          <IconCertificate
            style={{
              width: scale(12),
              height: scale(12),
            }}
          />
        </View>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
            // flex: 1,
          }}>
          {t('broker_certificate')}
        </CustomText>
      </View>
      <View style={styles.boxInfoItem}>
        <View style={styles.boxIcon}>
          <IconCalendar
            style={{
              width: scale(12),
              height: scale(12),
            }}
            fill={'#000'}
          />
        </View>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
            // flex: 1,
          }}>
          7 {t('year_paricipant')}
        </CustomText>
      </View>
      <View style={styles.boxInfoItem}>
        <View style={styles.boxIcon}>
          <IconPhone
            style={{
              width: scale(12),
              height: scale(12),
            }}
          />
        </View>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
            // flex: 1,
          }}>
          {t('phone')}: {data?.contact_phone}
        </CustomText>
      </View>
      <View style={styles.boxInfoItem}>
        <View style={styles.boxIcon}>
          <IconEmail
            style={{
              width: scale(12),
              height: scale(12),
            }}
          />
        </View>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
            // flex: 1,
          }}>
          {t('email')}: {data?.contact_email}
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
