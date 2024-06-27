import React, {useEffect, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {IconCoinPoint} from '../../../../../../assets/icon/Icon';
import BottomSheet from '../../../../../../components/BottomSheet';
import CustomText from '../../../../../../components/CustomText';
import {formatDate, formatPrice} from '../../../../../../utils/format';
import {getDate} from 'date-fns';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function DetailPriceRoom({isOpen, onClose, data, numRoom}) {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();

  useEffect(() => {
    isOpen && bottomSheetRef.current.open();
  }, [isOpen]);

  const priceAverage = useMemo(
    () => numRoom * data?.priceAverage * data?.date?.numNight,
    [numRoom, data?.date?.numNight, data?.priceAverage],
  );
  const feePrice = priceAverage * (11.8165 / 100);
  // const calculatePrice = () => {
  //   if (data?.percentDiscount && data?.percentDiscount === 1) {
  //     return priceAverage;
  //   } else {
  //     return priceAverage - priceAverage * data?.percentDiscount;
  //   }
  // };
  return (
    <>
      {isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          onDismiss={() => onClose()}
          snapPoints={['35%']}
          titleIndicator={t('price_detail')}
          styleContent={{
            paddingHorizontal: scale(20),
            rowGap: scale(10),
          }}>
          <Row
            title={t('date')}
            value={`${getDate(data?.date?.selectedStartDate)} - ${formatDate(
              data?.date?.selectedEndDate,
              {
                dateStyle: 'dd MMM yyyy',
              },
            )}`}
          />
          <Row title={t('room_number')} value={`${numRoom} ${t('room')}`} />
          <View
            style={{
              rowGap: scale(10),
              marginTop: scale(10),
            }}>
            <Row
              title={t('price_per_day')}
              value={formatPrice(
                priceAverage * data?.percentDiscount * numRoom,
              )}
              colorValue={COLORS.primary}
              textType="semiBold"
            />

            <Row
              title={t('taxes_and_fees')}
              value={formatPrice(feePrice)}
              textType="regular"
              colorValue={COLORS.text}
            />
          </View>
          <View
            style={{
              ...styles.point,
            }}>
            <Row
              title={t('total_price')}
              value={formatPrice(
                priceAverage * data?.percentDiscount + feePrice,
              )}
              colorValue={COLORS.primary}
              textType="bold"
            />
            <View
              style={{
                ...styles.row,
              }}>
              <IconCoinPoint />
              <CustomText>
                {t('book_and_receive')}{' '}
                <CustomText textType="medium" style={{color: '#ff5e1f'}}>
                  {formatPrice(numRoom * 10, {
                    showCurrency: false,
                  })}{' '}
                  {t('point')}
                </CustomText>
              </CustomText>
            </View>
          </View>
        </BottomSheet>
      )}
    </>
  );
}

const Row = ({title, value, colorValue, textType}) => {
  return (
    <View
      style={{
        ...styles.row,
        justifyContent: 'space-between',
      }}>
      <CustomText style={{fontSize: SIZES.xMedium}}>{title}</CustomText>
      <CustomText
        textType={textType || 'medium'}
        style={{fontSize: SIZES.xMedium, color: colorValue}}>
        {value}
      </CustomText>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: scale(8),
  },
  point: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: scale(10),
    rowGap: scale(10),
  },
});
