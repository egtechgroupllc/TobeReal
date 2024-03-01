import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {
  Avatar,
  IconCamera,
  IconEditProfile,
  IconGoBack,
  IconNotification,
} from '../../../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';

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
  return (
    <View style={{alignItems: 'center', marginTop: scale(-60)}}>
      <View style={{flexDirection: 'row'}}>
        <Avatar />
        {camera && (
          <TouchableOpacity
            onPress={onPressCamera}
            style={{marginTop: scale(100)}}>
            <IconCamera />
          </TouchableOpacity>
        )}
        {upgrade && (
          <TouchableOpacity onPress={onPressUpgrade}>
            <LinearGradient
              colors={['#F7E75A', '#FFC702']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}>
              <CustomText textType="bold" style={{...styles.text2}}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.grey,
    height: scale(188),
    marginTop: scale(10),
  },
  text: {
    fontSize: SIZES.medium,
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
    marginTop: scale(70),
    paddingHorizontal: scale(10),
    position: 'absolute',
  },
});
