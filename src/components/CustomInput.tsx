/* eslint-disable no-extra-boolean-cast */
import React, {useEffect, useMemo} from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import {COLORS, FONTS, SIZES, scale} from '../assets/constants';
import {IconError} from '../assets/icon/Icon';
import {arrayToObject} from '../utils/arrayToObject';
import CustomText from './CustomText';
import {formatPrice} from '../utils/format';

type CustomInputProps = {
  control?: Control<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  name: string;
  label: string;
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  componentRight?: React.ReactNode;
  componentLeft?: React.ReactNode;
  styleIcon?: TextStyle;
  styleText?: TextStyle;
  styleTextLabel?: TextStyle;
  enableFormatNum?: boolean;
  sizeInput?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  onPressIconRight?: () => void;
  onPressIconLeft?: () => void;
} & TextInputProps;

export default function CustomInput({
  sizeInput,
  iconLeft,
  iconRight,
  componentRight,
  componentLeft,
  styleIcon,
  styleText,
  styleTextLabel,
  control,
  rules,
  name,
  label,
  enableFormatNum,
  onPress,
  onPressIconRight,
  onPressIconLeft,
  ...props
}: CustomInputProps) {
  const IconRight: any = iconRight;
  const IconLeft: any = iconLeft;
  const propStyle = arrayToObject(props?.style);
  // styleWrapper
  const form = useForm();
  const heightSize =
    sizeInput === 'large' ? 50 : sizeInput === 'medium' ? 45 : 40;

  return (
    <Controller
      control={control || form.control}
      rules={rules}
      name={name || ''}
      defaultValue={control && props?.defaultValue}
      render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
        <View
          style={[
            styles.wrapper,

            // propStyle?.height && {height: propStyle?.height},

            propStyle?.flex
              ? {flex: propStyle?.flex}
              : propStyle?.width && {width: propStyle?.width},
          ]}>
          {label && <CustomText style={styleTextLabel}>{label}</CustomText>}
          <TouchableOpacity
            style={[
              styles.content,
              {height: scale(heightSize)},
              propStyle,
              error && {borderColor: '#f6465d'},
              {width: '100%'},
            ]}
            activeOpacity={!!onPress ? 0.8 : 1}
            onPress={onPress}>
            {(iconLeft || componentLeft) &&
              (componentLeft ? (
                componentLeft
              ) : (
                <TouchableOpacity
                  style={styles.iconBox}
                  activeOpacity={onPressIconLeft ? 0.7 : 1}
                  onPress={onPressIconLeft && onPressIconLeft}>
                  <IconLeft
                    style={{...styles.icon, ...styleIcon}}
                    fill={styleIcon?.color}
                  />
                </TouchableOpacity>
              ))}

            <TextInput
              placeholderTextColor={COLORS.textSub}
              editable={!onPress}
              {...props}
              onChangeText={onChange}
              onBlur={onBlur}
              value={
                enableFormatNum
                  ? formatPrice(value, {showCurrency: false})
                  : value
              }
              style={[styles.input, styleText]}
              pointerEvents={!!onPress ? 'none' : 'auto'}
            />

            {(iconRight || componentRight) &&
              (componentRight ? (
                componentRight
              ) : (
                <TouchableOpacity
                  style={styles.iconBox}
                  activeOpacity={onPressIconRight ? 0.7 : 1}
                  onPress={onPressIconRight && onPressIconRight}>
                  <IconRight
                    style={{...styles.icon, ...styleIcon}}
                    fill={styleIcon?.color}
                  />
                </TouchableOpacity>
              ))}
          </TouchableOpacity>

          {error && (
            <View style={styles.errorBox}>
              <IconError fill="#f0334b" />
              <CustomText
                style={{
                  color: '#f0334b',
                  flex: 1,
                }}>
                {error.message}
              </CustomText>
            </View>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    rowGap: scale(6),
  },
  content: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    paddingHorizontal: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    columnGap: scale(8),
    justifyContent: 'center',
    width: '100%',
    // height: '100%',
    height: scale(38),
  },
  input: {
    flex: 1,
    paddingVertical: scale(4),
    fontFamily: FONTS.medium,
    fontSize: SIZES.small,
    color: COLORS.text,
    height: '100%',
  },
  iconBox: {
    minWidth: scale(24),
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  icon: {
    width: scale(15),
    height: scale(15),
  },
  errorBox: {
    marginTop: scale(2),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(6),
  },
});
//

// dua về no
