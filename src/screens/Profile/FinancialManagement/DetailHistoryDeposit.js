import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {scale} from '~/utils/scale';
import {COLORS, images, SHADOW, SIZES} from '~/assets/constants';
import {formatDateTime, formatPrice} from '~/utils/format';
import {IconCopy, IconSupporter} from '~/assets/icon/Icon';
import {showMess} from '~/assets/constants/Helper';
import {useLanguage} from '~/hooks/useLanguage';

export default function DetailHistoryDeposit({route}) {
  const {setOptions, navigate} = useNavigation();
  const {bottom} = useSafeAreaInsets();
  const data = route.params;
  const {t} = useLanguage();
  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('transaction_detail'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <MainWrapper
        sourceImage={images.backgroundHome}
        scrollEnabled={false}
        styleContent={{
          paddingHorizontal: scale(10),
          rowGap: scale(12),
        }}>
        <View style={styles.boxTop}>
          <View
            style={{
              rowGap: scale(16),
              padding: scale(10),
            }}>
            <View style={styles.header}>
              {data?.deposit_oder?.method_deposit?.logo && (
                <CImage
                  source={{uri: data?.deposit_oder?.method_deposit?.logo}}
                  resizeMode="contain"
                  style={{
                    width: scale(30),
                    height: scale(30),
                  }}
                />
              )}
              <View
                style={{
                  rowGap: scale(4),
                  minHeight: scale(50),
                  flex: 1,
                }}>
                <CText
                  size={SIZES.small}
                  color={COLORS.White}
                  style={{
                    textTransform: 'uppercase',
                  }}>
                  {data?.deposit_oder?.method_deposit_item?.bank_name
                    ? data?.deposit_oder?.method_deposit_item?.bank_name
                    : data?.deposit_oder?.method_deposit?.name}
                  {data?.bank_name ? data?.bank_name : ''} -{' '}
                  {data?.deposit_oder?.method_deposit_item?.owner ||
                    data?.bank_owner}
                </CText>
                <CText textType="bold" size={SIZES.medium} color={COLORS.White}>
                  {data?.amount ? '-' : '+'}
                  {formatPrice(data?.deposit_oder?.amount || data?.amount, {
                    currency: data?.currency_code,
                  })}
                </CText>
              </View>
            </View>

            <Item
              name={t('status')}
              value={data?.deposit_oder?.status || data?.status}
              backgroundColor={
                (
                  data?.deposit_oder?.status
                    ? data?.deposit_oder?.status === 'SUCCESS'
                    : data?.status === 'SUCCESS'
                )
                  ? '#42b00b'
                  : (
                      data?.deposit_oder?.status
                        ? data?.deposit_oder?.status === 'WAITING'
                        : data?.status === 'WAITING'
                    )
                  ? COLORS.OrangeBold
                  : '#e03c31'
              }
              color={COLORS.White}
            />

            <Item
              name={t('time')}
              color={COLORS.White}
              value={formatDateTime(data?.createdAt, {
                dateStyle: 'HH:mm - dd/MM/yyyy',
              })}
            />
            <View style={{overflow: 'hidden', width: '100%'}}>
              <View style={styles.line} />
            </View>

            <Item
              name={t('transfer_id')}
              value={data?.code_hash}
              isCopy
              color={COLORS.White}
            />
            <Item
              name={t('card_account')}
              value={
                data?.deposit_oder?.method_deposit_item?.code ||
                data?.bank_number
              }
              color={COLORS.White}
            />
            <Item name={t('overheads')} value="Free" color={COLORS.White} />
          </View>

          <View style={styles.boxSupport}>
            <IconSupporter width={scale(20)} height={scale(20)} />
            <CText size={SIZES.xMedium} color={'#0194f3'} textType="medium">
              {t('contact_support')}
            </CText>
          </View>
        </View>

        {/* <View style={styles.boxTop}>
          <View
            style={{
              rowGap: scale(16),
              padding: scale(10),
            }}>
            <Item
              name={t('card_number_account')}
              value={data?.method_deposit_item?.code}
              isCopy
            />

            <Item
              name={t('bank')}
              value={
                data?.method_deposit_item?.bank_name?.split('-')?.[1] ||
                data?.method_deposit_item?.method_deposit?.name
              }
            />
            <Item
              name={t('receiver')}
              value={data?.method_deposit_item?.owner}
            />
            <Item
              name={t('amount_of_money')}
              value={`+${formatPrice(data?.amount, {
                currency: data?.currency_code,
              })}`}
            />
          </View>
        </View> */}
        <Button
          onPress={() => navigate('ListMethodBankScreen')}
          title={t('top_up')}
          linearGradientProps={{colors: COLORS.linearButton}}
          style={{marginTop: scale(30)}}
        />
      </MainWrapper>

      {/* <View
        style={{
          paddingBottom: bottom + scale(10),
          ...styles.footer,
        }}></View> */}
    </>
  );
}
const Item = ({name, value, color, backgroundColor, isCopy}) => {
  const {t} = useLanguage();
  const handleCopy = () => {
    Clipboard.setString(value);
    showMess(t('copy_successfully'));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: scale(10),
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <CText size={SIZES.xMedium} color={COLORS.White}>
        {name}:
      </CText>
      {backgroundColor ? (
        <View
          style={{
            backgroundColor: backgroundColor,
            borderRadius: scale(9),
            paddingHorizontal: scale(10),
            paddingVertical: scale(2),
          }}>
          <CText textType="semiBold" color={color}>
            {value}
          </CText>
        </View>
      ) : (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          {isCopy && (
            <IconCopy
              width={scale(14)}
              height={scale(14)}
              fill={COLORS.White}
            />
          )}
          <CText
            onPress={isCopy && handleCopy}
            textType="semiBold"
            size={SIZES.xMedium}
            numberOfLines={1}
            color={color}
            style={{flex: 1, textAlign: 'right'}}>
            {value}{' '}
          </CText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  boxTop: {
    backgroundColor: COLORS.input,
    borderRadius: scale(10),
    rowGap: scale(10),
    // overflow: 'hidden',
    ...SHADOW,
  },
  header: {
    borderRadius: scale(10),
    padding: scale(40),
    flexDirection: 'row',
    columnGap: scale(10),
    paddingHorizontal: scale(15),
    borderWidth: 1,
    flex: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  line: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: -1,
    marginBottom: 0,
    overflow: 'hidden',
  },

  boxSupport: {
    backgroundColor: '#0194f330',
    alignItems: 'center',
    paddingVertical: scale(8),
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: scale(10),
    borderBottomRightRadius: scale(10),
    borderBottomLeftRadius: scale(10),
  },
  footer: {
    paddingTop: scale(10),
    alignItems: 'center',
    backgroundColor: COLORS.White,
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
});
