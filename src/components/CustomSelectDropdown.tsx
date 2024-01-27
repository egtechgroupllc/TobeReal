import React from 'react';
import {StyleSheet} from 'react-native';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import {COLORS, FONTS, SIZES, scale} from '../assets/constants';
import {IconDown} from '../assets/icon/Icon';

export default function CustomSelectDropdown({...props}: SelectDropdownProps) {
  return (
    <SelectDropdown
      defaultButtonText="Select"
      dropdownIconPosition="right"
      renderDropdownIcon={IconDown}
      {...props}
      buttonStyle={{
        ...styles.buttonStyle,
        ...props?.buttonStyle,
      }}
      buttonTextStyle={{...styles.text, ...props?.buttonTextStyle}}
      dropdownStyle={{...styles.dropdownStyle, ...props?.dropdownStyle}}
      rowStyle={{
        height: scale(36),
        borderBottomColor: '#eee',
        ...props?.rowStyle,
      }}
      rowTextStyle={{...styles.text, ...props?.rowTextStyle}}
      selectedRowTextStyle={{
        color: COLORS.primary,
        fontFamily: FONTS.semiBold,
        ...props?.selectedRowTextStyle,
      }}
      selectedRowStyle={{
        backgroundColor: '#f1f1f190',
        ...props?.selectedRowStyle,
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
});
