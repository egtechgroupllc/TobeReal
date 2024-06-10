import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES, scale} from '../../../../../../assets/constants';
import Counter from '../../../../../../components/Counter';
import CustomText from '../../../../../../components/CustomText';
import {formatDate} from '../../../../../../utils/format';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function AutoPostTop({date, setValue, onCount, countNum}) {
  const [count, setCount] = useState(1);
  const {t} = useLanguage();

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
          {t('auto_repost')}
        </CustomText>

        <CustomText>
          {t('number_time_remaining')}
          <CustomText textType="semiBold">
            {' '}
            {count} {t('time')}
          </CustomText>
        </CustomText>

        <CustomText>
          {t('last_repost_expected')}
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
