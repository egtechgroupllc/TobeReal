import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, images, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';

export default function InfoItem({Icon, name, value, styleIcon}) {
  const IconComponent = Icon;
  return (
    <View style={styles.box}>
      {Icon && (
        <IconComponent style={{...styles.image, ...styleIcon}} fill={'#aaa'} />
      )}
      {name && <CustomText textType="semiBold">{name}:</CustomText>}
      <CustomText textType="regular">{value}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    minWidth: '40%',
    columnGap: scale(5),
  },
  image: {
    width: scale(18),
    height: scale(18),
  },
});
