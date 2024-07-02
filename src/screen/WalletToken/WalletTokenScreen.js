import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {getProfile} from '../../Model/api/common';
import {postCreateWallet} from '../../Model/api/wallet';
import {COLORS, images, scale} from '../../assets/constants';
import {showMess} from '../../assets/constants/Helper';
import {IconAdd, IconSearch} from '../../assets/icon/Icon';
import {CustomButton, CustomImage, CustomText} from '../../components';
import {useAuthentication} from '../../hooks/useAuthentication';
import BoxWalletBlockChain from './AddressWallet/BoxWalletBlockChain';
import ListToken from './components/ListToken';
import MenuImportAddressWallet from './components/MenuImportAddressWallet';
import {useLanguage} from '../../hooks/useLanguage';
import WalletManage from './components/WalletManage';

export default function WalletTokenScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();

  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('tbh_wallet_management'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {token} = useAuthentication();

  const {isLoading, data} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });

  const postCreateWalletMu = useMutation({
    mutationFn: postCreateWallet,
  });

  const createWallet = () => {
    postCreateWalletMu.mutate(
      {},
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            queryClient.invalidateQueries(['user', 'profile']);
            navigate('ShowPrivateKeyAndSecretPhrase');
          }
        },
      },
    );
  };

  return (
    <View style={styles.wrapper}>
      <CustomImage
        source={images.logo}
        resizeMode="cover"
        style={{
          width: scale(200),
          height: scale(50),
        }}
      />
      <CustomText
        size={scale(18)}
        textType="medium"
        style={{
          textAlign: 'center',
        }}>
        {t('join_not_to_receive_voucher')}
      </CustomText>
      {!data?.data?.wallet_address ? (
        <View
          style={{
            rowGap: scale(12),
            width: '100%',
          }}>
          <CustomButton
            onPress={createWallet}
            text={t('create_new_wallet')}
            buttonType="large"
            desc={t('new_wallet_recovery_phrase')}
            isIconComponent
            iconLeft={
              <View style={styles.boxIcon}>
                <IconAdd />
              </View>
            }
          />

          {/* MARK: MenuImportAddressWallet */}
          <MenuImportAddressWallet />
        </View>
      ) : (
        <>
          <BoxWalletBlockChain data={data?.data} />
          <ListToken />
          <WalletManage data={data?.data} />
          <CustomButton
            onPress={() =>
              navigate('NoBottomTab', {screen: 'HistoryTokenData'})
            }
            text={t('look_up_transaction')}
            iconRight={IconSearch}
            styleIcon={{color: COLORS.white}}
            styleWrapper={{maxWidth: '70%'}}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    rowGap: scale(10),
    padding: scale(20),
    paddingTop: scale(30),
  },
  boxIcon: {
    padding: scale(10),
    backgroundColor: COLORS.subPrimary,
    borderRadius: 99,
  },
});
