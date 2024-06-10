/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import CustomImage from '../../../../../components/CustomImage';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import {
  formatDate,
  formatDateTime,
  formatPrice,
  formatTime,
} from '../../../../../utils/format';
import {CustomButton} from '../../../../../components';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function ItemHistory({
  data,
  isBackground,
  onPress,
  tab,
  onPressCancel,
}) {
  const {t} = useLanguage();

  const nameBank = useMemo(
    () =>
      data?.method_deposit_item?.bank_name?.split('-')[0] ||
      data?.method_deposit_item?.method_deposit?.name,
    [
      data?.method_deposit_item?.bank_name,
      data?.method_deposit_item?.method_deposit?.name,
    ],
  );

  return (
    <TouchableHighlight
      underlayColor={'#f5f5f5'}
      onPress={() => onPress({nameBank, ...data})}
      style={{
        ...styles.wrapper,
      }}>
      <>
        <View style={styles.boxImg}>
          <CustomImage
            source={data?.method_deposit_item?.method_deposit?.logo_url}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            rowGap: scale(4),
            flex: 1,
          }}>
          <View style={styles.header}>
            <View
              style={{
                borderRadius: scale(3),
                padding: scale(3),
                backgroundColor:
                  data?.status === 'SUCCESS'
                    ? '#42b00b'
                    : data?.status === 'PENDING'
                    ? COLORS.primary
                    : '#e03c31',
              }}>
              <CustomText
                textType="semiBold"
                style={{
                  color: COLORS.white,
                  fontSize: SIZES.xSmall,
                }}>
                {data?.status}
              </CustomText>
            </View>

            <CustomText
              textType="semiBold"
              style={{
                fontSize: scale(12),
                flex: 1,
                color: COLORS.white,
              }}>
              {nameBank || data?.bank_owner} -{' '}
              {data?.method_deposit_item?.owner || data?.bank_name}
            </CustomText>
          </View>

          <CustomText style={styles.textSmall}>
            {formatDateTime(data?.createdAt, {
              dateStyle: 'HH:mm - dd/MM/yyyy',
            })}
          </CustomText>

          <View style={styles.footer}>
            <CustomText
              numberOfLines={1}
              ellipsizeMode="middle"
              style={{
                ...styles.textSmall,
                width: '65%',
              }}>
              Mã giao dich:{' '}
              <CustomText textType="semiBold" style={styles.textSmall}>
                {data?.code}
              </CustomText>
            </CustomText>

            <CustomText
              textType="bold"
              style={{
                fontSize: scale(13),
                color: COLORS.white,
              }}>
              {tab === 'Deposit' ? '+' : '-'}
              {formatPrice(data?.amount)}
            </CustomText>
          </View>
        </View>
        {data?.status === 'PENDING' && tab === t('withdraw') && (
          <CustomButton
            onPress={onPressCancel}
            text={t('cancel')}
            buttonType="small"
            style={{width: '20%', height: scale(25)}}
            styleWrapper={{alignSelf: 'flex-end'}}
          />
        )}
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
    padding: scale(10),
  },
  boxImg: {
    width: scale(40),
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: scale(6),
    borderRadius: scale(8),
  },
  header: {
    columnGap: scale(6),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textSmall: {
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
  footer: {
    rowGap: scale(4),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
