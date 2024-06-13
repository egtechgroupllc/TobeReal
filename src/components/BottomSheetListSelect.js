/* eslint-disable react-hooks/exhaustive-deps */
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '.';
import {COLORS, SIZES, scale} from '../assets/constants';
import {IconCheckBox} from '../assets/icon/Icon';

export default memo(function BottomSheetListSelect({
  data = [],
  onChange,
  onSelect,
  ComponentItem,
  contentContainerStyle,
  value,
}) {
  const [select, setSelect] = useState(value || data[0]);
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);

  const scrollToIndex = (index = 0) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });
  };

  useEffect(() => {
    onChange && onChange(select);
  }, [select]);

  useEffect(() => {
    const index = data.findIndex(
      item => item?.text === value || item === value,
    );
    if (index !== -1) {
      scrollToIndex(index);
    }
    // value && setSelect(value);
  }, [data, value]);

  const handlePress = (item, index) => {
    setSelect(item);

    setTimeout(() => {
      onSelect && onSelect(item);
    }, 0);
  };

  return (
    <BottomSheetFlatList
      onScrollToIndexFailed={({index}) => {
        const wait = new Promise(resolve => setTimeout(resolve, 100));
        wait.then(() => {
          // setIndexNavigation(open - 1);
        });
      }}
      ref={flatListRef}
      data={data}
      keyExtractor={(item, index) => `key-${index}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        ...contentContainerStyle,
      }}
      renderItem={({item, index}) =>
        (ComponentItem && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handlePress(item, index);
            }}>
            {ComponentItem({
              item,
              index,
              isActive: select?.text === item?.text || select === item,
            })}
          </TouchableOpacity>
        )) || (
          <CustomButton
            buttonType="normal"
            key={index}
            style={[
              index !== 0 &&
                {
                  // borderTopWidth: 1,
                },
              styles.item,
            ]}
            text={item?.text || item}
            onPress={() => {
              handlePress(item, index);
            }}
            iconRight={
              (select === item?.text || select === item) && IconCheckBox
            }
            styleText={{
              textTransform: 'lowercase',
              textType: 'medium',
              color:
                select === item?.text || select === item
                  ? COLORS.primary
                  : COLORS.text,
              fontSize: SIZES.xMedium,
            }}
          />
        )
      }
    />
  );
});

const styles = StyleSheet.create({
  item: {
    // borderTopColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(12),
    columnGap: scale(10),
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.large,
  },
});
