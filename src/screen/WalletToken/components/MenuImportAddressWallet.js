import React, {useEffect, useRef, useState} from 'react';
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
import {useLanguage} from '../../../hooks/useLanguage';

export default function ImportAddressWalletBtn() {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();

  const {navigate} = useNavigation();
  const queryClient = useQueryClient();

  const [checkImportFile, setCheckImportFile] = useState(false);

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
        setCheckImportFile(JSON.parse(content));
      }
    } catch (error) {
      console.error('Lỗi khi đọc tệp:', error);
    }
  };

  useEffect(() => {
    handleReadFile();
  }, []);

  const postImportWalletMu = useMutation({
    mutationFn: postImportWallet,
  });

  const handleImportWallet = () => {
    postImportWalletMu.mutate(
      {
        type: checkImportFile.secret_phrase ? 'PASSPHRASE' : 'PRIVATE_KEY', // "PRIVATE_KEY" | "PASSPHRASE"
        value: checkImportFile.secret_phrase || checkImportFile.private_key,
      },
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
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
        text={t('add_existing_wallet')}
        desc={t('import_existing_wallet')}
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
        titleIndicator={t('import_existing_wallet')}
        snapPoints={['30%']}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(12),
        }}>
        <CustomButton
          onPress={() => handleImport('PASSPHRASE')}
          text={t('pass_phrase')}
          desc={t('use_word_mnemonic')}
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
          desc={t('use_saved_private_key')}
          buttonType="large"
          isIconComponent
          iconLeft={
            <View style={styles.boxIcon}>
              <IconKey />
            </View>
          }
        />

        {!!checkImportFile && (
          <CustomButton
            onPress={handleImportWallet}
            text={t('backup_file')}
            desc={t('use_backup_file')}
            buttonType="large"
            isIconComponent
            iconLeft={
              <View style={styles.boxIcon}>
                <IconImportFile />
              </View>
            }
          />
        )}
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
