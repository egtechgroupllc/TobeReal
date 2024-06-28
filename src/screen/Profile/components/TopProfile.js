import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {IconCheck} from '../../../assets/icon/Icon';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import BoxWalletBlockChain from '../../WalletToken/AddressWallet/BoxWalletBlockChain';
import {useLanguage} from '../../../hooks/useLanguage';

export default function TopProfile({name, data}) {
  const {t} = useLanguage();

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          marginTop: scale(-20),
        }}>
        <CustomImage source={images.vietnam} style={styles.avatar} />
        <IconCheck style={styles.iconCheck} size={scale(16)} />
      </View>
      <CustomText textType="bold" size={SIZES.medium}>
        {name}
      </CustomText>

      <View style={styles.info}>
        <CustomText color={COLORS.text}>{data?.phone}</CustomText>

        <View style={styles.boxVerify}>
          <CustomText
            color={COLORS.white}
            size={SIZES.xSmall}
            textType="medium">
            {t('verified')}
          </CustomText>
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            ...styles.btnBottom,
            borderTopRightRadius: scale(12),
            borderBottomLeftRadius: scale(8),
          }}>
          <CustomText textType="semiBold">{t('personal_profile')}</CustomText>
        </TouchableOpacity>

        <View style={styles.line} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            ...styles.btnBottom,
            borderTopLeftRadius: scale(2),
            borderBottomRightRadius: scale(8),
          }}>
          <CustomText textType="semiBold">{t('introduction')}</CustomText>
        </TouchableOpacity>
      </View>

      <BoxWalletBlockChain data={data} />

      {/* <View style={styles.bottom}>
        <TouchableOpacity
          style={{
            ...styles.btnBottom,
            borderTopRightRadius: scale(12),
            borderBottomLeftRadius: scale(8),
          }}>
          <CustomText textType="semiBold">
            {formatPrice(12362183213)}
          </CustomText>
        </TouchableOpacity>

        <View style={styles.line} />
        <TouchableOpacity
          style={{
            ...styles.btnBottom,
            borderTopLeftRadius: scale(2),
            borderBottomRightRadius: scale(8),
          }}>
          <CustomText textType="semiBold">
            {formatPrice(12362183213)}
          </CustomText>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scale(8),
    rowGap: scale(4),
  },
  avatar: {
    width: scale(60),
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  iconCheck: {
    position: 'absolute',
    zIndex: 9,
    bottom: 0,
    right: 0,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: scale(4),
  },
  boxVerify: {
    backgroundColor: '#4CAF50',
    padding: scale(3),
    paddingHorizontal: scale(5),
    borderRadius: scale(99),
  },
  bottom: {
    flexDirection: 'row',
    // columnGap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: scale(6),
  },
  btnBottom: {
    backgroundColor: COLORS.grey50,
    flex: 1,
    alignItems: 'center',
    paddingVertical: scale(8),
  },
  line: {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 999,
    bottom: scale(-4),
    width: scale(6),
    height: '120%',
    transform: [
      {
        rotate: '-19deg',
      },
    ],
  },
});
