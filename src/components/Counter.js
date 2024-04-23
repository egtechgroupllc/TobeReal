/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomInput} from '.';
import {COLORS, SIZES, scale} from '../assets/constants';
import {IconAdd, IconSubtract} from '../assets/icon/Icon';
import CustomText from './CustomText';

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
            <CustomText style={{fontSize: SIZES.xMedium}}>{heading}</CustomText>
            {subHeading && (
              <CustomText textType="regular">{subHeading}</CustomText>
            )}
          </View>
        </View>
      )}

      <View
        style={[
          styles.counter,
          styles.row,
          verticalCounter && {flexDirection: 'column'},
        ]}>
        <CustomButton
          iconLeft={IconSubtract}
          onPress={handleDecrement}
          style={{...styles.dot, opacity: quantity <= min ? 0.4 : 1}}
          styleIcon={styles.icon}
        />

        {/* <CustomText style={styles.quantity}>{quantity}</CustomText> */}

        <CustomInput
          inputMode="numeric"
          rules={'1'}
          value={String(quantity)}
          style={styles.input}
          styleText={{
            textAlign: 'center',
          }}
          editable={editable}
          onChangeText={text => {
            setQuantity(+text);
          }}
        />

        <CustomButton
          iconLeft={IconAdd}
          onPress={handleIncrement}
          style={{
            ...styles.dot,
            opacity: quantity >= max ? 0.4 : 1,
          }}
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
    gap: scale(10),
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
    width: scale(40),
    height: scale(30),
    borderRadius: scale(6),
    paddingHorizontal: scale(4),
  },
  icon: {
    color: COLORS.white,
    width: scale(12),
    height: scale(12),
  },
});
