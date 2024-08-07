import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import ListMethodBank from './components/Deposit/ListAccountBank';
import {useQuery} from '@tanstack/react-query';
import {getListMethod} from '../../../Model/api/auth';
import {COLORS, scale} from '../../../assets/constants';
import ItemMethodDeposit from './components/ItemMethodDeposit';
import CustomText from '../../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../hooks/useLanguage';
import {showMess} from '../../../assets/constants/Helper';

export default function ListMethodBankScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();

  const {data, isLoading} = useQuery({
    queryKey: ['user', 'deposit', 'list-method'],
    queryFn: getListMethod,
  });

  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('deposit'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.box}>
      <CustomText textType="medium">{t('please_choose_one')}</CustomText>

      <FlatList
        data={data?.data || (isLoading && [1, 2, 3])}
        style={{
          height: '100%',
        }}
        contentContainerStyle={{
          rowGap: scale(10),
          paddingVertical: scale(10),
        }}
        renderItem={({item, index}) => {
          return (
            <ItemMethodDeposit
              key={index}
              data={item}
              onPress={() => {
                if (item?.method_deposit_items.length > 0) {
                  navigate('NoBottomTab', {
                    screen: 'DepositScreen',
                    params: item,
                  });
                } else {
                  showMess(t('comming_soon'), 'error');
                }
              }}
            />
          );
        }}
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
