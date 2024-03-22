import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../../assets/constants';
import {IconRight} from '../../../../assets/icon/Icon';
import {CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField} from '../../../../utils/validate';
import SelectProvince from './SelectProvince';

export default function SelectCountry({control, onChange}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const [dataFromScreen, setDataFromScreen] = useState(null);

  return (
    <View
      style={{
        width: '100%',
        rowGap: scale(10),
      }}>
      <View style={styles.wrapper}>
        <CustomText style={{color: COLORS.black}}>{t('country')}</CustomText>

        <CustomInput
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'CountryScreen',
              params: {
                onGoBack: data => {
                  if (data) {
                    setDataFromScreen(data);
                    onChange && onChange(data);
                  }
                },
                country: dataFromScreen,
              },
            });
          }}
          defaultValue={dataFromScreen?.name}
          control={control}
          name="country_id"
          rules={requireField(t('this_field_required'))}
          placeholder="USA"
          style={{
            backgroundColor: '#E3E3E3',
            borderColor: '#E3E3E3',
            width: '60%',
          }}
          iconRight={() => <IconRight />}
        />
      </View>

      {dataFromScreen && (
        <SelectProvince
          control={control}
          country={dataFromScreen}
          onChange={value => {
            onChange({
              ...dataFromScreen,
              province: value,
            });
          }}
        />
      )}
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
