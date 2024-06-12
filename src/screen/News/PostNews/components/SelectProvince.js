/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, scale} from '../../../../assets/constants';
import {IconError, IconRight} from '../../../../assets/icon/Icon';
import {CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField} from '../../../../utils/validate';
import {Controller, useForm} from 'react-hook-form';

export default function SelectProvince({
  onSelect,
  defaultValue,
  control,
  name = 'province_id',
  rules,
  country,
  setValue,
  watch = () => {},
}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const [dataFromScreen, setDataFromScreen] = useState(country || null);
  const form = useForm();

  const onGoBack = (value, onChange) => {
    if (value) {
      onChange(value?.id);
      onSelect && onSelect(value);
      setDataFromScreen(value);
    }
  };

  useEffect(() => {
    if (country?.geoname_id !== dataFromScreen?.parent) {
      setDataFromScreen(null);
      setValue(name, null);
    }
  }, [dataFromScreen, country]);
  useEffect(() => {
    if (watch('province')) {
      setDataFromScreen(watch('province'));
      setValue(name, watch('province')?.id);
    }
  }, [watch('province')]);

  return (
    <Controller
      defaultValue={defaultValue}
      control={control || form.control}
      rules={rules || requireField(t('this_field_required'))}
      name={name}
      render={({field: {onChange}, fieldState: {error}}) => {
        return (
          <View style={styles.wrapper}>
            <CustomText style={{color: COLORS.black}}>
              {t('province_city')}
            </CustomText>

            <View
              style={{
                width: '50%',
                rowGap: scale(6),
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigate('NoBottomTab', {
                    screen: 'CountryScreen',
                    params: {
                      onGoBack: data => {
                        onGoBack(data, onChange);
                      },

                      country: country,
                      province: dataFromScreen,
                      isProvince: true,
                    },
                  });
                }}
                style={[
                  error && {
                    borderColor: '#f0334b',
                    borderWidth: 1,
                  },
                  styles.content,
                ]}>
                <CustomText
                  style={
                    !dataFromScreen && {
                      color: '#aaa',
                    }
                  }>
                  {dataFromScreen?.name || t('province_city')}
                </CustomText>
                <IconRight />
              </TouchableOpacity>

              {error && (
                <View style={styles.errorBox}>
                  <IconError fill="#f0334b" />
                  <CustomText
                    style={{
                      color: '#f0334b',
                    }}>
                    {error.message}
                  </CustomText>
                </View>
              )}
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  content: {
    backgroundColor: '#E3E3E3',
    height: scale(38),
    paddingHorizontal: scale(10),
    borderRadius: scale(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorBox: {
    marginTop: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(6),
    marginRight: 'auto',
  },
});
