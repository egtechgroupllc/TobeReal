import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomText from '../../../../../components/CustomText';
import {SIZES, scale} from '../../../../../assets/constants';
import {IconCopy} from '../../../../../assets/icon/Icon';
import CustomImage from '../../../../../components/CustomImage';
import {formatPrice} from '../../../../../utils/format';
import {showMess} from '../../../../../assets/constants/Helper';

export default function InfoBank({data}) {
  const nameBank = useMemo(
    () => data?.typeAccountBank?.bank_name.split(' - ')[0],
    [data],
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <CustomText
          textType="bold"
          style={{
            flex: 1,
            fontSize: SIZES.medium,
          }}>
          Chuyển tiền qua - {nameBank}
        </CustomText>
        <CustomImage
          source={data?.typeAccountBank?.logo_url}
          style={{
            width: scale(90),
            height: scale(30),
          }}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          rowGap: scale(20),
          paddingVertical: scale(10),
        }}>
        <View
          style={{
            paddingHorizontal: scale(10),
            rowGap: scale(20),
          }}>
          <ItemInfo name="Số tài khoản" value={data?.typeAccountBank?.code} />
          <ItemInfo
            name="Chủ tài khoản"
            value={data?.typeAccountBank?.owner}
            isCopy={false}
          />
        </View>
        <View style={styles.border}>
          <ItemInfo
            name="Số tiền chuyển khoản"
            value={String(data?.amount)}
            isPrice
          />
          {/* <ItemInfo name="Nội dung chuyển khoản" value={data?.code} /> */}
        </View>
      </View>
    </View>
  );
}
const ItemInfo = ({name, value, isPrice, isCopy = true}) => {
  const handleCopy = () => {
    Clipboard.setString(value);
    showMess('Sao chép thành công');
  };

  return (
    <View style={styles.boxInfo}>
      <CustomText textType="medium">{name}:</CustomText>
      <TouchableOpacity
        onPress={handleCopy}
        activeOpacity={isCopy ? 0.7 : 1}
        style={styles.textValue}>
        <CustomText
          textType="medium"
          ellipsizeMode="middle"
          style={{
            flex: 1,
            fontSize: SIZES.xMedium,
          }}>
          {isPrice ? formatPrice(value) : value}
        </CustomText>
        {isCopy && <IconCopy width={scale(16)} height={scale(16)} />}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(10),
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#d1f0ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
  },
  border: {
    paddingHorizontal: scale(10),
    rowGap: scale(20),
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: scale(10),
  },
  boxInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: scale(10),
  },
  textValue: {
    backgroundColor: '#eeeeee70',
    borderRadius: scale(6),
    paddingVertical: scale(6),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    columnGap: scale(10),
  },
});