import * as RNFS from '@dr.pogodin/react-native-fs';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useCallback, useRef} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {postDeleteWallet} from '~/api/wallet';
import {COLORS} from '~/assets/constants';
import {showMess} from '~/assets/constants/Helper';
import {IconExportFile, IconMenu, IconTrash} from '~/assets/icon/Icon';
import {Button} from '~/components';
import BottomSheet from '~/components/BottomSheet';
import {useLanguage} from '~/hooks/useLanguage';
import {permissionDownloadAndroid} from '~/utils/permission/permissionDownloadAndroid';
import {scale} from '~/utils/scale';

export default function MenuAddressWallet({data}) {
  const bottomSheetRef = useRef();
  const queryClient = useQueryClient();
  const {t} = useLanguage();

  const deleteWalletMu = useMutation({
    mutationFn: postDeleteWallet,
  });

  // MARK: Delete wallet
  const handleDeleteWallet = () => {
    deleteWalletMu.mutate(
      {},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            !dataInside?.error ? 'success' : 'error',
          );

          if (!dataInside?.error) {
            queryClient.invalidateQueries(['user', 'profile']);
            bottomSheetRef.current.close();
          }
        },
        onError: err => {
          if (err.response) {
            showMess(err?.response?.data?.message, 'error');
          }
        },
      },
    );
  };

  // MARK: Export wallet
  const handleDownload = useCallback(async () => {
    // const hasPermission = await permissionDownloadAndroid();

    // if (!hasPermission) {
    //   showMess('Storage permission denied', 'error');
    //   return;
    // }
    const dataSave = {
      username: data?.username,
      email: data?.email,
      wallet_address: data?.wallet,
      private_key: data?.privateKey,
      secret_phrase: data?.secretPhrase,
    };

    const content = `${JSON.stringify(dataSave, null, 2)}
   Note*: 
  - Hãy lưu trữ file này cận thận và để ở 1 nơi an toàn.
  - Tobe Care không giữ bản sao thông tin ví của bạn.      
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
        const pathFolder = `${res.uri}/TobeCare`;

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

      showMess(t('saved_file_successfully'), 'success');
      bottomSheetRef.current.close();
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Người dùng đã hủy chọn thư mục.');
      } else {
        console.error('Lỗi khi tạo tệp:', error);
        showMess(t('error_when_saving_file'), 'error');
      }
    }
  }, [
    data?.email,
    data?.secretPhrase,
    data?.privateKey,
    data?.username,
    data?.wallet,
  ]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{padding: scale(5)}}
        onPress={() => {
          bottomSheetRef.current.open();
        }}>
        <IconMenu fill={COLORS.White} />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={t('wallet')}
        snapPoints={['30%']}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(12),
        }}>
        <Button
          Icon={IconExportFile}
          title={t('export_wallet')}
          styleText={{textAlign: 'left'}}
          styleIcon={{
            color: '#fff',
          }}
          linearGradientProps={{colors: COLORS.linearButton}}
          onPress={handleDownload}
        />
        <Button
          onPress={handleDeleteWallet}
          outline
          Icon={IconTrash}
          title={t('delete_wallet')}
          styleText={{textAlign: 'left', color: COLORS.black}}
          styleContent={{backgroundColor: COLORS.White}}
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
