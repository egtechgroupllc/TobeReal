import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import CategoriesButton from '../../components/CategoriesButton';
import {IconSupporterYellow} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';

export default function Content() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const onPress = () => {};
  const notify = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={'See the news saved'}
        noti={true}
        onPress={goBack}
        notify={notify}></Header>
      <CategoriesButton
        title={'Benefits and annual account'}
        onPress={onPress}
        large={true}
        style={{marginTop: scale(10)}}
      />
      <CategoriesButton
        title={'Posting package'}
        onPress={onPress}
        large={true}
      />
      <CategoriesButton
        title={'Cost for each type of news'}
        onPress={onPress}
        large={true}
      />
      <CategoriesButton
        title={'Create an online trading platform'}
        onPress={onPress}
        large={true}
      />
      <View style={styles.box}>
        <View style={{marginTop: scale(10)}}>
          <IconSupporterYellow />
        </View>

        <View style={{marginLeft: scale(30), marginRight: scale(50)}}>
          <CustomText
            textType="bold"
            style={{...styles.text1, color: COLORS.black}}>
            Support
          </CustomText>
          <View style={{marginTop: scale(10)}}>
            <CustomText
              textType="medium"
              style={{...styles.text, color: COLORS.black}}>
              Hotline: ....
            </CustomText>
            <CustomText
              textType="medium"
              style={{...styles.text, color: COLORS.black}}>
              Mail: ....
            </CustomText>
            <CustomText
              textType="medium"
              style={{...styles.text, color: COLORS.black}}>
              WEBSITE: ....
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
  },
  text: {
    fontSize: SIZES.small,
  },
  text1: {
    fontSize: SIZES.small,
    color: '#F0B90B',
  },
  text2: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(40),
    width: scale(283),
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
  },
  box: {
    backgroundColor: '#EEEEEE',
    height: scale(85),
    width: scale(325),
    borderRadius: scale(5),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    paddingTop: scale(5),
    marginTop: scale(20),
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});
