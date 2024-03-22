import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {CustomInput} from '../../../../components';
import {requireField} from '../../../../utils/validate';
import {IconDown, IconNext, IconRight} from '../../../../assets/icon/Icon';
import {useLanguage} from '../../../../hooks/useLanguage';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function SelectCurrency({control, name, onChange}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const [dataFromScreen, setDataFromScreen] = useState(null);

  return (
    <View style={styles.wrapper}>
      <CustomText style={{color: COLORS.black}}>
        {t('Main Currency')}
      </CustomText>

      <CustomInput
        onPress={() => {
          navigate('NoBottomTab', {
            screen: 'CurrencyScreen',
            params: {
              onGoBack: data => {
                if (data) {
                  onChange(data);
                  setDataFromScreen(data);
                }
              },
              currency: dataFromScreen,
            },
          });
        }}
        defaultValue={dataFromScreen?.currency_code}
        control={control}
        name={'main_currency'}
        rules={requireField(t('this_field_required'))}
        placeholder={t('Main Currency')}
        style={{
          backgroundColor: '#E3E3E3',
          borderColor: '#E3E3E3',
          width: '60%',
        }}
        iconRight={() => <IconRight />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
});
