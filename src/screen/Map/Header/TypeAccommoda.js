import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../../Explore/components/WrapperContent';
import {SIZES, scale} from '../../../assets/constants';
import {Category} from '../../../components';
import {useLanguage} from '../../../hooks/useLanguage';
import CustomText from '../../../components/CustomText';

export default function TypeAccommoda() {
  const {t} = useLanguage();
  return (
    <View>
      <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
        {t('type')}
      </CustomText>
      <Category
        noSelect
        isShadow={false}
        data={[t('RENT'), t('TOUR'), t('BUY')]}
        // onPress={value => setCategory(value)}
        styleWrapper={{
          marginTop: scale(10),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
