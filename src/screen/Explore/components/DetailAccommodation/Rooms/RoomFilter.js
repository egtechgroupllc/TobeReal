import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../../../../assets/constants';
import ChooseCalendarRoom from './ChooseCalendarRoom';
import SelectNumGuestRoom from './SelectNumGuestRoom';

export default memo(
  forwardRef(function RoomFilter({onSelectDate, data, onChangeNum}, ref) {
    const [numRoomGuest, setNumRoomGuest] = useState(null);
    useImperativeHandle(
      ref,
      () => ({
        numRoomGuest: () => numRoomGuest,
      }),
      [numRoomGuest],
    );

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

        <SelectNumGuestRoom
          onChangeNum={value => {
            setNumRoomGuest(value);
            onChangeNum && onChangeNum(value);
          }}
        />
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: scale(6),
  },
});
