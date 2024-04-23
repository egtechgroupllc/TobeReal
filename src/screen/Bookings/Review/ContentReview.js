import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Star from '../../../components/Star';
import {COLORS, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import {CustomInput} from '../../../components';
import ChooseImgPicker from '../../components/ChooseImgPicker';

export default function ContentReview({control, setValue}) {
  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <Star
        size={scale(30)}
        isSetRating
        onChange={value => {
          setValue('rating', value);
        }}
        style={{
          columnGap: scale(16),
          marginBottom: scale(20),
        }}
      />

      <CustomInput
        control={control}
        name="content"
        placeholder="Bạn thích hoặc không thích điều gì về chỗ ở này?"
        multiline
        label={'Viết 1 đánh giá'}
        styleTextLabel={{
          textType: 'bold',
        }}
        style={{
          minHeight: scale(120),
          maxHeight: scale(200),
        }}
        componentRight={
          <CustomText
            textType="semiBold"
            color={COLORS.textSub}
            style={{
              position: 'absolute',
              top: scale(-20),
              right: 0,
            }}>
            0/300
          </CustomText>
        }
      />

      <ChooseImgPicker
        isDescriptionImg={false}
        maxFiles={6}
        name="files"
        control={control}
      />
    </View>
  );
}
