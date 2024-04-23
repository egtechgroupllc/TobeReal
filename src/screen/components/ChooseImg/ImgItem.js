import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomImage from '../../../components/CustomImage';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {CustomInput} from '../../../components';
import CustomText from '../../../components/CustomText';
import {IconX} from '../../../assets/icon/Icon';
import ImageView from 'react-native-image-viewing';

export default function ImgItem({
  arrImg,
  data,
  isDescriptionImg,
  onChangeDescription,
  onDelete,
  onViewImg,
}) {
  return (
    <>
      <View
        style={{
          width: arrImg.length <= 1 ? '98%' : '48%',
          maxWidth: arrImg.length <= 1 ? '100%' : scale(220),
          rowGap: scale(10),
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.img]}
          onPress={onViewImg}>
          <CustomImage
            source={data?.url || data?.uri}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(data?.id)}
          activeOpacity={0.7}
          style={styles.delete}>
          <IconX
            fill={'#fff'}
            style={{
              width: scale(18),
              height: scale(18),
            }}
          />
        </TouchableOpacity>
        {isDescriptionImg && (
          <CustomInput
            placeholder="Thêm mô tả"
            style={{
              height: scale(32),
              borderRadius: scale(5),
            }}
            defaultValue={data?.description}
            maxLength={45}
            onChangeText={valueText => onChangeDescription(valueText)}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  delete: {
    position: 'absolute',
    right: 0,
    padding: scale(4),
    backgroundColor: COLORS.overlay,
    borderRadius: scale(5),
  },
  img: {
    width: '100%',
    height: scale(170),
    borderRadius: scale(5),
    overflow: 'hidden',
  },
});
