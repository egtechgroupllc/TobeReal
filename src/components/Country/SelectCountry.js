/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useCountry} from '../../../../hooks/useCountry';
import {useLanguage} from '~/hooks/useLanguage';
import {requireField} from '~/utils/validate';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {IconError, IconRight} from '~/assets/icon/Icon';
import SelectProvince from './SelectProvince';
import CText from '../CText';

export default function SelectCountry({
  control,
  name,
  rules,
  defaultValue,
  disabled,
  setValue = () => {},
  onSelect = () => {},
  watch = () => {},
}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const [dataFromScreen, setDataFromScreen] = useState(null);

  const form = useForm();
  useEffect(() => {
    if (watch('country')) {
      setDataFromScreen(watch('country'));
    }
  }, [watch('country')]);

  const onGoBack = (value, onChange) => {
    if (value) {
      onChange(value?.id);
      onSelect && onSelect(value);
      setDataFromScreen(value);
    }
  };

  return (
    <Controller
      // defaultValue={defaultValue}
      control={control || form.control}
      rules={rules || requireField(t('this_field_required'))}
      name={name || 'country_id'}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        return (
          <View
            style={{
              width: '100%',
              rowGap: scale(10),
            }}>
            <View style={styles.wrapper}>
              <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
                {t('country')}
              </CText>

              <View
                style={{
                  width: '50%',
                  rowGap: scale(6),
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    navigate('CountryScreen', {
                      onGoBack: data => {
                        onGoBack(data, onChange);
                      },

                      country: dataFromScreen,
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
                    {dataFromScreen?.name || t('country')}
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

            {dataFromScreen && (
              <SelectProvince
                control={control}
                setValue={setValue}
                watch={watch}
                country={dataFromScreen}
                onSelect={data => {
                  onSelect({
                    ...dataFromScreen,
                    province: data,
                  });
                }}
              />
            )}
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
