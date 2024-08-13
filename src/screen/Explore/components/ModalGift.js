import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import {IconSupporterYellow} from '../../../assets/icon/Icon';
import {CustomButton, CustomImage, CustomText} from '../../../components';
import {useLanguage} from '../../../hooks/useLanguage';
import {useQuery} from '@tanstack/react-query';
import {getListConstant} from '../../../Model/api/common';
import Modal from 'react-native-modal';
import {getBalanceWallet} from '../../../Model/api/wallet';

export default function ModalGift({
  open,
  onPressReceive,
  dataP,
  onPressWallet,
  onPressCancel,
  dataCheckin,
  amountTOBE,
}) {
  const {t} = useLanguage();
  // const {data} = useQuery({
  //   queryKey: ['common', 'list-constant'],
  //   queryFn: getListConstant,
  // });

  return (
    <Modal isVisible={open} animationIn={'fadeIn'} animationOut={'fadeOut'}>
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
          <CustomImage
            source={images.iconCongrat}
            style={{
              width: scale(70),
              height: scale(70),
            }}
          />
          <CustomText
            style={{
              fontSize: SIZES.xMedium,
              width: scale(300),
              textAlign: 'center',
            }}>
            {t('congratulate_on_receiving_daily_reward')}
          </CustomText>

          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
              width: scale(200),
              textAlign: 'center',
            }}>
            + {dataCheckin?.data?.amount} TOBE AIRDROP (TBC)
          </CustomText>
          {!dataP?.data?.wallet_address ? (
            <>
              <CustomText
                style={{
                  fontSize: SIZES.small,
                  width: scale(300),
                  textAlign: 'center',
                }}>
                {t('please_create_wallet_to_received_reward')}!
              </CustomText>
              <View style={{flexDirection: 'row', columnGap: scale(10)}}>
                <CustomButton
                  text={t('skip')}
                  styleText={{color: COLORS.black}}
                  buttonType="small"
                  styleWrapper={{width: scale(120)}}
                  onPress={onPressCancel}
                  style={{
                    backgroundColor: COLORS.white,
                    borderWidth: scale(1),
                    borderColor: COLORS.grey,
                  }}
                />
                <CustomButton
                  text={t('create_wallet')}
                  buttonType="small"
                  styleWrapper={{width: scale(120)}}
                  onPress={onPressWallet}
                />
              </View>
            </>
          ) : (
            <>
              {amountTOBE?.balance > 0.1 ? (
                <View style={{flexDirection: 'row', columnGap: scale(10)}}>
                  <CustomButton
                    text={t('skip')}
                    styleText={{color: COLORS.black}}
                    buttonType="small"
                    styleWrapper={{width: scale(120)}}
                    onPress={onPressCancel}
                    style={{
                      backgroundColor: COLORS.white,
                      borderWidth: scale(1),
                      borderColor: COLORS.grey,
                    }}
                  />
                  <CustomButton
                    text={t('receive_now')}
                    buttonType="small"
                    styleWrapper={{width: scale(120)}}
                    onPress={onPressReceive}
                  />
                </View>
              ) : (
                <View style={{alignItems: 'center', rowGap: scale(10)}}>
                  <CustomText
                    style={{
                      fontSize: SIZES.small,
                      width: scale(300),
                      textAlign: 'center',
                    }}>
                    {t('your_balance_fee_gas_not_enough')}!
                  </CustomText>
                  <View style={{flexDirection: 'row', columnGap: scale(10)}}>
                    <CustomButton
                      text={t('skip')}
                      styleText={{color: COLORS.black}}
                      buttonType="small"
                      styleWrapper={{width: scale(120)}}
                      onPress={onPressCancel}
                      style={{
                        backgroundColor: COLORS.white,
                        borderWidth: scale(1),
                        borderColor: COLORS.grey,
                      }}
                    />
                    <CustomButton
                      text={t('Faucet now')}
                      buttonType="small"
                      styleWrapper={{width: scale(120)}}
                      onPress={() =>
                        Linking.openURL('https://faucet.tobescan.com/faucet')
                      }
                    />
                  </View>
                </View>
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
    minHeight: scale(150),
    paddingVertical: scale(20),
    rowGap: scale(10),
  },
});
