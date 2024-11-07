import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {scale} from '~/utils/scale';
import {COLORS, images, SIZES} from '~/assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import {IconSupporter} from '~/assets/icon/Icon';
import CText from './CText';
import {useLanguage} from '~/hooks/useLanguage';
import CImage from './CImage';
import Button from './Button';
export default function ModalSuccess({openContact, onPress}) {
  const {t} = useLanguage();
  return (
    <Modal
      isVisible={openContact}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <View style={styles.contact}>
        <LinearGradient
          colors={COLORS.linearButton}
          start={{x: 1.2, y: 0}}
          end={{x: 0, y: 0}}
          style={styles.contactHeader}>
          <IconSupporter height={scale(20)} width={scale(20)} />
          <CText
            style={{
              fontSize: SIZES.small,
              color: COLORS.black,
            }}
            textType="bold">
            {t('notification')}
          </CText>
        </LinearGradient>
        <View style={styles.listContact}>
          <View style={{alignItems: 'center'}}>
            <CImage
              source={images.logoSuccess}
              resizeMode="contain"
              style={{width: scale(100), height: scale(100)}}
            />
            <CText
              textType="semibold"
              style={{
                fontSize: SIZES.xMedium,
                color: COLORS.White,
                textAlign: 'center',
              }}>
              {t('congratulation_booking_success')}
            </CText>
            <CText
              textType="bold"
              style={{fontSize: SIZES.medium, color: COLORS.White}}>
              + 0 TBC
            </CText>
          </View>
          <View style={{alignSelf: 'center', width: '50%'}}>
            <Button
              title={t('confirm')}
              onPress={onPress}
              sizeButton="small"
              linearGradientProps={{colors: COLORS.linearButton}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contact: {
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contactHeader: {
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(20),
    width: '100%',
  },
  listContact: {
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    backgroundColor: COLORS.primary,
    width: '100%',
    minHeight: scale(120),
    padding: scale(30),
    rowGap: scale(10),
  },
});
