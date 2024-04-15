/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import {CustomButton} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {formatPrice} from '../../../../utils/format';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useLanguage} from '../../../../hooks/useLanguage';
import {useAuthentication} from '../../../../hooks/useAuthentication';
import {useNavigation} from '@react-navigation/native';
import Skeleton from '../../../../components/Skeleton';
import {
  IconEmail,
  IconPhone,
  IconSupporter,
  IconSupporterYellow,
  IconX,
  LogoLine,
  LogoMessageFB,
  LogoWhatApp,
  LogoZalo,
} from '../../../../assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
import ContactBox from '../ContactBox';

export default memo(function BookAccommodation({
  setBookHeight,
  isLoading,
  price,
  onPress,
}) {
  const insets = useSafeAreaInsets();
  const {t} = useLanguage();
  const {token} = useAuthentication();
  const {navigate} = useNavigation();
  const [openContact, setOpenContact] = useState(false);
  return (
    <View
      style={{...styles.wrapper, paddingBottom: insets.bottom - 5}}
      onLayout={e => {
        const {height} = e.nativeEvent.layout;
        setBookHeight(height);
      }}>
      <Skeleton
        visible={!isLoading}
        shimmerStyle={{
          height: scale(20),
          width: '70%',
        }}>
        <View style={styles.price}>
          <CustomText
            style={{
              fontSize: SIZES.xMedium,
              color: COLORS.white,
            }}>
            {price < 1000000000 ? t('per_month_from') : t('for_sale')}
          </CustomText>
          <CustomText
            style={{
              fontSize: SIZES.medium,
              color: COLORS.white,
            }}
            textType="bold">
            {formatPrice(price, {
              locales: 'en',
            })}{' '}
          </CustomText>
        </View>
      </Skeleton>

      <Skeleton
        visible={!isLoading}
        shimmerStyle={{
          height: scale(48),
        }}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(8),
            paddingVertical: scale(10),
          }}>
          <CustomButton
            onPress={() => setOpenContact(true)}
            outline
            buttonType="large"
            style={{flex: 0.7}}
            text={t('contact_host')}
            styleText={{
              fontSize: SIZES.xMedium,
              color: COLORS.white,
            }}
          />
          <CustomButton
            // onPress={() => {
            //   token ? navigate('NavigationAuth') : navigate('BookingScreen');
            // }}
            onPress={onPress}
            buttonType="large"
            style={{flex: 1}}
            text={'View Room'}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
        </View>
      </Skeleton>
      {openContact && <ContactBox onPress={() => setOpenContact(false)} />}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: scale(100),
    rowGap: scale(10),
    padding: scale(16),
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.theme,
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },
  contact: {
    height: scale(260),
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: '#CDCDCD',
    width: '90%',
    alignSelf: 'center',
    top: scale(-300),
    ...SHADOW,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(10),
  },
});
