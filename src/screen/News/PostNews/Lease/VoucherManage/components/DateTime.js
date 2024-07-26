import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput, CustomText} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {formatTime, formatDate} from '../../../../../../utils/format';
const formatTime24 = date => {
  return formatTime(date);
};
export default function DateTime({onChange, title}) {
  const {t} = useLanguage();

  const [openCheckStart, setOpenCheckStart] = useState(false);
  const [openCheckEnd, setOpenCheckEnd] = useState(false);

  const [timeCheckStart, setTimeCheckStart] = useState(new Date());
  const [timeCheckEnd, setTimeCheckEnd] = useState(
    new Date(formatDate(timeCheckStart, {addDays: 1})),
  );

  useEffect(() => {
    onChange &&
      onChange({
        date_start: formatDate(timeCheckStart),
        date_end: formatDate(timeCheckEnd),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeCheckStart, timeCheckEnd]);

  return (
    <View style={{width: '100%'}}>
      <CustomText style={styles.title}>{title || t('select_date')}:</CustomText>
      <View style={{flexDirection: 'row'}}>
        <View>
          <CustomText style={styles.title} textType="regular">
            {title || t('date_start')}:
          </CustomText>

          <CustomInput
            styleWrapper={{
              width: '80%',
            }}
            styleTextLabel={styles.label}
            style={styles.input}
            styleText={styles.textInput}
            value={formatDate(timeCheckStart)}
            onPress={() => setOpenCheckStart(true)}
          />

          <>
            <DatePicker
              mode="date"
              title={t('start')}
              modal
              open={openCheckStart}
              date={timeCheckStart}
              onConfirm={time => {
                setOpenCheckStart(false);
                setTimeCheckStart(time);
                setTimeCheckEnd(new Date(formatDate(time, {addDays: 1})));
              }}
              onCancel={() => {
                setOpenCheckStart(false);
              }}
            />
          </>
        </View>

        <View>
          <CustomText style={styles.title} textType="regular">
            {title || t('date_end')}:
          </CustomText>
          <CustomInput
            styleWrapper={{
              width: '80%',
            }}
            styleTextLabel={styles.label}
            style={styles.input}
            styleText={styles.textInput}
            value={formatDate(timeCheckEnd)}
            onPress={() => setOpenCheckEnd(true)}
          />

          <>
            <DatePicker
              title={t('end')}
              mode="date"
              modal
              open={openCheckEnd}
              date={timeCheckEnd}
              minimumDate={new Date(formatDate(timeCheckStart, {addDays: 1}))}
              onConfirm={time => {
                setOpenCheckEnd(false);
                setTimeCheckEnd(time);
              }}
              onCancel={() => {
                setOpenCheckEnd(false);
              }}
            />
          </>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  title: {
    fontSize: SIZES.xMedium,
    color: COLORS.black,
    marginBottom: scale(5),
  },
  input: {
    borderWidth: 0,
    backgroundColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  textInput: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: SIZES.medium,
  },
});
