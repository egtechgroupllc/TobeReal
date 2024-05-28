import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, images, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import ButtonPost from '../../components/ButtonPost';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import {useQueryClient} from '@tanstack/react-query';
import {showMess} from '../../../../assets/constants/Helper';
export default function TabContent() {
  const {t} = useLanguage();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const profile = queryClient.getQueryData(['user', 'profile'])?.data;
  const handleCheckAccc = () => {
    if (profile?.role_id === 2 || profile?.role_id === undefined) {
      showMess(
        profile?.status === 'VERIFYING_BUSINESS'
          ? 'Your account is waiting for approval'
          : 'Please become Saveloka partner to post news',
        'error',
      );
      return false;
    }
    return true;
  };

  const goSell = () => {
    if (handleCheckAccc()) {
      navigation.navigate('SellScreen');
    }
  };
  const goLease = () => {
    if (handleCheckAccc()) {
      navigation.navigate('LeaseScreen');
    }
  };
  const goRentBuy = () => {
    if (handleCheckAccc()) {
      navigation.navigate('TourScreen');
    }
  };

  // const goSell = () => {
  //   navigation.navigate('SellScreen');
  // };
  // const goLease = () => {
  //   navigation.navigate('LeaseScreen');
  // };
  // const goRentBuy = () => {
  //   navigation.navigate('TourScreen');
  // };

  return (
    <View
      style={{
        width: '90%',
        alignItems: 'center',
        marginTop: scale(100),
        alignSelf: 'center',
      }}>
      <CustomText
        textType="bold"
        style={{...styles.text2, color: COLORS.white}}>
        {t('post')}
      </CustomText>
      <ButtonPost
        image={images.sell}
        style={{width: '100%'}}
        title={t('sell')}
        styleImage={{width: scale(39), height: scale(39)}}
        onPress={goSell}
      />
      <ButtonPost
        image={images.lease}
        style={{width: '100%'}}
        title={t('lease')}
        styleImage={{width: scale(39), height: scale(39)}}
        onPress={goLease}
      />

      <ButtonPost
        image={images.rentbuy}
        style={{width: '100%'}}
        title={t('tour_post')}
        styleImage={{width: scale(39), height: scale(39)}}
        onPress={goRentBuy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: scale(16),
    rowGap: scale(14),
  },
  category: {
    rowGap: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  text2: {
    fontSize: SIZES.xLarge,
  },
  button: {
    height: scale(50),
    width: '50%',
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: scale(2),
    backgroundColor: COLORS.grey,
    width: '95%',
    alignSelf: 'center',
    marginTop: scale(10),
    marginBottom: scale(20),
  },
});
