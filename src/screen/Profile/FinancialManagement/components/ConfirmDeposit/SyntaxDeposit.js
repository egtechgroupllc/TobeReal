import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconCopy} from '../../../../../assets/icon/Icon';
import {useQueryClient} from '@tanstack/react-query';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMess} from '../../../../../assets/constants/Helper';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function SyntaxDeposit({data}) {
  const queryClient = useQueryClient();
  const {t} = useLanguage();

  const dataUser = queryClient.getQueryData(['user', 'profile'])?.data;

  const handleCopy = () => {
    Clipboard.setString(
      `${data?.code}  ${t('deposit_to_post')} ${dataUser?.username}`,
    );
    showMess('Copy successful');
  };

  return (
    <View style={styles.wrapper}>
      <CustomText
        textType="semiBold"
        style={{
          fontSize: SIZES.medium,
        }}>
        {t('syntax_transfer')}
      </CustomText>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.boxSyntax}
        onPress={handleCopy}>
        <CustomText
          ellipsizeMode="middle"
          style={{
            flex: 1,
            fontSize: SIZES.xMedium,
            color: COLORS.black,
          }}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
              color: COLORS.black,
            }}>
            {data?.code}{' '}
          </CustomText>
          {t('deposit_to_post')}
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
              color: COLORS.black,
            }}>
            {' '}
            {dataUser?.username}
          </CustomText>
        </CustomText>
        <IconCopy width={scale(16)} height={scale(16)} />
      </TouchableOpacity>

      <CustomText>
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xMedium,
          }}>
          {t('note')}:{' '}
        </CustomText>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
          }}>
          {data?.code}
        </CustomText>{' '}
        {t('own_transfer_code')}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(10),
  },
  boxSyntax: {
    backgroundColor: '#eee',
    borderRadius: scale(6),
    padding: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    columnGap: scale(10),
  },
});
