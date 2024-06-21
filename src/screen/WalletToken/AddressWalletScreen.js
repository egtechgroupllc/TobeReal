import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {images, scale} from '../../assets/constants';
import WalletItem from '../WalletToken/AddressWallet/WalletItem';

export default function AddressWalletScreen() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: 'Quan ly tai khoan/the',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listWallet = useMemo(
    () => [
      {
        name: 'Ví Saveloka',
        balance: 1000000,
        backgroundColor: '#FFA800',
        logo: images.logo1,
        isOpen: true,
      },
      {
        name: 'Ví TBH',
        balance: null,
        backgroundColor: '#012133',
        des: 'Kích hoạt để sử dụng TBH',
        logo: images.logoTBH,
        isOpen: false,
      },
      {
        name: 'Paypal',
        des: 'Thanh toán trực tiếp',
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
