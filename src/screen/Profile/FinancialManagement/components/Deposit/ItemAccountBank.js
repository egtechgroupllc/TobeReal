import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {showMess} from '../../../../../assets/constants/Helper';
import {IconCopy} from '../../../../../assets/icon/Icon';
import CustomImage from '../../../../../components/CustomImage';
import CustomText from '../../../../../components/CustomText';

export default function ItemAccountBank({data, onPress, isSelect}) {
  const handleCopy = () => {
    Clipboard.setString(data?.code);
    showMess('Sao chép thành công');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.box,

        isSelect && {
          borderWidth: 1,
          borderColor: COLORS.primary,
        },
      ]}>
      <View style={styles.boxImg}>
        <CustomImage
          source={data?.logo_url}
          style={{
            width: '90%',
            height: '90%',
          }}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          rowGap: scale(8),
          flex: 1,
          alignItems: 'flex-start',
        }}>
        <CustomText textType="medium" style={{fontSize: SIZES.xMedium}}>
          {data?.bank_name?.split('-')?.[0]}
          {data?.bank_name && '-'} {data?.owner}
        </CustomText>
        <TouchableOpacity
          style={styles.code}
          activeOpacity={0.7}
          onPress={handleCopy}>
          <CustomText textType="semiBold" style={{fontSize: SIZES.medium}}>
            {data?.code}
          </CustomText>
          <IconCopy width={scale(14)} height={scale(14)} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: scale(6),
    columnGap: scale(14),
    backgroundColor: '#fff',
  },
  boxImg: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(6),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(40),
    aspectRatio: 1,
    padding: scale(3),
  },
  code: {
    backgroundColor: '#f2f2f2',
    padding: scale(6),
    borderRadius: scale(6),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(8),
  },
});
