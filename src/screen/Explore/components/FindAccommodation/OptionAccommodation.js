import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';

export default function OptionAccommodation({
  data = [],
  outline,
  styleWrapper,
  styleContent,
  isSelectOnly,
  isShaDow,
}) {
  const [option, setOption] = useState([data[0].text]);
  useEffect(() => {
    setOption([data[0].text]);
  }, [data]);

  const handleSelectOption = value => {
    setOption(prev => {
      const check = option.includes(value);

      if (value === data[0].text) {
        return [value];
      }
      if (check) {
        return option.filter(item => item !== value && item !== data[0].text);
      } else {
        const result = prev.filter(item => item !== data[0].text);
        return [...result, value];
      }
    });
  };

  const handleSelectOnly = value => {
    setOption([value]);
  };

  useEffect(() => {
    if (!isSelectOnly && option.length === 0) {
      setOption([data[0].text]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              option.includes(item?.text) &&
                !outline && {
                  borderBottomWidth: 2,
                  paddingBottom: scale(4),
                },
              outline && {
                backgroundColor: !option.includes(item?.text)
                  ? '#f8f8f8'
                  : '#F0B90B20',
              },
              option.includes(item?.text) && outline && styles.outline,
              styleContent?.height && {height: styleContent?.height},
            ]}
            onPress={() =>
              isSelectOnly
                ? handleSelectOnly(item?.text)
                : handleSelectOption(item?.text)
            }>
            {item?.icon && (
              <item.icon
                style={{
                  width: scale(16),
                  height: scale(16),
                }}
                fill={
                  option.includes(item?.text) ? COLORS.primary : COLORS.text
                }
              />
            )}

            {item?.text && (
              <CustomText
                style={{
                  color: option.includes(item?.text)
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
