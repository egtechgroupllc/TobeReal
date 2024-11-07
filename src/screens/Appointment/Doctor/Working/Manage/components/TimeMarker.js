import {addMinutes} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {COLORS, SIZES} from '~/assets/constants';
import {CText} from '~/components';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {formatDate, formatTime} from '~/utils/format';
import {scale} from '~/utils/scale';

const formatTime24 = (date, options) => {
  return formatTime(date, {isHour24: true, ...options});
};
export default function TimeMarker({onChange, title, params}) {
  const {t} = useLanguage();

  const [openCheckStart, setOpenCheckStart] = useState(false);
  const [openCheckEnd, setOpenCheckEnd] = useState(false);

  const [timeCheckStart, setTimeCheckStart] = useState(
    new Date(`2024-01-01T${params?.time_start || '06:00'}:00`),
  );
  const [timeCheckEnd, setTimeCheckEnd] = useState(
    new Date(
      `2024-01-01T${
        params?.time_end || formatTime24(timeCheckStart, {addMinutes: 5})
      }:00`,
    ),
  );

  useEffect(() => {
    onChange &&
      onChange({
        timeCheckStart: formatTime24(timeCheckStart),
        timeCheckEnd: formatTime24(timeCheckEnd),
      });
  }, [timeCheckStart, timeCheckEnd]);

  return (
    <View style={{width: '100%'}}>
      <CText style={styles.title} textType="bold">
        {title || t('time_marker')}:
      </CText>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(50),
        }}>
        <View style={{flex: 1, rowGap: scale(5)}}>
          <CText style={styles.label}>{t('start')}</CText>
          <TouchableOpacity
            onPress={() => setOpenCheckStart(true)}
            style={{
              backgroundColor: COLORS.input,

              borderRadius: scale(6),
              height: scale(30),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CText style={styles.textInput}>
              {formatTime24(timeCheckStart)}
            </CText>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, rowGap: scale(5)}}>
          <CText style={styles.label}>{t('end')}</CText>
          <TouchableOpacity
            onPress={() => setOpenCheckEnd(true)}
            style={{
              backgroundColor: COLORS.input,

              borderRadius: scale(6),
              height: scale(30),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CText style={styles.textInput}>{formatTime24(timeCheckEnd)}</CText>
          </TouchableOpacity>
        </View>

        <>
          <DatePicker
            mode="time"
            title={t('start')}
            modal
            open={openCheckStart}
            date={timeCheckStart}
            onConfirm={time => {
              setOpenCheckStart(false);
              setTimeCheckStart(time);

              const updatedTime = addMinutes(time, 5);
              setTimeCheckEnd(updatedTime);
            }}
            onCancel={() => {
              setOpenCheckStart(false);
            }}
          />

          <DatePicker
            title={t('end')}
            mode="time"
            modal
            open={openCheckEnd}
            date={timeCheckEnd}
            minimumDate={addMinutes(timeCheckStart, 5)}
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
    fontSize: SIZES.medium,
    color: COLORS.White,
  },
  title: {
    fontSize: SIZES.medium,
    color: COLORS.White,
    marginBottom: scale(10),
  },
  input: {
    borderWidth: 0,
    backgroundColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  textInput: {
    color: COLORS.White,
    textAlign: 'center',
    fontSize: SIZES.medium,
  },
});
