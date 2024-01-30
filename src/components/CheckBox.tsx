import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, scale} from '../assets/constants';
import BouncyCheckbox, {
  IBouncyCheckboxProps,
} from 'react-native-bouncy-checkbox';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import CustomText from './CustomText';
import {IconError} from '../assets/icon/Icon';

type CheckBoxProps = {
  control?: Control<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  name: string;
  textLeft: boolean;
  defaultValue: boolean;
} & IBouncyCheckboxProps;

export default function CheckBox({
  control,
  rules,
  name,
  textLeft,
  defaultValue,
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
        <View>
          <BouncyCheckbox
            textComponent={<CustomText>{props.text}</CustomText>}
            onPress={onChange}
            size={scale(16)}
            isChecked={value}
            fillColor={COLORS.primary}
            innerIconStyle={{borderWidth: 2, borderRadius: 4}}
            iconStyle={{borderRadius: 4}}
            {...props}
            style={[
              textLeft && {
                flexDirection: 'row-reverse',
              },
              {
                alignItems: 'center',
                columnGap: scale(6),
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
  },
});
