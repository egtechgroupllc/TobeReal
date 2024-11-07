import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES} from '~/assets/constants';
import {IconNext} from '~/assets/icon/Icon';
import {Button, CImage, CText} from '~/components';
import {useLanguage} from '~/hooks/useLanguage';
import {formatPrice} from '~/utils/format';
import {scale} from '~/utils/scale';

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
            justifyContent: 'center',
          }}>
          <View style={styles.content}>
            <View style={styles.icon}>
              <CImage.Avatar
                source={item?.logo}
                style={{
                  height: scale(30),
                  width: scale(30),
                }}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                rowGap: scale(3),
                flex: 1,
              }}>
              <CText textType="bold" size={SIZES.xMedium} color={COLORS.White}>
                {item.name}
              </CText>

              <CText textType="semiBold" color={COLORS.White} numberOfLines={2}>
                {(item.isOpen && item.balance) ||
                (item.isOpen && item.balance === 0)
                  ? `${t('balance')}: ${formatPrice(item.balance, {
                      currency: item?.currency,
                      locales: item?.isToken && 'vi',
                      decimalPlaces: item?.isToken && 10,
                    })}`
                  : item.des}
              </CText>
            </View>
            {item.isOpen ? (
              item.isNext && <IconNext size={scale(12)} fill={COLORS.White} />
            ) : (
              <Button
                onPress={onPress}
                sizeButton="small"
                title={item.online ? t('active_now') : t('open_now')}
                styleText={{
                  color: COLORS.White,
                }}
                backgroundColor={COLORS.cyan}
                styleContent={{width: scale(100)}}
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
          <CText
            style={{
              color: COLORS.White,
              textAlign: 'center',
              width: '70%',
            }}>
            {t('active_2_types_wallet')}
          </CText>
        </View>
      )}

      {!item.last && <View style={styles.seperate} />}
      {item.last && (
        <>
          <View
            style={{
              backgroundColor: COLORS.primary,
              height: 100,
              width: '100%',
              position: 'absolute',
              bottom: scale(-10),
              alignItems: 'center',
            }}
          />
          <View
            style={{
              backgroundColor: COLORS.BlueBold,

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
    height: scale(70),
    borderTopLeftRadius: scale(14),
    borderTopRightRadius: scale(14),
    justifyContent: 'flex-start',
    paddingHorizontal: scale(10),
  },
  icon: {
    height: scale(35),
    width: scale(35),
    backgroundColor: COLORS.blueView,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(99),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
    marginBottom: scale(10),
  },
  seperate: {
    backgroundColor: COLORS.White,
    height: '30%',
    width: '100%',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    position: 'absolute',
    bottom: scale(-11),
    zIndex: 39,
  },
  logo: {
    borderWidth: scale(1),
    borderColor: '#fff',
  },
  img: {
    height: '40%',
    width: '40%',
  },
  last: {
    backgroundColor: COLORS.BlueBold,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    height: scale(150),
    alignItems: 'center',
    rowGap: scale(4),
    paddingTop: '8%',
  },
});
