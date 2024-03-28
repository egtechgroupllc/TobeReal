/* eslint-disable no-extra-boolean-cast */
import React, {forwardRef, useState} from 'react';
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
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import {COLORS, FONTS, SIZES, scale} from '../assets/constants';
import {
  IconError,
  IconUnViewablePassword,
  IconViewablePassword,
} from '../assets/icon/Icon';
import {arrayToObject} from '../utils/arrayToObject';
import {formatPrice} from '../utils/format';
import CustomText from './CustomText';

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
  styleWrapper?: ViewStyle;
  enableFormatNum?: boolean;
  password?: boolean;
  sizeInput?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  onPressIconRight?: () => void;
  onPressIconLeft?: () => void;
} & TextInputProps;

export default forwardRef(function CustomInput(
  {
    sizeInput,
    iconLeft,
    iconRight,
    componentRight,
    componentLeft,
    styleIcon,
    styleText,
    styleTextLabel,
    styleWrapper,
    control,
    rules,
    name,
    label,
    enableFormatNum,
    password,
    onPress,
    onPressIconRight,
    onPressIconLeft,
    ...props
  }: CustomInputProps,
  ref: any,
) {
  const [viewPassword, setViewPassword] = useState(!!password);
  const form = useForm();

  const IconRight: any =
    iconRight || (viewPassword ? IconUnViewablePassword : IconViewablePassword);
  const IconLeft: any = iconLeft;
  const propStyle = arrayToObject(props?.style);

  const heightSize =
    sizeInput === 'large' ? 50 : sizeInput === 'medium' ? 45 : 38;

  return (
    <Controller
      control={control || form.control}
      rules={arrayToObject(rules)}
      name={name || ''}
      defaultValue={control && props?.defaultValue}
      render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
        
        <View
          style={[
            styles.wrapper,

            propStyle?.flex
              ? {flex: propStyle?.flex}
              : propStyle?.width && {width: propStyle?.width},
            styleWrapper,
          ]}>
          <>
            {label && (
              <CustomText style={[{color: COLORS.black}, styleTextLabel]}>
                {label}
              </CustomText>
            )}
            <TouchableOpacity
              style={[
                styles.content,
                !propStyle?.minHeight && {height: scale(heightSize)},
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
                    disabled={!!onPress && !onPressIconLeft}
                    activeOpacity={onPressIconLeft ? 0.7 : 1}
                    onPress={onPressIconLeft && onPressIconLeft}>
                    <IconLeft
                      style={{...styles.icon, ...styleIcon}}
                      fill={styleIcon?.color}
                    />
                  </TouchableOpacity>
                ))}

              <TextInput
                ref={ref}
                placeholderTextColor={COLORS.textSub}
                secureTextEntry={viewPassword}
                editable={!onPress}
                autoCapitalize="none"
                {...props}
                onChangeText={text => {
                  const valueText = enableFormatNum ? text.trim() : text;
                  const newText = enableFormatNum
                    ? valueText.replaceAll(',', '')
                    : valueText;

                  name
                    ? onChange(newText)
                    : props?.onChangeText && props?.onChangeText(newText);
                }}
                onBlur={name ? onBlur : props?.onBlur}
                value={
                  enableFormatNum
                    ? formatPrice(value, {showCurrency: false})
                    : name
                    ? value
                    : props?.value
                }
                style={[
                  styles.input,
                  propStyle?.maxHeight && {maxHeight: propStyle?.maxHeight},
                  props?.multiline && {lineHeight: scale(16)},
                  styleText,
                ]}
                pointerEvents={!!onPress ? 'none' : 'auto'}
              />

              {(iconRight || componentRight || password) &&
                (componentRight ? (
                  componentRight
                ) : (
                  <TouchableOpacity
                    style={styles.iconBox}
                    disabled={password ? !password : !onPressIconRight}
                    activeOpacity={onPressIconRight ? 0.7 : 1}
                    onPress={() => {
                      password && setViewPassword(!viewPassword);
                      onPressIconRight && onPressIconRight();
                    }}>
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
          </>
        </View>
      )}
    />
  );
});

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
    // height: scale(38),
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
    alignItems: 'flex-start',
    columnGap: scale(6),
  },
});
//

// dua về no
