import BottomSheetMain, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {forwardRef, useImperativeHandle, useMemo, useRef} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomText from './CustomText';
import {COLORS, SHADOW, SIZES, scale} from '../assets/constants';
import {IconSearch, IconX} from '../assets/icon/Icon';

const BottomSheet = (
  {
    snapPoints,
    snapPointsChild,
    dataList,
    renderItem,
    positionList = 'top',
    styleContent,
    children,
    style,
    handleStyle,
    titleIndicator,
    isLine,
    handleChildBottom,
    refChild,
  },
  ref,
) => {
  // ref
  const bottomSheetModalRef = useRef(null);
  const bottomSheetChildRef = useRef(null);
  const insets = useSafeAreaInsets();

  const _snapPoints = useMemo(
    () => ['1%'].concat(snapPoints || '50%'),
    [snapPoints],
  );
  const _snapPointsChild = useMemo(
    () => ['1%'].concat(snapPointsChild || '50%'),
    [snapPointsChild],
  );

  const handleClose = () => {
    bottomSheetModalRef.current?.close();
  };

  useImperativeHandle(ref, () => ({
    // Các phương thức hoặc thuộc tính có thể được định nghĩa ở đây
    open: () => {
      bottomSheetModalRef.current?.present();
    },
    close: () => {
      handleClose();
    },
  }));
  useImperativeHandle(refChild, () => ({
    openChild: () => {
      bottomSheetChildRef.current?.expand();
    },
    closeChild: () => {
      bottomSheetChildRef.current?.close();
    },
  }));
  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={_snapPoints.length - 1}
      snapPoints={_snapPoints}
      backdropComponent={BottomSheetBackdrop}
      onChange={index => index === 0 && handleClose()}
      handleIndicatorStyle={{
        width: '20%',
        backgroundColor: '#e6e6e6',
      }}
      handleStyle={!isLine && {display: 'none'}}
      style={{
        ...SHADOW,
        shadowOffset: {
          height: -2,
        },
        ...style,
      }}>
      {!isLine && (
        <HandleIndicator
          onClose={() => handleClose()}
          title={titleIndicator}
          style={handleStyle}
        />
      )}

      <View
        style={[
          styles.contentContainer,
          {
            flexDirection:
              positionList === 'bottom' ? 'column-reverse' : 'column',
            paddingBottom: insets.bottom + scale(10),
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
              contentContainerStyle={{}}
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
      {handleChildBottom && (
        <BottomSheetMain
          ref={bottomSheetChildRef}
          snapPoints={_snapPointsChild}
          enablePanDownToClose
          backdropComponent={BottomSheetBackdrop}>
          {handleChildBottom()}
        </BottomSheetMain>
      )}
    </BottomSheetModal>
  );
};

const HandleIndicator = ({onClose, title, style}) => (
  <View style={[styles.headerHandle, style]}>
    <TouchableOpacity style={styles.icon} onPress={onClose} activeOpacity={0.6}>
      <IconX
        style={{
          width: scale(20),
          height: scale(20),
        }}
      />
    </TouchableOpacity>
    <CustomText
      textType="semiBold"
      style={[
        {
          fontSize: style?.fontSize || SIZES.xMedium,
        },
        style?.color && {color: style?.color},
      ]}>
      {title || 'Title'}
    </CustomText>
  </View>
);

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
  headerHandle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    alignItems: 'center',
    position: 'absolute',
    left: scale(8),
    padding: scale(6),
    // height: '100%',
  },
});

export default forwardRef(BottomSheet);
