import React from 'react';
import {
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, images, scale} from '../../../assets/constants';
import {
  IconChat,
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

export default function Header() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const goNotify = () => {
    // navigate('NoBottomTab', {
    //   screen: 'NotifyScreen',
    // });
  };
  const goChatGroup = () => {
    navigate('NoBottomTab', {
      screen: 'ListChatGroupScreen',
    });
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
          <TouchableOpacity onPress={goChatGroup}>
            <IconChat fill={COLORS.white} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={goNotify}>
            <IconNotification fill={COLORS.white} />
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
});
