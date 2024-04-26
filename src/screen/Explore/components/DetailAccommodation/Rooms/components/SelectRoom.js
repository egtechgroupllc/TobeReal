import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useMemo, useState} from 'react';
import {COLORS, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import RealEstateType from '../../../../../News/PostNews/components/RealEstateType';
import {CustomButton} from '../../../../../../components';

export default memo(function SelectRoom({onPress, data, onSelect}) {
  const [selectRoom, setSelectRoom] = useState(1);

  const roomsAverage = useMemo(() => {
    const result = data?.room_dates?.map(item => {
      return item?.number_room_real;
    });

    return Math.min(...result);
  }, [data?.room_dates]);

  return (
    <View
      style={{
        rowGap: scale(8),
        alignItems: 'flex-end',
      }}>
      <CustomText
        style={{
          color: COLORS.error,
        }}>
        {roomsAverage} room left
      </CustomText>

      <View
        style={{
          ...styles.row,
          columnGap: scale(10),
        }}>
        <RealEstateType
          getKeyValue="value"
          isDefaultValue
          styleWrapper={{width: '40%'}}
          data={[...Array(roomsAverage)].map((_, index) => ({
            name: `${index + 1} room`,
            value: index + 1,
          }))}
          buttonEstateTypes={{
            height: scale(32),
          }}
          onSelect={value => {
            onSelect && onSelect(value);
            setSelectRoom(value);
          }}
        />

        <CustomButton
          onPress={() => onPress(selectRoom)}
          buttonType="normal"
          text="Book room"
          styleWrapper={{
            flex: 1,
          }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
