import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../../components/CustomText';
import {COLORS, scale} from '../../../../../../assets/constants';
import CustomImage from '../../../../../../components/CustomImage';
import {useRoute} from '@react-navigation/native';

export default function ItemManage({data}) {
  const params = useRoute().params;
  return (
    <View>
      <CustomImage
        source={params?.images[0]?.url}
        style={{
          borderRadius: scale(7),
          minHeight: scale(160),
          width: scale(400 / 1.4),
        }}
      />
      <TouchableOpacity style={styles.button}>
        <CustomText style={{color: COLORS.white}}>{data}</CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(10),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
