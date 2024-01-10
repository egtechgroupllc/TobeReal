import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {IconGoBack, IconNotification} from '../../../assets/icon/Icon';

const funcFallBack = () => {};
export default function Header({
  children,
  subHeading,
  styleWrapper,
  onPress = funcFallBack,
  notify = funcFallBack,
  goback,
  noti,
}) {
  return (
    <View>
      <View style={[styleWrapper]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scale(10),
          }}>
          {goback && (
            <TouchableOpacity onPress={onPress}>
              <IconGoBack />
            </TouchableOpacity>
          )}
            <View style={{flexDirection:'row'}}>
              <CustomText textType="semiBold" style={styles.text}>
                {subHeading}
              </CustomText>
              <CustomText textType="semiBold" style={styles.text}></CustomText>
            </View>
          {noti && (
            <TouchableOpacity onPress={notify}>
              <IconNotification fill={'#000000'}/>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: COLORS.grey,
    height: scale(188),
    marginTop: scale(10),
  },
  text: {
    fontSize: SIZES.medium,
    color: COLORS.black,
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
