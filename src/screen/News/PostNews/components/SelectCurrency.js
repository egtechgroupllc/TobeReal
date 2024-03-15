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

  // useEffect(() => {
  //   if (dataFromScreen && onChange) {
  //     onChange(dataFromScreen);
  //   }
  // }, [dataFromScreen, onChange]);

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
                onChange(data);

                setDataFromScreen(data);
              },
              currency: dataFromScreen,
            },
          });
        }}
        defaultValue={dataFromScreen?.currency_code}
        control={control}
        name={name}
        placeholder={t('Main Currency')}
        rules={requireField(t('this_field_required'))}
        style={{
          backgroundColor: '#E3E3E3',
          borderColor: '#E3E3E3',
          width: '50%',
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
    height: scale(40),
    width: '100%',
    justifyContent: 'space-between',
  },
});
