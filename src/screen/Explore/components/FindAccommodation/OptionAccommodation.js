/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';

export default function OptionAccommodation({
  data = [],
  outline,
  styleWrapper,
  styleContent,
  isSelectOnly,
  isShaDow,
  isSelectForIndex,
  select,
  onSelect,
}) {
  const valueDefault = useRef(isSelectForIndex ? 0 : data[0].text).current;
  const valueDefaultView = useCallback(
    (item, index) => (isSelectForIndex ? index : item?.text),
    [],
  );

  const [option, setOption] = useState([valueDefault]);

  useEffect(() => {
    setOption([select || valueDefault]);
  }, [valueDefault, select]);

  const handleSelectOption = value => {
    setOption(prev => {
      const check = option.includes(value);

      if (value === valueDefault) {
        return [value];
      }
      if (check) {
        return option.filter(item => item !== value && item !== valueDefault);
      } else {
        const result = prev.filter(item => item !== valueDefault);
        return [...result, value];
      }
    });
  };

  const handleSelectOnly = value => {
    setOption([value]);
    onSelect(value);
  };

  useEffect(() => {
    if (!isSelectOnly && option.length === 0) {
      setOption([valueDefault]);
    }
    if (!isSelectOnly && onSelect) {
      onSelect(option);
    }
  }, [option]);

  return (
    <View style={[styles.wrapper, styleWrapper, isShaDow && SHADOW]}>
      <FlatList
        data={data}
        contentContainerStyle={[styles.content, styleContent]}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data.length > 3}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={`key-${item?.text}-${index}`}
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
                  ? '#f8f8f8'
                  : '#F0B90B20',
              },
              option.includes(valueDefaultView(item, index)) &&
                outline &&
                styles.outline,
              styleContent?.height && {height: styleContent?.height},
            ]}
            onPress={() =>
              isSelectOnly
                ? handleSelectOnly(valueDefaultView(item, index))
                : handleSelectOption(valueDefaultView(item, index))
            }>
            {item?.icon && (
              <item.icon
                style={{
                  width: scale(16),
                  height: scale(16),
                }}
                fill={
                  option.includes(valueDefaultView(item, index))
                    ? COLORS.primary
                    : COLORS.text
                }
              />
            )}

            {item?.text && (
              <CustomText
                style={{
                  color: option.includes(valueDefaultView(item, index))
                    ? COLORS.primary
                    : COLORS.text,
                  paddingHorizontal: scale(10),
                }}>
                {item?.text}
              </CustomText>
            )}
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
    borderRadius: scale(10),
    justifyContent: 'center',
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
