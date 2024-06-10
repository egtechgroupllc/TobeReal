import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {Category} from '../../../../../components';
import {scale} from '../../../../../assets/constants';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function RoomFilterType() {
  const {t} = useLanguage();

  return (
    <View style={{marginTop: scale(10)}}>
      <Category
        isShadow={false}
        data={[
          t('free_cancel'),
          t('pay_at_hotel'),
          t('big_bed'),
          t('free_breakfast'),
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
