import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {COLORS, WIDTH, scale} from '../assets/constants';
import {CustomButton} from '.';

const funcFallBack = () => {};
export default memo(function Category({
  data = [],
  noSelect,
  onPress = funcFallBack,
  onChange = funcFallBack,
  styleWrapper,
  styleContent,
  isShadow = true,
  indexDefault = 0,
  backgroundColorSelect = COLORS.primary,
}) {
  const [select, setSelect] = useState(!noSelect && data[indexDefault]);

  const widthSize = WIDTH.widthScreen / (data.length > 3 ? 5 : 4);

  // useEffect(() => {
  //   if (select && onChange) {
  //     onChange(select);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [select]);

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        minHeight: scale(36),
        ...styleWrapper,
      }}>
      <FlatList
        data={data}
        contentContainerStyle={{
          columnGap: scale(10),
          paddingHorizontal: scale(16),
          ...styleContent,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data.length > 3}
        renderItem={({item, index}) => (
          <CustomButton
            buttonType="normal"
            key={`key-${item}-${index}`}
            text={item}
            isShadow={isShadow}
            style={[
              {
                width: 'auto',
                minWidth: widthSize,
                backgroundColor:
                  select === item ? backgroundColorSelect : '#f1f1f1',
              },
            ]}
            styleText={[
              select !== item && {
                color: COLORS.text,
              },
            ]}
            onPress={() => {
              setSelect(item);
              onPress(item);
            }}
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({});
