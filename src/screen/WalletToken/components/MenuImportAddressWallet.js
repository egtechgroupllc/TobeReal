import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../assets/constants';
import {
  IconArrowBottom,
  IconEditProfile,
  IconImportFile,
  IconKey,
} from '../../../assets/icon/Icon';
import {BottomSheet, CustomButton} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import * as RNFS from '@dr.pogodin/react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postImportWallet} from '../../../Model/api/wallet';
import {showMess} from '../../../assets/constants/Helper';

export default function ImportAddressWalletBtn() {
  const bottomSheetRef = useRef();

  const {navigate} = useNavigation();
  const queryClient = useQueryClient();

  const handleImport = type => {
    bottomSheetRef.current.close();
    navigate('ImportAddressWalletScreen', {type});
  };

  const handleReadFile = async () => {
    try {
      const pathDoc = RNFS.CachesDirectoryPath;
      const filePath2 = `${pathDoc}/Wallet/wallet.txt`;

      // Kiểm tra sự tồn tại của tệp
      const fileExists = await RNFS.exists(filePath2);

      if (!fileExists) {
        console.error('Tệp không tồn tại:', filePath2);
        return;
      }

      const content = await RNFS.readFile(filePath2, 'utf8');

      if (content) {
        handleImportWallet(JSON.parse(content));
      }
    } catch (error) {
      console.error('Lỗi khi đọc tệp:', error);
    }
  };

  const postImportWalletMu = useMutation({
    mutationFn: postImportWallet,
  });

  const handleImportWallet = value => {
    postImportWalletMu.mutate(
      {
        type: value.secret_phrase ? 'PASSPHRASE' : 'PRIVATE_KEY', // "PRIVATE_KEY" | "PASSPHRASE"
        value: value.secret_phrase || value.private_key,
      },
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            bottomSheetRef.current.close();
            queryClient.invalidateQueries(['user', 'profile']);
          }
        },
      },
    );
  };

  return (
    <View
      style={{
        width: '100%',
      }}>
      <CustomButton
        onPress={() => bottomSheetRef.current.open()}
        text="Thêm ví hiện có"
        desc="Import an existing wallet"
        buttonType="large"
        isIconComponent
        iconLeft={
          <View style={styles.boxIcon}>
            <IconArrowBottom />
          </View>
        }
      />

      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={'Import an existing wallet'}
        snapPoints={['30%']}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(12),
        }}>
        <CustomButton
          onPress={() => handleImport('PASSPHRASE')}
          text="Cụm từ bí mật"
          desc="Sử dụng cụm từ ghi nhớ 12 từ"
          buttonType="large"
          isIconComponent
          iconLeft={
            <View style={styles.boxIcon}>
              <IconEditProfile />
            </View>
          }
        />

        <CustomButton
          onPress={() => handleImport('PRIVATE_KEY')}
          text="Private key"
          desc="Sử dụng cụm từ Private key đã lưu"
          buttonType="large"
          isIconComponent
          iconLeft={
            <View style={styles.boxIcon}>
              <IconKey />
            </View>
          }
        />

        <CustomButton
          onPress={handleReadFile}
          text="File đã sao lưu"
          desc="Sử dụng File đã sao lưu"
          buttonType="large"
          isIconComponent
          iconLeft={
            <View style={styles.boxIcon}>
              <IconImportFile />
            </View>
          }
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  boxIcon: {
    padding: scale(10),
    backgroundColor: COLORS.subPrimary,
    borderRadius: 99,
  },
});
