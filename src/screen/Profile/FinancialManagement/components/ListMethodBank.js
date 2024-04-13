import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getListMethod} from '../../../../Model/api/auth';
import {COLORS, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import ItemMethodDeposit from './ItemMethodDeposit';

export default function ListMethodBank({setValue}) {
  const {data, isLoading} = useQuery({
    queryKey: ['user', 'deposit', 'list-method'],
    queryFn: getListMethod,
  });

  const [selectMethod, setSelectMethod] = useState();

  useEffect(() => {
    setSelectMethod(data?.data[0]);
  }, [data]);
  useEffect(() => {
    setValue('method_deposit_item_id', selectMethod?.id);
  }, [selectMethod]);

  return (
    <View style={styles.box}>
      <CustomText textType="medium">
        Bạn hãy chọn một trong các hình thức thanh toán dưới đây
      </CustomText>

      <View
        style={{
          rowGap: scale(10),
        }}>
        {data?.data?.map((item, index) => (
          <ItemMethodDeposit
            key={index}
            data={item}
            noLine={index === 0}
            isSelect={selectMethod?.id === item?.id}
            onPress={() => setSelectMethod(item)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(10),
    rowGap: scale(20),
  },
});
