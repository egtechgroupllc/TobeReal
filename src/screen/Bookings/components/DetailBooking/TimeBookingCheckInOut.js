import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {COLORS, scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatDate} from '../../../../utils/format';
import {differenceInDays} from 'date-fns';

export default function TimeBookingCheckInOut({data}) {
  const {t} = useLanguage();
  return (
    <View style={styles.wrapper}>
      <Box
        title={t('check_in')}
        timeDate={formatDate(data?.check_in_date, {
          dateStyle: 'EEE, dd-MM-yyyy',
        })}
        timeCheck={`From ${data?.accommodation?.check_in_time_start} - ${data?.accommodation?.check_in_time_end} `}
      />

      <View style={styles.numDays}>
        <CustomText
          textType="medium"
          color={COLORS.text}
          style={{textAlign: 'center'}}>
          {differenceInDays(data?.check_out_date, data?.check_in_date)} night
        </CustomText>
      </View>

      <Box
        title={t('check_out')}
        timeDate={formatDate(data?.check_out_date, {
          dateStyle: 'EEE, dd-MM-yyyy',
        })}
        timeCheck={`To ${data?.accommodation?.check_out_time_start} - ${data?.accommodation?.check_out_time_end} `}
      />
    </View>
  );
}

const Box = ({title, timeDate, timeCheck}) => {
  return (
    <View style={styles.box}>
      <CustomText color={COLORS.textSub}>{title}</CustomText>
      <CustomText
        textType="semiBold"
        style={{
          textAlign: 'center',
        }}>
        {timeDate}
      </CustomText>
      <CustomText color={COLORS.text}>{timeCheck}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(8),
  },
  box: {
    borderWidth: 1,
    padding: scale(8),
    borderRadius: scale(6),
    borderColor: COLORS.grey,
    flex: 1,
    alignItems: 'center',
    rowGap: scale(4),
  },
  numDays: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    paddingBottom: scale(5),
    minWidth: '15%',
    maxWidth: '20%',
  },
});
