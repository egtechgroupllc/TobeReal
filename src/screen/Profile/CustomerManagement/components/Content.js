import {
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import { SIZES, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import CategoriesButton from '../../components/CategoriesButton';
import { useLanguage } from '../../../../hooks/useLanguage';

export default function Content() {
  const {t}= useLanguage()
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const listCustomers= () => {
    navigation.navigate("ListOfCustomersScreen")
  };
  const onPress= () => {
  };
  const notify = () => {
  };
  return (
    <View style={styles.container}>
          <Header goback={true} subHeading={t('customer_management')} noti={true} onPress={goBack} notify={notify}></Header>
          <CategoriesButton title={t('list_of_customers')} onPress={listCustomers} large={true} style={{marginTop:scale(10)}}/>
          <CategoriesButton title={t('customers_see_posting')} onPress={onPress} large={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    width:'90%'
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
    alignSelf:'center'
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});
