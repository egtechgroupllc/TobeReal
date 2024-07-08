import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import {IconNext} from '../../../assets/icon/Icon';
import {CustomButton, CustomImage, CustomText} from '../../../components';
import {useLanguage} from '../../../hooks/useLanguage';
import {formatPrice} from '../../../utils/format';

export default function WalletItem({item, onPress}) {
  const {t} = useLanguage();

  return (
    <TouchableOpacity
      disabled={item?.last}
      onPress={onPress}
      activeOpacity={0.8}
      style={
        {
          // overflow: 'hidden',
        }
      }>
      {!item.last ? (
        <View
          style={{
            backgroundColor: item?.backgroundColor || COLORS.black,
            ...styles.box,
          }}>
          <View style={styles.content}>
            {!item.isToken ? (
              <CustomImage
                source={item.logo || ''}
                isAvatar
                style={{
                  ...styles.logo,
                  backgroundColor: item?.isToken ? 'green' : '#fff',
                }}
                size={scale(35)}
              />
            ) : (
              <View style={styles.icon}>
                <CustomImage
                  isAvatar
                  source={item?.logo}
                  style={{
                    width: scale(30),
                    aspectRatio: 1,
                  }}
                  resizeMode="contain"
                />
              </View>
            )}

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

              <CustomText
                textType="semiBold"
                color={COLORS.white}
                numberOfLines={2}>
                {(item.isOpen && item.balance) ||
                (item.isOpen && item.balance === 0)
                  ? `${t('balance')}: ${formatPrice(item.balance, {
                      currency: item?.currency,
                      locales: item?.isToken && 'vi',
                      decimalPlaces: item?.isToken && 10,
                    })}`
                  : item.des}
              </CustomText>
            </View>
            {item.isOpen ? (
              item.isNext && <IconNext size={scale(12)} fill={COLORS.white} />
            ) : (
              <CustomButton
                onPress={onPress}
                buttonType="normal"
                text={item.online ? t('active_now') : t('open_now')}
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
      ) : (
        <View
          style={{
            ...styles.box,
            ...styles.last,
          }}>
          <CustomText
            style={{
              color: COLORS.text,
              textAlign: 'center',
              width: '70%',
            }}>
            {t('active_2_types_wallet')}
          </CustomText>
        </View>
      )}

      {!item.last && <View style={styles.seperate} />}
      {item.last && (
        <>
          <View
            style={{
              backgroundColor: '#f7f9fa',
              height: 100,
              width: '100%',
              position: 'absolute',
              bottom: scale(-10),
              alignItems: 'center',
            }}
          />
          <View
            style={{
              backgroundColor: COLORS.subPrimary,
              height: scale(55),
              aspectRatio: 1,
              borderRadius: 99,
              bottom: scale(60),
              alignSelf: 'center',
            }}
          />
        </>
      )}
    </TouchableOpacity>
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
  icon: {
    height: scale(35),
    width: scale(35),
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(99),
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
    zIndex: 39,
  },
  logo: {
    borderWidth: scale(5),
    borderColor: '#fff',
  },
  img: {
    height: '40%',
    width: '40%',
  },
  last: {
    backgroundColor: COLORS.subPrimary,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    height: scale(150),
    alignItems: 'center',
    rowGap: scale(4),
    paddingTop: '8%',
  },
});
