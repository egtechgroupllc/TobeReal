import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import CategoriesButton from '../../../components/CategoriesButton';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../../../components/CustomText';
import {CustomInput} from '../../../../../components';
import {IconAdd} from '../../../../../assets/icon/Icon';
import Button from '../../../components/Button';
import {useLanguage} from '../../../../../hooks/useLanguage';
export default function Content() {
  const {t} = useLanguage();
  const data = [
    {
      id: 1,
      date: '30/10/2023',
      quantity: 5,
      status: 'done',
    },
    {
      id: 2,
      date: '30/10/2023',
      quantity: 5,
      status: 'done',
    },
    {
      id: 3,
      date: '30/10/2023',
      quantity: 5,
      status: 'done',
    },
    {
      id: 4,
      date: '30/10/2023',
      quantity: 5,
      status: 'done',
    },
  ];
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const Submit = () => {};
  const AddBank = () => {
    navigation.navigate('AddBankScreen');
  };
  const onPress = () => {};
  const notify = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        deposit={true}
        noti={true}
        onPress={goBack}
        notify={notify}
      />

      <LinearGradient
        colors={COLORS.profileLinear}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{...styles.box, marginTop: scale(25)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <CustomText
            textType="bold"
            style={{...styles.text, color: COLORS.white}}>
            Logo
          </CustomText> */}
          <View style={{marginLeft: scale(30)}}>
            <CustomText
              textType="medium"
              style={{...styles.text1, color: COLORS.white}}>
              {t('wallet')} NOW Travel
            </CustomText>
            <CustomText
              textType="bold"
              style={{...styles.text1, color: COLORS.white}}>
              0$
            </CustomText>
          </View>
        </View>
      </LinearGradient>
      <View style={{marginTop: scale(20)}}>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.white}}>
          {t('amount_deposit')}
        </CustomText>
        <CustomInput
          placeholder="0$"
          style={{
            marginBottom: scale(25),
            height: scale(36),
            backgroundColor: '#E3E3E3',
            marginTop: scale(10),
            borderRadius: scale(5),
          }}
        />
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.white}}>
          {t('from_money_source')}
        </CustomText>
      </View>

      <View
        // colors={COLORS.backgroundLinear}
        // start={{x: 0, y: 0}}
        // end={{x: 1, y: 0}}
        style={{
          borderRadius: scale(8),
          marginTop: scale(20),
          backgroundColor: COLORS.transparentGrey,
        }}>
        <TouchableOpacity style={styles.addbank} onPress={AddBank}>
          <View style={{marginLeft: scale(20)}}>
            <IconAdd fill={COLORS.white} />
          </View>

          <CustomText
            textType="bold"
            style={{...styles.text, marginLeft: scale(20)}}>
            {t('add_bank')}
          </CustomText>
        </TouchableOpacity>
      </View>
      <Button title={t('submit')} onPress={Submit} />
      <View style={styles.historyHeader}>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.white}}>
          STT
        </CustomText>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.white}}>
          {t('day')}
        </CustomText>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.white}}>
          {t('quantity')}
        </CustomText>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.white}}>
          {t('status')}
        </CustomText>
      </View>
      <View style={{marginBottom: scale(50)}}>
        <View style={styles.historyBox}>
          <FlatList
            data={data}
            // horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <View>
                <View
                  key={`${item?.id}`}
                  style={{
                    flexDirection: 'row',
                    marginTop: scale(20),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: scale(15),
                  }}>
                  {item?.id && (
                    <View
                      style={{
                        width: scale(50),
                        alignItems: 'center',
                        left: scale(10),
                      }}>
                      <CustomText
                        textType="medium"
                        style={{color: COLORS.white}}>
                        {item?.id}
                      </CustomText>
                    </View>
                  )}
                  {item?.date && (
                    <View
                      style={{
                        width: scale(100),
                        alignItems: 'center',
                        right: 20,
                      }}>
                      <CustomText
                        textType="medium"
                        style={{color: COLORS.white}}>
                        {item?.date}
                      </CustomText>
                    </View>
                  )}
                  {item?.quantity && (
                    <View
                      style={{
                        width: scale(50),
                        alignItems: 'center',
                        right: 35,
                      }}>
                      <CustomText
                        textType="medium"
                        style={{color: COLORS.white}}>
                        {item?.quantity}
                      </CustomText>
                    </View>
                  )}
                  {item?.status && (
                    <View
                      style={{
                        width: scale(50),
                        alignItems: 'center',
                        right: 15,
                      }}>
                      <CustomText
                        textType="medium"
                        style={{color: COLORS.white}}>
                        {item?.status}
                      </CustomText>
                    </View>
                  )}
                </View>
                {data.length - 1 !== index && <View style={styles.line}></View>}
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: scale(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  text0: {
    fontSize: SIZES.xSmall,
  },
  text: {
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  text1: {
    fontSize: SIZES.medium,
    color: '#F0B90B',
  },
  text2: {
    fontSize: SIZES.medium,
  },
  button1: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(25),
    width: scale(104),
    justifyContent: 'center',
    marginTop: scale(20),
  },
  box: {
    backgroundColor: '#EEEEEE',
    height: scale(61),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  box1: {
    backgroundColor: '#EEEEEE',
    height: scale(91),
    width: scale(156),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    alignItems: 'center',
  },
  historyHeader: {
    flexDirection: 'row',
    height: scale(29),
    backgroundColor: COLORS.transparentGrey,
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginTop: scale(30),
  },
  historyBox: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: '#FFFFFF1A',
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  line: {
    height: scale(2),
    backgroundColor: COLORS.grey,
    width: '95%',
    alignSelf: 'center',
    marginTop: scale(10),
  },
  addbank: {
    height: scale(48),
    width: '90%',
    borderRadius: scale(8),
    alignItems: 'center',
    // justifyContent:'center',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(40),
    width: scale(283),
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
