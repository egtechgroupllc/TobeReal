/* eslint-disable no-extra-boolean-cast */
import {
  IconAlertCircleFilled,
  IconEye,
  IconEyeClosed,
  IconEyeOff,
  IconProps,
} from '@tabler/icons-react-native';
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
  View,
  ViewStyle,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '~/assets/constants';
import {formatPrice} from '~/utils/format';
import {scale} from '~/utils/scale';
import CText, {CTextProps} from './CText';
import Button, {ButtonIconProps} from './Button';
import {arrayToObject} from '~/utils/arrayToObject';
// import {arrayToObject} from '~/utils/arrayToObject';
// import {COLORS, FONTS, SIZES, scale} from '~/assets/constants';

// import CText, {CTextProps} from './CText';

type InputProps = {
  control?: Control<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  name: string;
  label: string;
  icon?: React.JSX.Element;
  componentIcon?: React.ReactNode;
  propsIcon?: ButtonIconProps;
  styleText?: TextStyle;
  styleTextLabel?: Pick<CTextProps, 'textType'> & TextStyle;
  textType?: 'regular' | 'medium' | 'semiBold' | 'bold' | undefined;
  styleWrapper?: ViewStyle;
  styleContent?: ViewStyle;
  enableFormatNum?: boolean;
  password?: boolean;
  isIconBtn?: boolean;
  iconLeft?: boolean;
  onPressIcon?: () => void;
  onPress?: () => void;
  sizeInput?: 'small' | 'medium' | 'large';
} & TextInputProps;
function formatInputPrice(price: string) {
  if (!price && price !== '0') {
    return '0';
  }

  // Remove all characters except digits and periods
  let formattedPrice = price.toString().replace(/[^\d.]/g, '');

  // Remove period if it is the first character
  formattedPrice = formattedPrice.replace(/^\./, '');

  // Allow only one period
  formattedPrice = formattedPrice.replace(/(\..*)\./g, '$1');

  // Split into integer and decimal parts
  const parts = formattedPrice.split('.');

  // Remove leading zeros from the integer part
  parts[0] = parts[0].replace(/^0+(?!$)/, '');

  // Format integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine integer and decimal parts
  formattedPrice = parts.join('.');

  return formattedPrice;
}
export default forwardRef(function Input(
  {
    sizeInput,
    icon,
    iconLeft,
    componentIcon,
    propsIcon,
    styleText,
    styleTextLabel,
    styleWrapper,
    styleContent,
    control,
    rules,
    name,
    label,
    enableFormatNum,
    password,
    textType,
    isIconBtn = false,
    onPressIcon,
    onPress,
    ...props
  }: InputProps,
  ref: any,
) {
  const [viewPassword, setViewPassword] = useState(!!password);
  const form = useForm();

  const IconRight: any = icon || (viewPassword ? IconEye : IconEyeOff);
 
  const heightSize =
    sizeInput === 'large' ? 50 : sizeInput === 'medium' ? 45 : 38;

  const textWeight: TextStyle =
    textType === 'regular'
      ? {fontFamily: FONTS.regular, fontWeight: '400'}
      : textType === 'semiBold'
      ? {fontFamily: FONTS.semiBold, fontWeight: '600'}
      : textType === 'bold'
      ? {fontFamily: FONTS.bold, fontWeight: '700'}
      : {fontFamily: FONTS.medium, fontWeight: '500'};
  // props?.style
  return (
    <Controller
      control={control || form.control}
      rules={arrayToObject(rules)}
      name={name || ''}
      defaultValue={control && props?.defaultValue}
      render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
        <View style={[styles.wrapper, styleWrapper]}>
          <>
            {label && (
              <CText
                textType={styleTextLabel?.textType}
                style={[{color: COLORS.White}, styleTextLabel]}>
                {label}
              </CText>
            )}
            <TouchableOpacity
              onPress={() =>{
                onPress && onPress()
              }}
              style={[
                styles.content,
                error && {borderColor: COLORS.error},
                {height: scale(heightSize)},
                props?.multiline && {height: scale(140)},
                {
                  width: '100%',

                  flexDirection: iconLeft ? 'row-reverse' : 'row',
                },
                styleContent,
              ]}>
              <TextInput
                ref={ref}
                placeholderTextColor={COLORS.greyLight}
                secureTextEntry={viewPassword}
                autoCapitalize="none"
                selectionColor={COLORS.Green}
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
                    ? formatInputPrice(value)
                    : name
                    ? value
                    : props?.value
                }
                style={[
                  styles.input,
                  props?.multiline && {lineHeight: scale(16)},

                  textWeight,

                  styleText,
                ]}
              />

              {(icon || componentIcon || password) &&
                (componentIcon ? (
                  componentIcon
                ) : (
                  <Button.Icon
                    onPress={() => {
                      setViewPassword(prev => !prev);
                      onPressIcon && onPressIcon();
                    }}
                    Icon={IconRight}
                    disabled={password ? false : !isIconBtn}
                    stroke={password ? COLORS.White : '#00000000'}
                    fill={password ? '#00000000' : COLORS.grey}
                    {...propsIcon}
                  />
                ))}
            </TouchableOpacity>

            {error?.message && (
              <View style={styles.errorBox}>
                <IconAlertCircleFilled
                  fill={COLORS.error}
                  stroke={0}
                  size={SIZES.xMedium}
                />
                <CText
                  style={{
                    color: COLORS.error,
                    flex: 1,
                  }}>
                  {error?.message}
                </CText>
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
    borderColor: COLORS.grey + '90',
    borderStyle: 'solid',
    paddingHorizontal: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(10),
    columnGap: scale(8),
    justifyContent: 'center',
    width: '100%',
    // height: '100%',
    // height: scale(38),
  },
  input: {
    flex: 1,
    paddingVertical: scale(8),
    fontFamily: FONTS.medium,
    fontSize: SIZES.small,
    color: COLORS.White,
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
