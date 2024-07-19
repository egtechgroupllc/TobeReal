import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {COLORS, scale} from '../../../../assets/constants';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatDate} from '../../../../utils/format';
import {differenceInDays} from 'date-fns';

export default function TimeBookingTour({data}) {
  const {t} = useLanguage();
  return (
    <View style={styles.wrapper}>
      {/* <CustomText
        textType="medium"
        numberOfLines={3}
        color={COLORS.text}
        style={{textAlign: 'center', width: '30%'}}>
        {t('tour_start_date')}
      </CustomText>
      <View style={styles.numDays}></View> */}

      <Box
        title={t('start')}
        timeDate={formatDate(data?.check_out_date, {
          dateStyle: 'EEE, dd-MM-yyyy',
        })}
        timeCheck={data?.time}
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
    minWidth: '10%',
    maxWidth: '20%',
  },
});
