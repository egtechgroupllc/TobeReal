import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import Clipboard from '@react-native-clipboard/clipboard';
import {useLanguage} from '~/hooks/useLanguage';
import {showMess} from '~/assets/constants/Helper';
import {CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {IconCopy} from '~/assets/icon/Icon';
import {scale} from '~/utils/scale';
import {getProfile} from '~/api/user';

export default function SyntaxDeposit({data}) {
  const queryClient = useQueryClient();
  const {t} = useLanguage();

  const dataUser = queryClient.getQueryData([...getProfile.queryKey])?.data;

  const handleCopy = () => {
    Clipboard.setString(
      `${data?.code}  ${t('deposit_to_post')} ${dataUser?.username}`,
    );
    showMess(t('copy_successfully'));
  };

  return (
    <View style={styles.wrapper}>
      <CText
        textType="semiBold"
        style={{
          fontSize: SIZES.medium,
          color: COLORS.White,
        }}>
        {t('syntax_transfer')}
      </CText>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.boxSyntax}
        onPress={handleCopy}>
        <CText
          ellipsizeMode="middle"
          style={{
            flex: 1,
            fontSize: SIZES.xMedium,
            color: COLORS.White,
          }}>
          <CText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
              color: COLORS.White,
            }}>
            {data?.code}{' '}
          </CText>
          {t('deposit_to_post')}
          <CText
            textType="bold"
            style={{
              fontSize: SIZES.xMedium,
              color: COLORS.White,
            }}>
            {' '}
            {dataUser?.username}
          </CText>
        </CText>
        <IconCopy width={scale(16)} height={scale(16)} fill={COLORS.White} />
      </TouchableOpacity>

      <CText style={{color: COLORS.White}}>
        <CText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
            color: COLORS.White,
          }}>
          {t('note')}:{' '}
        </CText>
        <CText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
            color: COLORS.White,
          }}>
          {data?.code}
        </CText>{' '}
        {t('own_transfer_code')}
      </CText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(10),
  },
  boxSyntax: {
    backgroundColor: COLORS.input,
    borderRadius: scale(6),
    padding: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    columnGap: scale(10),
  },
});
