import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import CategoriesButton from '../../components/CategoriesButton';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
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
  const DepositWithdraw = () => {
    navigation.navigate('DepositWithdrawScreen');
  };
  const onPress = () => {};
  const notify = () => {};
  return (
    <View style={styles.container}>
      <Header
        goback={true}
        subHeading={t('financial_management')}
        noti={true}
        onPress={goBack}
        notify={notify}
      />
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={DepositWithdraw}>
          <View
            // colors={COLORS.backgroundLinear}
            // start={{x: 0, y: 0}}
            // end={{x: 1, y: 0}}
            style={styles.button1}>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.white}}>
              {t('deposit')}
            </CustomText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={DepositWithdraw}>
          <View
            // colors={['#FFFFFF', '#FFC702']}
            // start={{x: 0, y: 0}}
            // end={{x: 1, y: 0}}
            style={{...styles.button1, marginLeft: scale(20)}}>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.white}}>
              {t('withdraw')}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: scale(30),
          columnGap: scale(30),
        }}>
        <LinearGradient
          colors={COLORS.profileLinear}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.box1}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <CustomText
                textType="bold"
                style={{...styles.text1, color: COLORS.white}}>
                {t('balance')}
              </CustomText>
              <CustomText
                textType="bold"
                style={{
                  ...styles.text1,
                  color: COLORS.white,
                  alignSelf: 'center',
                }}>
                0$
              </CustomText>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={COLORS.profileLinear}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.box1}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <CustomText
                textType="bold"
                style={{...styles.text1, color: COLORS.white}}>
                {t('bonus')}
              </CustomText>
              <CustomText
                textType="bold"
                style={{
                  ...styles.text1,
                  color: COLORS.white,
                  alignSelf: 'center',
                }}>
                0$
              </CustomText>
            </View>
          </View>
        </LinearGradient>
      </View>

      <LinearGradient
        colors={COLORS.profileLinear}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{...styles.box, marginTop: scale(15)}}>
        <View style={{alignItems: 'center'}}>
          <CustomText
            textType="bold"
            style={{...styles.text1, color: COLORS.white}}>
            {t('gift_account')}
          </CustomText>
          <CustomText
            textType="bold"
            style={{...styles.text1, color: COLORS.white, alignSelf: 'center'}}>
            0$
          </CustomText>
        </View>
      </LinearGradient>
      <CategoriesButton
        title={t('reward_membership')}
        onPress={onPress}
        large={true}
        style={{marginTop: scale(10)}}
      />
      <TouchableOpacity style={{width: '45%', alignSelf: 'center'}}>
        <LinearGradient
          colors={['#7D0D6A', '#E80274']}
          start={{x: 1.5, y: 0}}
          end={{x: 0, y: 0}}
          style={{...styles.button}}>
          <CustomText
            textType="bold"
            style={{...styles.text0, color: COLORS.white}}>
            {t('upgrade_account')}
          </CustomText>
        </LinearGradient>
      </TouchableOpacity>
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
  },
  text1: {
    fontSize: SIZES.medium,
    color: '#F0B90B',
  },
  text2: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(25),
    width: '100%',
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
  },
  button1: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(25),
    width: scale(104),
    justifyContent: 'center',
    marginTop: scale(20),
    borderWidth: scale(1),
    borderColor: COLORS.white,
  },
  box: {
    backgroundColor: '#EEEEEE',
    height: scale(91),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  box1: {
    backgroundColor: '#EEEEEE',
    height: scale(91),
    flex: 1,
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
});
