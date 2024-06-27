import * as RNFS from '@dr.pogodin/react-native-fs';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useCallback, useRef} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import {deleteWallet} from '../../../Model/api/wallet';
import {COLORS, scale} from '../../../assets/constants';
import {showMess} from '../../../assets/constants/Helper';
import {IconExportFile, IconTrash} from '../../../assets/icon/Icon';
import {BottomSheet, CustomButton, CustomText} from '../../../components';

export default function MenuAddressWallet({data}) {
  const bottomSheetRef = useRef();
  const queryClient = useQueryClient();

  const deleteWalletMu = useMutation({
    mutationFn: deleteWallet,
  });

  // MARK: Delete wallet
  const handleDeleteWallet = () => {
    deleteWalletMu.mutate(
      {},
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            queryClient.invalidateQueries(['user', 'profile']);
            bottomSheetRef.current.close();
          }
        },
      },
    );
  };

  // MARK: Export wallet
  const handleDownload = useCallback(async () => {
    const dataSave = {
      username: data?.username,
      email: data?.email,
      wallet_address: data?.wallet_address,
      private_key: data?.private_key,
      secret_phrase: data?.passphrase,
    };

    const content = `${JSON.stringify(dataSave, null, 2)}
   Note*: 
  - Hãy lưu trữ file này cận thận và để ở 1 nơi an toàn.
  - Saveloka không giữa bản sao thông tin ví của bạn.      
  `;

    const content2 = JSON.stringify(dataSave);

    try {
      // Cho phép người dùng chọn thư mục lưu trữ
      const res =
        Platform.OS === 'android'
          ? {uri: RNFS.DownloadDirectoryPath}
          : await DocumentPicker.pickDirectory();

      if (res.uri) {
        // Chuyển đổi URI thành đường dẫn hợp lệ
        const pathFolder = `${res.uri}/Saveloka`;
        const path =
          Platform.OS === 'android'
            ? pathFolder
            : decodeURIComponent(pathFolder.replace('file://', ''));

        // Kiểm tra và tạo thư mục nếu cần thiết
        const directoryExists = await RNFS.exists(path);
        if (!directoryExists) {
          await RNFS.mkdir(path);
        }

        const filePath = `${path}/wallet.txt`;
        // Ghi nội dung vào tệp tại vị trí đã chọn
        await RNFS.writeFile(filePath, content, 'utf8');
      }

      // Lưu tệp 2
      const pathDoc = RNFS.CachesDirectoryPath + '/Wallet';
      if (pathDoc) {
        const directoryExists = await RNFS.exists(pathDoc);

        if (!directoryExists) {
          await RNFS.mkdir(pathDoc);
        }
        const filePath2 = `${pathDoc}/wallet.txt`;

        await RNFS.writeFile(filePath2, content2, 'utf8');
      }

      showMess('Lưu file thanh công', 'success');
      bottomSheetRef.current.close();
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Người dùng đã hủy chọn thư mục.');
      } else {
        console.error('Lỗi khi tạo tệp:', error);
        showMess('Lỗi khi Lưu file', 'error');
      }
    }
  }, [
    data?.email,
    data?.passphrase,
    data?.private_key,
    data?.username,
    data?.wallet_address,
  ]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          bottomSheetRef.current.open();
        }}>
        <CustomText
          style={{
            borderWidth: 1,
            borderColor: COLORS.grey,
            padding: 2,
            borderRadius: scale(3),
          }}>
          ---
        </CustomText>
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={'Ví'}
        snapPoints={['30%']}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(12),
        }}>
        <CustomButton
          iconLeft={IconExportFile}
          text="Export wallet"
          styleText={{textAlign: 'left'}}
          styleIcon={{
            color: '#fff',
          }}
          onPress={handleDownload}
        />
        <CustomButton
          onPress={handleDeleteWallet}
          outline
          iconLeft={IconTrash}
          text="Delete wallet"
          styleText={{textAlign: 'left', color: COLORS.error}}
          style={{
            borderColor: COLORS.error,
          }}
          styleIcon={{
            width: scale(21),
            height: scale(21),
          }}
        />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({});
