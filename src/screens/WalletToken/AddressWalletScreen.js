import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useLayoutEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useCountry} from '~/hooks/useCountry';
import {useAuthentication} from '~/hooks/useAuthentication';
import {scale} from '~/utils/scale';
import {useLanguage} from '~/hooks/useLanguage';
import {COLORS, images} from '~/assets/constants';
import {MainWrapper} from '~/components';
import {getProfile} from '~/api/user';
import {getBalanceWallet} from '~/api/wallet';
import WalletItem from './AddressWallet/WalletItem';
import {showMess} from '~/assets/constants/Helper';

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
    queryKey: getProfile.queryKey,
    queryFn: () => getProfile(),
    enabled: !!token,
  });
  const {data: dataQ} = useQuery({
    queryKey: ['user', 'wallet', 'balance'],
    queryFn: () => getBalanceWallet(),
    enabled: !!token,
  });

  const listWallet = useMemo(
    () => [
      {
        name: `${t('wallet')} TobeCare`,
        // balance: data?.data.balance * currency?.exchange_rate,
        backgroundColor: COLORS.BlueBold,
        logo: images.logoTobeCare,
        isOpen: true,
        currency: currency?.currency_code,
        isNext: true,
        title: t('this_is_wallet_using_fiat_currency_to_pay'),
      },
      {
        name: `${t('cryptocurrency_wallet')} `,
        balance: dataQ?.data?.TBH,
        backgroundColor: '#012133',
        des: !data?.data?.address_wallet
          ? t('active_to_use_wallet')
          : t('wallet_ready_to_use'),
        logo: images.logoTBH,
        isOpen: data?.data?.privateKey || data?.data?.secretPhrase,
        currency: 'TBH',
        isToken: true,
        isNext: true,
        title: t('this_is_wallet_using_crypto_currency_to_pay'),
      },
      {
        name: 'Paypal',
        des: t('direct_payment'),
        backgroundColor: '#012169',
        logo: images.iconPaypal,
        isOpen: true,
        isBeta: true,
        title: t('this_is_method_pay_direct'),
      },
      {
        last: true,
      },
    ],
    [
      currency?.currency_code,
      currency?.exchange_rate,
      // data,
      // dataQ?.data?.TBH,
      t,
    ],
  );

  return (
    <MainWrapper sourceImage={images.backgroundHome} scrollEnabled={false}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: scale(30),
          flex: 1,
        }}>
        {/* <Button title="Start tutorial" onPress={() => start()} /> */}

        {listWallet.map((item, index) => {
          return (
            <WalletItem
              key={index}
              item={item}
              onPress={() => {
                if (item?.isBeta) {
                  showMess(t('comming_soon'), 'error');
                  return;
                } else if (item?.isToken) {
                  navigate('WalletTokenScreen');
                } else {
                  navigate('NoBottomTab', {
                    screen: 'FinancialScreen',
                  });
                }
              }}
            />
          );
        })}
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
