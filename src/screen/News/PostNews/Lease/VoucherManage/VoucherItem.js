import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {
  IconCheckedVoucher,
  IconClock,
  IconTrash,
  IconUncheckVoucher,
} from '../../../../../assets/icon/Icon';
import {
  CheckBox,
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../../../../components';

import {useLanguage} from '../../../../../hooks/useLanguage';
import {getListPriceRoomDate} from '../../../../../../../Model/api/apiAccom';
import {useQuery} from '@tanstack/react-query';
import {formatPrice} from '../../../../../utils/format';
import {useCountry} from '../../../../../hooks/useCountry';
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
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        minHeight: scale(100),
        columnGap: scale(10),
        backgroundColor: COLORS.white,
        padding: scale(6),
        borderRadius: scale(10),
        ...SHADOW,
      }}>
      <CustomImage
        source={data?.images[0]?.url}
        style={{
          borderRadius: scale(7),
          height: scale(90),
          width: scale(120 / 1.4),
          backgroundColor: COLORS.grey50,
        }}
      />
      <View
        style={{
          flex: 1,
        }}>
        <View style={{rowGap: scale(20)}}>
          <View style={{rowGap: scale(3), width: scale(220)}}>
            <CustomText
              textType="bold"
              style={{
                color: COLORS.black,
                fontSize: SIZES.small,
              }}
              numberOfLines={2}>
              {data?.name}
            </CustomText>
            {buyVoucher && (
              <CustomText
                textType="medium"
                style={{
                  color: COLORS.black,
                  fontSize: SIZES.xSmall,
                }}>
                {t('quantity')}:{data?.quantity_real}
              </CustomText>
            )}

            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.black,
                fontSize: SIZES.xSmall,
              }}>
              {t('value')}: {t('discount_remaining')}{' '}
              {formatPrice(
                checkDiffrentCountry
                  ? (data?.price_discount_real / countryRate) *
                      currency?.exchange_rate
                  : data?.price_discount_real,
                {
                  currency: currency?.currency_code,
                },
              )}
            </CustomText>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.black,
                fontSize: SIZES.xSmall,
              }}>
              {t('quantity')}: {data?.quantity_real}
            </CustomText>
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
                <CustomText
                  textType="bold"
                  style={{
                    color: COLORS.white,
                    fontSize: SIZES.xlSmall,
                  }}>
                  {t('BUY')}
                </CustomText>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              textType="semiBold"
              numberOfLines={1}
              style={{
                color: COLORS.primary,
                fontSize: SIZES.small,
              }}>
              {formatPrice(data?.price, {
                currency: 'TBH',
                locales: 'vi',
                decimalPlaces: 12,
              })}
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                columnGap: scale(5),
                alignItems: 'center',
              }}>
              <IconClock
                fill={COLORS.primary}
                width={scale(10)}
                height={scale(10)}
              />
              <CustomText
                textType="bold"
                style={{
                  color: COLORS.black,
                  fontSize: SIZES.xSmall,
                }}>
                {data?.date_end}
              </CustomText>
            </View>
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
    backgroundColor: COLORS.white,
    borderColor: '#ccc',
    flexDirection: 'row',
    columnGap: scale(2),
  },
  type: {
    position: 'absolute',
    zIndex: 1,
    right: scale(8),
    top: scale(6),
    backgroundColor: COLORS.white,
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
