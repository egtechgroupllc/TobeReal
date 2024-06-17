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
import Modal from 'react-native-modal';
import {IconSupporterYellow} from '../../../../../assets/icon/Icon';
import CustomImage from '../../../../../components/CustomImage';

export default function ModalBookingSuccess({
  openContact,
  isPending,
  check,
  countdown,
}) {
  const {t} = useLanguage();

  return (
    <Modal
      isVisible={openContact}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <View style={styles.contact}>
        <LinearGradient
          colors={['#FFE55A', '#F0B90B']}
          start={{x: 1.2, y: 0}}
          end={{x: 0, y: 0}}
          style={styles.contactHeader}>
          <IconSupporterYellow height={scale(20)} width={scale(20)} />
          <CustomText
            style={{
              fontSize: SIZES.small,
              color: COLORS.black,
            }}
            textType="bold">
            {t('notification')}
          </CustomText>
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
                <CustomImage
                  source={animations.success}
                  style={{
                    height: scale(70),
                    width: scale(70),
                  }}
                  resizeMode="contain"
                />
              )}
              <CustomText
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: scale(20),
                }}
                textType="bold">
                {check?.mess}!
              </CustomText>
              {check?.status ? (
                <>
                  <CustomText
                    textType="bold"
                    style={{
                      alignSelf: 'center',
                      marginTop: scale(5),
                    }}>
                    +0.5 TBC
                  </CustomText>
                  <CustomText
                    style={{
                      alignSelf: 'center',
                      marginTop: scale(5),
                    }}>
                    Congratulations on receiving TBC coin!
                  </CustomText>
                  <CustomText
                    style={{
                      alignSelf: 'center',
                      marginTop: scale(5),
                      paddingBottom: scale(20),
                      textAlign: 'center',
                      color: COLORS.textSub,
                    }}>
                    You will automatic transfer {'\n'} into booking history
                    screen in {'\n'} ... {countdown}s
                  </CustomText>
                </>
              ) : (
                <>
                  <CustomText
                    style={{
                      alignSelf: 'center',
                      marginTop: scale(5),
                      paddingBottom: scale(20),
                      textAlign: 'center',
                      color: COLORS.textSub,
                    }}>
                    Your transaction has been canceled due to {'\n'} an error
                    during the booking process.{'\n'}Please try again!
                  </CustomText>
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
