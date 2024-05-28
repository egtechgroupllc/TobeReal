import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../../../assets/constants';
import ChooseCalendarRoom from './ChooseCalendarRoom';
import SelectNumGuestRoom from './SelectNumGuestRoom';

export default memo(function RoomFilter({onSelectDate, data, onChangeNum}) {
  return (
    <View
      style={{
        ...styles.row,
        backgroundColor: COLORS.trans,
        paddingHorizontal: scale(8),
        paddingVertical: scale(10),
      }}>
      <ChooseCalendarRoom
        onSelectDate={value => {
          onSelectDate && onSelectDate(value);
        }}
        data={data}
      />

      <SelectNumGuestRoom
        onChangeNum={value => {
          onChangeNum && onChangeNum(value);
        }}
        data={data}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: scale(6),
  },
});
