import React, {useState} from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  useForm,
} from 'react-hook-form';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';

import {COLORS, FONTS, SIZES, scale} from '../assets/constants';
import {IconDown, IconError} from '../assets/icon/Icon';
import CustomText from './CustomText';
import {arrayToObject} from '../utils/arrayToObject';
import {requireField} from '../utils/validate';
import {useLanguage} from '../hooks/useLanguage';

type CusSelectDropdownProps = {
  label: string;
  getKeyValue: string;
  styleTextLabel?: TextStyle;
  styleWrapper?: ViewStyle;
  control?: Control<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  name: string;
} & SelectDropdownProps;

export default function CustomSelectDropdown({
  label,
  getKeyValue,
  styleTextLabel,
  styleWrapper,
  control,
  rules,
  name,
  defaultValue,
  ...props
}: CusSelectDropdownProps) {
  const form = useForm();
  const {t} = useLanguage();
  return (
    <Controller
      // defaultValue={defaultValue}
      control={control || form.control}
      rules={rules || requireField(t('this_field_required'))}
      name={name || ''}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        return (
          <View
            style={[
              {
                rowGap: scale(7),
              },
              styleWrapper,
            ]}>
            {label && (
              <CustomText style={[{color: COLORS.white}, styleTextLabel]}>
                {label}
              </CustomText>
            )}
            <SelectDropdown
              defaultButtonText="Select"
              dropdownIconPosition="right"
              renderDropdownIcon={IconDown}
              {...props}
              onSelect={evt => {
                const valueGet = getKeyValue ? evt?.[getKeyValue] : evt;
                onChange(valueGet);
                props.onSelect(valueGet);
              }}
              defaultValue={value}
              buttonStyle={arrayToObject([
                styles.buttonStyle,
                props?.buttonStyle,
                error && {
                  borderColor: '#f0334b',
                  borderWidth: 1,
                },
              ])}
              buttonTextStyle={arrayToObject([
                styles.text,
                props?.buttonTextStyle,
              ])}
              dropdownStyle={arrayToObject([
                styles.dropdownStyle,
                props?.dropdownStyle,
              ])}
              rowStyle={arrayToObject([
                {height: scale(36), borderBottomColor: '#eee'},
                props?.rowStyle,
              ])}
              rowTextStyle={arrayToObject([styles.text, props?.rowTextStyle])}
              selectedRowTextStyle={arrayToObject([
                {color: COLORS.primary, fontFamily: FONTS.semiBold},
                props?.selectedRowTextStyle,
              ])}
              selectedRowStyle={arrayToObject([
                {backgroundColor: '#f1f1f1'},
                props?.selectedRowStyle,
              ])}
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
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'transparent',
    height: scale(36),
    width: '100%',
    borderRadius: SIZES.xSmall,
    borderWidth: 1,
    borderColor: '#eee',
  },
  text: {
    fontSize: SIZES.xMedium,
    fontFamily: FONTS.medium,
  },
  dropdownStyle: {
    borderRadius: SIZES.xSmall,
    backgroundColor: COLORS.white,
  },

  errorBox: {
    marginTop: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(6),
    marginRight: 'auto',
  },
});
