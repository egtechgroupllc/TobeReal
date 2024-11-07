import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES} from '~/assets/constants';
import {IconDown} from '~/assets/icon/Icon';
import {CText} from '~/components';
import {useCountry} from '~/hooks/useCountry';
import {useLanguage} from '~/hooks/useLanguage';
import {formatPrice} from '~/utils/format';
import {scale} from '~/utils/scale';

export default function DetailPrice({
  data,
  priceVoucher,
  onChangeTotalPrice,
  dataPriceTicket,
  quantitySelect,
}) {
  const {t} = useLanguage();
  const [isMorePrice, setIsMorePrice] = useState(false);
  const [checkPrice, setCheckPrice] = useState(false);
  const {currency} = useCountry();

  const voucher_discount = priceVoucher;
  const totalPrice = quantitySelect * data?.price;

  useEffect(() => {
    if (voucher_discount > totalPrice) {
      setCheckPrice(true);
    } else {
      setCheckPrice(false);
    }
  }, [voucher_discount, totalPrice, checkPrice]);

  useEffect(() => {
    totalPrice && onChangeTotalPrice && onChangeTotalPrice(totalPrice);
  }, [onChangeTotalPrice, totalPrice]);

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
          textTypeTitle={'bold'}
          title={t('total_price')}
          styleTitle={{
            fontSize: SIZES.medium,
          }}
          styleValue={{
            fontSize: SIZES.medium,
          }}
          priceVoucher={priceVoucher}
          valueDesc={`+${formatPrice(voucher_discount - totalPrice, {
            currency: currency?.currency_code,
          })}`}
          totalValue={formatPrice(totalPrice)}
          checkPrice={checkPrice}
          colorValue={COLORS.White}
          textType="bold"
          Icon={
            <IconDown
              fill={COLORS.White}
              style={{
                transform: [
                  {
                    rotate: !isMorePrice ? '0deg' : '180deg',
                  },
                ],
              }}
            />
          }
        />
      </TouchableOpacity>

      <Collapsible
        collapsed={isMorePrice}
        style={{
          rowGap: scale(10),
        }}>
        <View style={styles.line} />

        <Row
          text={data?.name}
          value={quantitySelect}
          colorValue={COLORS.White}
          textType="medium"
        />

        {!!priceVoucher && (
          <Row
            text={t('apply_discount')}
            value={`-${formatPrice(voucher_discount, {
              currency: currency?.currency_code,
            })}`}
            textType="regular"
            colorValue={COLORS.text}
          />
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
  totalValue,
  text,
}) => {
  return (
    <View>
      {title && (
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              flex: 1,
            }}>
            {Icon}

            <CText
              textType={textTypeTitle}
              style={{
                fontSize: SIZES.xMedium,
                ...styleTitle,
                color: COLORS.White,
              }}>
              {title}
            </CText>
          </View>

          <CText
            textType={textTypeTitle}
            numberOfLines={2}
            style={{
              fontSize: SIZES.xMedium,
              ...styleTitle,
              color: COLORS.White,
              maxWidth: scale(200),
            }}>
            {totalValue}
          </CText>
        </View>
      )}
      {!title && (
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(10),
          }}>
          <CText
            textType={textType || 'medium'}
            style={{
              fontSize: SIZES.xMedium,
              color: colorValue,
              ...styleValue,
            }}>
            {value}x
          </CText>
          <CText
            textType={textTypeTitle}
            style={{
              fontSize: SIZES.xMedium,
              ...styleTitle,
              color: COLORS.White,
              flex: 1,
            }}>
            {text}
          </CText>
        </View>
      )}
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
            <CText
              textType={'medium'}
              style={{
                fontSize: SIZES.xMedium,
                color: COLORS.textSub,
                textDecorationLine: 'line-through',
              }}>
              {valueSub}
            </CText>
          )}
        </View>
      </View>
      {!!priceVoucher && checkPrice && (
        <CText
          textType={'medium'}
          style={{
            fontSize: SIZES.xSmall,
            color: COLORS.White,
          }}>
          {textDesc}

          <CText
            textType={'medium'}
            style={{
              fontSize: SIZES.xSmall,
              color: 'green',
            }}>
            {valueDesc}
          </CText>
        </CText>
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
