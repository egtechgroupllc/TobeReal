import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Button} from '../../../components';
import CText from '../../../components/CText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {IconGoBack, IconNotification} from '../../../assets/icon/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const funcFallBack = () => {};
export default function HeaderAvatar({
  children,
  heading,
  subHeading,
  styleWrapper,
  onPress = funcFallBack,
  notify = funcFallBack,
  goback,
  noti,
  style,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.head, {paddingTop: insets.top}, style]}>
        <CText textType="bold" style={styles.textHeading}>
          {heading}
        </CText>
      </View>
      <View style={[styles.wrapper, styleWrapper]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scale(10),
            marginHorizontal: scale(10),
          }}>
          {goback && (
            <TouchableOpacity onPress={onPress}>
              <IconGoBack />
            </TouchableOpacity>
          )}
          <CText textType="semiBold" style={styles.text}>
            {subHeading}
          </CText>
          {noti && (
            <TouchableOpacity onPress={notify}>
              <IconNotification />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    // marginTop: scale(50),
    marginLeft: scale(40),
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
  content: {},
});
