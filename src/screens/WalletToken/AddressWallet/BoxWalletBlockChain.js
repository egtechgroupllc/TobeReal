import Clipboard from '@react-native-clipboard/clipboard';
import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import {useQuery} from '@tanstack/react-query';
import {useAuthentication} from '~/hooks/useAuthentication';
import {useCountry} from '~/hooks/useCountry';
import {useLanguage} from '~/hooks/useLanguage';
import {formatPrice} from '~/utils/format';
import {showMess} from '~/assets/constants/Helper';
import {CText} from '~components';
import {IconCopy} from '~/assets/icon/Icon';
import {COLORS} from '~/assets/constants';
import {scale} from '~/utils/scale';
import QRWalletBlockChain from '~/screens/Profile/components/QRWalletBlockChain';
import {getBalanceWallet} from '~/api/wallet';

export default function BoxWalletBlockChain({data, styleBox}) {
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
    Clipboard.setString(data?.wallet);
    showMess(t('copy_success'));
  };

  const {data: dataQ} = useQuery({
    queryKey: ['user', 'wallet', 'balance'],
    queryFn: () => getBalanceWallet(),
    enabled: !!token,
  });

  if (!data?.address_wallet) return null;
  return (
    <View style={[styles.box, styleBox]}>
      <View style={styles.content}>
        <View style={styles.left}>
          <CText textType="semiBold" style={{color: COLORS.White}}>
            {t('my_wallet_address')}:
          </CText>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.walletAddress}
            onPress={handleCopy}>
            <IconCopy size={scale(14)} fill={COLORS.White} />
            <CText
              style={{
                flex: 1,
                color: COLORS.White,
              }}
              textType="semiBold"
              ellipsizeMode="middle"
              numberOfLines={1}>
              {data?.wallet}
            </CText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsOpen(true)}
          style={{
            width: scale(75),
            height: scale(75),
            backgroundColor: COLORS.White,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(5),
          }}>
          <QRCode value={data?.wallet} size={scale(66)} />
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
    backgroundColor: COLORS.input,
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
