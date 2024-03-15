import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {CustomInput} from '../../../../../../components';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {formatDateTime} from '../../../../../../utils/format';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import CustomText from '../../../../../../components/CustomText';

export default function TimeCheckOut({onChange}) {
  const {t} = useLanguage();

  const [openCheckStart, setOpenCheckStart] = useState(false);
  const [openCheckEnd, setOpenCheckEnd] = useState(false);

  const [timeCheckStart, setTimeCheckStart] = useState(
    new Date('2024-01-01T6:00:00'),
  );

  const [timeCheckEnd, setTimeCheckEnd] = useState(
    new Date('2024-01-01T12:00:00'),
  );

  useEffect(() => {
    onChange && onChange({timeCheckStart, timeCheckEnd});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeCheckStart, timeCheckEnd]);

  return (
    <View style={{width: '100%'}}>
      <CustomText style={styles.title}>{t('check_in')}:</CustomText>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(30),
        }}>
        <CustomInput
          label={t('start')}
          styleWrapper={{
            flex: 1,
          }}
          styleTextLabel={styles.label}
          style={styles.input}
          styleText={styles.textInput}
          value={formatDateTime(timeCheckStart, {
            isHouse: true,
            isHour24: true,
          })}
          onPress={() => setOpenCheckStart(true)}
        />

        <CustomInput
          label={t('end')}
          styleTextLabel={styles.label}
          styleWrapper={{
            flex: 1,
          }}
          style={styles.input}
          styleText={styles.textInput}
          value={formatDateTime(timeCheckEnd, {
            isHouse: true,
            isHour24: true,
          })}
          onPress={() => setOpenCheckEnd(true)}
        />

        <>
          <DatePicker
            mode="time"
            title={t('check_in')}
            modal
            open={openCheckStart}
            date={timeCheckStart}
            onConfirm={time => {
              setOpenCheckStart(false);
              setTimeCheckStart(time);
            }}
            onCancel={() => {
              setOpenCheckStart(false);
            }}
          />

          <DatePicker
            title={t('check_out')}
            mode="time"
            modal
            open={openCheckEnd}
            date={timeCheckEnd}
            minimumDate={timeCheckStart}
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
    marginBottom: scale(10),
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
