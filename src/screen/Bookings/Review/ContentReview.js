import React, {useState} from 'react';
import {View} from 'react-native';
import {COLORS, scale} from '../../../assets/constants';
import {CustomInput, StarRating} from '../../../components';
import CustomText from '../../../components/CustomText';
import ChooseImgPicker from '../../components/ChooseImgPicker';
import {requireField} from '../../../utils/validate';
import {useLanguage} from '../../../hooks/useLanguage';

export default function ContentReview({control, setValue}) {
  const {t} = useLanguage();
  const [lengthContent, setLengthContent] = useState(0);
  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <StarRating
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
        maxLength={300}
        label={'Viết 1 đánh giá'}
        styleTextLabel={{
          textType: 'bold',
        }}
        rules={[requireField(t('this_field_required'))]}
        style={{
          minHeight: scale(120),
          maxHeight: scale(200),
        }}
        onChange={value => {
          const {text} = value.nativeEvent;
          setLengthContent(text?.length);
        }}
        componentRight={
          <CustomText
            color={COLORS.textSub}
            style={{
              position: 'absolute',
              top: scale(-20),
              right: 0,
            }}>
            {lengthContent}/300
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
