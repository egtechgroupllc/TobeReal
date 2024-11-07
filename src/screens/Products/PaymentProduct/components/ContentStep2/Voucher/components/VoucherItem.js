import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {getListPriceRoomDate} from '../../../../../../../Model/api/apiAccom';
import {useQuery} from '@tanstack/react-query';
import {useCountry} from '~/hooks/useCountry';
import {formatPrice} from '~/utils/format';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import {COLORS, SHADOW, SIZES} from '~/assets/constants';
import {CImage, CText} from '~/components';
import CheckBox from '~/components/CheckBox';
import {IconClock} from '~/assets/icon/Icon';
export default function VoucherItem({
  data,
  onPressMore,
  onEdit,
  chooseVoucher,
  onPressCheckBox,
  isChecked,
  buyVoucher,
  onPressVoucher,
  checkDiffrentCountry,
  countryRate,
}) {
  const {currency} = useCountry();
  const {t} = useLanguage();

  // const navigateDetail = () => {
  //   navigate(isTour ? 'DetailTourScreen' : 'DetailAccommodationScreen', {
  //     ...data,
  //   });
  // };
  // const handleTouch = () => {
  //   // data?.rooms?.length <= 0 || data?.tour_tickets?.length <= 0
  //   //   ? handleContinue()
  //   //   : navigateDetail();
  //   // handleContinue();
  //   navigate('NoBottomTab', {screen: 'DetailRoomManageScreen', params: data});
  // };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPressVoucher}
      disabled={buyVoucher ? (data?.quantity_real > 0 ? false : true) : false}
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        minHeight: scale(100),
        columnGap: scale(10),
        backgroundColor: COLORS.input,
        padding: scale(6),
        borderRadius: scale(10),
        ...SHADOW,
      }}>
      <CImage
        source={{uri: data?.image || data?.voucher?.image}}
        style={{
          borderRadius: scale(7),
          height: scale(90),
          width: scale(120 / 1.4),
        }}
      />
      <View
        style={{
          flex: 1,
        }}>
        <View style={{rowGap: scale(20)}}>
          <View style={{rowGap: scale(3), width: scale(220)}}>
            <CText
              textType="bold"
              style={{
                color: COLORS.White,
                fontSize: SIZES.small,
              }}
              numberOfLines={2}>
              {t('voucher')} {t('medical_examination_discount').toLowerCase()}{' '}
              {formatPrice(data?.price_discount)}
            </CText>

            {!buyVoucher && (
              <CText
                textType="semiBold"
                style={{
                  color: COLORS.cyan,
                  fontSize: SIZES.xSmall,
                }}>
                {t('discount_remaining')}{' '}
                {formatPrice(
                  checkDiffrentCountry
                    ? (data?.voucher?.remaining_discount_price ||
                        data?.remaining_discount_price / countryRate) *
                        currency?.exchange_rate
                    : data?.voucher?.remaining_discount_price ||
                        data?.remaining_discount_price,
                  {
                    currency: currency?.currency_code,
                  },
                )}
              </CText>
            )}
            {buyVoucher && (
              <CText
                textType="medium"
                style={{
                  color: COLORS.White,
                  fontSize: SIZES.xSmall,
                }}>
                {t('quantity')}: {data?.quantity_real}
              </CText>
            )}
            {buyVoucher && data?.quantity_real < 1 && (
              <CText
                textType="medium"
                style={{
                  color: COLORS.error,
                  fontSize: SIZES.small,
                }}>
                {t('sold_out')}
              </CText>
            )}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: scale(2),
            }}>
            {chooseVoucher && (
              <CheckBox
                style={{columnGap: 0}}
                key={data?.id}
                onPress={onPressCheckBox}
                isChecked={isChecked}
                isRadio
              />
            )}
            {buyVoucher && (
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  padding: scale(5),
                  borderRadius: scale(5),
                }}>
                <CText
                  textType="bold"
                  style={{
                    color: COLORS.White,
                    fontSize: SIZES.xlSmall,
                  }}>
                  {t('BUY')}
                </CText>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <CText
            textType="bold"
            numberOfLines={1}
            style={{
              color: COLORS.White,
              fontSize: SIZES.small,
              flex: 1,
            }}>
            {formatPrice(data?.price || data?.voucher?.price, {
              currency: 'TBH',
              locales: 'vi',
              decimalPlaces: 12,
            })}
          </CText>
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(5),
              alignItems: 'center',
              flex: 1.5,
            }}>
            <IconClock
              fill={COLORS.White}
              width={scale(10)}
              height={scale(10)}
            />
            <CText
              numberOfLines={1}
              textType="regular"
              style={{
                color: COLORS.White,
                fontSize: SIZES.xSmall,
                flex: 1,
              }}>
              {data?.date_start || data?.voucher?.date_start} -{' '}
              {data?.date_end || data?.voucher?.date_end}
            </CText>
          </View>
        </View>
        {/* <View style={styles.bottom}>
            <CustomButton
              text={
                !data?.rooms?.length <= 0 || !data?.tour_tickets?.length <= 0
                  ? isTour
                    ? 'Thêm Vé'
                    : 'Add Room'
                  : 'Incomplete Property Information'
              }
              buttonType="normal"
              style={styles.btnInfo}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
              onPress={handleContinue}
            />

            <CustomButton
              text="Continue"
              buttonType="normal"
              style={styles.continue}
              outline
              iconRight={IconArrowRight}
              styleIcon={styles.iconCon}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
              onPress={handleContinue}
            />
          </View> */}
        {/* <View style={styles.bottom}>
            <CustomButton
              buttonType="normal"
              text={t('manage')}
              style={styles.btnInfo}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
              onPress={onEdit}
            />
            <TouchableOpacity
              style={styles.box}
              activeOpacity={0.7}
              onPress={onPressMore}>
              <IconTrash
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
            </TouchableOpacity>
          </View> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: scale(10),
    rowGap: scale(3),
  },
  box: {
    borderRadius: scale(4),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: COLORS.White,
    borderColor: '#ccc',
    flexDirection: 'row',
    columnGap: scale(2),
  },
  type: {
    position: 'absolute',
    zIndex: 1,
    right: scale(8),
    top: scale(6),
    backgroundColor: COLORS.White,
    borderRadius: 99,
    paddingHorizontal: scale(6),
  },
  bottom: {
    // backgroundColor: COLORS.white,
    flexDirection: 'row',
    // width: '50%',
    padding: scale(8),
    paddingHorizontal: scale(50),
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 'auto',
    columnGap: scale(4),
    justifyContent: 'space-between',
  },
  btnInfo: {
    height: scale(26),
    minWidth: scale(150),
    maxWidth: scale(260),
    paddingHorizontal: scale(6),
  },
  continue: {
    height: scale(26),
    borderWidth: 0,
    minWidth: scale(80),
    columnGap: scale(4),
    paddingHorizontal: 0,
  },
  iconCon: {
    color: COLORS.primary,
    width: scale(8),
    height: scale(8),
    marginTop: scale(1),
  },
});
