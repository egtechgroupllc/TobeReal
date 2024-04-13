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

  return (
    <>
      {isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          onDismiss={() => onClose()}
          snapPoints={['40%']}
          titleIndicator="Chi tiếc giá"
          styleContent={{
            paddingHorizontal: scale(20),
            rowGap: scale(10),
          }}>
          <Row
            title={'Ngày'}
            value={`${getDate(data?.date?.selectedStartDate)} - ${formatDate(
              data?.date?.selectedEndDate,
              {
                dateStyle: 'dd MMM yyyy',
              },
            )}`}
          />
          <Row title={'Số phòng'} value={`${numRoom} phòng`} />
          <View
            style={{
              rowGap: scale(10),
              marginTop: scale(10),
            }}>
            <Row
              title={'Giá mỗi đêm'}
              value={formatPrice(data?.priceAverage * numRoom)}
              colorValue={COLORS.primary}
              textType="semiBold"
            />
            <Row
              title={`Tổng giá cho ${data?.date?.numNight} đêm`}
              value={formatPrice(priceAverage)}
            />
            <Row
              title={'Thuế và phí'}
              value={formatPrice(numRoom * data?.priceAverage)}
              textType="regular"
              colorValue={COLORS.text}
            />
          </View>
          <View
            style={{
              ...styles.row,
              ...styles.point,
            }}>
            <IconCoinPoint />
            <CustomText>
              Đặt chỗ và nhận ngay{' '}
              <CustomText textType="medium" style={{color: '#ff5e1f'}}>
                {formatPrice(numRoom * 3111, {
                  showCurrency: false,
                })}{' '}
                điểm
              </CustomText>
            </CustomText>
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
  },
});
