import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {getProfile} from '../../Model/api/common';
import {postCreateWallet} from '../../Model/api/wallet';
import {COLORS, images, scale} from '../../assets/constants';
import {showMess} from '../../assets/constants/Helper';
import {IconAdd} from '../../assets/icon/Icon';
import {CustomButton, CustomImage, CustomText} from '../../components';
import {useAuthentication} from '../../hooks/useAuthentication';
import BoxWalletBlockChain from './AddressWallet/BoxWalletBlockChain';
import ListToken from './components/ListToken';
import MenuImportAddressWallet from './components/MenuImportAddressWallet';

export default function WalletTokenScreen() {
  const {setOptions, navigate} = useNavigation();

  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: 'Quan ly ví TBH',
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
        Tham gia ngay để tích điểm và nhận voucher giảm giá cho giao dịch tiếp
        theo của bạn!
      </CustomText>
      {!data?.data?.wallet_address ? (
        <View
          style={{
            rowGap: scale(12),
            width: '100%',
          }}>
          <CustomButton
            onPress={createWallet}
            text="Tạo ví mới"
            buttonType="large"
            desc="New wallet and recovery passphrase"
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    rowGap: scale(20),
    padding: scale(20),
    paddingTop: scale(30),
  },
  boxIcon: {
    padding: scale(10),
    backgroundColor: COLORS.subPrimary,
    borderRadius: 99,
  },
});
