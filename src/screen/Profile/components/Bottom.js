import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {useMutation} from '@tanstack/react-query';
import {postLogout} from '../../../Model/api/auth';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {showMess} from '../../../assets/constants/Helper';
import {
  IconFacebook,
  IconInstagram,
  IconShare,
  IconSupporter,
  IconTwitter,
  IconYoutube,
} from '../../../assets/icon/Icon';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {useAuthentication} from '../../../hooks/useAuthentication';
import {useLanguage} from '../../../hooks/useLanguage';

const listSocial = [
  IconShare,
  IconFacebook,
  IconTwitter,
  IconYoutube,
  IconInstagram,
];
export default function Bottom() {
  const {t} = useLanguage();
  const {onClearToken, token} = useAuthentication();

  const logoutMutation = useMutation({
    mutationFn: postLogout,
  });

  const handleLogOut = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            onClearToken();
          }
        },
        onError: error => {
          onClearToken();
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.box}>
          <IconSupporter />
          <View style={{marginLeft: scale(30), marginRight: scale(50)}}>
            <CustomText
              textType="bold"
              style={{...styles.text1, color: COLORS.white}}>
              {t('support')}
            </CustomText>
            <View style={{marginTop: scale(10)}}>
              <CustomText
                textType="medium"
                style={{...styles.text, color: COLORS.white}}>
                {t('hotline')}: ....
              </CustomText>
              <CustomText
                textType="medium"
                style={{...styles.text, color: COLORS.white}}>
                {t('email')}: ....
              </CustomText>
              <CustomText
                textType="medium"
                style={{...styles.text, color: COLORS.white}}>
                {t('website')}: ....
              </CustomText>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: scale(10)}}>
          {listSocial?.map((Icon, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              style={{width: scale(50), height: scale(23), alignItems: 'center'}}>
              <Icon />
            </TouchableOpacity>
          ))}
        </View> */}

      {token && (
        <CustomButton
          text={t('log_out')}
          onPress={handleLogOut}
          buttonType="medium"
          linearGradientProps
          style={{
            flex: 1,
            backgroundColor: '#000',
            marginTop: scale(12),
          }}
        />
      )}
      {token && (
        <CustomButton
          text={'Đổi tài khoản'}
          onPress={handleLogOut}
          buttonType="medium"
          linearGradientProps
          style={{
            flex: 1,
            backgroundColor: '#000',
            marginTop: scale(12),
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(10),
    alignItems: 'center',
    columnGap: scale(10),
    paddingBottom: scale(20),
    flexDirection: 'row',
  },
  box: {
    backgroundColor: '#0000004D',
    width: '90%',
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: scale(10),
  },
  text: {
    fontSize: SIZES.xSmall,
  },
  text1: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(5),
    height: scale(48),
    justifyContent: 'center',
    // width: scale(325),
  },
  text2: {
    fontSize: SIZES.medium,
  },
});
