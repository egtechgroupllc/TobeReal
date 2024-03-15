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

export default function SelectCountry({control, name, onChange}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const [dataFromScreen, setDataFromScreen] = useState(null);

  // useEffect(() => {
  //   if (dataFromScreen && onChange) {
  //     onChange(dataFromScreen);
  //   }
  // }, [dataFromScreen, onChange]);

  return (
    <>
      <View style={styles.wrapper}>
        <CustomText style={{color: COLORS.black}}>{t('country')}</CustomText>

        <CustomInput
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'CountryScreen',
              params: {
                onGoBack: data => {
                  setDataFromScreen(data);
                },
                country: dataFromScreen,
              },
            });
          }}
          defaultValue={dataFromScreen?.name}
          control={control}
          name={name}
          placeholder="USA"
          rules={requireField(t('this_field_required'))}
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
          country={dataFromScreen}
          onChange={value => {
            onChange({
              ...dataFromScreen,
              province: value,
            });
            // setDataFromScreen(prev => ({
            //   ...prev,
            //   province: value,
            // }));
          }}
        />
      )}
    </>
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
