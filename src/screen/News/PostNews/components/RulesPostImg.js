import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function RulesPostImg() {
  const {t} = useLanguage();

  return (
    <View
      style={{
        width: '100%',
      }}>
      <CustomText textType="semiBold" style={{marginBottom: scale(6)}}>
        - {t('rules_posting_pictures')}:
      </CustomText>
      <CustomText>• {t('post_minimum_photo')}</CustomText>
      <CustomText>• {t('post_upto_photo')}</CustomText>
      <CustomText>• {t('please_use_real_photo')}</CustomText>
      <CustomText>• {t('each_photo')}</CustomText>
      <CustomText>• {t('describe_photo')}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({});
