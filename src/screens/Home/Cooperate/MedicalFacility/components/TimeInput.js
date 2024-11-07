import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {COLORS, SIZES} from '~/assets/constants';
import {CText} from '~/components';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {formatTime} from '~/utils/format';
import {scale} from '~/utils/scale';

export default function TimeInput({onChange}) {
  const {t} = useLanguage();

  // State for start and end time
  const [startTime, setStartTime] = useState(new Date('2024-01-01T06:00:00'));
  const [endTime, setEndTime] = useState(new Date('2024-01-01T16:30:00'));

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  // Update parent component when time changes
  useEffect(() => {
    onChange &&
      onChange({
        start: formatTime(startTime),
        end: formatTime(endTime),
      });
  }, [startTime, endTime]);

  return (
    <View style={styles.timeRow}>
      <TouchableOpacity style={styles.input} onPress={() => setOpenStart(true)}>
        <CText style={{color: COLORS.White}}>{formatTime(startTime)}</CText>
      </TouchableOpacity>

      <CText style={{color: COLORS.White}}>To</CText>
      <TouchableOpacity style={styles.input} onPress={() => setOpenEnd(true)}>
        <CText style={{color: COLORS.White}}>{formatTime(endTime)}</CText>
      </TouchableOpacity>

      {/* Start Time Picker */}
      <DatePicker
        mode="time"
        modal
        open={openStart}
        date={startTime}
        onConfirm={date => {
          setOpenStart(false);
          setStartTime(date);
        }}
        onCancel={() => setOpenStart(false)}
      />

      {/* End Time Picker */}
      <DatePicker
        mode="time"
        modal
        open={openEnd}
        date={endTime}
        minimumDate={startTime}
        onConfirm={date => {
          setOpenEnd(false);
          setEndTime(date);
        }}
        onCancel={() => setOpenEnd(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row',
    columnGap: scale(10),
    width: '40%',
    alignItems: 'center',
  },
  input: {
    height: scale(30),
    backgroundColor: 'transparent',
    width: scale(65),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.greyLight,
    borderRadius: scale(10),
  },
});
