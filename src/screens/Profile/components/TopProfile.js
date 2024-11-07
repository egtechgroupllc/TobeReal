import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import {IconCamera, IconCheck} from '~/assets/icon/Icon';
import {COLORS, images, SIZES} from '~/assets/constants';
import BoxWalletBlockChain from '~/screens/WalletToken/AddressWallet/BoxWalletBlockChain';
import {CImage, CText} from '~/components';

export default function TopProfile({name, data}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          marginTop: scale(-40),
        }}>
        <CImage.Avatar
          source={data?.image ? {uri: data.image} : images.iconProfile}
          size={scale(80)}
          style={styles.avatar}
        />
        <IconCheck style={styles.iconCheck} size={scale(20)} />
      </View>

      <CText textType="bold" size={SIZES.medium} style={{color: COLORS.White}}>
        {data?.fullname}
      </CText>

      <View style={styles.info}>
        <CText color={COLORS.White}>{data?.phone}</CText>

        <View style={styles.boxVerify}>
          <CText color={COLORS.whiteSemi} size={SIZES.xSmall} textType="medium">
            {t('verified')}
          </CText>
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() =>
          navigate('NoBottomTab', {
            screen: 'ChangeAvatarScreen',
            params: data,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: scale(10),
          paddingBottom: scale(10),
        }}>
        <CText style={{color: COLORS.blue}}>{t('change_avatar')}</CText>
        <IconCamera fill={COLORS.White} />
      </TouchableOpacity> */}
      {/* <View style={styles.bottom}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            ...styles.btnBottom,
            borderTopRightRadius: scale(12),
            borderBottomLeftRadius: scale(8),
          }}>
          <CText textType="semiBold">{t('personal_profile')}</CText>
        </TouchableOpacity>

        <View style={styles.line} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            ...styles.btnBottom,
            borderTopLeftRadius: scale(2),
            borderBottomRightRadius: scale(8),
          }}>
          <CText textType="semiBold">{t('introduction')}</CText>
        </TouchableOpacity>
      </View> */}

      <BoxWalletBlockChain
        data={data}
        styleBox={{backgroundColor: COLORS.overlay}}
      />

      {/* <View style={styles.bottom}>
        <TouchableOpacity
          style={{
            ...styles.btnBottom,
            borderTopRightRadius: scale(12),
            borderBottomLeftRadius: scale(8),
          }}>
          <CText textType="semiBold">
            {formatPrice(12362183213)}
          </CText>
        </TouchableOpacity>

        <View style={styles.line} />
        <TouchableOpacity
          style={{
            ...styles.btnBottom,
            borderTopLeftRadius: scale(2),
            borderBottomRightRadius: scale(8),
          }}>
          <CText textType="semiBold">
            {formatPrice(12362183213)}
          </CText>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    borderRadius: scale(8),
    rowGap: scale(4),
  },
  avatar: {
    width: scale(60),
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: COLORS.White,
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
