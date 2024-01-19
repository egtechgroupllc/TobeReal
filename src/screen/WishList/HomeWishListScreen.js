import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import MainWrapper from '../../components/MainWrapper';
import {COLORS, SIZES, WIDTH, images, scale} from '../../assets/constants';
import CustomImage from '../../components/CustomImage';
import {CustomButton} from '../../components';
import {useNavigation} from '@react-navigation/native';
import EmptyData from '../../components/EmptyData';
import WishList from './WishList';

const data = [...Array(9)];
export default function HomeWishListScreen() {
  return (
    <MainWrapper>
      <ImageBackground
        source={images.wishList}
        resizeMode="stretch"
        style={styles.banner}>
        <CustomText
          isShadow
          shaDowColor="#F0B90B90"
          textType="bold"
          style={styles.textBanner}>
          Wishlist
        </CustomText>
      </ImageBackground>

      {data ? (
        <WishList data={data} />
      ) : (
        <EmptyData
          desc={'Your wishlist is empty'}
          textBtn={'FIND UNIT'}
          image={images.emptyWish}
        />
      )}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: scale(180),
    marginBottom: scale(20),
  },
  textBanner: {
    fontSize: SIZES.large,
    width: '50%',
    marginTop: scale(30),
    marginLeft: scale(20),
  },
});
