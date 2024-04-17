/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  scrollEnabled,
  noSelectDefault,
  select,
  selectIndex,
  onSelect,
  onChange,
}) {
  const _keyTextView = keyTextView || 'text';
  const _keyTextSub = keyTextSub || 'subText';

  const valueDefault = useMemo(
    () =>
      !noSelectDefault && {
        index: 0,
        item: data[0]?.[_keyTextView],
      },
    [data[0]?.[_keyTextView]],
  );

  const [option, setOption] = useState([valueDefault]);
  useEffect(() => {
    if (selectIndex || selectIndex === 0) {
      setOption([
        {
          index: selectIndex,
        },
      ]);
      return;
    }

    if (select) {
      setOption([
        {
          index: data.indexOf(select),
        },
      ]);
      return;
    }
  }, [select, selectIndex]);

  const valueDefaultView = useCallback(
    (item, index) => ({
      index,
      item: item?.[_keyTextView],
    }),
    [],
  );

  const checkSelect = useCallback(
    (value, index) => {
      const result = option.some(item => item.index === index);
      return result;
    },
    [option],
  );

  const handleSelectOption = value => {
    if (!multiSelect) {
      setOption([value]);
      onSelect && onSelect(value);
      return;
    }

    setOption(prev => {
      const check = checkSelect(value, value?.index);

      if (isSelectAll && value?.index === valueDefault.index) {
        return [value];
      }
      if (check) {
        return prev.filter(item => item?.index !== value?.index);
      } else {
        const resultPrev = !isSelectAll
          ? prev
          : prev.filter(item => item.index !== valueDefault?.index);
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

  const flatRef = useRef();
  useLayoutEffect(() => {
    flatRef.current.scrollToIndex({
      animated: true,
      index: option[0]?.index || 0,
      viewPosition: 0.5,
    });
  }, [option]);

  return (
    <View
      style={[
        styles.wrapper,
        styleWrapper,
        isShaDow && {
          ...SHADOW,

          shadowOffset: {
            width: 0,
            height: 1,
          },
        },
      ]}>
      <FlatList
        ref={flatRef}
        data={data}
        contentContainerStyle={[styles.content, styleContent]}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={({index}) => {
          const wait = new Promise(resolve => setTimeout(resolve, 100));
          wait.then(() => {
            setOption([
              {
                index: 0,
              },
            ]);
          });
        }}
        scrollEnabled={scrollEnabled || data.length > 3}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={`key-${item?.[_keyTextView]}-${index}`}
            activeOpacity={0.7}
            style={[
              styles.option,
              checkSelect(item, index) &&
                !outline && {
                  borderBottomWidth: 2,
                  paddingBottom: scale(4),
                },
              outline && {
                backgroundColor: !option.includes(valueDefaultView(item, index))
                  ? '#f5f5f5'
                  : '#F0B90B20',
              },
              checkSelect(item, index) && outline && styles.outline,
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
                  checkSelect(item, index)
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
                    color: checkSelect(item, index)
                      ? COLORS.primary
                      : COLORS.text,
                  }}>
                  {item?.[_keyTextView]}
                </CustomText>
              )}
              {isTextSub && (
                <CustomText
                  style={{
                    color: checkSelect(item, index)
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
