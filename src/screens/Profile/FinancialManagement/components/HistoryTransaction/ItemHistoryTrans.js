/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {useLanguage} from '~/hooks/useLanguage';
import {Button, CImage, CText} from '~/components';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {formatDateTime, formatPrice} from '~/utils/format';

export default function ItemHistory({
  data,
  isBackground,
  onPress,
  tab,
  onPressCancel,
}) {
  const {t} = useLanguage();

  // const nameBank = useMemo(
  //   () =>
  //     data?.method_deposit_item?.bank_name?.split('-')[0] ||
  //     data?.method_deposit_item?.method_deposit?.name,
  //   [
  //     data?.method_deposit_item?.bank_name,
  //     data?.method_deposit_item?.method_deposit?.name,
  //   ],
  // );
  return (
    <TouchableHighlight
      underlayColor={COLORS.primary}
      onPress={() => onPress({...data})}
      style={{
        ...styles.wrapper,
        backgroundColor: isBackground ? COLORS.input : COLORS.blueView,
        padding: tab === t('deposit') ? scale(10) : scale(20),
      }}>
      <>
        {tab === t('deposit') && (
          <View style={styles.boxImg}>
            <CImage
              source={{uri: data?.deposit_oder?.method_deposit?.logo}}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="contain"
            />
          </View>
        )}

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
                backgroundColor: (
                  tab === t('deposit')
                    ? data?.deposit_oder?.status === 'SUCCESS'
                    : data?.status === 'SUCCESS'
                )
                  ? '#42b00b'
                  : (
                      tab === t('deposit')
                        ? data?.deposit_oder?.status === 'WAITING'
                        : data?.status === 'WAITING'
                    )
                  ? COLORS.OrangeBold
                  : '#e03c31',
              }}>
              <CText
                textType="semiBold"
                style={{
                  color: COLORS.White,
                  fontSize: SIZES.xSmall,
                }}>
                {data?.status || data?.deposit_oder?.status}
              </CText>
            </View>

            <CText
              textType="semiBold"
              style={{
                fontSize: scale(12),
                flex: 1,
                color: COLORS.White,
              }}>
              {data?.deposit_oder?.method_deposit_item?.bank_name
                ? data?.deposit_oder?.method_deposit_item?.bank_name
                : data?.deposit_oder?.method_deposit?.name}
              {data?.bank_name ? data?.bank_name : ''} -{' '}
              {data?.deposit_oder?.method_deposit_item?.owner ||
                data?.bank_owner}
            </CText>
          </View>

          <CText style={styles.textSmall}>
            {formatDateTime(data?.createdAt, {
              dateStyle: 'HH:mm - dd/MM/yyyy',
            })}
          </CText>

          <View style={styles.footer}>
            <CText
              numberOfLines={1}
              ellipsizeMode="middle"
              style={{
                ...styles.textSmall,
                width: '65%',
              }}>
              {t('transaction_code')}:{' '}
              <CText textType="semiBold" style={styles.textSmall}>
                {data?.code_hash}
              </CText>
            </CText>

            <CText
              textType="bold"
              style={{
                fontSize: scale(13),
                color: COLORS.White,
              }}>
              {tab === t('deposit') ? '+' : '-'}
              {formatPrice(data?.deposit_oder?.amount || data?.amount)}
            </CText>
          </View>
        </View>
        {data?.status === 'WAITING' && tab === t('withdraw') && (
          <View style={{width: '20%', height: scale(25)}}>
            <Button
              onPress={onPressCancel}
              title={t('cancel')}
              backgroundColor={COLORS.error + '60'}
              sizeButton="small"
              styleWrapper={{alignSelf: 'flex-end'}}
            />
          </View>
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
    alignItems: 'center',
  },
  textSmall: {
    fontSize: SIZES.xSmall,
    color: COLORS.White,
  },
  footer: {
    rowGap: scale(4),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
