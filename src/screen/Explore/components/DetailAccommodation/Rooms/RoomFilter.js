import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../../../../assets/constants';
import {IconPeople, IconWifi} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import ChooseCalendarRoom from './ChooseCalendarRoom';

export default memo(function RoomFilter({onSelectDate, data}) {
  return (
    <View
      style={{
        ...styles.row,
        backgroundColor: '#fff',
        paddingHorizontal: scale(8),
        paddingVertical: scale(10),
      }}>
      <ChooseCalendarRoom
        onSelectDate={value => {
          onSelectDate && onSelectDate(value);
        }}
        data={data}
      />

      <View style={{...styles.row, flex: 0.5, columnGap: scale(10)}}>
        <View style={{...styles.row}}>
          <IconPeople style={styles.icon} />
          <CustomText>23</CustomText>
        </View>
        <View style={{...styles.row}}>
          <IconWifi style={styles.icon} />
          <CustomText>1</CustomText>
        </View>
      </View>
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
  icon: {
    width: scale(13),
    height: scale(13),
  },
});
