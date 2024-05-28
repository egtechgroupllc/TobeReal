import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import ListMethodBank from './components/Deposit/ListAccountBank';
import {useQuery} from '@tanstack/react-query';
import {getListMethod} from '../../../Model/api/auth';
import {COLORS, images, scale} from '../../../assets/constants';
import ItemMethodDeposit from './components/ItemMethodDeposit';
import CustomText from '../../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import MainWrapper from '../../../components/MainWrapper';
import CustomImage from '../../../components/CustomImage';

export default function ListMethodBankScreen() {
  const {setOptions, navigate} = useNavigation();

  const {data, isLoading} = useQuery({
    queryKey: ['user', 'deposit', 'list-method'],
    queryFn: getListMethod,
  });

  useLayoutEffect(() => {
    setOptions({
      headerTitle: 'Nạp tiền vào tài khoản',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper
      styleContent={{
        paddingHorizontal: scale(10),
        paddingVertical: scale(20),
        rowGap: scale(20),
      }}>
      <View style={styles.box}>
        <CustomImage
          source={images.logo1}
          style={{height: scale(120), marginBottom: scale(30)}}
          resizeMode="contain"
        />
        <CustomText textType="medium" style={{color: COLORS.white}}>
          Bạn hãy chọn một trong các hình thức thanh toán dưới đây
        </CustomText>

        <FlatList
          data={data?.data || (isLoading && [1, 2, 3])}
          style={{
            height: '100%',
          }}
          contentContainerStyle={{
            rowGap: scale(10),
            paddingVertical: scale(10),
          }}
          renderItem={({item, index}) => (
            <ItemMethodDeposit
              key={index}
              data={item}
              onPress={() =>
                navigate('NoBottomTab', {screen: 'DepositScreen', params: item})
              }
            />
          )}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: scale(10),
    rowGap: scale(10),
  },
});
