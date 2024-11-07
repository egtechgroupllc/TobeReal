import React, {useEffect, useMemo} from 'react';
import {
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useAuthentication} from '~/hooks/useAuthentication';
import {useLanguage} from '~/hooks/useLanguage';
import {CImage, CText} from '~/components';
import {COLORS, images} from '~/assets/constants';
import {IconChat, IconHandShake, IconNotification} from '~/assets/icon/Icon';
import {scale} from '~/utils/scale';
import {showMess} from '~/assets/constants/Helper';

export default function Header() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {token} = useAuthentication();
  const queryClient = useQueryClient();

  // const {
  //   data: dataNotify,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ['notification', 'list-notification', {pageParam: 1, limit: 1}],
  //   queryFn: () => getListNotification({pageParam: 1, limit: 1}),
  //   enabled: !!token,
  //   refetchInterval: 5000,
  // });
  const goCooperate = () => {
    if (!!token) {
      navigate('NoBottomTab', {
        screen: 'ManageCooperateScreen',
      });
    } else {
      navigate('NoBottomTab', {
        screen: 'VerifyLoginScreen',
      });
    }
  };
  const goNotify = () => {
    // if (!!token) {
    //   navigate('NoBottomTab', {
    //     screen: 'NotifyScreen',
    //   });
    // } else {
    //   navigate('NavigationAuth', {
    //     screen: 'LoginScreen',
    //   });
    // }
    showMess('Comming soon!', 'error');
  };
  const goChatGroup = () => {
    // if (!!token) {
    //   navigate('NoBottomTab', {
    //     screen: 'ListChatGroupScreen',
    //   });
    // } else {
    //   navigate('NavigationAuth', {
    //     screen: 'LoginScreen',
    //   });
    // }
    showMess('Comming soon!', 'error');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.boxHeight}>
          <CImage
            source={images.logoTobeCare}
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
          <TouchableOpacity onPress={goCooperate}>
            <IconHandShake />
            {/* {data?.data?.rows[0]?.number_message_not_seen > 0 && (
              <View style={styles.dot} />
            )} */}
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={goChatGroup}>
            <IconChat fill={COLORS.White} />
            {data?.data?.rows[0]?.number_message_not_seen > 0 && (
              <View style={styles.dot} />
            )}
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={goNotify}>
            <IconNotification fill={COLORS.White} />
            {dataNotify?.data?.number_not_seen > 0 && (
              <View
                style={{
                  ...styles.dot,
                  minHeight: scale(20),
                  minWidth: scale(20),
                  top: scale(-10),
                  right: scale(-10),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 0,
                }}>
                <CText
                  textType="bold"
                  style={{
                    fontSize: SIZES.xSmall,
                    color: COLORS.white,
                  }}>
                  {dataNotify?.data?.number_not_seen > 99
                    ? '99+'
                    : dataNotify?.data?.number_not_seen}
                </CText>
              </View>
            )}
          </TouchableOpacity> */}
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
    paddingHorizontal: scale(5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxHeight: {
    height: scale(40),
    width: scale(150),
    paddingHorizontal: scale(10),
  },
  img: {
    height: scale(30),
    width: scale(30),
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
    top: scale(-2),
    right: scale(-2),
    borderWidth: scale(2),
    borderColor: COLORS.whiteLight,
  },
});
