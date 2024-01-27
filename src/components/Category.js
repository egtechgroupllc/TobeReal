import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, WIDTH, scale} from '../assets/constants';
import {CustomButton} from '.';

const funcFallBack = () => {};
export default function Category({data = [], onPress = funcFallBack}) {
  const [select, setSelect] = useState(data[1]);

  const widthSize = WIDTH.widthScreen / (data.length > 3 ? 5 : 4);

  useEffect(() => {
    if (select && onPress) {
      onPress(select);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        minHeight: scale(36),
      }}>
      <FlatList
        data={data}
        contentContainerStyle={{
          columnGap: scale(10),
          paddingHorizontal: scale(16),
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data.length > 3}
        renderItem={({item, index}) => (
          <CustomButton
            key={`key-${item}-${index}`}
            text={item}
            isShadow
            style={[
              {
                width: 'auto',
                minWidth: widthSize,
                backgroundColor: select === item ? COLORS.primary : '#f1f1f1',
              },
            ]}
            styleText={[
              select !== item && {
                color: COLORS.text,
              },
            ]}
            onPress={() => {
              setSelect(item);
              // onPress(item);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
