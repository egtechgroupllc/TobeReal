import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {SIZES, scale} from '../../../../../assets/constants';
import {IconCopy} from '../../../../../assets/icon/Icon';
import {useQueryClient} from '@tanstack/react-query';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMess} from '../../../../../assets/constants/Helper';

export default function SyntaxDeposit({data}) {
  const queryClient = useQueryClient();
  const dataUser = queryClient.getQueryData(['user', 'profile'])?.data;

  const handleCopy = () => {
    Clipboard.setString(
      `${data?.code}  deposit money to post news to your account ${dataUser?.username}`,
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
        Syntax of transfer content
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
          }}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
            }}>
            {data?.code}{' '}
          </CustomText>
          deposit money to post news to your account
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xMedium,
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
          Note:{' '}
        </CustomText>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
          }}>
          {data?.code}
        </CustomText>{' '}
        is your own transfer code. Please enter the correct code at the top of
        the content Use wire transfer to confirm transactions quickly and
        accurately body.
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
