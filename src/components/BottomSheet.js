import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, {forwardRef, useImperativeHandle, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomText from './CustomText';
import {COLORS, SIZES, scale} from '../assets/constants';
import {IconSearch} from '../assets/icon/Icon';

const BottomSheet = (
  {
    snapPoints,
    dataList,
    renderItem,
    positionList = 'top',
    styleContent,
    children,
  },
  ref,
) => {
  // ref
  const bottomSheetModalRef = useRef(null);
  const insets = useSafeAreaInsets();

  // variables
  const _snapPoints = useMemo(() => snapPoints || ['25%', '50%'], [snapPoints]);

  useImperativeHandle(ref, () => ({
    // Các phương thức hoặc thuộc tính có thể được định nghĩa ở đây
    open: () => {
      bottomSheetModalRef.current?.present();
    },
    close: () => {
      bottomSheetModalRef.current?.close();
    },
  }));

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={_snapPoints}
      backdropComponent={BottomSheetBackdrop}
      handleIndicatorStyle={{
        width: '30%',
      }}>
      <View
        style={[
          styles.contentContainer,
          {
            flexDirection:
              positionList === 'bottom' ? 'column-reverse' : 'column',
          },
          styleContent,
        ]}>
        {children}

        {dataList &&
          (dataList[0] ? (
            <BottomSheetFlatList
              data={dataList}
              keyExtractor={item => item}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: insets.bottom,
              }}
              renderItem={dataList && renderItem}
            />
          ) : (
            <View style={styles.boxNotFound}>
              <IconSearch
                style={{
                  width: scale(30),
                  height: scale(30),
                }}
                fill={COLORS.textSub}
              />
              <CustomText
                textType="semiBold"
                style={{
                  fontSize: SIZES.medium,
                }}>
                No results found
              </CustomText>
            </View>
          ))}
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  boxNotFound: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',
    rowGap: scale(10),
  },
});

export default forwardRef(BottomSheet);
