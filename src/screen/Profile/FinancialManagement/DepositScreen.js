/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {CustomInput} from '../../../components';
import CustomImage from '../../../components/CustomImage';
import MainWrapper from '../../../components/MainWrapper';
import {useLanguage} from '../../../hooks/useLanguage';
import {formatPrice} from '../../../utils/format';
import {
  requireField,
  validateMaxAmount,
  validateMinAmount,
} from '../../../utils/validate';
import FooterDeposit from './components/Deposit/FooterDeposit';
import ListAccountBank from './components/Deposit/ListAccountBank';
import ListPriceSelect from './components/Deposit/ListPriceSelect';
import {useCountry} from '../../../hooks/useCountry';
import CustomText from '../../../components/CustomText';

export default function DepositScreen({route}) {
  const {t} = useLanguage();

  const {setOptions} = useNavigation();
  const data = route?.params;
  const {control, handleSubmit, setValue, watch} = useForm();

  const [typeAccountBank, setTypeAccountBank] = useState();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: data?.name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {currency} = useCountry();

  const minPrice = 1 * currency?.exchange_rate;
  const maxPrice = 1000 * currency?.exchange_rate;

  return (
    <>
      <MainWrapper
        scrollEnabled={false}
        styleContent={{
          paddingHorizontal: scale(10),
          paddingVertical: scale(20),
          rowGap: scale(20),
        }}>
        <View style={styles.hear}>
          <View style={{flexDirection: 'row', columnGap: scale(10)}}>
            <View style={styles.boxImg}>
              <CustomImage
                source={typeAccountBank?.logo_url}
                style={{
                  width: '90%',
                  height: '90%',
                }}
                resizeMode="contain"
              />
            </View>
            <CustomInput
              label={t('enter_amount')}
              control={control}
              name="amount"
              styleTextLabel={{
                position: 'absolute',
                top: scale(-10),
                color: COLORS.black,
              }}
              enableFormatNum
              placeholder={`Enter min ${formatPrice(minPrice, {
                currency: currency?.currency_code,
              })} `}
              rules={[
                requireField(t('this_field_required')),
                validateMaxAmount(
                  `${t('maximum_amount')} ${formatPrice(maxPrice, {
                    currency: currency?.currency_code,
                  })}`,
                  maxPrice,
                ),
                validateMinAmount(
                  `${t('minimum_amount')} ${formatPrice(minPrice, {
                    currency: currency?.currency_code,
                  })}`,
                  minPrice,
                ),
              ]}
              style={styles.input}
              textType="bold"
              styleText={{
                fontSize: SIZES.large,
              }}
              styleWrapper={{
                flex: 1,
              }}
              maxLength={10}
            />
          </View>
          {/* <CustomText>
            Giá trị quy đổi (theo USD): {`${watch('amount')} USD `}={' '}
            {calculatedExchange()} {`${currency?.currency_code}`}
          </CustomText> */}
        </View>

        {/* <ListPriceSelect
          control={control}
          setValue={setValue}
          typeAccountBank={typeAccountBank}
        /> */}

        <ListAccountBank
          data={data}
          setValue={setValue}
          setTypeAccountBank={setTypeAccountBank}
        />
      </MainWrapper>
      <FooterDeposit
        handleSubmit={handleSubmit}
        watch={watch}
        // total={calculatedExchange()}
        // currency={currency?.currency_code}
        typeAccountBank={{
          ...typeAccountBank,
          bank_name: typeAccountBank?.bank_name || data?.name,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  hear: {
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(20),
    // flexDirection: 'row',
    // alignItems: 'center',
    rowGap: scale(10),
  },
  boxImg: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: scale(3),
    borderRadius: scale(6),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(40),
    aspectRatio: 1,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    borderRadius: 0,
  },
});
