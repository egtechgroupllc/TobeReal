import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {COLORS, SIZES, WIDTH, images, scale} from '../assets/constants';
import {CustomButton} from '.';
import {useNavigation} from '@react-navigation/native';

export default function EmptyData({navigation, desc, textBtn, image}) {
  const {navigate} = useNavigation();

  return (
    <View style={styles.wrapper}>
      <CustomImage
        source={image || images.emptyData}
        resizeMode="contain"
        style={styles.img}
      />
      <CustomText
        textType="bold"
        style={{
          color: COLORS.primary,
          fontSize: SIZES.medium,
        }}>
        {desc || 'Empty Data'}
      </CustomText>

      {textBtn && (
        <CustomButton
          buttonType="medium"
          text={textBtn}
          styleText={{
            textType: 'semiBold',
          }}
          style={{
            minWidth: '40%',
          }}
          onPress={() => navigate(navigation || 'Explore')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // marginTop: WIDTH.heightScreen / 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    rowGap: scale(10),
    flex: 1,
  },
  img: {
    width: scale(220),
    height: scale(220),
  },
});
