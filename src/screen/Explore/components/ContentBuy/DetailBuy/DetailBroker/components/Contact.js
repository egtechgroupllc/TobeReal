import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  LogoLine,
  LogoMessageFB,
  LogoZalo,
} from '../../../../../../../assets/icon/Icon';
import {SIZES, scale} from '../../../../../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../../../../../components/CustomText';

export default function Contact() {
  const data = [
    {
      name: 'Zalo',
      icon: <LogoZalo />,
    },
    {
      name: 'Messenger',
      icon: <LogoMessageFB />,
    },
    {
      name: 'Line',
      icon: <LogoLine />,
    },
  ];
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity key={index}>
          <LinearGradient
            colors={['#FFE55A', '#F0B90B']}
            start={{x: 0, y: 1.5}}
            end={{x: 0, y: 0}}
            style={{...styles.button}}>
            <CustomText>{item.icon}</CustomText>
            <CustomText
              textType="bold"
              style={{
                fontSize: SIZES.xSmall,
              }}>
              {item.name}
            </CustomText>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: scale(10),
  },
  button: {
    columnGap: scale(10),
    borderRadius: scale(5),
    flexDirection: 'row',
    width: scale(110),
    height: scale(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
