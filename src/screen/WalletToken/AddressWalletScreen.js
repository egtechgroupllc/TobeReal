import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {images, scale} from '../../assets/constants';
import WalletItem from '../WalletToken/AddressWallet/WalletItem';
import {useLanguage} from '../../hooks/useLanguage';

export default function AddressWalletScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('account_card_management'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listWallet = useMemo(
    () => [
      {
        name: `${t('wallet')} Saveloka`,
        balance: 1000000,
        backgroundColor: '#FFA800',
        logo: images.logo1,
        isOpen: true,
      },
      {
        name: `${t('wallet')} TobeChain`,
        balance: null,
        backgroundColor: '#012133',
        des: t('active_to_use_TBH'),
        logo: images.logoTBH,
        isOpen: false,
      },
      {
        name: 'Paypal',
        des: t('direct_payment'),
        backgroundColor: '#012169',
        logo: images.iconPaypal,
        online: true,
        isOpen: true,
      },
    ],
    [],
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
            onPress={() => navigate('WalletTokenScreen')}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
