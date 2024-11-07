/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

import {COLORS, images, SIZES} from '~/assets/constants';
import {Button, CImage, CText, MainWrapper} from '~/components';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {formatPrice} from '~/utils/format';
import {scale} from '~/utils/scale';
import {
  requireField,
  validateMaxAmount,
  validateMinAmount,
} from '~/utils/validate';
import FooterDeposit from './components/Deposit/FooterDeposit';
import ListAccountBank from './components/Deposit/ListAccountBank';
import {useCountry} from '~/hooks/useCountry';
import {IconGoBack, IconHome} from '~/assets/icon/Icon';

export default function DepositScreen({route}) {
  const {t} = useLanguage();
  const {goBack, navigate} = useNavigation();
  const {setOptions} = useNavigation();
  const data = route?.params;
  const {control, handleSubmit, setValue, watch} = useForm();

  const [typeAccountBank, setTypeAccountBank] = useState();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: data?.name,
      headerRight: () => {
        return (
          <Button.Icon Icon={IconHome} onPress={() => navigate('Profile')} />
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {currency} = useCountry();
  const minPrice = 1 * currency?.exchange_rate;
  const maxPrice = 1000 * currency?.exchange_rate;

  return (
    <>
      <MainWrapper
        sourceImage={images.backgroundHome}
        scrollEnabled={false}
        noImgColor>
        <View style={styles.hear}>
          <CText style={{color: COLORS.White}}>{t('enter_amount')}</CText>
          <View style={{flexDirection: 'row', columnGap: scale(10)}}>
            <View style={styles.boxImg}>
              <CImage
                source={{uri: typeAccountBank?.logo}}
                style={{
                  width: '90%',
                  height: '90%',
                }}
                resizeMode="contain"
              />
            </View>
            <Input
              control={control}
              name="amount"
              enableFormatNum
              placeholder={`${t('enter_min')} ${formatPrice(minPrice, {
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
        data={data}
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
