import Clipboard from '@react-native-clipboard/clipboard';
import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import {COLORS, scale} from '../../../assets/constants';
import {showMess} from '../../../assets/constants/Helper';
import {IconCopy} from '../../../assets/icon/Icon';
import {CustomText} from '../../../components';
import {useCountry} from '../../../hooks/useCountry';
import {useLanguage} from '../../../hooks/useLanguage';
import {formatPrice} from '../../../utils/format';
import QRWalletBlockChain from '../../Profile/components/QRWalletBlockChain';
import {useQuery} from '@tanstack/react-query';
import {getBalanceWallet} from '../../../Model/api/wallet';
import MenuAddressWallet from './MenuAddressWallet';

export default function BoxWalletBlockChain({data}) {
  const {t} = useLanguage();
  const {currency} = useCountry();
  const [isOpen, setIsOpen] = useState(false);

  const balance = useMemo(
    () =>
      formatPrice(data?.balance * currency?.exchange_rate, {
        currency: currency?.currency_code,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(currency), data?.balance],
  );

  const handleCopy = () => {
    Clipboard.setString(data?.wallet_address);
    showMess(t('copy_success'));
  };

  const {data: dataQ, error} = useQuery({
    queryKey: ['user', 'wallet', 'balance'],
    queryFn: getBalanceWallet,
  });

  if (!data?.wallet_address) return null;
  return (
    <View style={styles.box}>
      <View style={styles.content}>
        <View style={styles.left}>
          <CustomText textType="semiBold">
            {t('my_identify_address')}:
          </CustomText>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.walletAddress}
            onPress={handleCopy}>
            <IconCopy size={scale(14)} />
            <CustomText
              style={{
                flex: 1,
              }}
              textType="semiBold"
              ellipsizeMode="middle"
              numberOfLines={1}>
              {data?.wallet_address}
            </CustomText>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                flex: 1,
              }}>
              {t('balance')} :{' '}
              <CustomText
                textType="semiBold"
                color={COLORS.primary}
                numberOfLines={1}>
                {formatPrice(dataQ?.data?.TBH, {
                  showCurrency: false,
                  decimalPlaces: 6,
                })}{' '}
                TBH
              </CustomText>
              {`\n`}
              {t('balance_fee_gas')}:{' '}
              <CustomText
                textType="semiBold"
                color={COLORS.primary}
                numberOfLines={1}>
                {formatPrice(dataQ?.data?.TBC, {
                  showCurrency: false,
                  decimalPlaces: 6,
                })}{' '}
                TBC
              </CustomText>
            </CustomText>
            <MenuAddressWallet data={data} />
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsOpen(true)}>
          <QRCode value={data?.wallet_address} size={scale(66)} />
        </TouchableOpacity>
      </View>

      {isOpen && (
        <QRWalletBlockChain
          data={data}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: scale(5),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    minHeight: scale(100),
    height: scale(85),
    marginTop: scale(10),
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.36,
    shadowRadius: 5.68,
    elevation: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(12),
  },
  left: {
    justifyContent: 'center',
    rowGap: scale(6),
    flex: 1,
  },
  walletAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
    paddingVertical: scale(5),
  },
});
