import React from 'react';
import {StyleSheet} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import {COLORS, FONTS} from '../assets/constants';
import {IconGoBack, IconNext} from '../assets/icon/Icon';

export default function CalendarRange({
  minDate,
  selectedStartDate,
  selectedEndDate,
  onDateChange,
  allowRangeSelection = true,
}) {
  return (
    <CalendarPicker
      startFromMonday={true}
      allowRangeSelection={allowRangeSelection}
      minDate={minDate}
      initialDate={selectedStartDate}
      selectedStartDate={selectedStartDate}
      selectedEndDate={selectedEndDate}
      nextComponent={<IconNext fill={COLORS.primary} />}
      previousComponent={
        <IconNext
          fill={COLORS.primary}
          style={{
            transform: [
              {
                rotate: '-180deg',
              },
            ],
          }}
        />
      }
      todayBackgroundColor="transparent"
      todayTextStyle={{color: COLORS.primary}}
      selectedDayColor={COLORS.primary}
      selectedDayTextColor={COLORS.white}
      textStyle={{
        fontFamily: FONTS.semiBold,
        color: '#000000',
      }}
      onDateChange={onDateChange && onDateChange}
      dayLabelsWrapper={{
        borderTopWidth: 0,
        borderBottomWidth: 0,
      }}
    />
  );
}

const styles = StyleSheet.create({});
