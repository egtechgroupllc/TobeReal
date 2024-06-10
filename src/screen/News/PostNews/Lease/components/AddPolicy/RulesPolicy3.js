import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function RulesPolicy3({setValue, unregister}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();

  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      <CustomText style={{color: COLORS.black}}>
        {t('each_price_type')}
      </CustomText>
      <CustomText
        color={COLORS.blue}
        textType="medium"
        onPress={() => navigate('FeaturesPolicyScreen')}>
        {t('add_new_value')}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({});
