import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  COLORS,
  SIZES,
  animations,
  scale,
} from '../../../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../../../components/CustomText';
import LottieView from 'lottie-react-native';
import {useLanguage} from '../../../../../hooks/useLanguage';
import ReactNativeModal from 'react-native-modal';

export default function ModalBookingSuccess({open}) {
  const {t} = useLanguage();

  return (
    <View style={{position: 'absolute', height: scale(100)}}>
      <ReactNativeModal
        isVisible={open}
        onSwipeComplete={() => {
          setOpenContact(false);
        }}
        swipeDirection={['up', 'left', 'right', 'down']}
        onBackdropPress={() => {
          setOpenContact(false);
        }}>
        <View style={styles.contact}>
          <LinearGradient
            colors={['#FFE55A', '#F0B90B']}
            start={{x: 1.2, y: 0}}
            end={{x: 0, y: 0}}
            style={styles.contactHeader}>
            <CustomText
              style={{
                fontSize: SIZES.small,
                color: COLORS.black,
              }}
              textType="bold">
              {t('we_are_always_here')}
            </CustomText>
          </LinearGradient>

          <View style={styles.listContact}>
            <LottieView autoPlay={true} source={animations.pending} />
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
}

const styles = StyleSheet.create({
  contact: {
    backgroundColor: COLORS.error,
    borderRadius: scale(20),
  },
  contactHeader: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(20),
  },
  listContact: {
    alignItems: 'center',
    paddingVertical: scale(15),
    rowGap: scale(10),
  },
});
