import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState, useRef} from 'react';
import {COLORS, SIZES, WIDTH} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {Button} from '~/components';
import Skeleton from '~/components/Skeleton';

const funcFallBack = () => {};
export default memo(function Category({
  data = [],
  noSelect,
  onPress = funcFallBack,
  styleWrapper,
  styleContent,
  isShadow = true,
  indexDefault = 0,
  backgroundColorSelect = COLORS.input,
  isObject = false,
  selected,
  activeNavIndex,
  backgroundColorUnSelect,
  styleButton,
}) {
  const [select, setSelect] = useState(!noSelect && 0);
  const flatListRef = useRef(null);
  const isScrolling = useRef(false);

  const widthSize = WIDTH.widthScreen / (data.length > 3 ? 5 : 4);

  const handlePress = useCallback(
    (item, index) => {
      if (isScrolling.current) return;
      setSelect(index);
      onPress(item, index);

      isScrolling.current = true;
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
      setTimeout(() => {
        isScrolling.current = false;
      }, 300);
    },
    [onPress],
  );

  useEffect(() => {
    if (
      flatListRef.current &&
      activeNavIndex !== undefined &&
      !isScrolling.current
    ) {
      isScrolling.current = true;
      flatListRef.current.scrollToIndex({
        index: activeNavIndex,
        animated: true,
        viewPosition: 0.5,
      });
      setTimeout(() => {
        isScrolling.current = false;
      }, 300);
    }
  }, [activeNavIndex]);
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        minHeight: scale(36),
        ...styleWrapper,
      }}>
      <FlatList
        ref={flatListRef}
        data={data}
        contentContainerStyle={{
          columnGap: scale(10),
          paddingHorizontal: scale(16),
          alignItems: 'center',
          ...styleContent,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data.length >= 3}
        onScrollBeginDrag={() => {
          isScrolling.current = true;
        }}
        onScrollEndDrag={() => {
          setTimeout(() => {
            isScrolling.current = false;
          }, 300);
        }}
        renderItem={({item, index}) =>
          (isObject ? !!item?.name : !!item) ? (
            <Button
              sizeButton="normal"
              key={`key-${item}-${index}`}
              title={isObject ? item?.name : item}
              isShadow={isShadow}
              backgroundColor={
                activeNavIndex !== undefined
                  ? activeNavIndex === index
                    ? backgroundColorSelect
                    : backgroundColorUnSelect || '#FFFFFF1A'
                  : select === index
                  ? backgroundColorSelect
                  : backgroundColorUnSelect || '#FFFFFF1A'
              }
              styleContent={[
                {
                  width: 'auto',
                  minWidth: widthSize,
                  paddingHorizontal: scale(20),
                  ...styleButton,
                },
              ]}
              styleText={[
                select !== index && {
                  color: COLORS.White,
                  fontSize: SIZES.small,
                },
              ]}
              onPress={() => handlePress(item, index)}
            />
          ) : (
            <Skeleton width={widthSize} key={index} />
          )
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({});
