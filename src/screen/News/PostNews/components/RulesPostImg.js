import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {COLORS, scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function RulesPostImg() {
  const {t} = useLanguage();

  return (
    <View
      style={{
        width: '100%',
      }}>
      <CustomText
        textType="semiBold"
        style={{marginBottom: scale(6), color: COLORS.black}}>
        - {t('rules_posting_pictures')}:
      </CustomText>
      <CustomText style={{color: COLORS.black}}>
        • {t('post_minimum_photo')}
      </CustomText>
      <CustomText style={{color: COLORS.black}}>
        • {t('post_upto_photo')}
      </CustomText>
      <CustomText style={{color: COLORS.black}}>
        • {t('please_use_real_photo')}
      </CustomText>
      <CustomText style={{color: COLORS.black}}>• {t('each_photo')}</CustomText>
      <CustomText style={{color: COLORS.black}}>
        • {t('describe_photo')}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({});
