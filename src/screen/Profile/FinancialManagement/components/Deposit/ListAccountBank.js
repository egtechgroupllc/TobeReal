import React, {memo, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import ItemAccountBank from './ItemAccountBank';

export default memo(function ListAccountBank({
  setValue,
  setTypeAccountBank,
  data,
}) {
  const [selectMethod, setSelectMethod] = useState();

  useEffect(() => {
    setSelectMethod(data?.method_deposit_items[0]);
  }, [data]);

  useEffect(() => {
    setValue && setValue('method_deposit_item_id', selectMethod?.id);
    setTypeAccountBank(selectMethod);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMethod?.id]);

  return (
    <View style={styles.box}>
      <CustomText textType="medium">
        Please choose one of the payment methods below
      </CustomText>

      <ScrollView
        style={{
          rowGap: scale(10),
          minHeight: scale(200),
        }}
        contentContainerStyle={{
          padding: scale(10),
        }}>
        {data?.method_deposit_items?.map((item, index) => (
          <ItemAccountBank
            key={index}
            data={item}
            noLine={index === 0}
            isSelect={selectMethod?.id === item?.id}
            onPress={() => setSelectMethod(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(10),
    rowGap: scale(20),
  },
});
