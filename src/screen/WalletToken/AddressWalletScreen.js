import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useLayoutEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {getProfile} from '../../Model/api/common';
import {getBalanceWallet} from '../../Model/api/wallet';
import {images, scale} from '../../assets/constants';
import {showMess} from '../../assets/constants/Helper';
import {useAuthentication} from '../../hooks/useAuthentication';
import {useCountry} from '../../hooks/useCountry';
import {useLanguage} from '../../hooks/useLanguage';
import WalletItem from '../WalletToken/AddressWallet/WalletItem';

export default function AddressWalletScreen() {
  const {setOptions, navigate} = useNavigation();
  const {currency} = useCountry();
  const {t} = useLanguage();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('account_card_management'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {token} = useAuthentication();
  const {isLoading, data} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });
  const {data: dataQ, error} = useQuery({
    queryKey: ['user', 'wallet', 'balance'],
    queryFn: getBalanceWallet,
  });

  const listWallet = useMemo(
    () => [
      {
        name: `${t('wallet')} Saveloka`,
        balance: data?.data.balance * currency?.exchange_rate,
        backgroundColor: '#FFA800',
        logo: images.logo1,
        isOpen: true,
        currency: currency?.currency_code,
      },
      {
        name: `${t('wallet')} TobeChain`,
        balance: dataQ?.data?.TBH,
        backgroundColor: '#012133',
        des: t('active_to_use_wallet'),
        logo: images.logoTBH,
        isOpen: !!dataQ?.data?.TBH || false,
        currency: 'TBH',
        isNext: true,
        isToken: true,
      },
      {
        name: 'Paypal',
        des: t('direct_payment'),
        backgroundColor: '#012169',
        logo: images.iconPaypal,
        isNext: true,
        isOpen: true,
        isBeta: true,
      },
      {
        last: true,
      },
    ],
    [
      currency?.currency_code,
      currency?.exchange_rate,
      data?.data.balance,
      dataQ?.data?.TBH,
      t,
    ],
  );

  return (
    <View
      style={{
        paddingHorizontal: 10,
        marginTop: scale(30),
      }}>
      {listWallet.map((item, index) => {
        return (
          <WalletItem
            item={item}
            key={index}
            onPress={() => {
              if (item?.isBeta) {
                showMess(t('comming_soon'), 'error');

                return;
              }
              navigate('WalletTokenScreen');
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
