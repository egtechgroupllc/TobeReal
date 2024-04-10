import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {IconArrowRight} from '../../../../../assets/icon/Icon';

export default function TimeCheckInOut({data}) {
  const {t} = useLanguage();
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: scale(10),
      }}>
      <View
        style={{
          backgroundColor: '#f5f5f5',
          padding: scale(10),
          borderRadius: scale(8),
          flexDirection: 'row',
          columnGap: scale(10),
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: scale(30),
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <CustomText style={{fontSize: SIZES.xMedium}}>
            {t('check_in')}
            {'\n'}
            <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
              {data?.check_in_time_start} - {data?.check_in_time_end}{' '}
            </CustomText>
          </CustomText>
        </View>

        <IconArrowRight />

        <View style={{flex: 1, alignItems: 'center'}}>
          <CustomText style={{fontSize: SIZES.xMedium}}>
            {t('check_out')} {'\n'}
            <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
              {data?.check_out_time_start} - {data?.check_out_time_end}
            </CustomText>
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
