import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES, scale} from '../../../../../../assets/constants';
import Counter from '../../../../../../components/Counter';
import CustomText from '../../../../../../components/CustomText';
import {formatDate} from '../../../../../../utils/format';

export default function AutoPostTop({date, setValue, onCount, countNum}) {
  const [count, setCount] = useState(1);

  const dateEnd = useMemo(
    () =>
      formatDate(date?.date, {
        addDays: date?.number_day * count,
        dateStyle: 'yyyy-MM-dd',
      }),
    [date, count],
  );

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flex: 1,
        }}>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
            marginBottom: scale(5),
          }}>
          Tự động đăng lại
        </CustomText>

        <CustomText>
          Số lần còn lại
          <CustomText textType="semiBold"> {count} lần</CustomText>
        </CustomText>

        <CustomText>
          Lần đăng lại cuối dự kiến
          <CustomText textType="semiBold"> {dateEnd}</CustomText>
        </CustomText>
      </View>

      <Counter
        value={countNum}
        onChange={num => {
          onCount &&
            onCount({
              dateEnd,
              count: num,
            });
          setCount(num);
        }}
        max={10}
        styleWrapper={{
          width: 'auto',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(14),
    borderRadius: scale(6),
  },
});
