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
} & IBouncyCheckboxProps;

export default function CheckBox({
  control,
  rules,
  name,
  ...props
}: CheckBoxProps) {
  const form = useForm();
  return (
    <Controller
      defaultValue={false}
      control={control || form.control}
      rules={rules}
      name={name || ''}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <View>
          <BouncyCheckbox
            onPress={onChange}
            size={scale(16)}
            isChecked={value}
            fillColor={COLORS.primary}
            textStyle={styles.textCheckbox}
            innerIconStyle={{borderWidth: 2, borderRadius: 4}}
            iconStyle={{borderRadius: 4}}
            {...props}
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
  textCheckbox: {
    textDecorationLine: 'none',
    fontFamily: FONTS.medium,
    color: COLORS.text,
    fontSize: SIZES.small,
    marginLeft: scale(-6),
  },
  errorBox: {
    marginTop: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(6),
  },
});
