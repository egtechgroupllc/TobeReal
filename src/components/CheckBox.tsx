import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import {StyleSheet, View, ViewStyle} from 'react-native';
import BouncyCheckbox, {
  IBouncyCheckboxProps,
} from 'react-native-bouncy-checkbox';
import {COLORS, scale} from '../assets/constants';
import {IconError} from '../assets/icon/Icon';
import CustomText from './CustomText';

type CheckBoxProps = {
  control?: Control<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  name: string;
  styleWrapper: ViewStyle;
  textLeft: boolean;
  isRadio: boolean;
  checkedNumber: boolean;
  defaultValue: boolean | number;
} & IBouncyCheckboxProps;

export default function CheckBox({
  control,
  rules,
  name,
  styleWrapper,
  textLeft,
  isRadio,
  defaultValue = false,
  checkedNumber,
  ...props
}: CheckBoxProps) {
  const form = useForm();
  return (
    <Controller
      defaultValue={defaultValue}
      control={control || form.control}
      rules={rules}
      name={name || ''}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <View style={[styleWrapper]}>
          <BouncyCheckbox
            textComponent={
              <CustomText style={props.textStyle}>{props.text}</CustomText>
            }
            onPress={valueCheck => {
              onChange(checkedNumber ? (valueCheck ? 1 : 0) : valueCheck);
            }}
            size={scale(16)}
            isChecked={value}
            fillColor={COLORS.primary}
            disableBuiltInState={isRadio}
            innerIconStyle={{borderWidth: 2, borderRadius: 4}}
            iconStyle={{borderRadius: 4}}
            {...props}
            style={[
              textLeft && {
                flexDirection: 'row-reverse',
              },
              {
                alignItems: 'center',
                columnGap: scale(8),
              },
              props?.style,
            ]}
          />
          {error && (
            <View style={styles.errorBox}>
              <IconError fill="#f0334b" />
              <CustomText
                style={{
                  color: '#f0334b',
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
  // textCheckbox: {
  //   textDecorationLine: 'none',
  //   fontFamily: FONTS.medium,
  //   color: COLORS.text,
  //   fontSize: SIZES.small,
  //   marginLeft: scale(-6),
  // },
  errorBox: {
    marginTop: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(6),
    marginRight: 'auto',
  },
});
