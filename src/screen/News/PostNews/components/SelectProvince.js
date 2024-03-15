import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../../assets/constants';
import {IconRight} from '../../../../assets/icon/Icon';
import {CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField} from '../../../../utils/validate';

export default function SelectProvince({onChange, country}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const [dataFromScreen, setDataFromScreen] = useState(null);

  useEffect(() => {
    if (country?.geoname_id !== dataFromScreen?.parent) {
      setDataFromScreen(null);
    }
  }, [country, dataFromScreen]);

  return (
    <View style={styles.wrapper}>
      <CustomText style={{color: COLORS.black}}>
        {t('province_city')}
      </CustomText>

      <CustomInput
        onPress={() => {
          navigate('NoBottomTab', {
            screen: 'CountryScreen',
            params: {
              onGoBack: data => {
                setDataFromScreen(data);
                onChange && onChange(data);
              },
              country: country,
              isProvince: true,
            },
          });
        }}
        defaultValue={dataFromScreen?.name}
        placeholder={t('province_city')}
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
