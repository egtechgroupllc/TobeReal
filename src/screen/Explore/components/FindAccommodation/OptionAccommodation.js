/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';

export default function OptionAccommodation({
  data = [],
  outline,
  styleWrapper,
  styleContent,
  styleOption,
  styleIcon,
  multiSelect,
  isTextSub,
  keyTextView,
  keyTextSub,
  isSelectAll,
  isShaDow,
  isSelectForIndex,
  scrollEnabled,
  noSelectDefault,
  select,
  onSelect,
  onChange,
}) {
  const _keyTextView = keyTextView || 'text';
  const _keyTextSub = keyTextSub || 'subText';

  const valueDefault = useMemo(
    () => !noSelectDefault && (isSelectForIndex ? 0 : data[0]?.[_keyTextView]),
    [data[0]?.[_keyTextView]],
  );

  const valueDefaultView = useCallback(
    (item, index) => (isSelectForIndex ? index : item?.[_keyTextView]),
    [],
  );

  const [option, setOption] = useState([valueDefault]);
  useEffect(() => {
    if (select || select === 0) setOption([select]);
  }, [select]);

  useEffect(() => {
    if (valueDefault) setOption([valueDefault]);
  }, [valueDefault]);

  const handleSelectOption = value => {
    if (!multiSelect) {
      setOption([value]);
      onSelect && onSelect(value);
      return;
    }

    setOption(prev => {
      const check = option.includes(value);

      if (isSelectAll && value === valueDefault) {
        return [value];
      }
      if (check) {
        return prev.filter(item => item !== value);
      } else {
        const resultPrev = !isSelectAll
          ? prev
          : prev.filter(item => item !== valueDefault);

        onSelect && onSelect([...resultPrev, value]);
        return [...resultPrev, value];
      }
    });
  };

  useEffect(() => {
    if (onChange) {
      onChange(!multiSelect ? option[0] : option);
    }
  }, [option]);

  return (
    <View style={[styles.wrapper, styleWrapper, isShaDow && SHADOW]}>
      <FlatList
        data={data}
        contentContainerStyle={[styles.content, styleContent]}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled || data.length > 3}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={`key-${item?.[_keyTextView]}-${index}`}
            activeOpacity={0.7}
            style={[
              styles.option,
              option.includes(valueDefaultView(item, index)) &&
                !outline && {
                  borderBottomWidth: 2,
                  paddingBottom: scale(4),
                },
              outline && {
                backgroundColor: !option.includes(valueDefaultView(item, index))
                  ? '#f5f5f5'
                  : '#F0B90B20',
              },
              option.includes(valueDefaultView(item, index)) &&
                outline &&
                styles.outline,
              styleOption,
              // styleContent?.height && {height: styleContent?.height},
            ]}
            onPress={() => handleSelectOption(valueDefaultView(item, index))}>
            {item?.icon && (
              <item.icon
                style={{
                  width: scale(16),
                  height: scale(16),
                  ...styleIcon,
                }}
                fill={
                  option.includes(valueDefaultView(item, index))
                    ? COLORS.primary
                    : styleIcon?.color || COLORS.text
                }
              />
            )}

            <View
              style={{
                paddingHorizontal: scale(10),
                alignItems: 'center',
              }}>
              {item?.[_keyTextView] && (
                <CustomText
                  textType={isTextSub && 'semiBold'}
                  style={{
                    color: option.includes(valueDefaultView(item, index))
                      ? COLORS.primary
                      : COLORS.text,
                  }}>
                  {item?.[_keyTextView]}
                </CustomText>
              )}
              {isTextSub && (
                <CustomText
                  style={{
                    color: option.includes(valueDefaultView(item, index))
                      ? COLORS.primary
                      : COLORS.text,
                  }}>
                  {item?.[_keyTextSub]}
                </CustomText>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    height: scale(38),
    zIndex: 1,
  },
  content: {
    height: '100%',
    alignItems: 'center',
    columnGap: scale(16),
    paddingHorizontal: scale(12),
  },
  option: {
    alignItems: 'center',
    minWidth: scale(36),
    borderColor: COLORS.primary,
    rowGap: scale(2),
    height: scale(38),
    // paddingHorizontal: scale(5),
    borderRadius: scale(10),
    justifyContent: 'center',
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
