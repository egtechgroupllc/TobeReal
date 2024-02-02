import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../../Explore/components/WrapperContent';
import {SIZES, scale} from '../../../assets/constants';
import {Category} from '../../../components';
import { useLanguage } from '../../../hooks/useLanguage';

export default function TypeAccommoda() {
  const {t}= useLanguage()
  return (
    <WrapperContent
      heading={t('type')}
      styleHeading={{
        paddingHorizontal: 0,
      }}
      styleTextHeading={{
        fontSize: SIZES.xMedium,
      }}
      styleContent={{
        rowGap: scale(4),
        alignItem: 'center',
      }}>
      <Category
        noSelect
        isShadow={false}
        data={[t('rent'), t('tour'), t('buy')]}
        // onPress={value => setCategory(value)}
        styleWrapper={{
          marginTop: scale(10),
        }}
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({});
