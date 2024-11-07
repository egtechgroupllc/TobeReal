import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES} from '~/assets/constants';
import {showMess} from '~/assets/constants/Helper';
import {IconCopy} from '~/assets/icon/Icon';
import {CImage, CText} from '~/components';
import {scale} from '~/utils/scale';

export default function ItemAccountBank({data, onPress, isSelect}) {
  const handleCopy = () => {
    Clipboard.setString(data?.code);
    showMess('Sao chép thành công');
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        styles.box,

        isSelect && {
          borderWidth: 1,
          borderColor: COLORS.White,
        },
      ]}>
      <View style={styles.boxImg}>
        <CImage
          source={{uri: data?.logo}}
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
        <CText
          textType="medium"
          style={{fontSize: SIZES.xMedium, color: COLORS.White}}>
          {data?.bank_name?.split('-')?.[0]}
          {data?.bank_name && '-'} {data?.owner}
        </CText>
        <TouchableOpacity
          style={styles.code}
          activeOpacity={0.7}
          onPress={handleCopy}>
          <CText
            textType="semiBold"
            style={{fontSize: SIZES.medium, color: COLORS.White}}>
            {data?.code}
          </CText>
          <IconCopy width={scale(14)} height={scale(14)} fill={COLORS.White} />
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
    backgroundColor: COLORS.input,
    padding: scale(6),
    borderRadius: scale(6),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(8),
  },
});
