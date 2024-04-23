import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../components/CustomText';
import {COLORS, SHADOW, SIZES, WIDTH, scale} from '../../../assets/constants';
import {CustomButton} from '../../../components';
import {IconMarker} from '../../../assets/icon/Icon';
import {formatPrice} from '../../../utils/format';

export default function BookingItem({data}) {
  console.log(data);
  return (
    <View style={styles.box}>
      <CustomText textType="bold" numberOfLines={2} size={SIZES.xMedium}>
        {data?.room?.name}
      </CustomText>

      <View style={styles.code}>
        <CustomText style={{flex: 1}} numberOfLines={1} ellipsizeMode="middle">
          Booking code:{' '}
          <CustomText textType="semiBold" numberOfLines={1}>
            {data?.id}
          </CustomText>
        </CustomText>

        <CustomText>
          Price:{' '}
          <CustomText textType="semiBold">
            {formatPrice(data?.price)}
          </CustomText>
        </CustomText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: scale(10),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(5),
            flex: 1,
          }}>
          <IconMarker width={scale(15)} height={scale(15)} />
          <CustomText
            numberOfLines={2}
            textType="semiBold"
            style={{
              flex: 1,
            }}>
            {data.location}
          </CustomText>
        </View>
        {/* 
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            columnGap: scale(5),
          }}>
          <CustomButton
            styleWrapper={{flex: 1}}
            text="PAY"
            style={{height: scale(25)}}
          />
          <CustomButton
            text="CANCEL"
            styleWrapper={{flex: 1}}
            outline
            style={{
              height: scale(25),
              borderColor: COLORS.grey,
            }}
            styleText={{color: COLORS.black, textType: 'regular'}}
          />
        </View> */}
      </View>
      <View style={styles.line} />
      <View
        style={{
          backgroundColor: data.status === 'SUCCESS' ? 'green' : 'red',
          width: '50%',
          height: scale(20),
          borderRadius: scale(10),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText
          textType="bold"
          style={{
            color: COLORS.white,
            fontSize: SIZES.xSmall,
          }}>
          {data.status === 'SUCCESS'
            ? 'Successful transaction'
            : 'Exceeded specified time limit'}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FDFDFD',
    minHeight: scale(100),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: '#DADADA4D',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    rowGap: scale(5),
    ...SHADOW,
  },
  code: {
    borderWidth: scale(1),
    borderRadius: scale(6),
    borderColor: '#0000001A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    marginTop: scale(5),
    columnGap: scale(10),
  },
  line: {
    backgroundColor: COLORS.grey,
    height: scale(1),
    width: '100%',
  },
});
