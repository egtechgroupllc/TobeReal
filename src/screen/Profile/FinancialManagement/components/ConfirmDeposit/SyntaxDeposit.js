import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconCopy} from '../../../../../assets/icon/Icon';
import {useQueryClient} from '@tanstack/react-query';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMess} from '../../../../../assets/constants/Helper';

export default function SyntaxDeposit({data}) {
  const queryClient = useQueryClient();
  const dataUser = queryClient.getQueryData(['user', 'profile'])?.data;

  const handleCopy = () => {
    Clipboard.setString(
      `${data?.code}  nap tien dang tin cho tai khoan ${dataUser?.username}`,
    );
    showMess('Sao chép thành công');
  };

  return (
    <View style={styles.wrapper}>
      <CustomText
        textType="semiBold"
        style={{
          fontSize: SIZES.medium,
        }}>
        Cú pháp nội dung chuyển khoản
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
          nap tien dang tin cho tai khoan
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
          Lưu ý:{' '}
        </CustomText>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.xMedium,
          }}>
          {data?.code}
        </CustomText>{' '}
        là mã chuyển khoản của riêng bạn. Bạn vui lòng nhập đúng mã ở đầu nội
        dung chuyển khoản để việc xác nhận giao dịch được nhanh chóng và chính
        xác.
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
