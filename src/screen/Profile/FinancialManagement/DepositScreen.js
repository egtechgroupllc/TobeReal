import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
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

  return (
    <>
      <MainWrapper
        scrollEnabled={false}
        noImgColor
        backgroundColor="#eee"
        styleContent={{
          paddingHorizontal: scale(10),
          paddingVertical: scale(20),
        }}>
        <View style={styles.hear}>
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
            label="Nhập số tiền bạn muốn nạp"
            control={control}
            name="amount"
            styleTextLabel={{
              position: 'absolute',
              top: scale(-10),
            }}
            enableFormatNum
            placeholder={`Nhâp tối thiểu ${formatPrice(20000)} `}
            rules={[
              requireField(t('this_field_required')),
              validateMaxAmount(
                `Số tiền tối đa là ${formatPrice(20000000)}`,
                20000000,
              ),
              validateMinAmount(
                `Số tiền tối thiểu là ${formatPrice(20000)}`,
                20000,
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

        <ListPriceSelect
          control={control}
          setValue={setValue}
          typeAccountBank={typeAccountBank}
        />

        <ListAccountBank
          data={data}
          setValue={setValue}
          setTypeAccountBank={setTypeAccountBank}
        />
      </MainWrapper>
      <FooterDeposit
        handleSubmit={handleSubmit}
        watch={watch}
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
    flexDirection: 'row',
    // alignItems: 'center',
    columnGap: scale(10),
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
