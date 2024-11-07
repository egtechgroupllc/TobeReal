import BottomSheetMain, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SHADOW, SIZES} from '~/assets/constants';
import {IconX} from '~/assets/icon/Icon';
import {scale} from '~/utils/scale';
import CText from './CText';

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
    onDismissChild,
    onChange,
    onChangeChild,
    ComponentFooter,
    index,
    backgroundStyle,
    fill = COLORS.White,
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
      index={index || _snapPoints.length - 1}
      snapPoints={_snapPoints}
      handleHeight={30}
      backdropComponent={BottomSheetBackdrop}
      onDismiss={onDismiss}
      onChange={_index => {
        _index === 0 && handleClose();
        onChange && onChange(_index);
      }}
      backgroundStyle={{backgroundColor: COLORS.primary}}
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
          fill={fill}
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
        <>
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
          {ComponentFooter}
        </>
      )}

      {bottomSheetChildRef && (
        <BottomSheetMain
          ref={bottomSheetChildRef}
          onClose={onDismissChild}
          onChange={onChangeChild}
          snapPoints={_snapPointsChild}
          enablePanDownToClose
          backdropComponent={BottomSheetBackdrop}>
          <View
            style={{
              paddingTop: scale(16),
              paddingBottom: insets.bottom + scale(10),
              flex: 1,
            }}>
            {handleChildBottom && handleChildBottom()}
          </View>
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
  fill,
}) => {
  return (
    <View
      style={[
        styles.wrapperHeader,
        !title && {borderBottomWidth: 0},
        styleHeaderWrapper,
      ]}>
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
            fill={fill}
          />
        </TouchableOpacity>
        {title && (
          <CText
            textType="semiBold"
            style={[
              {
                fontSize: style?.fontSize || SIZES.xMedium,
                color: style?.color || COLORS.White,
              },
              style?.color && {color: style?.color},
            ]}>
            {title || 'Title'}
          </CText>
        )}
      </View>
      {headerComponent}
    </View>
  );
};

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
    // height: scale(40),
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
    top: scale(-10),
    // height: '100%',
  },
});

export default memo(forwardRef(BottomSheet));
