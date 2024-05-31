import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {COLORS, SIZES, images, scale} from '../../../../assets/constants';
import CustomImage from '../../../../components/CustomImage';

export default function Contact({data}) {
  return (
    <View style={styles.boxContact}>
      <CustomText textType="bold" size={SIZES.medium}>
        Contact detail
      </CustomText>
      <View style={styles.infoContact}>
        <CustomImage source={images.avatar} style={styles.avatar} />
        <View
          style={{
            rowGap: scale(2),
          }}>
          <CustomText textType="medium" size={SIZES.xMedium}>
            {data?.contact_name}
          </CustomText>
          <CustomText textType="medium" color={COLORS.text}>
            {data?.contact_phone}
          </CustomText>
          <CustomText textType="medium" color={COLORS.text}>
            {data?.contact_email}
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxContact: {
    columnGap: scale(10),
    borderTopWidth: 1,
    borderColor: COLORS.grey,
    paddingTop: scale(12),
    rowGap: scale(6),
  },
  infoContact: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
  },
  avatar: {
    width: scale(30),
    height: scale(30),
    borderRadius: 99,
  },
  footer: {},
});
