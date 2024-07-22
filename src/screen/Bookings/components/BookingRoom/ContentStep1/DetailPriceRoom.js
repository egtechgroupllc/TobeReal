import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconDown} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {formatPrice} from '../../../../../utils/format';
import {useCountry} from '../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function DetailPriceRoom({
  data,
  priceVoucher,
  onChangeTotalPrice,
  isTour,
  dataPriceTicket,
}) {
  const {t} = useLanguage();
  const numRoom = data?.numRoomSelect;
  const numNight = data?.date?.numNight;
  const [isMorePrice, setIsMorePrice] = useState(false);
  const [checkPrice, setCheckPrice] = useState(false);
  const {currency} = useCountry();

  const calculatePrice = () => {
    // if (data?.percentDiscount && data?.percentDiscount === 1) {
    //   return priceAverage;
    // } else {
    //   return priceAverage - priceAverage * data?.percentDiscount;
    // }
    return data?.priceAverage * data?.percentDiscount;
  };
  const feePrice = calculatePrice() * 0;
  const price_per_day = calculatePrice();
  const total_price_per_day = calculatePrice() * numNight;
  const voucher_discount = priceVoucher;
  const totalPrice = calculatePrice() * numRoom * numNight + feePrice;
  const totalSumTour =
    isTour &&
    data?.listAddTicket.reduce((acc, currentItem) => {
      const totalPrice =
        currentItem?.quantity * dataPriceTicket * currentItem?.price_percent;
      return acc + totalPrice;
    }, 0);

  useEffect(() => {
    if (voucher_discount > (totalPrice || totalSumTour)) {
      setCheckPrice(true);
    } else {
      setCheckPrice(false);
    }
  }, [voucher_discount, totalPrice, checkPrice, totalSumTour]);

  useEffect(() => {
    totalPrice ||
      (totalSumTour &&
        onChangeTotalPrice &&
        onChangeTotalPrice(totalPrice || totalSumTour));
  }, [onChangeTotalPrice, totalPrice, totalSumTour]);

  const checkTotalPrice = () => {
    if (isTour) {
      return !checkPrice ? totalSumTour - voucher_discount || totalSumTour : 0;
    } else {
      return !checkPrice ? totalPrice - voucher_discount || totalPrice : 0;
    }
  };
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
          valueSub={formatPrice(!isTour ? totalPrice : totalSumTour, {
            currency: currency?.currency_code,
          })}
          textDescThird={`${numNight} ${t('day')}, ${numRoom} ${t('room')}`}
          textDesc={`${t('the_remaining_balance_add')}: `}
          valueDesc={`+${formatPrice(
            voucher_discount - (totalPrice || totalSumTour),
            {
              currency: currency?.currency_code,
            },
          )}`}
          value={formatPrice(checkTotalPrice(), {
            currency: currency?.currency_code,
          })}
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

        {!isTour ? (
          <>
            <Row title={t('room_number')} value={numRoom} />

            <Row
              title={t('price_per_day')}
              value={formatPrice(price_per_day, {
                currency: currency?.currency_code,
              })}
              colorValue={COLORS.black}
              textType="medium"
            />
            <Row
              title={`${t('total_price_for')} ${numNight} ${t('day')}`}
              value={formatPrice(total_price_per_day, {
                currency: currency?.currency_code,
              })}
              colorValue={COLORS.primary}
              textType="semiBold"
            />
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
            <Row
              title={t('taxes_and_fees')}
              value={formatPrice(feePrice, {
                currency: currency?.currency_code,
              })}
              textType="regular"
              colorValue={COLORS.text}
            />
          </>
        ) : (
          <>
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
          </>
        )}
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
