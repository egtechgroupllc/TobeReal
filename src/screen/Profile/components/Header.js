import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {IconGoBack, IconNotification} from '../../../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
const funcFallBack = () => {};
export default function Header({
  children,
  subHeading,
  styleWrapper,
  onPress = funcFallBack,
  notify = funcFallBack,
  goback,
  noti,
  deposit,
}) {
  const [activeOption, setActiveOption] = useState('Deposit');

  const pressTab = option => {
    setActiveOption(option === activeOption ? 'Deposit' : option);
  };
  return (
    <View>
      <View style={[styleWrapper]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: Platform.OS == 'ios' ? scale(30) : scale(0),
            width: '95%',
          }}>
          {goback && (
            <TouchableOpacity
              onPress={onPress}
              style={{width: scale(30), height: scale(20)}}>
              <IconGoBack fill={COLORS.white} />
            </TouchableOpacity>
          )}
          <View style={{flexDirection: 'row'}}>
            <CustomText textType="semiBold" style={styles.text}>
              {subHeading}
            </CustomText>
            <CustomText textType="semiBold" style={styles.text}></CustomText>
          </View>
          {deposit && (
            <View
              style={{
                flexDirection: 'row',
                // borderWidth: scale(0.5),
                borderColor: '#0000004D',
                width: scale(224),
                height: scale(25),
                borderRadius: scale(5),
              }}>
              {['Deposit', 'Withdraw'].map(option => (
                <TouchableOpacity key={option} onPress={() => pressTab(option)}>
                  {activeOption === option ? (
                    <LinearGradient
                      colors={COLORS.backgroundLinear}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.buttonActive}>
                      <CustomText textType="bold" style={styles.text}>
                        {option}
                      </CustomText>
                    </LinearGradient>
                  ) : (
                    <View
                      style={{
                        ...styles.buttonActive,
                        borderWidth: scale(1),
                        borderColor: '#0000004D',
                      }}>
                      <CustomText textType="bold" style={styles.text}>
                        {option}
                      </CustomText>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {noti && (
            <TouchableOpacity onPress={notify}>
              <IconNotification fill={COLORS.white} />
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
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  textHeading: {
    fontSize: SIZES.xxLarge,
    color: 'black',
  },
  textSub: {
    fontSize: SIZES.xSmall,
  },
  buttonActive: {
    width: scale(112),
    height: scale(25),
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {},
});
