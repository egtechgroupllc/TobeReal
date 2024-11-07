import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {useLanguage} from '~/hooks/useLanguage';
import Collapsible from 'react-native-collapsible';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {CText} from '~/components';
import PaymentMethods from '~/screens/Products/PaymentProduct/components/ContentStep2/PaymentMethods';
import {formatPrice} from '~/utils/format';
import CheckBox from '~/components/CheckBox';
import ApplyVoucher from '~/screens/Products/PaymentProduct/components/ContentStep2/Voucher/components/ApplyVoucher';
import {useCountry} from '~/hooks/useCountry';

export default function Payment({
  errors,
  watch,
  data,
  onChange,
  onChangeBalance,
  typePayment,
  onCheckVoucher,
  dataVoucher,
  onPriceExamination,
  priceVoucher,
}) {
  const {t} = useLanguage();
  const [valuePrice, setValuePrice] = useState(data?.examination_price[0]);
  const [isView, setView] = useState(false);
  const [checkPrice, setCheckPrice] = useState(false);
  const {currency} = useCountry();
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  const TextRow = ({text, value, style, styleText, styleValue}) => {
    return (
      <View style={[style || styles.row]}>
        <CText style={[styles.text, styleText]}>{text}:</CText>
        <CText style={[styles.value, styleValue]} textType="bold">
          {value}
        </CText>
      </View>
    );
  };
  useEffect(() => {
    onPriceExamination && onPriceExamination(valuePrice?.price);
  }, [valuePrice]);
  useEffect(() => {
    if (priceVoucher > valuePrice?.price) {
      setCheckPrice(true);
    } else {
      setCheckPrice(false);
    }
  }, [priceVoucher, valuePrice?.price, checkPrice]);

  return (
    <View>
      <ButtonTabValidate
        title={t('detail_examination_price')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        // arrKeywords={arrKeywords}
      />
      <Collapsible collapsed={!isView} style={styles.view}>
        {data?.examination_price?.map(item => {
          return (
            <TouchableOpacity
              onPress={() => setValuePrice(item)}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', columnGap: scale(5)}}>
                <CheckBox
                  textBold
                  isRadio
                  // text={item}
                  isChecked={valuePrice?.id === item?.id}
                  onPress={() => setValuePrice(item)}
                  textStyle={{
                    fontSize: SIZES.xMedium,
                  }}
                />
                <CText style={{color: COLORS.White}} textType="bold">
                  {item?.name}
                </CText>
              </View>
              <CText style={{color: COLORS.White}} textType="bold">
                {formatPrice(item?.price)}
              </CText>
            </TouchableOpacity>
          );
        })}
        <PaymentMethods
          onChange={onChange}
          onChangeBalance={onChangeBalance}
          styleContent={{
            borderWidth: scale(1),
            borderColor: COLORS.input,
            borderRadius: scale(10),
          }}
        />
        {typePayment === 'VOUCHER' && (
          <ApplyVoucher
            // checkDiffrentCountry={checkDiffrentCountry}
            // countryRate={countryRate}
            // isTour={isTour}
            data={data}
            onCheckVoucher={onCheckVoucher}
            dataVoucher={dataVoucher}
          />
        )}
        <TextRow
          text={t('examination_price')}
          value={formatPrice(valuePrice?.price)}
        />
        {dataVoucher && (
          <TextRow
            text={t('voucher_applied').toUpperCase()}
            value={formatPrice(priceVoucher)}
            styleText={{color: COLORS.cyan}}
            styleValue={{color: COLORS.cyan}}
          />
        )}
        <TextRow text={t('examination_fee')} value={t('free')} />
        <View style={styles.line} />

        <TextRow
          text={t('total_price')}
          value={formatPrice(
            !checkPrice
              ? valuePrice?.price - priceVoucher || valuePrice?.price
              : 0,
            {
              currency: currency?.currency_code,
            },
          )}
          styleText={{fontSize: SIZES.medium}}
          styleValue={{fontSize: SIZES.medium, color: COLORS.cyan}}
        />
        {typePayment === 'VOUCHER' && priceVoucher > valuePrice?.price ? (
          <CText style={{color: COLORS.BlueSky, fontSize: SIZES.small}}>
            {t('the_remaining_balance_add')} +{' '}
            {formatPrice(priceVoucher - valuePrice?.price, {
              currency: currency?.currency_code,
            })}
          </CText>
        ) : typePayment === 'VOUCHER' && priceVoucher < valuePrice?.price ? (
          <CText style={{color: COLORS.OrangeSemi, fontSize: SIZES.small}}>
            {t('balance_voucher_not_enough')}
          </CText>
        ) : typePayment === 'VOUCHER' && priceVoucher === valuePrice?.price ? (
          <CText></CText>
        ) : (
          <CText></CText>
        )}
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.input,
    borderRadius: scale(5),
    rowGap: scale(15),
    padding: scale(15),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.White,
  },
  value: {
    color: COLORS.White,
  },
  line: {
    height: scale(0.5),
    width: 'auto',
    backgroundColor: COLORS.White + '60',
  },
});
