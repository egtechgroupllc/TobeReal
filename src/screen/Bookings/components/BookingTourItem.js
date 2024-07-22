import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import {IconMarker} from '../../../assets/icon/Icon';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {formatDate, formatDateTime, formatPrice} from '../../../utils/format';
import {useCountry} from '../../../hooks/useCountry';
import {useLanguage} from '../../../hooks/useLanguage';
import QRCode from 'react-native-qrcode-svg';

export default function BookingTourItem({
  data,
  onPress,
  onReView,
  onViewDetail,
}) {
  const {currency} = useCountry();
  const {t} = useLanguage();
  const today = formatDate(new Date());
  const dataTour = data?.tour;
  return (
    <>
      {data?.status === 'SUCCESS' && (
        <TouchableOpacity
          style={styles.box}
          activeOpacity={0.7}
          onPress={onPress}>
          <CustomText textType="bold" numberOfLines={2} size={SIZES.small}>
            {dataTour?.name}
          </CustomText>

          <View style={styles.code}>
            <View style={{flexDirection: 'row'}}>
              <CustomText
                style={{flex: 1}}
                numberOfLines={1}
                ellipsizeMode="middle">
                {t('booking_tour_code')}:{' '}
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
            <CustomText>
              {t('type_payment')}:{' '}
              <CustomText textType="semiBold">{data?.type_payment} </CustomText>
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
                {dataTour?.country?.name}, {dataTour?.province?.name}
              </CustomText>
            </View>

            {/* {data.status !== 'SUCCESS' ? (
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
            ) : ( */}
            {data?.date < today &&
              (!data?.tour_review ? (
                <CustomButton
                  styleWrapper={{minWidth: scale(50)}}
                  text={t('review')}
                  style={{height: scale(25)}}
                  onPress={onReView}
                />
              ) : (
                <CustomButton
                  styleWrapper={{minWidth: scale(50)}}
                  text={t('view_review')}
                  style={{height: scale(25), backgroundColor: COLORS.grey}}
                  onPress={onViewDetail}
                />
              ))}
            {/* <CustomButton
                styleWrapper={{flex: 0.4}}
                text={t('review')}
                style={{height: scale(25)}}
                onPress={onReView}
              /> */}
          </View>
          <View style={styles.line} />
          <View style={styles.address}>
            <View
              style={{
                backgroundColor:
                  data.status === 'SUCCESS' ? '#42b00b' : '#e03c31',
                ...styles.boxStatus,
              }}>
              <CustomText
                size={SIZES.xSmall}
                textType="bold"
                color={COLORS.white}>
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
      )}
    </>
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
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    columnGap: scale(10),
    rowGap: scale(10),
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
