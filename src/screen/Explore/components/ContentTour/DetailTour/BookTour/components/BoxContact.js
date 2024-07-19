import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InfoContact from '../../../../../../Bookings/components/BookingRoom/ContentStep1/InfoContact';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {useCountry} from '../../../../../../../hooks/useCountry';
import {useQueryClient} from '@tanstack/react-query';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {CustomText} from '../../../../../../../components';

export default function BoxContact({data}) {
  const {t} = useLanguage();

  const queryClient = useQueryClient();

  const profile = queryClient.getQueryData(['user', 'profile'])?.data;

  return (
    <View style={{width: '90%'}}>
      <CustomText
        textType="medium"
        style={{
          fontSize: SIZES.small,
          color: COLORS.black,
          marginTop: scale(10),
        }}>
        {t('contact_detail')}:
      </CustomText>
      <View
        style={{
          ...styles.box,
          marginTop: scale(10),
          borderRadius: scale(6),
          minHeight: scale(30),
        }}>
        <InfoContact data={profile} isTour />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
  },
});
