import React, {useEffect, useMemo} from 'react';
import {
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SHADOW, images, scale} from '../../../assets/constants';
import {
  IconChat,
  IconGift,
  IconNotification,
  IconSearch,
  LogoLine,
  LogoMessageFB,
  LogoWhatApp,
  LogoZalo,
} from '../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../components';
import CustomImage from '../../../components/CustomImage';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../hooks/useLanguage';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getListChatGroup} from '../../../Model/api/common';
import {useAuthentication} from '../../../hooks/useAuthentication';
import {useLoading} from '../../../hooks/useLoading';
import {getDailyCheckinInfo} from '../../../Model/api/auth';
import {getBalanceWallet} from '../../../Model/api/wallet';

const listSocial = [
  {
    icon: LogoZalo,
    link: 'https://www.facebook.com/',
  },
  {
    icon: LogoWhatApp,
    link: 'https://www.facebook.com/',
  },
  {
    icon: LogoLine,
    link: 'https://www.facebook.com/',
  },
  {
    icon: LogoMessageFB,
    link: 'https://www.facebook.com/',
  },
];

export default function Header({dataCheckin, dataP, amountTOBE}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {token} = useAuthentication();
  const queryClient = useQueryClient();
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['chat', 'my-list-chat-group'],
    queryFn: () => getListChatGroup(),
    enabled: !!token,
    refetchInterval: 5000,
  });

  const goNotify = () => {
    if (!!token) {
      navigate('NoBottomTab', {
        screen: 'NotifyScreen',
      });
    } else {
      navigate('NavigationAuth', {
        screen: 'LoginScreen',
      });
    }
  };
  const goChatGroup = () => {
    if (!!token) {
      navigate('NoBottomTab', {
        screen: 'ListChatGroupScreen',
      });
    } else {
      navigate('NavigationAuth', {
        screen: 'LoginScreen',
      });
    }
  };
  const goDailyCheckin = () => {
    if (token) {
      navigate('NoBottomTab', {
        screen: 'DailyCheckinScreen',
        params: {dataCheckin, amountTOBE},
      });
    } else {
      navigate('NavigationAuth', {
        screen: 'LoginScreen',
      });
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.boxHeight}>
          <CustomImage
            source={images.logoSaveloka}
            resizeMode="contain"
            style={styles.img}
          />
        </View>
        {/* <View
          style={{
            flex: 1,
            height: scale(33),
          }}>
          <CustomInput
            iconLeft={IconSearch}
            styleIcon={{color: COLORS.white}}
            placeholderTextColor={COLORS.white}
            placeholder={t('find_accommodation')}
            editable={false}
            onPress={() =>
              navigate('NoBottomTab', {
                screen: 'HomeSearchAccommodScreen',
              })
            }
            style={{borderRadius: scale(20), borderColor: COLORS.white}}
          />
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(15),
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={goDailyCheckin}>
            <IconGift fill={COLORS.white} />
            {(dataCheckin?.data?.can_check_in ||
              (token && !dataP?.data?.wallet_address)) && (
              <View style={styles.dot} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={goChatGroup}>
            <IconChat fill={COLORS.white} />
            {data?.data?.rows[0]?.number_message_not_seen > 0 && (
              <View style={styles.dot} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={goNotify}>
            <IconNotification fill={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
      {/* 
      <View style={styles.content}>
        <CustomButton
          text={t('we_are_always_here')}
          buttonType="medium"
          styleText={{
            textTransform: 'uppercase',
            textType: 'bold',
          }}
        />

        <ImageBackground
          resizeMode="contain"
          source={images.contactHelp}
          style={styles.socialContain}>
          <View style={styles.social}>
            {listSocial.map((social, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => Linking.openURL(social.link)}>
                <social.icon
                  style={{
                    width: scale(30),
                    height: scale(30),
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ImageBackground>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignSelf: 'center',
    rowGap: scale(20),
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: scale(20),
    height: scale(56),
  },
  boxHeight: {
    height: scale(55),
    width: '40%',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  socialContain: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(160),
    width: '100%',
  },
  social: {
    flexDirection: 'row',
    columnGap: scale(15),
    rowGap: scale(12),
    width: scale(176),
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  dot: {
    height: scale(10),
    width: scale(10),
    backgroundColor: 'red',
    borderRadius: scale(99),
    position: 'absolute',
    alignSelf: 'flex-end',
    top: scale(-2),
    right: scale(-2),
    borderWidth: scale(2),
    borderColor: COLORS.white70,
  },
});
