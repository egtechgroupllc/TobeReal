import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS, SHADOW, SIZES, images, scale} from '../../../assets/constants';
import {IconCamera, IconCheck, IconProfile} from '../../../assets/icon/Icon';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import BoxWalletBlockChain from '../../WalletToken/AddressWallet/BoxWalletBlockChain';
import {useLanguage} from '../../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {baseUrl, baseUrlImage} from '../../../Model/url';

export default function TopProfile({name, data, userLevelInfo}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  // const currentLevel = userLevelInfo?.currentLevel?.level;
  // const currentMinScore = userLevelInfo?.currentLevel?.min_score || 0;
  // const nextMinScore = userLevelInfo?.nextLevel?.min_score || 0;

  // const expSinceLevelUp = data?.score - currentMinScore;

  // const expToNextLevel = nextMinScore - currentMinScore;

  // const levelImage = useMemo(() => {
  //   switch (currentLevel) {
  //     case 1:
  //       return images.lv1;
  //     case 2:
  //       return images.lv2;
  //     case 3:
  //       return images.lv3;
  //     case 4:
  //       return images.lv4;
  //     case 5:
  //       return images.lv5;
  //     case 6:
  //       return images.lv6;
  //     default:
  //       return images.lv1;
  //   }
  // }, [currentLevel]);

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          marginTop: scale(-20),
        }}>
        <CustomImage
          source={
            data?.avatar
              ? {uri: `${baseUrlImage}${data.avatar}`} // fallback bằng file name
              : images.iconProfile
          }
          style={styles.avatar}
        />

        {/* <CustomImage source={levelImage} style={styles.iconCheck} /> */}
      </View>

      <CustomText textType="bold" size={SIZES.medium}>
        {name}
      </CustomText>

      {data?.phone && (
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
      )}

      {/* <View style={styles.expContainer}>
        <View style={styles.expInfo}>
          <CustomText size={SIZES.small} color={COLORS.text}>
            Level {userLevelInfo?.currentLevel?.level}
          </CustomText>
          <CustomText size={SIZES.xSmall} color={COLORS.gray}>
            {expSinceLevelUp}/{expToNextLevel} EXP
          </CustomText>
        </View>
        <View style={styles.expBarContainer}>
          <View
            style={[
              styles.expBarFill,
              {
                width: `${(expSinceLevelUp / expToNextLevel) * 100}%`,
              },
            ]}
          />
        </View>
      </View> */}

      {/* <TouchableOpacity
        onPress={() =>
          navigate('NavigationProfile', {
            screen: 'ChangeAvatarScreen',
            params: data,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: scale(5),
          paddingBottom: scale(10),
        }}>
        <CustomText style={{color: COLORS.blue}}>
          {t('change_avatar')}
        </CustomText>
        <IconCamera />
      </TouchableOpacity> */}
      {/* <View style={styles.bottom}>
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
      </View> */}

      <BoxWalletBlockChain data={data} isProfile />

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
    ...SHADOW,
    borderWidth: 1,
    borderColor: COLORS.pioBox,
    paddingBottom: scale(10),
    marginTop: scale(20),
  },
  avatar: {
    width: scale(60),
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: COLORS.white,
    backgroundColor: COLORS.grey,
  },
  iconCheck: {
    position: 'absolute',
    zIndex: 9,
    bottom: 0,
    right: 0,
    width: scale(20),
    height: scale(20),
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
  expContainer: {
    paddingBottom: scale(10),
    width: '100%',
    paddingHorizontal: scale(40),
  },
  expInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(4),
  },
  expBarContainer: {
    height: scale(6),
    backgroundColor: COLORS.grey,
    borderRadius: scale(3),
    overflow: 'hidden',
  },
  expBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: scale(3),
  },
});
