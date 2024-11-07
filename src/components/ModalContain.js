import {useIsFocused, useRoute} from '@react-navigation/native';
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '~/assets/constants';
import {scale} from '~/utils/scale';

export default memo(
  forwardRef(function ModalContain(
    {
      children,
      onClose,
      open,
      noClose,
      isFullScreen,
      isInWeb,
      style,
      styleWrapper,
    },
    ref,
  ) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(open);
    }, [open]);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setIsOpen(true);
        },
        close: () => {
          setIsOpen(false);
        },
      }),
      [],
    );

    useEffect(() => {
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(isOpen ? COLORS.overlay : 'transparent');
    }, [isOpen]);

    const {top} = useSafeAreaInsets();
    if (!isOpen) {
      return null;
    }
    return (
      <Modal
        transparent
        animationType={isInWeb ? 'none' : 'fade'}
        visible={isOpen}
        onRequestClose={() => {
          if (!noClose) {
            setIsOpen(false);
            onClose && onClose(false);
          }
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: isFullScreen ? 0 : scale(20),
            ...styleWrapper,
          }}>
          <TouchableOpacity
            disabled={noClose}
            activeOpacity={0.7}
            onPress={() => {
              setIsOpen(false);
              onClose && onClose(false);
            }}
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: COLORS.overlay,
            }}
          />
          <View
            style={[
              styles.children,
              isFullScreen && {flex: 1, borderRadius: 0, paddingTop: top},
              style,
            ]}>
            {children}
          </View>
        </View>
      </Modal>
    );
  }),
);

const styles = StyleSheet.create({
  children: {
    rowGap: scale(20),
    backgroundColor: COLORS.White,
    borderRadius: scale(20),
    padding: scale(16),
    width: '100%',
    maxWidth: scale(400),
  },
});
