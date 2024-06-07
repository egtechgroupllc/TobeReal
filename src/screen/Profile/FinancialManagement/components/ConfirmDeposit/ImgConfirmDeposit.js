import React from 'react';
import {StyleSheet, View} from 'react-native';
import ChooseImgPicker from '../../../../components/ChooseImgPicker';
import {requireField} from '../../../../../utils/validate';
import {useLanguage} from '../../../../../hooks/useLanguage';
import CustomText from '../../../../../components/CustomText';
import {SIZES, scale} from '../../../../../assets/constants';

export default function ImgConfirmDeposit({control}) {
  const {t} = useLanguage();
  return (
    <View>
      <CustomText
        textType="semiBold"
        style={{
          fontSize: SIZES.medium,
          marginBottom: scale(-10),
        }}>
        {t('photo_proof')}
      </CustomText>
      <ChooseImgPicker
        title={t('photo_proof_transfer')}
        name={'files'}
        isDescriptionImg={false}
        maxFiles={2}
        control={control}
        rules={[requireField(t('this_field_required'))]}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
