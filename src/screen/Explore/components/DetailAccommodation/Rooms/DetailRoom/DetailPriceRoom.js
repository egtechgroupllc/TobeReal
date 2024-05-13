import React, {useEffect, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {IconCoinPoint} from '../../../../../../assets/icon/Icon';
import BottomSheet from '../../../../../../components/BottomSheet';
import CustomText from '../../../../../../components/CustomText';
import {formatDate, formatPrice} from '../../../../../../utils/format';
import {getDate} from 'date-fns';

export default function DetailPriceRoom({isOpen, onClose, data, numRoom}) {
  const bottomSheetRef = useRef();

  useEffect(() => {
    isOpen && bottomSheetRef.current.open();
  }, [isOpen]);

  const priceAverage = useMemo(
    () => numRoom * data?.priceAverage * data?.date?.numNight,
    [numRoom, data?.date?.numNight, data?.priceAverage],
  );
  const feePrice = priceAverage * (11.8165 / 100);
  return (
    <>
      {isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          onDismiss={() => onClose()}
          snapPoints={['40%']}
          titleIndicator="Chi tiết giá"
          styleContent={{
            paddingHorizontal: scale(20),
            rowGap: scale(10),
          }}>
          <Row
            title={'Date'}
            value={`${getDate(data?.date?.selectedStartDate)} - ${formatDate(
              data?.date?.selectedEndDate,
              {
                dateStyle: 'dd MMM yyyy',
              },
            )}`}
          />
          <Row title={'Room number'} value={`${numRoom} room`} />
          <View
            style={{
              rowGap: scale(10),
              marginTop: scale(10),
            }}>
            <Row
              title={'Price per night'}
              value={formatPrice(data?.priceAverage * numRoom)}
              colorValue={COLORS.primary}
              textType="semiBold"
            />
            <Row
              title={`
              Total price for ${data?.date?.numNight} night`}
              value={formatPrice(priceAverage)}
            />
            <Row
              title={'Taxes and fees'}
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
              title={'Total price'}
              value={formatPrice(priceAverage + feePrice)}
              colorValue={COLORS.primary}
              textType="bold"
            />
            <View
              style={{
                ...styles.row,
              }}>
              <IconCoinPoint />
              <CustomText>
                Book and receive now{' '}
                <CustomText textType="medium" style={{color: '#ff5e1f'}}>
                  {formatPrice(numRoom * 3111, {
                    showCurrency: false,
                  })}{' '}
                  point
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
