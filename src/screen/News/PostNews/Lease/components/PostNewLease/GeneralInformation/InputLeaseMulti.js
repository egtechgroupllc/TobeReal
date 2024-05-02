import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {CustomInput} from '../../../../../../../components';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../../../utils/validate';

export default function InputLeaseMulti({
  control,
  name,
  label,
  placeholder,
  maxLength,
  styleInput,
}) {
  const {t} = useLanguage();
  const [lengthText, setLengthText] = useState('');

  const timer = useRef(null);

  const handleChange = useCallback(text => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLengthText(text);
      timer.current = null;
    }, 300);
  }, []);

  return (
    <CustomInput
      styleTextLabel={styles.label}
      label={label}
      control={control}
      name={name}
      multiline
      maxLength={maxLength}
      placeholder={placeholder}
      rules={[
        requireField(t('this_field_required')),
        validateMaxLengthText(`${maxLength} characters limit`, maxLength),
      ]}
      onChange={value => {
        const {text} = value.nativeEvent;
        handleChange(text);
      }}
      style={[
        styles.textInput,
        {
          height: scale(60),
        },
        styleInput,
      ]}
      componentRight={
        <Text style={styles.numText}>
          {lengthText.length || 0}/{maxLength}
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  numText: {
    fontSize: SIZES.small,
    position: 'absolute',
    top: scale(-20),
    right: 0,
    color: COLORS.black,
  },
});
