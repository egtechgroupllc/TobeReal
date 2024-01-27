/* eslint-disable react-hooks/exhaustive-deps */
import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, SIZES, scale} from '../assets/constants';
import {CustomButton} from '.';
import {IconAdd, IconSubtract, IconX} from '../assets/icon/Icon';
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
}) {
  const [quantity, setQuantity] = useState(value || min);
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
    }
  };

  useEffect(() => {
    onChange && onChange(quantity);
  }, [quantity]);

  return (
    <View
      style={[
        styles.wrapper,
        styles.row,
        vertical && {flexDirection: 'column'},
      ]}>
      {heading && (
        <View style={{rowGap: scale(2), styleBoxHeading}}>
          <CustomText style={{fontSize: SIZES.xMedium}}>{heading}</CustomText>
          {subHeading && (
            <CustomText textType="regular">{subHeading}</CustomText>
          )}
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
          styleIcon={{
            color: COLORS.white,
          }}
        />

        <CustomText style={styles.quantity}>{quantity}</CustomText>

        <CustomButton
          iconLeft={IconAdd}
          onPress={handleIncrement}
          style={{
            ...styles.dot,
            opacity: quantity >= max ? 0.4 : 1,
          }}
          styleIcon={{
            color: COLORS.white,
          }}
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
});
