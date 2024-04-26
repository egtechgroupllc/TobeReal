import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconDown} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {formatPrice} from '../../../../../utils/format';

export default function DetailPriceRoom({data}) {
  const numRoom = data?.numRoomSelect;
  const [isMorePrice, setIsMorePrice] = useState(false);

  const priceAverage = useMemo(
    () => numRoom * data?.priceAverage * data?.date?.numNight,
    [numRoom, data?.date?.numNight, data?.priceAverage],
  );
  const feePrice = priceAverage * (11.8165 / 100);

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
          title={'Tổng giá tiền'}
          styleTitle={{
            fontSize: SIZES.medium,
          }}
          styleValue={{
            fontSize: SIZES.medium,
          }}
          value={formatPrice(priceAverage + feePrice)}
          colorValue={COLORS.primary}
          textType="bold"
          Icon={
            <IconDown
              style={
                isMorePrice && {
                  transform: [
                    {
                      rotate: '180deg',
                    },
                  ],
                }
              }
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

        <Row title={`Số phòng`} value={numRoom} />

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
          value={formatPrice(feePrice)}
          textType="regular"
          colorValue={COLORS.text}
        />
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
}) => {
  return (
    <View
      style={{
        ...styles.row,
        justifyContent: 'space-between',
      }}>
      <CustomText
        textType={textTypeTitle}
        style={{fontSize: SIZES.xMedium, ...styleTitle}}>
        {title}
      </CustomText>
      <View
        style={{
          ...styles.row,
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <CustomText
          textType={textType || 'medium'}
          style={{fontSize: SIZES.xMedium, color: colorValue, ...styleValue}}>
          {value}
        </CustomText>
        {Icon}
      </View>
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
