import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import CategoriesButton from './CategoriesButton';
import {useLanguage} from '../../../hooks/useLanguage';
import {IconAdd} from '../../../assets/icon/Icon';
import BoxItemProfile from './BoxItemProfile';
export default function Content() {
  const {t} = useLanguage();
  const navigation = useNavigation();
  const [viewpersonal, setViewpersonal] = useState(false);
  const [client, setClient] = useState(false);
  const toggleCheckBox = () => {
    // setCheck(prevCheck => !prevCheck);
  };
  const viewPersonal = () => {
    setViewpersonal(prevViewpersonal => !prevViewpersonal);
  };
  const viewClient = () => {
    setClient(prevClient => !prevClient);
  };
  const changePW = () => {
    navigation.navigate('ChangePasswordScreen');
  };
  const personalInformation = () => {
    navigation.navigate('InformationScreen');
  };
  const financial = () => {
    navigation.navigate('FinancialScreen');
  };
  const wishlist = () => {
    navigation.navigate('HomeWishListScreen');
  };
  const selectLanguage = () => {
    navigation.navigate('SelectLanguageScreen');
  };
  const AccountType = () => {
    navigation.navigate('RegisterAccountTypeScreen');
  };
  const FaceId = () => {};
  const priceList = () => {
    navigation.navigate('PriceListScreen');
  };
  const customerManagement = () => {
    navigation.navigate('CustomerManagementScreen');
  };
  const managingTradeFloor = () => {
    navigation.navigate('TradingFloorScreen');
  };
  const seeTheNews = () => {
    navigation.navigate('NewsSavedScreen');
  };
  const postManagement = () => {
    navigation.navigate('PostManagementScreen');
  };
  const CustomersBuy = () => {
    navigation.navigate('CustomersBuyScreen');
  };
  const CustomersRent = () => {
    navigation.navigate('CustomersRentScreen');
  };
  const gotoHome = () => {
    navigation.navigate('BottomTab');
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.black}}>
              {t('regular_member')}
            </CustomText>
          </View>
          <View>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.black}}>
              {t('accumulated_points')}:
            </CustomText>
            <CustomText
              textType="bold"
              style={{...styles.text1, color: COLORS.black}}>
              0.0 {t('point')}
            </CustomText>
            <View style={{flexDirection: 'row'}}>
              <CustomText
                textType="bold"
                style={{...styles.text, color: COLORS.black}}>
                {t('view_plot')}:
              </CustomText>
            </View>
            <View style={{flexDirection: 'row'}}>
              <CustomText
                textType="bold"
                style={{...styles.text, color: COLORS.black}}>
                {t('free_new')}:
              </CustomText>
            </View>
          </View>
          <View>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.white}}></CustomText>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.white}}></CustomText>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.black}}>
              0/3
            </CustomText>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.black}}>
              0/15
            </CustomText>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center', width: '90%'}}>
        <CategoriesButton
          title={t('view_personal')}
          onPress={viewPersonal}
          viewpersonal={viewpersonal}
          changePW={changePW}
          large={true}
          personalInformation={personalInformation}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <CategoriesButton
            title={t('see_the_news')}
            onPress={seeTheNews}
            small={true}
          />
          <CategoriesButton
            title={t('post_management')}
            onPress={postManagement}
            small={true}
            style={{marginLeft: scale(15)}}
          />
        </View>

        <CategoriesButton
          title={t('financial_management')}
          onPress={financial}
          large={true}
        />
        {/* <BoxItemProfile
          title={t('financial_management')}
          subTitle={t('financial_management')}
          onPress={financial}
          Icon={IconAdd}
        /> */}
        <CategoriesButton
          title={t('select_language')}
          onPress={selectLanguage}
          large={true}
        />
        <CategoriesButton
          title={t('become_shome_partner')}
          onPress={AccountType}
          large={true}
        />
        <CategoriesButton
          title={t('customer_management')}
          onPress={customerManagement}
          large={true}
        />
        <CategoriesButton
          title={t('managing_trading')}
          onPress={managingTradeFloor}
          large={true}
        />
        <CategoriesButton
          title={t('wish_list')}
          onPress={wishlist}
          large={true}
        />
        <CategoriesButton
          title={t('client')}
          onPress={viewClient}
          large={true}
          client={client}
          customerBuy={CustomersBuy}
          customerRent={CustomersRent}
        />
        <CategoriesButton
          title={t('post_price')}
          onPress={priceList}
          large={true}
        />
        <CategoriesButton
          title={t('install_faceid')}
          onPress={FaceId}
          large={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    alignItems: 'center',
  },
  box: {
    backgroundColor: COLORS.white,
    height: scale(85),
    width: '90%',
    borderRadius: scale(5),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  text: {
    fontSize: SIZES.small,
  },
  text1: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(5),
    height: scale(48),
    justifyContent: 'center',
    marginTop: scale(40),
  },
  text2: {
    fontSize: SIZES.small,
  },
});
