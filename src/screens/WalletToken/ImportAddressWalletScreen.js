import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {formatNumber, formatPrice} from '../../utils/format';
import {useLanguage} from '~/hooks/useLanguage';
import Input from '~/components/Input';
import {scale} from '~/utils/scale';
import {COLORS, images, SIZES} from '~/assets/constants';
import {Button, CText, MainWrapper} from '~/components';
import {requireField} from '~/utils/validate';
import {postImportWallet} from '~/api/wallet';
import {showMess} from '~/assets/constants/Helper';

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
            t(dataInside?.message),
            !dataInside?.error ? 'success' : 'error',
          );

          if (!dataInside?.error) {
            queryClient.invalidateQueries(['user', 'profile']);
            queryClient.invalidateQueries(['user', 'wallet', 'balance']);
            navigate('WalletTokenScreen');
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

  const handlePast = async () => {
    const valuePast = await Clipboard.getString();
    setValue('value', valuePast);
  };

  return (
    <MainWrapper sourceImage={images.backgroundHome}>
      <View
        style={{
          rowGap: scale(25),
          paddingHorizontal: scale(14),
          marginTop: '10%',
        }}>
        {/* <Input
          value="Ví TobeChain"
          label="Tên của ví"
          editable={false}
          styleTextLabel={styles.label}
          styleText={{
            fontSize: SIZES.medium,
          }}
          sizeInput="medium"
        /> */}

        <Input
          label={
            dataP.type === 'PASSPHRASE' ? t('secret_phrase') : 'Private key'
          }
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
            <Button
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

        <CText style={styles.desc}>
          {dataP.type === 'PASSPHRASE'
            ? `${t('usually_12_words')}`
            : `Private key ${t('is_a_string_of_letter')}`}
        </CText>

        <Button
          title={t('restore_wallet')}
          linearGradientProps={{colors: COLORS.linearButton}}
          onPress={handleSubmit(handleImportWallet)}
        />
      </View>
    </MainWrapper>
  );
}
// MARK : sada321321
const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.xMedium,
    textType: 'medium',
    color: COLORS.White,
  },
  desc: {
    textAlign: 'center',
    fontSize: SIZES.xMedium,
    color: COLORS.White,
    lineHeight: scale(20),
  },
});
