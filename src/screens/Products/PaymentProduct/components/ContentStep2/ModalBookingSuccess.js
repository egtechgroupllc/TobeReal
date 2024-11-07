import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import ReactNativeModal from 'react-native-modal';
import Modal from 'react-native-modal';
import {useQuery} from '@tanstack/react-query';
import {useLanguage} from '~/hooks/useLanguage';
import {animations, COLORS, SIZES} from '~/assets/constants';
import {IconSupporterYellow} from '~/assets/icon/Icon';
import {CImage, CText} from '~/components';
import {scale} from '~/utils/scale';
// import {getListConstant} from '../../../../../Model/api/common';

export default function ModalBookingSuccess({
  openContact,
  isPending,
  check,
  countdown,
}) {
  const {t} = useLanguage();
  // const {data, isLoading} = useQuery({
  //   queryKey: ['common', 'list-constant'],
  //   queryFn: getListConstant,
  // });

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
          <IconSupporterYellow height={scale(20)} width={scale(20)} />
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
          {!isPending.current ? (
            <LottieView
              autoPlay={true}
              source={animations.pending}
              style={{
                height: scale(150),
                width: scale(150),
              }}
              resizeMode="contain"
            />
          ) : (
            <>
              {!check?.status ? (
                <LottieView
                  autoPlay={true}
                  source={animations.failed}
                  style={{
                    height: scale(70),
                    width: scale(70),
                  }}
                  resizeMode="contain"
                />
              ) : (
                <CImage
                  source={animations.success}
                  style={{
                    height: scale(70),
                    width: scale(70),
                  }}
                  resizeMode="contain"
                />
              )}
              <CText
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: scale(20),
                }}
                textType="bold">
                {check?.mess}!
              </CText>
              {check?.status ? (
                <>
                  <CText
                    textType="bold"
                    style={{
                      alignSelf: 'center',
                      marginTop: scale(5),
                    }}>
                    {/* +{data?.data?.amount_token_tbc_airdrop} TBC */}
                  </CText>
                  <CText
                    style={{
                      alignSelf: 'center',
                      marginTop: scale(5),
                    }}>
                    {t('congratulate_on_receiving_coin')}
                  </CText>
                  <CText
                    style={{
                      alignSelf: 'center',
                      marginTop: scale(5),
                      paddingBottom: scale(20),
                      textAlign: 'center',
                      color: COLORS.textSub,
                    }}>
                    {t('you_will_automatic_transfer')} ... {countdown}s
                  </CText>
                </>
              ) : (
                <>
                  <CText
                    style={{
                      alignSelf: 'center',
                      marginTop: scale(5),
                      paddingBottom: scale(20),
                      textAlign: 'center',
                      color: COLORS.textSub,
                    }}>
                    {t('your_transaction_has_been_canceled')}
                  </CText>
                </>
              )}
            </>
          )}
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
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: '100%',
    minHeight: scale(120),
  },
});
