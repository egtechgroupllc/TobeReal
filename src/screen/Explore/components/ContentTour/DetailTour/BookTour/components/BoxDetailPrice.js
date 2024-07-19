import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomText} from '../../../../../../../components';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../../../utils/format';
import {useCountry} from '../../../../../../../hooks/useCountry';

export default function BoxDetailPrice({data, quantity, dataPriceTicket}) {
  const {t} = useLanguage();
  const {currency} = useCountry();
  const totalSum = quantity?.reduce((acc, currentItem) => {
    const totalPrice =
      currentItem?.quantity * dataPriceTicket * currentItem?.price_percent;
    return acc + totalPrice;
  }, 0);
  return (
    <View style={{width: '90%'}}>
      <CustomText
        textType="medium"
        style={{
          fontSize: SIZES.small,
          color: COLORS.black,
          marginTop: scale(10),
        }}>
        {t('price_detail')}:
      </CustomText>
      <View
        style={{
          ...styles.box,
          marginTop: scale(10),
          borderRadius: scale(5),
          minHeight: scale(30),
          paddingBottom: scale(0),
          marginBottom: scale(20),
        }}>
        {quantity?.map(item => {
          return (
            !!item && (
              <View style={{rowGap: scale(5)}}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <CustomText
                    textType="medium"
                    numberOfLines={3}
                    style={{
                      ...styles.text2,
                      color: COLORS.black,
                      marginTop: scale(10),
                    }}>
                    ({item?.quantity}) x {item?.name}
                  </CustomText>
                </View>
                <CustomText
                  textType="semiBold"
                  numberOfLines={3}
                  style={{
                    fontSize: SIZES.small,
                    color: COLORS.primary,
                  }}>
                  {t('price')}:{' '}
                  {formatPrice(
                    item?.quantity * dataPriceTicket * item?.price_percent,
                    {
                      currency: currency?.currency_code,
                    },
                  )}
                </CustomText>
              </View>
            )
          );
        })}

        <View
          style={{
            flexDirection: 'row',
            paddingBottom: scale(10),
            justifyContent: 'space-between',
          }}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.medium,
              color: COLORS.black,
              marginTop: scale(10),
            }}>
            {t('total')}:
          </CustomText>
          <CustomText
            textType="bold"
            style={{
              fontSize: SIZES.medium,
              color: COLORS.primary,
              marginTop: scale(10),
            }}>
            {formatPrice(totalSum, {
              currency: currency?.currency_code,
            })}
          </CustomText>
        </View>
        <CustomText
          textType="medium"
          style={{
            ...styles.text2,
            color: COLORS.black,
            paddingBottom: scale(10),
          }}>
          {t('include_addition')}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',

    paddingHorizontal: scale(20),
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
  },
});
