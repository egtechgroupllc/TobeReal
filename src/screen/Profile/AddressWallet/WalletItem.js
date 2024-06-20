import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {CustomButton, CustomImage, CustomText} from '../../../components';
import {formatPrice} from '../../../utils/format';
import {IconNext} from '../../../assets/icon/Icon';

export default function WalletItem({item, onPress}) {
  return (
    <View
      style={{
        overflow: 'hidden',
      }}>
      <View
        style={{
          backgroundColor: item?.backgroundColor || COLORS.black,
          ...styles.box,
        }}>
        <View style={styles.content}>
          <CustomImage
            source={item.logo || ''}
            isAvatar
            style={styles.logo}
            size={scale(35)}
          />
          <View
            style={{
              rowGap: scale(3),
              flex: 1,
            }}>
            <CustomText
              textType="bold"
              size={SIZES.xMedium}
              color={COLORS.white}>
              {item.name}
            </CustomText>

            <CustomText textType="medium" color={COLORS.white}>
              {item.balance ? `Số dư: ${formatPrice(item.balance)}` : item.des}
            </CustomText>
          </View>
          {item.isOpen ? (
            item.online && <IconNext size={scale(12)} fill={COLORS.white} />
          ) : (
            <CustomButton
              onPress={onPress}
              buttonType="normal"
              text={item.online ? 'Kích hoạt ngay' : 'Mở ngay'}
              style={{
                backgroundColor: COLORS.white,
                height: scale(28),
              }}
              styleText={{
                color: COLORS.black,
              }}
            />
          )}
        </View>
      </View>

      <View style={styles.seperate} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: scale(60),
    borderTopLeftRadius: scale(14),
    borderTopRightRadius: scale(14),
    justifyContent: 'flex-start',
    paddingHorizontal: scale(10),
  },
  content: {
    height: '89%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
  },
  seperate: {
    backgroundColor: '#f7f9fa',
    height: '30%',
    width: '100%',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    position: 'absolute',
    bottom: scale(-11),
  },
  logo: {
    borderWidth: scale(5),
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
});
