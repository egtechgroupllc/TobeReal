import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CustomButton} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import CustomText from '../../../../../../components/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {formatPrice} from '../../../../../../utils/format';
import {IconCoinPoint, IconNext} from '../../../../../../assets/icon/Icon';
import BottomSheet from '../../../../../../components/BottomSheet';
import DetailPriceRoom from './DetailPriceRoom';

export default function BookRoom() {
  const {t} = useLanguage();
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.wrapper, {paddingBottom: insets.bottom + scale(6)}]}
      activeOpacity={0.7}
      onPress={() => {
        setIsOpen(!isOpen);
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(6),
          alignItems: 'center',
        }}>
        <IconNext
          width={scale(12)}
          height={scale(12)}
          fill={COLORS.primary}
          style={{
            transform: [
              {
                rotate: isOpen ? '90deg' : '-90deg',
              },
            ],
          }}
        />
        <CustomText style={{color: COLORS.text}}>
          Tổng gía phòng cho <CustomText textType="medium">1 phòng</CustomText>,
          <CustomText textType="medium"> 3đêm</CustomText>
        </CustomText>
      </View>
      <DetailPriceRoom />

      <View style={styles.content}>
        <View
          style={{
            rowGap: scale(2),
          }}>
          <CustomText
            style={{color: COLORS.text, textDecorationLine: 'line-through'}}>
            {formatPrice(2189392813)}
          </CustomText>
          <CustomText
            textType="semiBold"
            style={{
              color: COLORS.primary,
              fontSize: SIZES.xMedium,
            }}>
            {formatPrice(2189392813)}
          </CustomText>
          <View>
            <CustomText
              style={{
                fontSize: SIZES.xSmall,
                color: COLORS.text,
                flex: 1,
              }}>
              Giá cuối cùng
            </CustomText>
            <View
              style={{
                ...styles.row,
                ...styles.point,
              }}>
              <IconCoinPoint />
              <CustomText>
                Nhận{' '}
                <CustomText textType="medium" style={{color: '#ff5e1f'}}>
                  {formatPrice(5 * 12312231)} điểm
                </CustomText>
              </CustomText>
            </View>
          </View>
        </View>

        <CustomButton
          buttonType="normal"
          text={t('booking')}
          linearGradientProps
          style={{minWidth: scale(100)}}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingTop: scale(8),
    paddingHorizontal: scale(20),
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    rowGap: scale(5),
  },
  content: {
    flexDirection: 'row',
    columnGap: scale(20),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: scale(8),
  },
  point: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: scale(10),
    flex: 1,
  },
});
