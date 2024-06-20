import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {BottomSheet, CustomButton, CustomText} from '../../../components';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {
  IconArrowBottom,
  IconExplore,
  IconExportFile,
  IconTrash,
} from '../../../assets/icon/Icon';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {showMess} from '../../../assets/constants/Helper';
import {deleteWallet} from '../../../Model/api/wallet';

export default function MenuAddressWallet() {
  const bottomSheetRef = useRef();
  const queryClient = useQueryClient();

  const deleteWalletMu = useMutation({
    mutationFn: deleteWallet,
  });

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
