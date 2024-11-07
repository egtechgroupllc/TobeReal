import React, {memo, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ItemAccountBank from './ItemAccountBank';
import {useLanguage} from '~/hooks/useLanguage';
import {CText} from '~/components';
import {scale} from '~/utils/scale';
import {COLORS} from '~/assets/constants';

export default memo(function ListAccountBank({
  setValue,
  setTypeAccountBank,
  data,
}) {
  const [selectMethod, setSelectMethod] = useState();
  const {t} = useLanguage();

  useEffect(() => {
    setSelectMethod(data?.method_deposit_item[0]);
  }, [data]);

  useEffect(() => {
    setValue && setValue('method_deposit_id', selectMethod?.id);
    setTypeAccountBank(selectMethod);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMethod?.id]);
  return (
    <View style={styles.box}>
      <CText textType="bold" style={{color: COLORS.White}}>
        {t('please_choose_one')}
      </CText>

      <ScrollView
        style={{
          rowGap: scale(10),
          minHeight: scale(200),
        }}
        contentContainerStyle={{
          padding: scale(10),
        }}>
        {data?.method_deposit_item?.map((item, index) => (
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
    backgroundColor: COLORS.input,
    borderRadius: scale(10),
    padding: scale(10),
    rowGap: scale(20),
  },
});
