import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {postImportWallet} from '../../Model/api/wallet';
import {COLORS, SIZES, scale} from '../../assets/constants';
import {showMess} from '../../assets/constants/Helper';
import {CustomButton, CustomInput, CustomText} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import {requireField} from '../../utils/validate';
import {formatNumber, formatPrice} from '../../utils/format';

export default function ImportAddressWalletScreen({route}) {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  const dataP = route.params;
  const queryClient = useQueryClient();

  const {control, handleSubmit, setValue} = useForm();

  useLayoutEffect(() => {
    setOptions({
      headerTitle:
        dataP.type === 'PASSPHRASE' ? t('secret_phrase') : 'Private key',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataP.type]);

  const postImportWalletMu = useMutation({
    mutationFn: postImportWallet,
  });

  const handleImportWallet = valuePa => {
    postImportWalletMu.mutate(
      {
        type: dataP.type, // "PRIVATE_KEY" | "PASSPHRASE"
        value: valuePa.value,
      },
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            queryClient.invalidateQueries(['user', 'profile']);
            queryClient.invalidateQueries(['user', 'wallet', 'balance']);
            navigate('WalletTokenScreen');
          }
        },
      },
    );
  };

  const handlePast = async () => {
    const valuePast = await Clipboard.getString();
    setValue('value', valuePast);
  };

  return (
    <View
      style={{
        rowGap: scale(25),
        paddingHorizontal: scale(14),
        marginTop: '10%',
      }}>
      <CustomInput
        value="Ví TobeChain"
        label="Tên của ví"
        editable={false}
        styleTextLabel={styles.label}
        styleText={{
          fontSize: SIZES.medium,
        }}
        sizeInput="medium"
      />

      <CustomInput
        label={dataP.type === 'PASSPHRASE' ? t('secret_phrase') : 'Private key'}
        styleTextLabel={styles.label}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
        multiline
        style={{
          paddingHorizontal: scale(10),
          paddingVertical: scale(5),
        }}
        autoFocus
        control={control}
        name="value"
        rules={requireField(t('this_field_required'))}
        componentRight={
          <CustomButton
            onPress={handlePast}
            text={t('paste')}
            buttonType="normal"
            styleWrapper={{
              marginTop: 'auto',
            }}
            style={{
              height: scale(28),
            }}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
        }
      />

      <CustomText style={styles.desc}>
        {dataP.type === 'PASSPHRASE'
          ? `${t('usually_12_words')}`
          : `Private key ${t('is_a_string_of_letter')}`}
      </CustomText>

      <CustomButton
        text={t('restore_wallet')}
        onPress={handleSubmit(handleImportWallet)}
      />
    </View>
  );
}
// MARK : sada321321
const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.xMedium,
    textType: 'medium',
    color: COLORS.textSub,
  },
  desc: {
    textAlign: 'center',
    fontSize: SIZES.xMedium,
    color: COLORS.text,
    lineHeight: scale(20),
  },
});
