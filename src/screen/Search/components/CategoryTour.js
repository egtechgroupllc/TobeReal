import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, Skeleton} from '../../../components';
import {COLORS, WIDTH, scale} from '../../../assets/constants';
const funcFallBack = () => {};
export default function CategoryTour({
  data,
  isObject = false,
  noSelect,
  isShadow,
  styleContent,
  backgroundColorSelect = COLORS.primary,
  styleWrapper,
  onPress = funcFallBack,
}) {
  const [select, setSelect] = useState(!noSelect && 0);

  const widthSize = WIDTH.widthScreen / (data?.length > 3 ? 5 : 4);
  return (
    <View
      style={{
        width: '100%',
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
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data?.length > 3}
        renderItem={({item, index}) =>
          (isObject ? !!item?.name : !!item) ? (
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
          ) : (
            <Skeleton width={widthSize} key={index} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
