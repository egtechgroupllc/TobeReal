import Clipboard from '@react-native-clipboard/clipboard';
import React, {useCallback, useEffect, useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import OTPTextView from './OTPTextView';
import {
  IconAlertCircleFilled,
  IconArrowSharpTurnRight,
} from '@tabler/icons-react-native';
import CText from './CText';

export default function InputOTP({
  style,
  name,
  control,
  defaultValue,
  rules,
  styleWrapper,
  editable = true,
  autoFocus = true,
  value,
  secureTextEntry,
}) {
  const input = useRef(null);

  const clear = () => input.current?.clear();

  const handleCellTextChange = async (text, i) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

  useEffect(() => {
    input.current?.setValue(value || '', true);
  }, [value]);

  const form = useForm();

  return (
    <Controller
      control={control || form.control}
      rules={rules}
      name={name || ''}
      defaultValue={control && defaultValue}
      render={({
        field: {onChange, onBlur, value: valueForm},
        fieldState: {error},
      }) => {
        return (
          <View
            style={{
              width: '100%',
              rowGap: scale(6),
              ...styleWrapper,
            }}>
            <OTPTextView
              ref={input}
              textInputStyle={[styles.input, style, error && {borderWidth: 1}]}
              handleTextChange={onChange}
              handleCellTextChange={handleCellTextChange}
              containerStyle={styles.containInput}
              inputCount={6}
              keyboardType="numeric"
              autoFocus={autoFocus}
              editable={editable}
              secureTextEntry={secureTextEntry}
              onBlur={onBlur}
              error={error}
            />
            {error && (
              <CText color={COLORS.error}>
                <IconAlertCircleFilled
                  fill={COLORS.error}
                  stroke={0}
                  size={scale(13)}
                  style={{
                    marginTop: scale(-1),
                  }}
                />{' '}
                {error.message}
              </CText>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: scale(44),
    flex: 1,
    borderRadius: scale(10),
    backgroundColor: COLORS.grey + '40',
  },
  containInput: {
    columnGap: scale(16),
  },
  contentBelow: {
    flexDirection: 'row',
    columnGap: scale(6),
    width: '90%',
    marginTop: scale(4),
    marginLeft: scale(6),
    alignItems: 'flex-start',
  },
});
