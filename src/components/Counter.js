/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import CText from './CText';
import Button from './Button';
import {IconAdd, IconSubtract} from '~/assets/icon/Icon';
import Input from './Input';
import {
  IconCircleMinus,
  IconCirclePlus,
  IconCirclePlusFilled,
} from '@tabler/icons-react-native';

export default function Counter({
  min = 1,
  max = 14,
  value,
  onChange,
  onAdd,
  onDown,
  heading,
  subHeading,
  vertical,
  verticalCounter,
  styleBoxHeading,
  styleWrapper,
  Icon,
  editable = false,
}) {
  const [quantity, setQuantity] = useState(value || min);

  useEffect(() => {
    value && setQuantity(Number(value));
  }, [value]);

  const handleIncrement = () => {
    if (quantity < max) {
      onAdd && onAdd();
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      onDown && onDown();
      setQuantity(prev => prev - 1);
      return;
    }
  };

  useEffect(() => {
    if (quantity >= min && quantity <= max) {
      onChange && onChange(quantity);
    }

    if (quantity < min) {
      setQuantity(min);
    } else if (quantity > max) {
      setQuantity(max);
    }
  }, [quantity]);

  return (
    <View
      style={[
        styles.wrapper,
        styles.row,
        styleWrapper,
        vertical && {flexDirection: 'column'},
      ]}>
      {heading && (
        <View style={styles.boxHeading}>
          {Icon}
          <View style={{rowGap: scale(2), styleBoxHeading}}>
            <CText style={{fontSize: SIZES.xMedium}}>{heading}</CText>
            {subHeading && <CText textType="regular">{subHeading}</CText>}
          </View>
        </View>
      )}

      <View
        style={[
          styles.counter,
          styles.row,
          verticalCounter && {flexDirection: 'column'},
        ]}>
        <Button.Icon
          fill={COLORS.primary}
          stroke={quantity <= min ? COLORS.grey : COLORS.cyan}
          Icon={IconCircleMinus}
          onPress={handleDecrement}
          // style={{...styles.dot, opacity: quantity <= min ? 0.4 : 1}}
          styleIcon={styles.icon}
        />

        {/* <CText style={styles.quantity}>{quantity}</CText> */}

        <Input
          inputMode="numeric"
          rules={'1'}
          value={String(quantity)}
          styleWrapper={styles.input}
          styleContent={{height: scale(30)}}
          styleText={{
            textAlign: 'center',
          }}
          editable={editable}
          onChangeText={text => {
            setQuantity(+text);
          }}
        />

        <Button.Icon
          fill={COLORS.primary}
          stroke={quantity >= max ? COLORS.grey : COLORS.cyan}
          Icon={IconCirclePlus}
          onPress={handleIncrement}
          // style={{
          //   ...styles.dot,
          //   opacity: quantity >= max ? 0.4 : 1,
          // }}
          styleIcon={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    // flex: 1,
    width: '100%',
  },
  boxHeading: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
    flex: 1,
  },
  counter: {
    justifyContent: 'center',
    gap: scale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(2),
  },
  dot: {
    width: scale(24),
    height: scale(24),
    borderRadius: 99,
  },
  quantity: {
    fontSize: SIZES.xMedium,
    minWidth: scale(20),
    textAlign: 'center',
  },
  input: {
    borderRadius: scale(6),
    paddingHorizontal: scale(4),
    flex: 1,
  },
  icon: {
    color: COLORS.White,
    width: scale(12),
    height: scale(12),
  },
});
