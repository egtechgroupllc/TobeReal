import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomButton, CustomInput} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {
  Avatar,
  IconCamera,
  IconCopy,
  IconEditProfile,
  IconGoBack,
  IconNotification,
} from '../../../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
import {useLanguage} from '../../../hooks/useLanguage';
import CustomImage from '../../../components/CustomImage';

const funcFallBack = () => {};
export default function AvatarImage({
  onPressUpgrade = funcFallBack,
  onPressChangeName = funcFallBack,
  changeName,
  upgrade,
  name,
  camera,
  onPressCamera,
}) {
  const {t} = useLanguage();
  const copy = () => {};
  return (
    <View style={{alignItems: 'center', marginTop: scale(60)}}>
      <View style={{flexDirection: 'row'}}>
        <Avatar />
        {camera && (
          <TouchableOpacity
            onPress={onPressCamera}
            style={{marginTop: scale(100)}}>
            <IconCamera fill={COLORS.white} />
          </TouchableOpacity>
        )}
        {upgrade && (
          <TouchableOpacity onPress={onPressUpgrade}>
            <LinearGradient
              colors={COLORS.backgroundLinear}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}>
              <CustomText
                textType="bold"
                style={{...styles.text2, color: COLORS.white}}>
                Upgrade account
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomText textType="bold" style={styles.text}>
          {name}
        </CustomText>
        {changeName && (
          <TouchableOpacity
            onPress={onPressChangeName}
            style={{marginLeft: scale(10)}}>
            <IconEditProfile />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          ...styles.box,
          height: scale(100),
          marginTop: scale(20),
          marginBottom: scale(-15),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: scale(20),
          }}>
          <View style={{justifyContent: 'center', rowGap: scale(10)}}>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.white}}>
              {t('My identification address')}
            </CustomText>
            <CustomInput
              editable={false}
              placeholder={t('54rteyueytd645ew67fegd')}
              placeholderTextColor={COLORS.white}
              style={{
                borderRadius: scale(5),
                borderWidth: scale(0),
                height: scale(30),
              }}
              password
              iconLeft={IconCopy}
              onPressIconLeft={copy}
            />
          </View>
          <CustomImage
            source={images.qrcode}
            style={{width: scale(75), height: scale(75)}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.transparentGrey,
    height: scale(85),
    width: '90%',
    borderRadius: scale(5),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  wrapper: {
    backgroundColor: COLORS.grey,
    height: scale(188),
    marginTop: scale(10),
  },
  text: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  textHeading: {
    fontSize: SIZES.xxLarge,
    color: 'black',
  },
  textSub: {
    fontSize: SIZES.xSmall,
  },
  text2: {
    fontSize: SIZES.small,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(5),
    height: scale(25),
    justifyContent: 'center',
    marginTop: scale(120),
    paddingHorizontal: scale(10),
    position: 'absolute',
  },
});
