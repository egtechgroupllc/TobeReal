/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {Controller, useForm} from 'react-hook-form';
import {useLanguage} from '~/hooks/useLanguage';
import {requireField} from '~/utils/validate';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {IconError, IconRight} from '~/assets/icon/Icon';
import CText from '../CText';

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
      onChange(value?.province_id);
      onSelect && onSelect(value);
      setDataFromScreen(value);
    }
  };

  useEffect(() => {
    if (country?.geonameId !== dataFromScreen?.province_parent) {
      setDataFromScreen(null);
      setValue(name, null);
    }
  }, [dataFromScreen, country]);

  useEffect(() => {
    if (watch('province')) {
      setDataFromScreen(watch('province'));
      setValue(name, watch('province')?.province_id);
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
          <View
            style={{
              width: '100%',
              rowGap: scale(10),
            }}>
            <View style={styles.wrapper}>
              <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
                {t('province_city')}
              </CText>

              <View
                style={{
                  width: '50%',
                  rowGap: scale(6),
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    navigate('NavigationAuth', {
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
                  <CText style={{color: COLORS.White}}>
                    {dataFromScreen?.province_name || t('province_city')}
                  </CText>
                  <IconRight fill={COLORS.White} />
                </TouchableOpacity>

                {error && (
                  <View style={styles.errorBox}>
                    <IconError fill="#f0334b" />
                    <CText
                      style={{
                        color: '#f0334b',
                      }}>
                      {error.message}
                    </CText>
                  </View>
                )}
              </View>
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
    backgroundColor: COLORS.input,
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
