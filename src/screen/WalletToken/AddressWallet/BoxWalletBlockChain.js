import Clipboard from '@react-native-clipboard/clipboard';
import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import {useQuery} from '@tanstack/react-query';
import {getBalanceWallet} from '../../../Model/api/wallet';
import {COLORS, scale, SHADOW} from '../../../assets/constants';
import {showMess} from '../../../assets/constants/Helper';
import {IconCopy} from '../../../assets/icon/Icon';
import {CustomText} from '../../../components';
import {useCountry} from '../../../hooks/useCountry';
import {useLanguage} from '../../../hooks/useLanguage';
import {formatPrice} from '../../../utils/format';
import QRWalletBlockChain from '../../Profile/components/QRWalletBlockChain';
import {useAuthentication} from '../../../hooks/useAuthentication';
import {getToken} from '../../../Model/api/common';

export default function BoxWalletBlockChain({data, walletAddress}) {
  const {t} = useLanguage();
  const {currency} = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const {token} = useAuthentication();
  const balance = useMemo(
    () =>
      formatPrice(data?.balance * currency?.exchange_rate, {
        currency: currency?.currency_code,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(currency), data?.balance],
  );

  const handleCopy = () => {
    Clipboard.setString(walletAddress);
    showMess(t('copy_success'));
  };

  const {data: dataQ} = useQuery({
    queryKey: ['user', 'wallet', 'balance', token],
    queryFn: () => getBalanceWallet(token),
    enabled: !!token,
  });

  if (!walletAddress) return null;
  return (
    <View style={styles.box}>
      <View style={styles.content}>
        <View style={styles.left}>
          <CustomText textType="semiBold">{t('my_id_address')}:</CustomText>
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
              {walletAddress}
            </CustomText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsOpen(true)}
          style={{
            width: scale(75),
            height: scale(75),
            backgroundColor: COLORS.white,
            alignItems: 'center',
            borderRadius: scale(5),
            justifyContent: 'center',
          }}>
          <QRCode value={walletAddress} size={scale(66)} />
        </TouchableOpacity>
      </View>

      {isOpen && (
        <QRWalletBlockChain
          data={data}
          walletAddress={walletAddress}
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
    flex: 1,
    borderRadius: scale(5),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    minHeight: scale(100),
    height: scale(85),
    width: '100%',
    ...SHADOW,
    borderWidth: 1,
    borderColor: COLORS.pioBox,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(12),
  },
  left: {
    justifyContent: 'center',
    rowGap: scale(2),
    flex: 1,
  },
  walletAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
    paddingVertical: scale(5),
  },
});
