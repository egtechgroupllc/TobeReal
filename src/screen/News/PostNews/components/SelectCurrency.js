/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, scale} from '../../../../assets/constants';
import {IconError, IconRight} from '../../../../assets/icon/Icon';
import {CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField} from '../../../../utils/validate';
import {Controller, useController, useForm} from 'react-hook-form';
import {useCountry} from '../../../../hooks/useCountry';

export default function SelectCurrency({
  control,
  name,
  rules,
  defaultValue,
  onSelect,
  watch = () => {},
}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {currency} = useCountry();
  // const [dataFromScreen, setDataFromScreen] = useState(null);
  // const form = useForm();
  // const onGoBack = (value, onChange) => {
  //   if (value) {
  //     onChange(value?.id);
  //     onSelect && onSelect(value);
  //     setDataFromScreen(value);
  //   }
  // };

  // useEffect(() => {
  //   if (watch('currency')) {
  //     setDataFromScreen(watch('currency'));
  //   }
  // }, [watch('currency')]);

  return (
    <Controller
      defaultValue={currency?.id}
      control={control}
      // rules={rules || requireField(t('this_field_required'))}
      name={name || 'currency_id'}
      render={({
        field: {onChange, value},

        fieldState: {error},
      }) => {
        return (
          <View style={styles.wrapper}>
            <CustomText style={{color: COLORS.black}}>
              {t('main_currency')}
            </CustomText>

            <View
              style={{
                width: '50%',
                rowGap: scale(6),
              }}>
              <View
                activeOpacity={0.7}
                // onPress={() => {
                //   navigate('NoBottomTab', {
                //     screen: 'CurrencyScreen',
                //     params: {
                //       onGoBack: data => {
                //         onGoBack(data, onChange);
                //       },

                //       currency: dataFromScreen,
                //     },
                //   });
                // }}
                style={[
                  error && {
                    borderColor: '#f0334b',
                    borderWidth: 1,
                  },
                  styles.content,
                ]}>
                {/* <CustomText
                  style={
                    !dataFromScreen && {
                      color: '#aaa',
                    }
                  }>
                  {dataFromScreen?.currency_code || t('main_currency')}
                </CustomText> */}
                <CustomText
                  style={{
                    color: COLORS.black,
                  }}>
                  {currency?.currency_code || t('main_currency')}
                </CustomText>
                <IconRight />
              </View>

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
