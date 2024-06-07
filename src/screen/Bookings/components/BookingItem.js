import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import {IconMarker} from '../../../assets/icon/Icon';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {formatDateTime, formatPrice} from '../../../utils/format';
import {useCountry} from '../../../hooks/useCountry';
import {useLanguage} from '../../../hooks/useLanguage';

export default function BookingItem({data, onPress, onReView}) {
  const objAccom = data?.accommodation;
  const {currency} = useCountry();
  const {t} = useLanguage();

  return (
    <TouchableOpacity style={styles.box} activeOpacity={0.7} onPress={onPress}>
      <CustomText textType="bold" numberOfLines={2} size={SIZES.xMedium}>
        {objAccom?.name}
      </CustomText>

      <View style={styles.code}>
        <CustomText style={{flex: 1}} numberOfLines={1} ellipsizeMode="middle">
          {t('booking_code')}:{' '}
          <CustomText textType="semiBold" numberOfLines={1}>
            {data?.id}
          </CustomText>
        </CustomText>

        <CustomText>
          {t('price')}:{' '}
          <CustomText textType="semiBold">
            {formatPrice(data?.price * currency?.exchange_rate, {
              currency: currency?.currency_code,
            })}
          </CustomText>
        </CustomText>
      </View>

      <View style={styles.address}>
        <View style={styles.address}>
          <IconMarker width={scale(15)} height={scale(15)} />
          <CustomText
            numberOfLines={2}
            textType="medium"
            style={{
              flex: 1,
            }}>
            {objAccom?.country?.name}, {objAccom?.province?.name}
          </CustomText>
        </View>

        {data.status !== 'SUCCESS' ? (
          <View style={styles.address}>
            <CustomButton
              styleWrapper={{flex: 1}}
              text={t('pay')}
              style={{height: scale(25)}}
            />
            <CustomButton
              text={t('cancel')}
              styleWrapper={{flex: 1}}
              outline
              style={{
                height: scale(25),
                borderColor: COLORS.grey,
              }}
              styleText={{color: COLORS.black, textType: 'regular'}}
            />
          </View>
        ) : (
          <CustomButton
            styleWrapper={{flex: 0.4}}
            text={t('review')}
            style={{height: scale(25)}}
            onPress={onReView}
          />
        )}
      </View>
      <View style={styles.line} />
      <View style={styles.address}>
        <View
          style={{
            backgroundColor: data.status === 'SUCCESS' ? '#42b00b' : '#e03c31',
            ...styles.boxStatus,
          }}>
          <CustomText size={SIZES.xSmall} textType="bold" color={COLORS.white}>
            {data.status === 'SUCCESS'
              ? t('success_transaction')
              : t('exceed_limit')}
          </CustomText>
        </View>
        <CustomText
          textType="regular"
          size={SIZES.xSmall}
          color={COLORS.text}
          style={{
            position: 'absolute',
            right: 0,
            bottom: scale(-2),
          }}>
          {formatDateTime(data?.createdAt)}
        </CustomText>
      </View>
    </TouchableOpacity>
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
    ...SHADOW,
    rowGap: scale(10),
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(5),
    flex: 1,
    justifyContent: 'space-between',
  },
  code: {
    borderWidth: scale(1),
    borderRadius: scale(6),
    borderColor: '#0000001A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    columnGap: scale(10),
  },
  line: {
    backgroundColor: COLORS.grey,
    height: scale(1),
    width: '100%',
  },
  boxStatus: {
    minWidth: '50%',
    height: scale(20),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
