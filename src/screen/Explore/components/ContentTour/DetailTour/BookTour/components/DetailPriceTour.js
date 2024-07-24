import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {IconDown} from '../../../../../../../assets/icon/Icon';
import {CustomText} from '../../../../../../../components';
import {formatPrice} from '../../../../../../../utils/format';
import {useCountry} from '../../../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../../../hooks/useLanguage';

export default function DetailPriceTour({
  data,
  priceVoucher,
  onChangeTotalPrice,
  isTour,
  dataPriceTicket,
}) {
  const {t} = useLanguage();

  const [isMorePrice, setIsMorePrice] = useState(false);
  const [checkPrice, setCheckPrice] = useState(false);
  const {currency} = useCountry();

  const voucher_discount = priceVoucher;
  const totalSumTour =
    isTour &&
    data?.listAddTicket.reduce((acc, currentItem) => {
      const totalPrice =
        currentItem?.quantity * dataPriceTicket * currentItem?.price_percent;
      return acc + totalPrice;
    }, 0);

  useEffect(() => {
    if (voucher_discount > totalSumTour) {
      setCheckPrice(true);
    } else {
      setCheckPrice(false);
    }
  }, [voucher_discount, checkPrice, totalSumTour]);

  useEffect(() => {
    totalSumTour && onChangeTotalPrice && onChangeTotalPrice(totalSumTour);
  }, [onChangeTotalPrice, totalSumTour]);

  return (
    <View style={{rowGap: scale(5)}}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setIsMorePrice(!isMorePrice);
        }}
        style={{
          paddingVertical: scale(10),
        }}>
        <Row
          isTour
          textTypeTitle={'bold'}
          title={t('total_price')}
          styleTitle={{
            fontSize: SIZES.medium,
          }}
          styleValue={{
            fontSize: SIZES.medium,
          }}
          priceVoucher={priceVoucher}
          valueSub={formatPrice(totalSumTour, {
            currency: currency?.currency_code,
          })}
          textDesc={`${t('the_remaining_balance_add')}: `}
          valueDesc={`+${formatPrice(voucher_discount - totalSumTour, {
            currency: currency?.currency_code,
          })}`}
          value={formatPrice(
            !checkPrice ? totalSumTour - voucher_discount || totalSumTour : 0,
            {
              currency: currency?.currency_code,
            },
          )}
          checkPrice={checkPrice}
          colorValue={COLORS.primary}
          textType="bold"
          Icon={
            <IconDown
              style={{
                transform: [
                  {
                    rotate: isMorePrice ? '0deg' : '180deg',
                  },
                ],
              }}
            />
          }
        />
      </TouchableOpacity>

      <Collapsible
        collapsed={!isMorePrice}
        style={{
          rowGap: scale(10),
        }}>
        <View style={styles.line} />

        {data?.listAddTicket?.map((item, index) => {
          return (
            <View style={{rowGap: scale(5)}} key={index}>
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
                  item?.quantity *
                    data?.dataPriceTicketEx *
                    item?.price_percent,
                  {
                    currency: currency?.currency_code,
                  },
                )}
              </CustomText>
              {!!priceVoucher && (
                <Row
                  title={t('apply_discount')}
                  value={`-${formatPrice(voucher_discount, {
                    currency: currency?.currency_code,
                  })}`}
                  textType="regular"
                  colorValue={COLORS.text}
                />
              )}
            </View>
          );
        })}
      </Collapsible>
    </View>
  );
}
const Row = ({
  title,
  styleTitle,
  styleValue,
  value,
  colorValue,
  textType,
  textTypeTitle,
  Icon,
  priceVoucher,
  valueSub,
  valueDesc,
  checkPrice,
  textDesc,
  textDescThird,
  isTour,
}) => {
  return (
    <View>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
        }}>
        <View>
          <CustomText
            textType={textTypeTitle}
            style={{fontSize: SIZES.xMedium, ...styleTitle}}>
            {title}
          </CustomText>
          {textDescThird && !isTour && (
            <CustomText
              textType={'medium'}
              style={{
                fontSize: SIZES.xSmall,
              }}>
              {textDescThird}
            </CustomText>
          )}
        </View>
        <View
          style={{
            ...styles.row,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            {!!priceVoucher && (
              <CustomText
                textType={'medium'}
                style={{
                  fontSize: SIZES.xMedium,
                  color: COLORS.textSub,
                  textDecorationLine: 'line-through',
                }}>
                {valueSub}
              </CustomText>
            )}
            <CustomText
              textType={textType || 'medium'}
              style={{
                fontSize: SIZES.xMedium,
                color: colorValue,
                ...styleValue,
              }}>
              {value}
            </CustomText>
          </View>

          {Icon}
        </View>
      </View>
      {!!priceVoucher && checkPrice && (
        <CustomText
          textType={'medium'}
          style={{
            fontSize: SIZES.xSmall,
            color: COLORS.black,
          }}>
          {textDesc}

          <CustomText
            textType={'medium'}
            style={{
              fontSize: SIZES.xSmall,
              color: 'green',
            }}>
            {valueDesc}
          </CustomText>
        </CustomText>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: scale(8),
  },
  line: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: -1,
    marginBottom: 0,
    overflow: 'hidden',
  },
});
