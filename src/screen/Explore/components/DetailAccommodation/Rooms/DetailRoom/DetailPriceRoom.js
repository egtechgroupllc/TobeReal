import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {IconCoinPoint} from '../../../../../../assets/icon/Icon';
import BottomSheet from '../../../../../../components/BottomSheet';
import CustomText from '../../../../../../components/CustomText';
import {formatPrice} from '../../../../../../utils/format';

export default function DetailPriceRoom({isOpen, onClose}) {
  const bottomSheetRef = useRef();

  useEffect(() => {
    !isOpen && bottomSheetRef.current.open();
  }, [isOpen]);
  return (
    <>
      {!isOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          onDismiss={() => onClose()}
          snapPoints={['40%']}
          titleIndicator="Chi tiếc giá"
          styleContent={{
            paddingHorizontal: scale(20),
            rowGap: scale(10),
          }}>
          <Row title={'Ngày'} value={'12 - 13 tháng 4 2024'} />
          <Row title={'Số phòng'} value={'1 phòng'} />
          <View
            style={{
              rowGap: scale(10),
              marginTop: scale(10),
            }}>
            <Row
              title={'Giá mỗi đêm'}
              value={formatPrice(12312231)}
              colorValue={COLORS.primary}
              textType="semiBold"
            />
            <Row
              title={'Tổng giá cho 5 đem'}
              value={formatPrice(5 * 12312231)}
            />
            <Row
              title={'Thuế và phí'}
              value={formatPrice(5 * 12312231)}
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
                {formatPrice(5 * 12312231)} điểm
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
