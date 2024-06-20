import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {COLORS, WIDTH, scale} from '../../assets/constants';
import {CustomButton} from '../../components';

const funcFallBack = () => {};
export default memo(function Category({
  data = [],
  noSelect,
  onPress = funcFallBack,
  styleWrapper,
  styleContent,
  isShadow = true,
  indexDefault = 0,
  backgroundColorSelect = COLORS.primary,
  isObject = false,
  selected,
}) {
  const [select, setSelect] = useState(!noSelect && 0);

  const widthSize = WIDTH.widthScreen / (data.length > 3 ? 5 : 4);

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
          alignItems: 'center',
          ...styleContent,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data.length > 3}
        renderItem={({item, index}) => (
          <CustomButton
            buttonType="normal"
            key={`key-${item}-${index}`}
            text={isObject ? item?.name : item}
            isShadow={isShadow}
            style={[
              {
                width: 'auto',
                minWidth: widthSize,
                backgroundColor:
                  select === index ? backgroundColorSelect : '#f1f1f1',
              },
            ]}
            styleText={[
              select !== index && {
                color: COLORS.text,
              },
            ]}
            onPress={() => {
              setSelect(index);
              onPress(item);
            }}
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({});
