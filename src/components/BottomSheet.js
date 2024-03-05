import BottomSheetMain, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {forwardRef, useImperativeHandle, useMemo, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SHADOW, SIZES, scale} from '../assets/constants';
import {IconX} from '../assets/icon/Icon';
import CustomText from './CustomText';

const BottomSheet = (
  {
    snapPoints,
    snapPointsChild,
    styleContent,
    children,
    style,
    handleStyle,
    headerComponent,
    styleHeaderWrapper,
    titleIndicator,
    isLine,
    handleChildBottom,
    refChild,
    disableScroll,
    onDismiss,
    onChange,
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
      handleHeight={30}
      backdropComponent={BottomSheetBackdrop}
      onDismiss={onDismiss}
      onChange={index => {
        index === 0 && handleClose();
        onChange && onChange(index);
      }}
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
          headerComponent={headerComponent}
          styleHeaderWrapper={styleHeaderWrapper}
        />
      )}
      {disableScroll ? (
        <View
          style={{
            paddingVertical: scale(16),
            flex: 1,
            paddingBottom: insets.bottom + scale(10),
            ...styleContent,
          }}>
          {children}
        </View>
      ) : (
        <BottomSheetScrollView
          scrollEnabled={!disableScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: scale(16),
            paddingBottom: insets.bottom + scale(10),
          }}>
          <View style={[styles.contentContainer, styleContent]}>
            {children}
          </View>
        </BottomSheetScrollView>
      )}

      {bottomSheetChildRef && (
        <BottomSheetMain
          ref={bottomSheetChildRef}
          snapPoints={_snapPointsChild}
          enablePanDownToClose
          backdropComponent={BottomSheetBackdrop}>
          {handleChildBottom && handleChildBottom()}
        </BottomSheetMain>
      )}
    </BottomSheetModal>
  );
};

const HandleIndicator = ({
  onClose,
  title,
  headerComponent,
  styleHeaderWrapper,
  style,
}) => (
  <View style={[styles.wrapperHeader, styleHeaderWrapper]}>
    <View style={[styles.headerHandle, style]}>
      <TouchableOpacity
        style={styles.icon}
        onPress={onClose}
        activeOpacity={0.6}>
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
    {headerComponent}
  </View>
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },

  // Header
  wrapperHeader: {
    rowGap: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: scale(12),
  },
  headerHandle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    position: 'absolute',
    right: scale(8),
    padding: scale(6),
    // height: '100%',
  },
});

export default forwardRef(BottomSheet);
