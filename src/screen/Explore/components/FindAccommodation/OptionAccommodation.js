import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';

export default function OptionAccommodation({
  data = [],
  outline,
  styleWrapper,
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

  useEffect(() => {
    if (option.length === 0) {
      setOption([data[0].text]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);

  // const borderBottom
  return (
    <FlatList
      data={data}
      contentContainerStyle={[styles.content, styleWrapper]}
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
          ]}
          onPress={() => handleSelectOption(item?.text)}>
          {item?.icon && (
            <item.icon
              style={{
                width: scale(16),
                height: scale(16),
              }}
              fill={option.includes(item?.text) && COLORS.primary}
            />
          )}
          {item?.text && (
            <CustomText
              textType="medium"
              style={{
                color: option.includes(item?.text)
                  ? COLORS.primary
                  : COLORS.textSub,
                paddingHorizontal: scale(10),
              }}>
              {item?.text}
            </CustomText>
          )}
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: scale(20),
    paddingHorizontal: scale(20),
    minHeight: scale(38),
  },
  option: {
    alignItems: 'center',
    minWidth: scale(36),
    borderColor: COLORS.primary,
    rowGap: scale(2),
    minHeight: scale(36),
    borderRadius: 12,
    justifyContent: 'center',
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
