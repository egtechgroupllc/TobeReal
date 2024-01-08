import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, WIDTH, scale} from '../assets/constants';
import {CustomButton} from '.';

export default function Category({data = []}) {
  const [select, setSelect] = useState(data[1]);

  const widthSize = WIDTH.widthScreen / (data.length > 3 ? 5 : 4);

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        minHeight: scale(38),
      }}>
      <FlatList
        data={data}
        contentContainerStyle={{
          alignItems: 'center',
          flexDirection: 'row',
          columnGap: scale(10),
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data.length > 3}
        renderItem={({item, index}) => (
          <CustomButton
            key={`key-${item}-${index}`}
            text={item}
            isShadow
            styleWrapper={[
              {
                width: scale(widthSize),
                backgroundColor: select === item ? COLORS.primary : '#f1f1f1',
              },
            ]}
            styleText={[
              select === item && {
                color: COLORS.white,
              },
            ]}
            onPress={() => {
              setSelect(item);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
