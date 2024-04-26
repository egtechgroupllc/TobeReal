import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import ListMethodBank from './components/Deposit/ListAccountBank';
import {useQuery} from '@tanstack/react-query';
import {getListMethod} from '../../../Model/api/auth';
import {COLORS, scale} from '../../../assets/constants';
import ItemMethodDeposit from './components/ItemMethodDeposit';
import CustomText from '../../../components/CustomText';
import {useNavigation} from '@react-navigation/native';

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
    <View style={styles.box}>
      <CustomText textType="medium">
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
  );
}

const styles = StyleSheet.create({
  box: {
    padding: scale(10),
    rowGap: scale(10),
  },
});
