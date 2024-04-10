/* eslint-disable react-hooks/exhaustive-deps */
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '.';
import {COLORS, SIZES, scale} from '../assets/constants';
import {IconCheckBox} from '../assets/icon/Icon';

export default function BottomSheetListSelect({
  data = [],
  onChange,
  onSelect,
  value,
}) {
  const [select, setSelect] = useState(value || data[0]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    onChange && onChange(select);
  }, [select]);

  useEffect(() => {
    value && setSelect(value);
  }, [value]);

  return (
    <BottomSheetFlatList
      data={data}
      keyExtractor={(item, index) => `key-${index}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
      }}
      renderItem={({item, index}) => (
        <CustomButton
          buttonType="normal"
          key={index}
          style={[
            index !== 0 && {
              borderTopWidth: 1,
            },
            styles.item,
          ]}
          text={item?.text || item}
          onPress={() => {
            setSelect(item);
            onSelect && onSelect(item);
          }}
          iconRight={(select === item?.text || select === item) && IconCheckBox}
          styleText={{
            textType: 'medium',
            color:
              select === item?.text || select === item
                ? COLORS.primary
                : COLORS.text,
            fontSize: SIZES.xMedium,
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    borderTopColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(12),
    columnGap: scale(10),
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.large,
  },
});
