import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomImage, CustomText, MainWrapper} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import {COLORS, images, scale, SHADOW, SIZES} from '../../assets/constants';
import {IconNext} from '../../assets/icon/Icon';
import FaucetPoint from './ContentHelpCenter/FaucetPoint';
import {useNavigation} from '@react-navigation/native';

export default function HelpCenterScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const data = [
    {
      id: 1,
      title: t('how_to_faucet_points'),
      contentKey: 'faucetPoint',
    },
    {
      id: 2,
      title: t('how_to_post_news'),
      contentKey: 'postNews',
    },
    {
      id: 3,
      title: t('how_to_swap_voucher_and_booking'),
      contentKey: 'swapVoucher',
    },
    {
      id: 4,
      title: t('how_to_complete_task_receive_rewards'),
      contentKey: 'completeTask',
    },
  ];
  return (
    <MainWrapper headerTitle={t('help_center')} scrollEnabled={false}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <CustomImage
          source={images.help_center}
          style={{
            width: '100%',
            height: scale(200),
            backgroundColor: COLORS.pioBox,
          }}
          resizeMode="stretch"
        />
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: scale(15),
            minHeight: scale(50),
            width: '95%',
            position: 'absolute',
            top: scale(150),
            zIndex: 999,
            ...SHADOW,
            borderWidth: scale(1),
            borderColor: COLORS.grey,
            padding: scale(15),
            rowGap: scale(10),
          }}>
          {data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{rowGap: scale(10)}}
                onPress={() => {
                  navigate('NavigationProfile', {
                    screen: 'HelpCenterContentScreen',
                    params: item,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <CustomText
                    style={{fontSize: SIZES.medium, flex: 0.9}}
                    numberOfLines={2}
                    textType="regular">
                    {item?.title}
                  </CustomText>
                  <IconNext
                    width={scale(15)}
                    height={scale(15)}
                    fill={COLORS.blue}
                  />
                </View>
                {index !== data.length - 1 && (
                  <View
                    style={{
                      width: '100%',
                      height: scale(1),
                      backgroundColor: COLORS.grey,
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
