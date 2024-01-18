import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import CategoriesButton from '../../components/CategoriesButton';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../../components/CustomText';
export default function Content() {
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
        subHeading={'Financial management'}
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
          <LinearGradient
            colors={['#FFFFFF', '#FFC702']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button1}>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.black}}>
              Deposit
            </CustomText>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={['#FFFFFF', '#FFC702']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{...styles.button1, marginLeft: scale(20)}}>
            <CustomText
              textType="bold"
              style={{...styles.text, color: COLORS.black}}>
              Withdraw
            </CustomText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: scale(30),
          columnGap:scale(30),
          
        }}>
        <LinearGradient
          colors={['#FADD55', '#D88A00']}
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
                style={{...styles.text1, color: COLORS.black}}>
                Balance
              </CustomText>
              <CustomText
                textType="bold"
                style={{
                  ...styles.text1,
                  color: COLORS.black,
                  alignSelf: 'center',
                }}>
                0$
              </CustomText>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['#FADD55', '#D88A00']}
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
                style={{...styles.text1, color: COLORS.black}}>
                Bonus
              </CustomText>
              <CustomText
                textType="bold"
                style={{
                  ...styles.text1,
                  color: COLORS.black,
                  alignSelf: 'center',
                }}>
                0$
              </CustomText>
            </View>
          </View>
        </LinearGradient>
      </View>

      <LinearGradient
        colors={['#FADD55', '#D88A00']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{...styles.box, marginTop: scale(15)}}>
        <View style={{alignItems: 'center'}}>
          <CustomText
            textType="bold"
            style={{...styles.text1, color: COLORS.black}}>
            Gift account
          </CustomText>
          <CustomText
            textType="bold"
            style={{...styles.text1, color: COLORS.black, alignSelf: 'center'}}>
            0$
          </CustomText>
        </View>
      </LinearGradient>
      <CategoriesButton
        title={'Reward membership points'}
        onPress={onPress}
        large={true}
        style={{marginTop: scale(10)}}
      />
      <TouchableOpacity style={{width:'45%', alignSelf:'center'}}>
        <LinearGradient
          colors={['#F7E75A', '#FFC702']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{...styles.button}}>
          <CustomText
            textType="bold"
            style={{...styles.text0, color: COLORS.black}}>
            Upgrade account
          </CustomText>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.historyHeader}>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.black}}>
          STT
        </CustomText>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.black}}>
          Day
        </CustomText>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.black}}>
          Quantity
        </CustomText>
        <CustomText
          textType="medium"
          style={{...styles.text, color: COLORS.black}}>
          Status
        </CustomText>
      </View>
      <View style={{marginBottom: scale(50)}}>
        <View style={styles.historyBox}>
          <FlatList
            data={data}
            // horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View>
                <View
                  key={`${item?.id}`}
                  style={{
                    flexDirection: 'row',
                    marginTop: scale(20),
                    justifyContent: 'space-between',
                    alignItems:'center'
                  }}>
                  {item?.id && (
                    <View style={{width:scale(50), alignItems:'center', left:scale(10)}}>
                      <CustomText textType="medium" >
                        {item?.id}
                      </CustomText>
                    </View>
                  )}
                  {item?.date && (
                    <View style={{width:scale(100), alignItems:'center', right:(20)}}>
                      <CustomText textType="medium" >
                        {item?.date}
                      </CustomText>
                    </View>
                  )}
                  {item?.quantity && (
                    <View style={{width:scale(50),alignItems:'center',right:(35)}}>
                      <CustomText textType="medium" >
                        {item?.quantity}
                      </CustomText>
                    </View>
                  )}
                  {item?.status && (
                    <View style={{width:scale(50), alignItems:'center',right:(15)}}>
                      <CustomText textType="medium" >
                        {item?.status}
                      </CustomText>
                    </View>
                  )}
                </View>
                <View style={styles.line}></View>
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
    width:'90%',
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
    flex:1,
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    alignItems: 'center',
  },
  historyHeader: {
    flexDirection: 'row',
    height: scale(29),
    backgroundColor: COLORS.white,
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
    backgroundColor: '#EEEEEE',
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  line: {
    height: scale(2),
    backgroundColor: COLORS.grey,
    width:'95%',
    alignSelf:'center',
    marginTop:scale(10),
    marginBottom:scale(20)
  },
});